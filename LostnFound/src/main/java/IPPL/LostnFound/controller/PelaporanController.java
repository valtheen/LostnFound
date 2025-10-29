package IPPL.LostnFound.controller;

import IPPL.LostnFound.model.ItemReport;
import IPPL.LostnFound.model.User;
import IPPL.LostnFound.repository.ItemReportRepository;
import IPPL.LostnFound.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/pelaporan")
@CrossOrigin(origins = "http://localhost:3000")
public class PelaporanController {

    @Autowired
    private ItemReportRepository itemReportRepository;

    @Autowired
    private UserRepository userRepository;

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping
    public ResponseEntity<Map<String, Object>> createReport(
            @RequestParam("namaBarang") String namaBarang,
            @RequestParam("tanggal") String tanggal,
            @RequestParam("keterangan") String keterangan,
            @RequestParam("namaPemilik") String namaPemilik,
            @RequestParam("lokasi") String lokasi,
            @RequestParam("noHandphone") String noHandphone,
            @RequestParam(value = "gambarBarang", required = false) MultipartFile gambarBarang,
            @RequestHeader(value = "Authorization", required = false) String token) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Extract user ID from token
            Long userId = null;
            if (token != null && token.startsWith("Bearer ")) {
                try {
                    String userIdStr = token.replace("Bearer jwt-token-", "");
                    userId = Long.parseLong(userIdStr);
                } catch (NumberFormatException e) {
                    // Invalid token format, continue without user
                }
            }
            
            User user = null;
            if (userId != null) {
                Optional<User> userOpt = userRepository.findById(userId);
                user = userOpt.orElse(null);
            }
            
            // Create new item report
            ItemReport itemReport = new ItemReport();
            itemReport.setNamaBarang(namaBarang);
            itemReport.setTanggal(LocalDate.parse(tanggal));
            itemReport.setKeterangan(keterangan);
            itemReport.setNamaPemilik(namaPemilik);
            itemReport.setLokasi(lokasi);
            itemReport.setNoHandphone(noHandphone);
            itemReport.setUser(user);
            
            // Handle file upload
            if (gambarBarang != null && !gambarBarang.isEmpty()) {
                String fileName = UUID.randomUUID().toString() + "_" + gambarBarang.getOriginalFilename();
                Path uploadPath = Paths.get(UPLOAD_DIR);
                
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(gambarBarang.getInputStream(), filePath);
                itemReport.setGambarPath(fileName);
            }
            
            ItemReport savedReport = itemReportRepository.save(itemReport);
            
            response.put("success", true);
            response.put("message", "Report submitted successfully");
            response.put("data", Map.of(
                "id", savedReport.getId(),
                "namaBarang", savedReport.getNamaBarang(),
                "keterangan", savedReport.getKeterangan()
            ));
            
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            response.put("success", false);
            response.put("message", "File upload failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to create report: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllReports() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            var reports = itemReportRepository.findAllOrderByTanggalDesc();
            response.put("success", true);
            response.put("data", reports);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to fetch reports: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
