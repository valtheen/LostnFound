package IPPL.LostnFound.controller;

import IPPL.LostnFound.model.ItemReport;
import IPPL.LostnFound.repository.ItemReportRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/barang")
@CrossOrigin(origins = "http://localhost:3000")
public class BarangController {

    private final ItemReportRepository itemReportRepository;

    public BarangController(ItemReportRepository itemReportRepository) {
        this.itemReportRepository = itemReportRepository;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllItems() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<ItemReport> items = itemReportRepository.findAllOrderByTanggalDesc();
            response.put("success", true);
            response.put("data", items);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to fetch items: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Long totalItems = itemReportRepository.countAllItems();
            Long lostItems = itemReportRepository.countLostItems();
            Long foundItems = itemReportRepository.countFoundItems();
            
            response.put("success", true);
            response.put("totalItems", totalItems);
            response.put("lostItems", lostItems);
            response.put("foundItems", foundItems);
            response.put("totalReports", totalItems);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to fetch stats: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/recent")
    public ResponseEntity<Map<String, Object>> getRecentItems() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<ItemReport> recentItems = itemReportRepository.findAllOrderByTanggalDesc();
            // Limit to 5 most recent items
            if (recentItems.size() > 5) {
                recentItems = recentItems.subList(0, 5);
            }
            
            response.put("success", true);
            response.put("data", recentItems);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to fetch recent items: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchItems(@RequestParam String query) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<ItemReport> items = itemReportRepository.findByNamaBarangContainingIgnoreCase(query);
            response.put("success", true);
            response.put("data", items);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Search failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
