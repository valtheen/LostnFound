package IPPL.LostnFound.model;

<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;

=======
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

>>>>>>> devendev
@Entity
@Table(name = "item_reports")
public class ItemReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String namaBarang;

    @Column(nullable = false)
    private LocalDate tanggal;

    @Column(nullable = false)
    private String keterangan; // "Hilang" or "Ditemukan"

    @Column(nullable = false)
    private String namaPemilik;

    @Column(nullable = false)
    private String lokasi;

    @Column(nullable = false)
    private String noHandphone;

<<<<<<< HEAD
=======
    @Column
    private String kategori;

>>>>>>> devendev
    @Column(columnDefinition = "TEXT")
    private String gambarPath;

    @ManyToOne
    @JoinColumn(name = "user_id")
<<<<<<< HEAD
    @JsonIgnore
    private User user;

    public ItemReport() {
    }

    public ItemReport(String namaBarang, LocalDate tanggal, String keterangan,
                      String namaPemilik, String lokasi, String noHandphone, User user) {
=======
    private User user;

    // Constructors
    public ItemReport() {
    }

    public ItemReport(String namaBarang, LocalDate tanggal, String keterangan, 
                     String namaPemilik, String lokasi, String noHandphone, User user) {
>>>>>>> devendev
        this.namaBarang = namaBarang;
        this.tanggal = tanggal;
        this.keterangan = keterangan;
        this.namaPemilik = namaPemilik;
        this.lokasi = lokasi;
        this.noHandphone = noHandphone;
        this.user = user;
    }

<<<<<<< HEAD
=======
    // Getters and Setters
>>>>>>> devendev
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNamaBarang() {
        return namaBarang;
    }

    public void setNamaBarang(String namaBarang) {
        this.namaBarang = namaBarang;
    }

    public LocalDate getTanggal() {
        return tanggal;
    }

    public void setTanggal(LocalDate tanggal) {
        this.tanggal = tanggal;
    }

    public String getKeterangan() {
        return keterangan;
    }

    public void setKeterangan(String keterangan) {
        this.keterangan = keterangan;
    }

    public String getNamaPemilik() {
        return namaPemilik;
    }

    public void setNamaPemilik(String namaPemilik) {
        this.namaPemilik = namaPemilik;
    }

    public String getLokasi() {
        return lokasi;
    }

    public void setLokasi(String lokasi) {
        this.lokasi = lokasi;
    }

    public String getNoHandphone() {
        return noHandphone;
    }

    public void setNoHandphone(String noHandphone) {
        this.noHandphone = noHandphone;
    }

<<<<<<< HEAD
=======
    public String getKategori() {
        return kategori;
    }

    public void setKategori(String kategori) {
        this.kategori = kategori;
    }

>>>>>>> devendev
    public String getGambarPath() {
        return gambarPath;
    }

    public void setGambarPath(String gambarPath) {
        this.gambarPath = gambarPath;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> devendev
