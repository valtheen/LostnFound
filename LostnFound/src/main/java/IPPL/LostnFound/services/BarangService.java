package IPPL.LostnFound.services;

import IPPL.LostnFound.model.Barang;
import IPPL.LostnFound.repository.BarangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BarangService {

    @Autowired
    private BarangRepository barangRepository;

    public List<Barang> getAllBarang() {
        return barangRepository.findAll();
    }

    public Optional<Barang> getBarangById(Long id) {
        return barangRepository.findById(id);
    }

    public List<Barang> getBarangByStatus(boolean statusHilang) {
        return barangRepository.findByStatusHilang(statusHilang);
    }

    public List<Barang> getBarangByKategori(String kategori) {
        return barangRepository.findByKategori(kategori);
    }

    public List<Barang> searchBarang(String keyword) {
        return barangRepository.findByNamaContainingIgnoreCase(keyword);
    }

    public Barang createBarang(Barang barang) {
        return barangRepository.save(barang);
    }

    public Barang updateBarang(Long id, Barang barangDetails) {
        Optional<Barang> barangOpt = barangRepository.findById(id);
        if (barangOpt.isPresent()) {
            Barang barang = barangOpt.get();
            barang.setNama(barangDetails.getNama());
            barang.setKategori(barangDetails.getKategori());
            barang.setDeskripsi(barangDetails.getDeskripsi());
            barang.setStatusHilang(barangDetails.isStatusHilang());
            barang.setLokasiTerakhir(barangDetails.getLokasiTerakhir());
            return barangRepository.save(barang);
        }
        return null;
    }

    public void deleteBarang(Long id) {
        barangRepository.deleteById(id);
    }

    public long countBarang() {
        return barangRepository.count();
    }

    public long countBarangHilang() {
        return barangRepository.countByStatusHilang(true);
    }

    public long countBarangDitemukan() {
        return barangRepository.countByStatusHilang(false);
    }
}
