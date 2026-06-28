package com.infy.neobank.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.infy.neobank.entity.LoanRepayment;
import com.infy.neobank.entity.PaymentStatus;

import java.util.List;

public interface LoanRepaymentRepository extends JpaRepository<LoanRepayment, Long> {

    List<LoanRepayment> findByLoanAccountIdOrderByInstalmentNumberAsc(Long loanAccountId);

    List<LoanRepayment> findByLoanAccountIdAndPaymentStatusOrderByInstalmentNumberAsc(
            Long loanAccountId, PaymentStatus status);
}
