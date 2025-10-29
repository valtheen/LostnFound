package IPPL.LostnFound.controller;

import IPPL.LostnFound.dto.AuthResponseDTO;
import IPPL.LostnFound.dto.LoginRequest;
import IPPL.LostnFound.dto.RegisterRequest;
import IPPL.LostnFound.model.User;
import IPPL.LostnFound.services.UserService;
import IPPL.LostnFound.config.JWTGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTGenerator jwtGenerator;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody RegisterRequest registerRequest) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Check if username already exists
            if (userService.existsByUsername(registerRequest.getUsername())) {
                response.put("success", false);
                response.put("message", "Username is already taken!");
                return ResponseEntity.badRequest().body(response);
            }

            // Check if email already exists
            if (userService.existsByEmail(registerRequest.getEmail())) {
                response.put("success", false);
                response.put("message", "Email is already taken!");
                return ResponseEntity.badRequest().body(response);
            }

            // Create new user
            User user = new User();
            user.setUsername(registerRequest.getUsername());
            user.setPassword(registerRequest.getPassword());
            user.setEmail(registerRequest.getEmail());
            user.setRole(registerRequest.getRole());

            User savedUser = userService.createUser(user);
            String token = jwtGenerator.generateToken(savedUser.getUsername());

            AuthResponseDTO authResponse = new AuthResponseDTO(token, savedUser.getId(), 
                savedUser.getUsername(), savedUser.getEmail(), savedUser.getRole());

            response.put("success", true);
            response.put("message", "User registered successfully");
            response.put("data", authResponse);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Registration failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Find user by email (since frontend sends email as username)
            User user = userService.findByEmail(loginRequest.getUsername());
            
            if (user == null) {
                response.put("success", false);
                response.put("message", "Invalid username or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
            
            // Check password - handle both encrypted and plain text passwords
            boolean passwordMatches = false;
            if (user.getPassword().startsWith("$2a$") || user.getPassword().startsWith("$2b$")) {
                // Password is encrypted, use passwordEncoder
                passwordMatches = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());
            } else {
                // Password is plain text, compare directly
                passwordMatches = loginRequest.getPassword().equals(user.getPassword());
            }
            
            if (!passwordMatches) {
                response.put("success", false);
                response.put("message", "Invalid username or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            String token = jwtGenerator.generateToken(user.getUsername());
            AuthResponseDTO authResponse = new AuthResponseDTO(token, user.getId(), 
                user.getUsername(), user.getEmail(), user.getRole());

            response.put("success", true);
            response.put("message", "Login successful");
            response.put("data", authResponse);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Login failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
