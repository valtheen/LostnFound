package IPPL.LostnFound.controller;

import IPPL.LostnFound.model.Barang;
import IPPL.LostnFound.services.BarangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/barang")
@CrossOrigin(origins = "*")
public class BarangController {

    @Autowired
    private BarangService barangService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllBarang() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Barang> barangList = barangService.getAllBarang();
            response.put("success", true);
            response.put("data", barangList);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to fetch barang: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getBarangById(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Optional<Barang> barang = barangService.getBarangById(id);
            if (barang.isPresent()) {
                response.put("success", true);
                response.put("data", barang.get());
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Barang not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to fetch barang: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/status/{statusHilang}")
    public ResponseEntity<Map<String, Object>> getBarangByStatus(@PathVariable boolean statusHilang) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Barang> barangList = barangService.getBarangByStatus(statusHilang);
            response.put("success", true);
            response.put("data", barangList);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to fetch barang: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchBarang(@RequestParam String keyword) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Barang> barangList = barangService.searchBarang(keyword);
            response.put("success", true);
            response.put("data", barangList);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to search barang: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createBarang(@RequestBody Barang barang) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Barang createdBarang = barangService.createBarang(barang);
            response.put("success", true);
            response.put("message", "Barang created successfully");
            response.put("data", createdBarang);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to create barang: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateBarang(@PathVariable Long id, @RequestBody Barang barangDetails) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Barang updatedBarang = barangService.updateBarang(id, barangDetails);
            if (updatedBarang != null) {
                response.put("success", true);
                response.put("message", "Barang updated successfully");
                response.put("data", updatedBarang);
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Barang not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to update barang: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteBarang(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            barangService.deleteBarang(id);
            response.put("success", true);
            response.put("message", "Barang deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to delete barang: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getBarangStats() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            long totalBarang = barangService.countBarang();
            long barangHilang = barangService.countBarangHilang();
            long barangDitemukan = barangService.countBarangDitemukan();
            
            Map<String, Long> stats = new HashMap<>();
            stats.put("total", totalBarang);
            stats.put("hilang", barangHilang);
            stats.put("ditemukan", barangDitemukan);
            
            response.put("success", true);
            response.put("data", stats);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to fetch stats: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}