package IPPL.LostnFound.repository;

import IPPL.LostnFound.model.Barang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BarangRepository extends JpaRepository<Barang, Long> {
    List<Barang> findByStatusHilang(boolean statusHilang);
    List<Barang> findByKategori(String kategori);
    List<Barang> findByNamaContainingIgnoreCase(String nama);
    long countByStatusHilang(boolean statusHilang);
}