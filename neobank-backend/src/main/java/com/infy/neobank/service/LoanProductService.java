package com.infy.neobank.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.infy.neobank.dto.LoanProductDTO;
import com.infy.neobank.entity.LoanProduct;
import com.infy.neobank.repository.LoanProductRepository;

@Service
public class LoanProductService {

    @Autowired
    private LoanProductRepository repo;

    // ✅ CREATE
    public LoanProductDTO create(LoanProductDTO dto) {

        String role = SecurityContextHolder.getContext()
                .getAuthentication().getAuthorities().toString();

        if (!role.contains("ADMIN")) {
            throw new RuntimeException("Only ADMIN can create loan products");
        }

        // ✅ VALIDATIONS
        if (dto.getMinAmount() <= 0) {
            throw new RuntimeException("Min amount must be > 0");
        }

        if (dto.getMaxAmount() <= dto.getMinAmount()) {
            throw new RuntimeException("Max must be greater than Min");
        }

        if (dto.getAnnualInterestRate() <= 0) {
            throw new RuntimeException("Interest must be > 0");
        }

        // ✅ MAP DTO → ENTITY
        LoanProduct product = new LoanProduct();
        product.setProductName(dto.getProductName());
        product.setLoanType(dto.getLoanType());          // ✅ FIX
        product.setMinAmount(dto.getMinAmount());
        product.setMaxAmount(dto.getMaxAmount());
        product.setAnnualInterestRate(dto.getAnnualInterestRate());
        product.setAllowedTenures(dto.getAllowedTenures());

        LoanProduct saved = repo.save(product);

        dto.setId(saved.getId());
        return dto;
    }

    // ✅ GET ALL
    public List<LoanProductDTO> getAll() {

        return repo.findAll().stream().map(p -> {
            LoanProductDTO dto = new LoanProductDTO();

            dto.setId(p.getId());
            dto.setProductName(p.getProductName());
            dto.setLoanType(p.getLoanType());           // ✅ FIX
            dto.setMinAmount(p.getMinAmount());
            dto.setMaxAmount(p.getMaxAmount());
            dto.setAnnualInterestRate(p.getAnnualInterestRate());
            dto.setAllowedTenures(p.getAllowedTenures());

            return dto;

        }).collect(Collectors.toList());
    }
}