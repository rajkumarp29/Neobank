package com.infy.neobank.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infy.neobank.dto.LoanApplicationRequestDTO;
import com.infy.neobank.entity.LoanApplication;
import com.infy.neobank.entity.LoanProduct;
import com.infy.neobank.entity.LoanStatus;
import com.infy.neobank.repository.LoanApplicationRepository;
import com.infy.neobank.repository.LoanProductRepository;

@Service
public class LoanApplicationService {

    @Autowired
    private LoanApplicationRepository appRepo;

    @Autowired
    private LoanProductRepository productRepo;

    // APPLY LOAN
    public String applyLoan(
            LoanApplicationRequestDTO dto,
            Long userId) {

        LoanProduct product =
                productRepo.findById(dto.getLoanProductId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Loan product not found"));

        // Validate amount
        if (dto.getRequestedAmount() < product.getMinAmount()
                || dto.getRequestedAmount() > product.getMaxAmount()) {

            throw new RuntimeException(
                    "Amount not within allowed range");
        }

        LoanApplication app =
                new LoanApplication();

        app.setUserId(userId);
        app.setLoanProductId(
                dto.getLoanProductId());

        app.setRequestedAmount(
                dto.getRequestedAmount());

        app.setRequestedTenureMonths(
                dto.getRequestedTenureMonths());

        app.setStatus(
                LoanStatus.PENDING);

        appRepo.save(app);

        return "Loan applied successfully";
    }

    // MY LOANS
    public List<LoanApplication> getMyLoans(
            Long userId) {

        return appRepo.findByUserId(
                userId);
    }
}