package com.infy.neobank.controller;

import com.infy.neobank.dto.BillRequestDTO;
import com.infy.neobank.dto.BillResponseDTO;
import com.infy.neobank.entity.BillStatus;
import com.infy.neobank.service.BillService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bills")
public class BillController {

    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    /* =========================
       POST /api/bills
    ========================= */
    @PostMapping
    public ResponseEntity<BillResponseDTO> createBill(
            @RequestBody BillRequestDTO request
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(billService.createBill(request));
    }

    /* =========================
       PATCH /api/bills/{id}/status
    ========================= */
    @PatchMapping("/{id}/status")
    public ResponseEntity<BillResponseDTO> updateStatus(
            @PathVariable Long id,
            @RequestParam BillStatus status
    ) {
        return ResponseEntity.ok(
                billService.updateStatus(id, status)
        );
    }

    /* =========================
       GET /api/bills
    ========================= */
    @GetMapping
    public ResponseEntity<List<BillResponseDTO>> getBills() {
        return ResponseEntity.ok(
                billService.getBills()
        );
    }
}