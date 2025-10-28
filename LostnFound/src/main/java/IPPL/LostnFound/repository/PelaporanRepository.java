package IPPL.LostnFound.repository;

import IPPL.LostnFound.model.Pelaporan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PelaporanRepository extends JpaRepository<Pelaporan, Long> {
}
