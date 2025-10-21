package IPPL.LostnFound.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Barang {

    @Id
    private String idBarang;

    private String namaBarang;
    private String kategori;
    private String deskripsi;
    private String lokasiKehilangan;
    private String status; // "Hilang", "Ditemukan", "Selesai"
    private String imagePath;
    private Date tanggalKehilangan;

    @ManyToOne
    @JoinColumn(name = "idUser")
    private User pelapor;
}
