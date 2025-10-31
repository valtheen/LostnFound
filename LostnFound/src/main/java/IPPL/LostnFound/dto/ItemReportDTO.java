package IPPL.LostnFound.dto;

import java.time.LocalDate;

public class ItemReportDTO {
    private Long id;
    private String namaBarang;
    private LocalDate tanggal;
    private String keterangan; // "Hilang" or "Ditemukan"
    private String namaPemilik;
    private String lokasi;
    private String noHandphone;
    private String gambarPath;
    private Long userId;
    private String userEmail; // For display purposes

    // Constructors
    public ItemReportDTO() {
    }

    public ItemReportDTO(Long id, String namaBarang, LocalDate tanggal, String keterangan, 
                        String namaPemilik, String lokasi, String noHandphone, String gambarPath, 
                        Long userId, String userEmail) {
        this.id = id;
        this.namaBarang = namaBarang;
        this.tanggal = tanggal;
        this.keterangan = keterangan;
        this.namaPemilik = namaPemilik;
        this.lokasi = lokasi;
        this.noHandphone = noHandphone;
        this.gambarPath = gambarPath;
        this.userId = userId;
        this.userEmail = userEmail;
    }

    // Getters and Setters
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

    public String getGambarPath() {
        return gambarPath;
    }

    public void setGambarPath(String gambarPath) {
        this.gambarPath = gambarPath;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
