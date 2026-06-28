package com.infy.neobank.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infy.neobank.dto.LoanAccountDTO;
import com.infy.neobank.entity.LoanAccount;
import com.infy.neobank.entity.LoanApplication;
import com.infy.neobank.entity.LoanProduct;
import com.infy.neobank.repository.LoanAccountRepository;
import com.infy.neobank.repository.LoanProductRepository;

@Service
public class LoanAccountService {

    @Autowired
    private LoanAccountRepository accountRepo;

    @Autowired
    private LoanProductRepository productRepo;

    /* ============================================
       CREATE ACCOUNT AFTER APPROVAL
    ============================================ */
    public LoanAccountDTO createAccount(
            LoanApplication app) {

        // Prevent duplicate accounts
        if (accountRepo
                .findByLoanApplicationId(
                        app.getId())
                .isPresent()) {

            throw new RuntimeException(
                    "Loan account already exists");
        }

        // Get loan product
        LoanProduct product =
                productRepo
                        .findById(
                                app.getLoanProductId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Loan product not found"));

        LoanAccount account =
                new LoanAccount();

        account.setLoanApplicationId(
                app.getId());

        account.setUserId(
                app.getUserId());

        account.setPrincipalAmount(
                app.getRequestedAmount());

        // FIXED
        account.setAnnualInterestRate(
                product.getAnnualInterestRate());

        account.setTenureMonths(
                app.getRequestedTenureMonths());

        double emi =
                calculateEMI(
                        app.getRequestedAmount(),
                        product.getAnnualInterestRate(),
                        app.getRequestedTenureMonths());

        account.setEmiAmount(
                emi);

        LoanAccount saved =
                accountRepo.save(
                        account);

        return toDTO(saved);
    }

    /* ============================================
       GET MY ACCOUNTS
    ============================================ */
    public List<LoanAccountDTO> getMyAccounts(
            Long userId) {

        return accountRepo
                .findByUserId(userId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    /* ============================================
       ENTITY → DTO
    ============================================ */
    public LoanAccountDTO toDTO(
            LoanAccount account) {

        LoanAccountDTO dto =
                new LoanAccountDTO();

        dto.setId(
                account.getId());

        dto.setLoanApplicationId(
                account.getLoanApplicationId());

        dto.setUserId(
                account.getUserId());

        dto.setPrincipalAmount(
                account.getPrincipalAmount());

        dto.setAnnualInterestRate(
                account.getAnnualInterestRate());

        dto.setEmiAmount(
                account.getEmiAmount());

        dto.setTenureMonths(
                account.getTenureMonths());

        return dto;
    }

    /* ============================================
       EMI CALCULATION
    ============================================ */
    private Double calculateEMI(
            Double principal,
            Double annualRate,
            Integer months) {

        double r =
                annualRate / 12 / 100;

        double emi =
                (principal * r *
                        Math.pow(
                                1 + r,
                                months))
                        /
                        (Math.pow(
                                1 + r,
                                months)
                                - 1);

        return Math.round(
                emi * 100.0)
                / 100.0;
    }
}