package IPPL.LostnFound.controller;

import IPPL.LostnFound.dto.ApiResponse;
import IPPL.LostnFound.dto.ItemReportDTO;
import IPPL.LostnFound.model.ItemReport;
import IPPL.LostnFound.model.User;
import IPPL.LostnFound.repository.ItemReportRepository;
import IPPL.LostnFound.repository.UserRepository;
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
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated() ||
                "anonymousUser".equalsIgnoreCase(String.valueOf(authentication.getPrincipal()))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Authorization token required"));
        }

        try {
            User user = userRepository.findByEmail(authentication.getName())
                    .orElse(null);

            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("User tidak ditemukan"));
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
