package com.lostnfound.repository;

import com.lostnfound.model.Pelaporan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PelaporanRepository extends JpaRepository<Pelaporan, String> {
    // contoh custom query
    List<Pelaporan> findByStatus(String status);
}
