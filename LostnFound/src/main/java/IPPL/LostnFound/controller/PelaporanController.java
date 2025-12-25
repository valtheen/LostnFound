package IPPL.LostnFound.controller;

import IPPL.LostnFound.dto.ApiResponse;
import IPPL.LostnFound.dto.ItemReportDTO;
import IPPL.LostnFound.model.ItemReport;
import IPPL.LostnFound.model.User;
import IPPL.LostnFound.repository.ItemReportRepository;
import IPPL.LostnFound.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pelaporan")
@CrossOrigin(origins = "*")
public class PelaporanController {

    @Autowired
    private ItemReportRepository itemReportRepository;

    @Autowired
    private UserRepository userRepository;

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping
    public ResponseEntity<ApiResponse> createReport(
            @RequestParam("namaBarang") String namaBarang,
            @RequestParam("tanggal") String tanggal,
            @RequestParam("keterangan") String keterangan,
            @RequestParam("namaPemilik") String namaPemilik,
            @RequestParam("lokasi") String lokasi,
            @RequestParam("noHandphone") String noHandphone,
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

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse> getStats() {
        try {
            long totalItems = itemReportRepository.countAllItems();
            long lostItems = itemReportRepository.countLostItems();
            long foundItems = itemReportRepository.countFoundItems();
            
            java.util.Map<String, Long> stats = new java.util.HashMap<>();
            stats.put("totalItems", totalItems);
            stats.put("lostItems", lostItems);
            stats.put("foundItems", foundItems);
            stats.put("totalReports", totalItems);
            
            return ResponseEntity.ok(ApiResponse.success("Stats fetched successfully", stats));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Failed to fetch stats: " + e.getMessage()));
        }
    }

    @GetMapping("/recent")
    public ResponseEntity<ApiResponse> getRecentReports(@RequestParam(defaultValue = "5") int limit) {
        try {
            List<ItemReport> allReports = itemReportRepository.findAllOrderByTanggalDesc();
            List<ItemReport> recentReports = allReports.stream()
                .limit(limit)
                .collect(java.util.stream.Collectors.toList());
            
            List<ItemReportDTO> reportDTOs = recentReports.stream()
                .map(this::convertToDTO)
                .collect(java.util.stream.Collectors.toList());
            
            return ResponseEntity.ok(ApiResponse.success("Recent reports fetched successfully", reportDTOs));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Failed to fetch recent reports: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getReportById(@PathVariable Long id) {
        try {
            Optional<ItemReport> reportOpt = itemReportRepository.findById(id);
            if (reportOpt.isPresent()) {
                ItemReportDTO reportDTO = convertToDTO(reportOpt.get());
                return ResponseEntity.ok(ApiResponse.success("Report fetched successfully", reportDTO));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Report not found"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Failed to fetch report: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateReport(
            @PathVariable Long id,
            @RequestParam(value = "namaBarang", required = false) String namaBarang,
            @RequestParam(value = "tanggal", required = false) String tanggal,
            @RequestParam(value = "keterangan", required = false) String keterangan,
            @RequestParam(value = "namaPemilik", required = false) String namaPemilik,
            @RequestParam(value = "lokasi", required = false) String lokasi,
            @RequestParam(value = "noHandphone", required = false) String noHandphone,
            @RequestParam(value = "gambarBarang", required = false) MultipartFile gambarBarang,
            @RequestHeader(value = "Authorization", required = false) String token) {
        
        try {
            Optional<ItemReport> reportOpt = itemReportRepository.findById(id);
            if (!reportOpt.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Report not found"));
            }
            
            ItemReport itemReport = reportOpt.get();
            
            // Update fields if provided
            if (namaBarang != null && !namaBarang.isEmpty()) {
                itemReport.setNamaBarang(namaBarang);
            }
            if (tanggal != null && !tanggal.isEmpty()) {
                itemReport.setTanggal(LocalDate.parse(tanggal));
            }
            if (keterangan != null && !keterangan.isEmpty()) {
                itemReport.setKeterangan(keterangan);
            }
            if (namaPemilik != null && !namaPemilik.isEmpty()) {
                itemReport.setNamaPemilik(namaPemilik);
            }
            if (lokasi != null && !lokasi.isEmpty()) {
                itemReport.setLokasi(lokasi);
            }
            if (noHandphone != null && !noHandphone.isEmpty()) {
                itemReport.setNoHandphone(noHandphone);
            }
            
            // Handle file upload if provided
            if (gambarBarang != null && !gambarBarang.isEmpty()) {
                // Delete old file if exists
                if (itemReport.getGambarPath() != null) {
                    try {
                        Path oldFilePath = Paths.get(UPLOAD_DIR + itemReport.getGambarPath());
                        if (Files.exists(oldFilePath)) {
                            Files.delete(oldFilePath);
                        }
                    } catch (IOException e) {
                        // Log but continue
                        System.err.println("Failed to delete old file: " + e.getMessage());
                    }
                }
                
                // Save new file
                String fileName = UUID.randomUUID().toString() + "_" + gambarBarang.getOriginalFilename();
                Path uploadPath = Paths.get(UPLOAD_DIR);
                
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(gambarBarang.getInputStream(), filePath);
                itemReport.setGambarPath(fileName);
            }
            
            ItemReport updatedReport = itemReportRepository.save(itemReport);
            ItemReportDTO responseDTO = convertToDTO(updatedReport);
            
            return ResponseEntity.ok(ApiResponse.success("Report updated successfully", responseDTO));
            
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("File upload failed: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Failed to update report: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteReport(@PathVariable Long id) {
        try {
            Optional<ItemReport> reportOpt = itemReportRepository.findById(id);
            if (!reportOpt.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Report not found"));
            }
            
            ItemReport itemReport = reportOpt.get();
            
            // Delete associated file if exists
            if (itemReport.getGambarPath() != null) {
                try {
                    Path filePath = Paths.get(UPLOAD_DIR + itemReport.getGambarPath());
                    if (Files.exists(filePath)) {
                        Files.delete(filePath);
                    }
                } catch (IOException e) {
                    // Log but continue with deletion
                    System.err.println("Failed to delete file: " + e.getMessage());
                }
            }
            
            itemReportRepository.deleteById(id);
            
            return ResponseEntity.ok(ApiResponse.success("Report deleted successfully", null));
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Failed to delete report: " + e.getMessage()));
        }
    }

    @GetMapping(value = "/file/{filename:.+}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists() && resource.isReadable()) {
                String contentType = "application/octet-stream";
                try {
                    contentType = Files.probeContentType(filePath);
                    if (contentType == null) {
                        contentType = "application/octet-stream";
                    }
                } catch (IOException e) {
                    // Use default content type
                }
                
                return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.notFound().build();
        }
    }

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
        dto.setGambarPath(itemReport.getGambarPath());
        
        if (itemReport.getUser() != null) {
            dto.setUserId(itemReport.getUser().getId());
            dto.setUserEmail(itemReport.getUser().getEmail());
        }
        
        return dto;
    }
}
