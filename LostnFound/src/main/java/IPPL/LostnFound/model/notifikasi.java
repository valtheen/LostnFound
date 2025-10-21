package IPPL.LostnFound.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notifikasi {

    @Id
    private String idNotifikasi;

    private String pesan;
    private boolean terbaca;
    private Date tanggal;

    @ManyToOne
    @JoinColumn(name = "idPenerima")
    private User penerima;
}
