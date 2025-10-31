package IPPL.LostnFound.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

@Component
public class JWTGenerator {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    public String generateToken(String username) {
        // Simple token generation for now
        return "jwt-token-" + username + "-" + System.currentTimeMillis();
    }

    public String getUsernameFromToken(String token) {
        if (token != null && token.startsWith("jwt-token-")) {
            String[] parts = token.split("-");
            if (parts.length >= 3) {
                return parts[2];
            }
        }
        return null;
    }

    public boolean validateToken(String token) {
        return token != null && token.startsWith("jwt-token-");
    }
}