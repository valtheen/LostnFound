package IPPL.LostnFound.repository;

import IPPL.LostnFound.model.Barang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarangRepository extends JpaRepository<Barang, Long> {
    Barang findByNama(String nama);
}
 