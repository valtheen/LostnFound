package IPPL.LostnFound.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String idUser;

    private String nama;
    private String email;
    private String noHP;
    private String password;

    @OneToMany(mappedBy = "pelapor", cascade = CascadeType.ALL)
    private List<Barang> daftarBarang;

    @OneToMany(mappedBy = "penerima", cascade = CascadeType.ALL)
    private List<Notifikasi> notifikasiList;
}
