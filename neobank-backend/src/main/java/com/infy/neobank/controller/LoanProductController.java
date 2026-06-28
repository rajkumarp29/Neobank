package com.infy.neobank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.infy.neobank.dto.LoanProductDTO;
import com.infy.neobank.service.LoanProductService;

@RestController
@RequestMapping("/api/loans/products")
public class LoanProductController {

    @Autowired
    private LoanProductService service;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LoanProductDTO> create(@RequestBody LoanProductDTO dto) {
        return ResponseEntity.status(201).body(service.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<LoanProductDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
}