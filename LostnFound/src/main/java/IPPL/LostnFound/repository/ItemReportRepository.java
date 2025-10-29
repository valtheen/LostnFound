package IPPL.LostnFound.repository;

import IPPL.LostnFound.model.ItemReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemReportRepository extends JpaRepository<ItemReport, Long> {
    
    List<ItemReport> findByKeterangan(String keterangan);
    
    List<ItemReport> findByNamaBarangContainingIgnoreCase(String namaBarang);
    
    List<ItemReport> findByLokasiContainingIgnoreCase(String lokasi);
    
    @Query("SELECT ir FROM ItemReport ir ORDER BY ir.tanggal DESC")
    List<ItemReport> findAllOrderByTanggalDesc();
    
    @Query("SELECT COUNT(ir) FROM ItemReport ir")
    Long countAllItems();
    
    @Query("SELECT COUNT(ir) FROM ItemReport ir WHERE ir.keterangan = 'Hilang'")
    Long countLostItems();
    
    @Query("SELECT COUNT(ir) FROM ItemReport ir WHERE ir.keterangan = 'Ditemukan'")
    Long countFoundItems();
}
