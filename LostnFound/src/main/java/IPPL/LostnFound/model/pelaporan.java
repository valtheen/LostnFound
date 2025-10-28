package IPPL.LostnFound.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.time.LocalDateTime;

@Entity
public class Pelaporan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "barang_id", nullable = false)
    private Barang barang;

    @ManyToOne
    @JoinColumn(name = "pelapor_id", nullable = false)
    private User pelapor;

    @Column(nullable = false)
    private LocalDateTime tanggalLaporan;

    @Column(columnDefinition = "TEXT")
    private String detailTambahan;

    public Pelaporan() {
    }

    public Pelaporan(Barang barang, User pelapor, LocalDateTime tanggalLaporan, String detailTambahan) {
        this.barang = barang;
        this.pelapor = pelapor;
        this.tanggalLaporan = tanggalLaporan;
        this.detailTambahan = detailTambahan;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Barang getBarang() {
        return barang;
    }

    public void setBarang(Barang barang) {
        this.barang = barang;
    }

    public User getPelapor() {
        return pelapor;
    }

    public void setPelapor(User pelapor) {
        this.pelapor = pelapor;
    }

    public LocalDateTime getTanggalLaporan() {
        return tanggalLaporan;
    }

    public void setTanggalLaporan(LocalDateTime tanggalLaporan) {
        this.tanggalLaporan = tanggalLaporan;
    }

    public String getDetailTambahan() {
        return detailTambahan;
    }

    public void setDetailTambahan(String detailTambahan) {
        this.detailTambahan = detailTambahan;
    }
}
