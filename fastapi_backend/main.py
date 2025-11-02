"""FastAPI application exposing a `/generate` endpoint.

The endpoint accepts a JSON payload containing a `prompt` field and forwards
the request to the (placeholder) SORA 2 API. The response returns a JSON
object that includes the generated video URL.
"""

from __future__ import annotations

import os
from typing import Any

import httpx
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, HttpUrl


SORA_API_URL = os.getenv("SORA_API_URL", "https://api.placeholder.sora2/generate")
SORA_API_KEY = os.getenv("SORA_API_KEY")


class PromptRequest(BaseModel):
    """Request payload containing the textual prompt."""

    prompt: str


class VideoResponse(BaseModel):
    """Response payload containing the generated video URL."""

    video_url: HttpUrl


app = FastAPI(title="SORA 2 Video Generator")


@app.post("/generate", response_model=VideoResponse, summary="Generate video from prompt")
async def generate_video(payload: PromptRequest) -> VideoResponse:
    """Forward the prompt to the SORA 2 API and return the generated video URL."""

    request_payload = {"prompt": payload.prompt}

    headers = {"Content-Type": "application/json"}
    if SORA_API_KEY:
        headers["Authorization"] = f"Bearer {SORA_API_KEY}"

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            sora_response = await client.post(
                SORA_API_URL,
                json=request_payload,
                headers=headers,
            )
            sora_response.raise_for_status()
    except httpx.HTTPStatusError as exc:
        detail: dict[str, Any] = {
            "message": "SORA 2 API returned an error",
            "status_code": exc.response.status_code,
            "response": exc.response.text,
        }
        raise HTTPException(status_code=exc.response.status_code, detail=detail) from exc
    except httpx.RequestError as exc:  # network/timeout issues
        raise HTTPException(
            status_code=502,
            detail="Failed to contact the SORA 2 API",
        ) from exc

    sora_payload = sora_response.json()
    video_url = sora_payload.get("video_url")

    if not video_url:
        raise HTTPException(
            status_code=502,
            detail="SORA 2 API response is missing `video_url`",
        )

    return VideoResponse(video_url=video_url)

