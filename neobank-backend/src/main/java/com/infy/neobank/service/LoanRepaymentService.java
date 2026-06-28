package com.infy.neobank.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.infy.neobank.dto.RepaymentScheduleDTO;
import com.infy.neobank.entity.LoanAccount;
import com.infy.neobank.entity.LoanRepayment;
import com.infy.neobank.entity.PaymentStatus;
import com.infy.neobank.repository.LoanAccountRepository;
import com.infy.neobank.repository.LoanRepaymentRepository;
import com.infy.neobank.security.CustomUserDetails;

@Service
public class LoanRepaymentService {

    @Autowired
    private LoanAccountRepository accountRepo;

    @Autowired
    private LoanRepaymentRepository repaymentRepo;

    /* =====================================================
       ✅ GET REPAYMENT SCHEDULE
    ===================================================== */
    public List<RepaymentScheduleDTO> getSchedule(Long loanAccountId, String status) {

        // ✅ Get loan account
        LoanAccount account = accountRepo.findById(loanAccountId)
                .orElseThrow(() -> new RuntimeException("Loan account not found"));

        // ✅ Get logged-in user (CORRECT FIX)
        CustomUserDetails userDetails =
                (CustomUserDetails) SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getPrincipal();

        Long loggedInUserId = userDetails.getUserId();

        // ✅ Validate user owns this loan
        if (!account.getUserId().equals(loggedInUserId)) {
            throw new RuntimeException("Forbidden");
        }

        // ✅ Update overdue status before returning
        updateOverdueStatus(loanAccountId);

        List<LoanRepayment> repayments;

        // ✅ Optional filter by status
        if (status != null) {
            repayments = repaymentRepo
                    .findByLoanAccountIdAndPaymentStatusOrderByInstalmentNumberAsc(
                            loanAccountId,
                            PaymentStatus.valueOf(status.toUpperCase())
                    );
        } else {
            repayments = repaymentRepo
                    .findByLoanAccountIdOrderByInstalmentNumberAsc(loanAccountId);
        }

        // ✅ Convert to DTO
        return repayments.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /* =====================================================
       ✅ UPDATE OVERDUE STATUS
    ===================================================== */
    private void updateOverdueStatus(Long loanAccountId) {

        List<LoanRepayment> list =
                repaymentRepo.findByLoanAccountIdOrderByInstalmentNumberAsc(loanAccountId);

        LocalDate today = LocalDate.now();

        for (LoanRepayment r : list) {
            if (r.getPaymentStatus() == PaymentStatus.PENDING &&
                r.getDueDate().isBefore(today)) {

                r.setPaymentStatus(PaymentStatus.OVERDUE);
                repaymentRepo.save(r);
            }
        }
    }

    /* =====================================================
       ✅ PAY EMI
    ===================================================== */
    public void markAsPaid(Long repaymentId, Long loanAccountId) {

        LoanRepayment repayment = repaymentRepo.findById(repaymentId)
                .orElseThrow(() -> new RuntimeException("Repayment not found"));

        // ✅ Validate repayment belongs to account
        if (!repayment.getLoanAccountId().equals(loanAccountId)) {
            throw new RuntimeException("Invalid account");
        }

        // ✅ Update status
        repayment.setPaymentStatus(PaymentStatus.PAID);
        repayment.setPaidAt(java.time.LocalDateTime.now());

        repaymentRepo.save(repayment);
    }

    /* =====================================================
       ✅ ENTITY → DTO MAPPING
    ===================================================== */
    private RepaymentScheduleDTO mapToDTO(LoanRepayment r) {

        RepaymentScheduleDTO dto = new RepaymentScheduleDTO();

        dto.setId(r.getId());
        dto.setInstallmentNumber(r.getInstalmentNumber());
        dto.setEmiAmount(r.getEmiAmount());
        dto.setPrincipalComponent(r.getPrincipalComponent());
        dto.setInterestComponent(r.getInterestComponent());
        dto.setDueDate(r.getDueDate());
        dto.setStatus(r.getPaymentStatus());

        return dto;
    }
}