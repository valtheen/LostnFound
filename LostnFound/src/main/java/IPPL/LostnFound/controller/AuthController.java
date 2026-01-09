package IPPL.LostnFound.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import IPPL.LostnFound.config.JWTGenerator;
import IPPL.LostnFound.dto.AuthResponseDTO;
import IPPL.LostnFound.dto.LoginRequest;
import IPPL.LostnFound.dto.RegisterRequest;
import IPPL.LostnFound.model.User;
import IPPL.LostnFound.services.UserService;
import jakarta.validation.Valid;

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

            // Check if phone number already exists (if provided)
            String phoneNumber = registerRequest.getPhone() != null ? registerRequest.getPhone().trim() : "";
            if (!phoneNumber.isEmpty() && userService.existsByPhone(phoneNumber)) {
                response.put("success", false);
                response.put("message", "Nomor telepon " + phoneNumber + " sudah terdaftar. Silakan gunakan nomor telepon lain atau login jika Anda sudah memiliki akun.");
                return ResponseEntity.badRequest().body(response);
            }

            // Create new user
            User user = new User();
            user.setUsername(registerRequest.getUsername());
            user.setPassword(registerRequest.getPassword());
            user.setEmail(registerRequest.getEmail());
            // Set phone - use empty string if null to avoid database constraint violation
            user.setPhone(registerRequest.getPhone() != null ? registerRequest.getPhone() : "");
            
            // Check if registering as admin (email contains "admin@" and password = "admin123")
            // Example: admin@admin.com, admin@test.com, etc.
            if (registerRequest.getEmail() != null && 
                registerRequest.getEmail().toLowerCase().startsWith("admin@") && 
                "admin123".equals(registerRequest.getPassword())) {
                user.setRole("ADMIN");
            } else {
                user.setRole("USER");
            }

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
            String errorMessage = e.getMessage();
            
            // Parse database constraint errors and make them user-friendly
            if (errorMessage != null && errorMessage.contains("Duplicate entry")) {
                if (errorMessage.contains("phone") || errorMessage.contains("UKdu5v5sr43g5bfnji4vb8hg5s3")) {
                    String phone = registerRequest.getPhone() != null ? registerRequest.getPhone() : "";
                    response.put("message", "Nomor telepon " + phone + " sudah terdaftar. Silakan gunakan nomor telepon lain atau login jika Anda sudah memiliki akun.");
                } else if (errorMessage.contains("email")) {
                    response.put("message", "Email " + registerRequest.getEmail() + " sudah terdaftar. Silakan gunakan email lain atau login jika Anda sudah memiliki akun.");
                } else if (errorMessage.contains("username") || errorMessage.contains("name")) {
                    response.put("message", "Username \"" + registerRequest.getUsername() + "\" sudah digunakan. Silakan pilih username lain.");
                } else {
                    response.put("message", "Data yang Anda masukkan sudah terdaftar. Silakan gunakan data lain atau login jika Anda sudah memiliki akun.");
                }
            } else {
                response.put("message", "Registration failed: " + errorMessage);
            }
            
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
