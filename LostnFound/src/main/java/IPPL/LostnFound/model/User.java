package IPPL.LostnFound.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String username;

    @Column(name = "username", nullable = false, insertable = true, updatable = true)
    private String usernameDb;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String role;

    @Column(name = "phone")
    private String phone;

    // Constructors
    public User() {
    }

    public User(String username, String password, String email, String role) {
        this.username = username;
        this.usernameDb = username; // Set usernameDb to same value as username
        this.password = password;
        this.email = email;
        this.role = role;
    }

    public User(String username, String password, String email, String role, String phone) {
        this.username = username;
        this.usernameDb = username; // Set usernameDb to same value as username
        this.password = password;
        this.email = email;
        this.role = role;
        this.phone = phone;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
        this.usernameDb = username; // Keep usernameDb in sync with username
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUsernameDb() {
        return usernameDb;
    }

    public void setUsernameDb(String usernameDb) {
        this.usernameDb = usernameDb;
    }
}
