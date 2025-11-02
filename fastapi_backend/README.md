# FastAPI SORA 2 Video Generator

## Setup
- `cd fastapi_backend`
- (Optional) `python3 -m venv .venv && source .venv/bin/activate`
- `pip install -r requirements.txt`

## Environment
- `SORA_API_URL` (optional) override the placeholder API endpoint
- `SORA_API_KEY` (optional) bearer token forwarded to the SORA 2 API

## Run
- `uvicorn main:app --reload --port 8000`

## Request Example
- `curl -X POST http://localhost:8000/generate -H 'Content-Type: application/json' -d '{"prompt": "A serene beach at sunset"}'`
