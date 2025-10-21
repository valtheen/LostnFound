package com.lostnfound.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
public class Barang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nama;

    @Column(nullable = false)
    private String kategori;

    @Column(columnDefinition = "TEXT")
    private String deskripsi;

    @Column(nullable = false)
    private boolean statusHilang;

    @Column(nullable = false)
    private String lokasiTerakhir;

    public Barang() {
    }

    public Barang(String nama, String kategori, String deskripsi, boolean statusHilang, String lokasiTerakhir) {
        this.nama = nama;
        this.kategori = kategori;
        this.deskripsi = deskripsi;
        this.statusHilang = statusHilang;
        this.lokasiTerakhir = lokasiTerakhir;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getKategori() {
        return kategori;
    }

    public void setKategori(String kategori) {
        this.kategori = kategori;
    }

    public String getDeskripsi() {
        return deskripsi;
    }

    public void setDeskripsi(String deskripsi) {
        this.deskripsi = deskripsi;
    }

    public boolean isStatusHilang() {
        return statusHilang;
    }

    public void setStatusHilang(boolean statusHilang) {
        this.statusHilang = statusHilang;
    }

    public String getLokasiTerakhir() {
        return lokasiTerakhir;
    }

    public void setLokasiTerakhir(String lokasiTerakhir) {
        this.lokasiTerakhir = lokasiTerakhir;
    }
}
