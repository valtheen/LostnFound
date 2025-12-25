package IPPL.LostnFound.controller;

<<<<<<< HEAD
=======
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

>>>>>>> devendev
import IPPL.LostnFound.dto.ApiResponse;
import IPPL.LostnFound.dto.ItemReportDTO;
import IPPL.LostnFound.model.ItemReport;
import IPPL.LostnFound.model.User;
import IPPL.LostnFound.repository.ItemReportRepository;
import IPPL.LostnFound.repository.UserRepository;
<<<<<<< HEAD
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pelaporan")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class PelaporanController {

    private final ItemReportRepository itemReportRepository;

    private final UserRepository userRepository;

    public PelaporanController(ItemReportRepository itemReportRepository, UserRepository userRepository) {
        this.itemReportRepository = itemReportRepository;
        this.userRepository = userRepository;
    }
=======

@RestController
@RequestMapping("/api/pelaporan")
@CrossOrigin(origins = "*")
public class PelaporanController {

    @Autowired
    private ItemReportRepository itemReportRepository;

    @Autowired
    private UserRepository userRepository;
>>>>>>> devendev

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping
    public ResponseEntity<ApiResponse> createReport(
            @RequestParam("namaBarang") String namaBarang,
            @RequestParam("tanggal") String tanggal,
            @RequestParam("keterangan") String keterangan,
            @RequestParam("namaPemilik") String namaPemilik,
            @RequestParam("lokasi") String lokasi,
            @RequestParam("noHandphone") String noHandphone,
<<<<<<< HEAD
            @RequestParam(value = "gambarBarang", required = false) MultipartFile gambarBarang,
            Authentication authentication) {

        try {
            User user = null;
            
            // Try to get user from authentication if available
            if (authentication != null && authentication.isAuthenticated() &&
                    !"anonymousUser".equalsIgnoreCase(String.valueOf(authentication.getPrincipal()))) {
                user = userRepository.findByEmail(authentication.getName())
                        .orElse(null);
=======
            @RequestParam(value = "kategori", required = false) String kategori,
            @RequestParam(value = "gambarBarang", required = false) MultipartFile gambarBarang,
            @RequestHeader(value = "Authorization", required = false) String token) {
        
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
>>>>>>> devendev
            }
            
            // Create new item report
            ItemReport itemReport = new ItemReport();
            itemReport.setNamaBarang(namaBarang);
            itemReport.setTanggal(LocalDate.parse(tanggal));
            itemReport.setKeterangan(keterangan);
            itemReport.setNamaPemilik(namaPemilik);
            itemReport.setLokasi(lokasi);
            itemReport.setNoHandphone(noHandphone);
<<<<<<< HEAD
            itemReport.setUser(user); // Can be null if user not authenticated
=======
            // Set kategori - ensure it's never null
            if (kategori != null && !kategori.trim().isEmpty()) {
                itemReport.setKategori(kategori.trim());
            } else {
                itemReport.setKategori("Umum");
            }
            itemReport.setUser(user);
>>>>>>> devendev
            
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
            ItemReportDTO responseDTO = convertToDTO(savedReport);
            
            return ResponseEntity.ok(ApiResponse.success("Report submitted successfully", responseDTO));
            
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("File upload failed: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Failed to create report: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllReports() {
        try {
            List<ItemReport> reports = itemReportRepository.findAllOrderByTanggalDesc();
            List<ItemReportDTO> reportDTOs = reports.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(ApiResponse.success("Reports fetched successfully", reportDTOs));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Failed to fetch reports: " + e.getMessage()));
        }
    }

<<<<<<< HEAD
=======
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Long totalItems = itemReportRepository.countAllItems();
            Long lostItems = itemReportRepository.countLostItems();
            Long foundItems = itemReportRepository.countFoundItems();
            
            Map<String, Long> stats = new HashMap<>();
            stats.put("totalItems", totalItems != null ? totalItems : 0L);
            stats.put("lostItems", lostItems != null ? lostItems : 0L);
            stats.put("foundItems", foundItems != null ? foundItems : 0L);
            stats.put("totalReports", totalItems != null ? totalItems : 0L);
            
            response.put("success", true);
            response.put("data", stats);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to fetch stats: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/recent")
    public ResponseEntity<ApiResponse> getRecentReports(@RequestParam(defaultValue = "5") int limit) {
        try {
            List<ItemReport> reports = itemReportRepository.findAllOrderByTanggalDesc();
            // Since list is now ASC (oldest first), get the last N items (most recent)
            int startIndex = Math.max(0, reports.size() - limit);
            List<ItemReport> recentReports = reports.subList(startIndex, reports.size());
            
            List<ItemReportDTO> reportDTOs = recentReports.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(ApiResponse.success("Recent reports fetched successfully", reportDTOs));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Failed to fetch recent reports: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateReport(
            @PathVariable Long id,
            @RequestBody Map<String, Object> request,
            @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            Optional<ItemReport> reportOpt = itemReportRepository.findById(id);
            if (reportOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Report not found"));
            }
            
            ItemReport report = reportOpt.get();
            
            // Check if user has permission to edit (owner or admin)
            User user = getUserFromToken(token);
            if (!canModifyReport(report, user)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error("You don't have permission to edit this report"));
            }
            
            // Update fields
            if (request.containsKey("namaBarang")) {
                report.setNamaBarang((String) request.get("namaBarang"));
            }
            if (request.containsKey("tanggal")) {
                report.setTanggal(LocalDate.parse((String) request.get("tanggal")));
            }
            if (request.containsKey("keterangan")) {
                report.setKeterangan((String) request.get("keterangan"));
            }
            if (request.containsKey("namaPemilik")) {
                report.setNamaPemilik((String) request.get("namaPemilik"));
            }
            if (request.containsKey("lokasi")) {
                report.setLokasi((String) request.get("lokasi"));
            }
            if (request.containsKey("noHandphone")) {
                report.setNoHandphone((String) request.get("noHandphone"));
            }
            if (request.containsKey("kategori")) {
                String kategoriValue = (String) request.get("kategori");
                if (kategoriValue != null && !kategoriValue.trim().isEmpty()) {
                    report.setKategori(kategoriValue.trim());
                } else {
                    report.setKategori("Umum");
                }
            }
            
            ItemReport updatedReport = itemReportRepository.save(report);
            ItemReportDTO responseDTO = convertToDTO(updatedReport);
            
            return ResponseEntity.ok(ApiResponse.success("Report updated successfully", responseDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Failed to update report: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteReport(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            Optional<ItemReport> reportOpt = itemReportRepository.findById(id);
            if (reportOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Report not found"));
            }
            
            ItemReport report = reportOpt.get();
            
            // Only admin can delete reports
            User user = getUserFromToken(token);
            if (user == null || !"ADMIN".equals(user.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error("Only administrators can delete reports"));
            }
            
            // Delete associated image file if exists
            if (report.getGambarPath() != null && !report.getGambarPath().isEmpty()) {
                try {
                    Path filePath = Paths.get(UPLOAD_DIR + report.getGambarPath());
                    if (Files.exists(filePath)) {
                        Files.delete(filePath);
                    }
                } catch (IOException e) {
                    // Log error but continue with deletion
                    System.err.println("Failed to delete image file: " + e.getMessage());
                }
            }
            
            itemReportRepository.deleteById(id);
            return ResponseEntity.ok(ApiResponse.success("Report deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Failed to delete report: " + e.getMessage()));
        }
    }

    @DeleteMapping("/bulk")
    public ResponseEntity<ApiResponse> deleteReports(
            @RequestBody Map<String, List<Long>> request,
            @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            List<Long> ids = request.get("ids");
            if (ids == null || ids.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("No IDs provided"));
            }
            
            User user = getUserFromToken(token);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Authentication required"));
            }
            
            // Only admin can delete reports
            if (!"ADMIN".equals(user.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error("Only administrators can delete reports"));
            }
            
            List<ItemReport> reports = itemReportRepository.findAllById(ids);
            
            // Delete associated image files
            for (ItemReport report : reports) {
                if (report.getGambarPath() != null && !report.getGambarPath().isEmpty()) {
                    try {
                        Path filePath = Paths.get(UPLOAD_DIR + report.getGambarPath());
                        if (Files.exists(filePath)) {
                            Files.delete(filePath);
                        }
                    } catch (IOException e) {
                        System.err.println("Failed to delete image file: " + e.getMessage());
                    }
                }
            }
            
            // Delete all reports
            itemReportRepository.deleteAll(reports);
            return ResponseEntity.ok(ApiResponse.success("Reports deleted successfully", null));
        } catch (Exception e) {
            System.err.println("Error deleting reports: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Failed to delete reports: " + e.getMessage()));
        }
    }

    // Helper method to get user from token
    private User getUserFromToken(String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return null;
        }
        try {
            String userIdStr = token.replace("Bearer jwt-token-", "");
            Long userId = Long.parseLong(userIdStr);
            Optional<User> userOpt = userRepository.findById(userId);
            return userOpt.orElse(null);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    // Helper method to check if user can modify report (owner or admin)
    private boolean canModifyReport(ItemReport report, User user) {
        if (user == null) {
            return false;
        }
        // Admin can modify any report
        if ("ADMIN".equals(user.getRole())) {
            return true;
        }
        // User can only modify their own reports
        if (report.getUser() != null && report.getUser().getId().equals(user.getId())) {
            return true;
        }
        return false;
    }

>>>>>>> devendev
    // Helper method to convert Entity to DTO
    private ItemReportDTO convertToDTO(ItemReport itemReport) {
        ItemReportDTO dto = new ItemReportDTO();
        dto.setId(itemReport.getId());
        dto.setNamaBarang(itemReport.getNamaBarang());
        dto.setTanggal(itemReport.getTanggal());
        dto.setKeterangan(itemReport.getKeterangan());
        dto.setNamaPemilik(itemReport.getNamaPemilik());
        dto.setLokasi(itemReport.getLokasi());
        dto.setNoHandphone(itemReport.getNoHandphone());
<<<<<<< HEAD
=======
        // Ensure kategori is never null in DTO
        String kategori = itemReport.getKategori();
        dto.setKategori(kategori != null && !kategori.trim().isEmpty() ? kategori : "Umum");
>>>>>>> devendev
        dto.setGambarPath(itemReport.getGambarPath());
        
        if (itemReport.getUser() != null) {
            dto.setUserId(itemReport.getUser().getId());
            dto.setUserEmail(itemReport.getUser().getEmail());
        }
        
        return dto;
    }
}
