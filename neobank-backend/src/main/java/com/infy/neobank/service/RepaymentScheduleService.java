package com.infy.neobank.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infy.neobank.entity.*;
import com.infy.neobank.repository.LoanRepaymentRepository;

import jakarta.transaction.Transactional;

@Service
public class RepaymentScheduleService {

    @Autowired
    private LoanRepaymentRepository repo;

    @Transactional
    public void generateSchedule(LoanAccount account) {

        double outstanding = account.getPrincipalAmount();
        double monthlyRate = account.getAnnualInterestRate() / 12 / 100;
        double emi = account.getEmiAmount();

        for (int i = 1; i <= account.getTenureMonths(); i++) {

            double interest = outstanding * monthlyRate;
            double principal = emi - interest;

            // ✅ FINAL INSTALLMENT ADJUSTMENT (IMPORTANT 🔥)
            if (i == account.getTenureMonths()) {
                principal = outstanding;
                interest = emi - principal;
            }

            outstanding -= principal;

            LoanRepayment repayment = new LoanRepayment();

            repayment.setLoanAccountId(account.getId());
            repayment.setInstalmentNumber(i);
            repayment.setEmiAmount(emi);
            repayment.setPrincipalComponent(principal);
            repayment.setInterestComponent(interest);

            repayment.setDueDate(
                    account.getDisbursedAt().toLocalDate().plusMonths(i)
            );

            repo.save(repayment);
        }
    }
}