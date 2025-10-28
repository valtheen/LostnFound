package com.lostnfound.repository;

import com.lostnfound.model.Barang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarangRepository extends JpaRepository<Barang, String> {
    Barang findByNamaBarang(String namaBarang);
}
