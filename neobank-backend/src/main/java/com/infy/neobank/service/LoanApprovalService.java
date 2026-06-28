package com.infy.neobank.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infy.neobank.dto.LoanAccountDTO;
import com.infy.neobank.entity.*;
import com.infy.neobank.repository.*;

import jakarta.transaction.Transactional;

@Service
public class LoanApprovalService {

    @Autowired
    private LoanApplicationRepository appRepo;

    @Autowired
    private LoanProductRepository productRepo;

    @Autowired
    private LoanAccountService accountService;

    @Autowired
    private LoanAccountRepository accountRepo;

    @Autowired
    private RepaymentScheduleService repaymentService;

    // ✅ ✅ APPROVE LOAN (FINAL VERSION)
    @Transactional
    public String approveLoan(Long applicationId) {

        // ✅ Fetch application
        LoanApplication app = appRepo.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        // ✅ Update status
        app.setStatus(LoanStatus.APPROVED);
        app.setDecidedAt(LocalDateTime.now());
        appRepo.save(app);

        // ✅ Create Loan Account (EMI calculated inside)
        LoanAccountDTO dto = accountService.createAccount(app);

        // ✅ Fetch saved account (to generate schedule)
        LoanAccount account = accountRepo
                .findByLoanApplicationId(app.getId())
                .orElseThrow(() -> new RuntimeException("Loan account not found"));

        // ✅ Generate EMI schedule
        repaymentService.generateSchedule(account);

        return "✅ Loan Approved, Account Created & Schedule Generated";
    }

    // ✅ ✅ REJECT LOAN
    public String rejectLoan(Long id) {

        LoanApplication app = appRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        app.setStatus(LoanStatus.REJECTED);
        app.setDecidedAt(LocalDateTime.now());

        appRepo.save(app);

        return "❌ Loan Rejected";
    }
}