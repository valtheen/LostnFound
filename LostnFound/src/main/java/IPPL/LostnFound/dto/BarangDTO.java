package IPPL.LostnFound.dto;

import java.time.LocalDateTime;

public class BarangDTO {
    private Long id;
    private String namaBarang;
    private String deskripsi;
    private String kategori;
    private String status; // "Hilang" or "Ditemukan"
    private String lokasi;
    private LocalDateTime tanggalHilang;
    private LocalDateTime tanggalDitemukan;
    private String gambarPath;
    private Long pemilikId;
    private String pemilikEmail;

    // Constructors
    public BarangDTO() {
    }

    public BarangDTO(Long id, String namaBarang, String deskripsi, String kategori, 
                    String status, String lokasi, LocalDateTime tanggalHilang, 
                    LocalDateTime tanggalDitemukan, String gambarPath, Long pemilikId, String pemilikEmail) {
        this.id = id;
        this.namaBarang = namaBarang;
        this.deskripsi = deskripsi;
        this.kategori = kategori;
        this.status = status;
        this.lokasi = lokasi;
        this.tanggalHilang = tanggalHilang;
        this.tanggalDitemukan = tanggalDitemukan;
        this.gambarPath = gambarPath;
        this.pemilikId = pemilikId;
        this.pemilikEmail = pemilikEmail;
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

    public String getDeskripsi() {
        return deskripsi;
    }

    public void setDeskripsi(String deskripsi) {
        this.deskripsi = deskripsi;
    }

    public String getKategori() {
        return kategori;
    }

    public void setKategori(String kategori) {
        this.kategori = kategori;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLokasi() {
        return lokasi;
    }

    public void setLokasi(String lokasi) {
        this.lokasi = lokasi;
    }

    public LocalDateTime getTanggalHilang() {
        return tanggalHilang;
    }

    public void setTanggalHilang(LocalDateTime tanggalHilang) {
        this.tanggalHilang = tanggalHilang;
    }

    public LocalDateTime getTanggalDitemukan() {
        return tanggalDitemukan;
    }

    public void setTanggalDitemukan(LocalDateTime tanggalDitemukan) {
        this.tanggalDitemukan = tanggalDitemukan;
    }

    public String getGambarPath() {
        return gambarPath;
    }

    public void setGambarPath(String gambarPath) {
        this.gambarPath = gambarPath;
    }

    public Long getPemilikId() {
        return pemilikId;
    }

    public void setPemilikId(Long pemilikId) {
        this.pemilikId = pemilikId;
    }

    public String getPemilikEmail() {
        return pemilikEmail;
    }

    public void setPemilikEmail(String pemilikEmail) {
        this.pemilikEmail = pemilikEmail;
    }
}
