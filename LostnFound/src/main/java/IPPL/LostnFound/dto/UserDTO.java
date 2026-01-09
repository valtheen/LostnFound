package IPPL.LostnFound.dto;

public class UserDTO {
    private Long id;
    private String email;
<<<<<<< HEAD
    private String name;
    private String phone;
    private String role;

=======
    private String nama;
    private String noHandphone;
    private String alamat;

    // Constructors
    public UserDTO() {
    }

    public UserDTO(Long id, String email, String nama, String noHandphone, String alamat) {
        this.id = id;
        this.email = email;
        this.nama = nama;
        this.noHandphone = noHandphone;
        this.alamat = alamat;
    }

    // Getters and Setters
>>>>>>> devendev
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

<<<<<<< HEAD
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
=======
    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getNoHandphone() {
        return noHandphone;
    }

    public void setNoHandphone(String noHandphone) {
        this.noHandphone = noHandphone;
    }

    public String getAlamat() {
        return alamat;
    }

    public void setAlamat(String alamat) {
        this.alamat = alamat;
>>>>>>> devendev
    }
}
