package IPPL.LostnFound.controller;

import IPPL.LostnFound.dto.AuthResponseDTO;
import IPPL.LostnFound.dto.LoginRequest;
import IPPL.LostnFound.dto.RegisterRequest;
import IPPL.LostnFound.dto.UserDTO;
import IPPL.LostnFound.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class UserController {

    private final AuthService authService;

    public UserController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        UserDTO user = authService.register(registerRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "User registered successfully");
        response.put("user", user);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        AuthResponseDTO response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getUserProfile(Authentication authentication) {
        Map<String, Object> response = new HashMap<>();

        if (authentication == null || !authentication.isAuthenticated() ||
                "anonymousUser".equalsIgnoreCase(String.valueOf(authentication.getPrincipal()))) {
            response.put("success", false);
            response.put("message", "Authorization token required");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        UserDTO user = authService.getCurrentUser(authentication.getName());
        response.put("success", true);
        response.put("user", user);
        return ResponseEntity.ok(response);
    }
}
