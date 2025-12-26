package IPPL.LostnFound.repository;

<<<<<<< HEAD
import IPPL.LostnFound.model.ItemReport;
=======
import java.util.List;

>>>>>>> devendev
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

<<<<<<< HEAD
import java.util.List;
=======
import IPPL.LostnFound.model.ItemReport;
>>>>>>> devendev

@Repository
public interface ItemReportRepository extends JpaRepository<ItemReport, Long> {
    
    List<ItemReport> findByKeterangan(String keterangan);
    
    List<ItemReport> findByNamaBarangContainingIgnoreCase(String namaBarang);
    
    List<ItemReport> findByLokasiContainingIgnoreCase(String lokasi);
    
<<<<<<< HEAD
    @Query("SELECT ir FROM ItemReport ir ORDER BY ir.tanggal DESC")
=======
    @Query("SELECT ir FROM ItemReport ir ORDER BY ir.tanggal ASC, ir.id ASC")
>>>>>>> devendev
    List<ItemReport> findAllOrderByTanggalDesc();
    
    @Query("SELECT COUNT(ir) FROM ItemReport ir")
    Long countAllItems();
    
    @Query("SELECT COUNT(ir) FROM ItemReport ir WHERE ir.keterangan = 'Hilang'")
    Long countLostItems();
    
    @Query("SELECT COUNT(ir) FROM ItemReport ir WHERE ir.keterangan = 'Ditemukan'")
    Long countFoundItems();
}
