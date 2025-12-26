package IPPL.LostnFound.controller;

import IPPL.LostnFound.model.User;
import IPPL.LostnFound.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestConnectionController {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/connection")
    public Map<String, Object> testConnection() {
        Map<String, Object> response = new HashMap<>();

        try (Connection connection = dataSource.getConnection()) {
            response.put("status", "success");
            response.put("message", "Database connection successful!");
            response.put("database", connection.getCatalog());
            response.put("url", connection.getMetaData().getURL());
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
        }

        return response;
    }

    @GetMapping("/users")
    public Map<String, Object> getAllUsers() {
        Map<String, Object> response = new HashMap<>();

        try {
            List<User> users = userRepository.findAll();
            response.put("status", "success");
            response.put("count", users.size());
            response.put("data", users);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
        }

        return response;
    }

    @PostMapping("/create-user")
    public Map<String, Object> createTestUser() {
        Map<String, Object> response = new HashMap<>();

        try {
            User user = new User();
<<<<<<< HEAD
            user.setName("testuser");
            user.setEmail("test@example.com");
            user.setPhone("081234567890");
=======
            user.setUsername("testuser");
            user.setEmail("test@example.com");
>>>>>>> devendev
            user.setPassword("password123");
            user.setRole("USER");

            User savedUser = userRepository.save(user);

            response.put("status", "success");
            response.put("message", "User created successfully!");
            response.put("data", savedUser);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
        }

        return response;
    }
}


