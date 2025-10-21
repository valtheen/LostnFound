package IPPL.LostnFound.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pelaporan {

    @Id
    private String idLaporan;

    @ManyToOne
    @JoinColumn(name = "idBarang")
    private Barang barang;

    @ManyToOne
    @JoinColumn(name = "idPelapor")
    private User pelapor;

    private Date tanggalLapor;
    private String deskripsiLaporan;
    private String status; // "Diproses", "Selesai"
}
