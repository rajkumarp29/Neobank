package com.infy.neobank.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.infy.neobank.entity.LoanApplication;
import com.infy.neobank.entity.LoanStatus;
import com.infy.neobank.repository.LoanApplicationRepository;
import com.infy.neobank.service.LoanApprovalService;

@RestController
@RequestMapping("/api/admin/loans")
public class LoanApprovalController {

    @Autowired
    private LoanApplicationRepository repo;

    @Autowired
    private LoanApprovalService service;

    // ✅ ✅ UPDATED: Get Pending Applications (FIXED 🔥)
    @GetMapping("/pending")
    public List<Map<String, Object>> getPending() {

        List<LoanApplication> loans = repo.findByStatus(LoanStatus.PENDING);

        return loans.stream().map(loan -> {
            Map<String, Object> m = new HashMap<>();

            m.put("id", loan.getId());
            m.put("userId", loan.getUserId());
            m.put("loanProductId", loan.getLoanProductId());
            m.put("amount", loan.getRequestedAmount());
            m.put("tenureMonths", loan.getRequestedTenureMonths());
            m.put("status", loan.getStatus());

            // ✅ ✅ CRITICAL FIX (Applied Date)
            m.put("appliedAt", loan.getAppliedAt());

            return m;
        }).toList();
    }

    // ✅ GET ALL LOANS
    @GetMapping("/all")
    public List<LoanApplication> getAllLoans() {
        return repo.findAll();
    }

    // ✅ Approve Loan
    @PostMapping("/{id}/approve")
    public String approve(@PathVariable Long id) {
        return service.approveLoan(id);
    }

    // ✅ Reject Loan
    @PostMapping("/{id}/reject")
    public String reject(@PathVariable Long id) {
        return service.rejectLoan(id);
    }
}