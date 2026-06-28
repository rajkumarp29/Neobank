package com.infy.neobank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.infy.neobank.dto.RepaymentScheduleDTO;
import com.infy.neobank.service.LoanRepaymentService;

@RestController
@RequestMapping("/api/loans")
public class LoanRepaymentController {

    @Autowired
    private LoanRepaymentService service;

    // ✅ GET SCHEDULE
    @GetMapping("/{loanAccountId}/repayments")
    public List<RepaymentScheduleDTO> getSchedule(
            @PathVariable Long loanAccountId,
            @RequestParam(required = false) String status) {

        return service.getSchedule(loanAccountId, status);
    }

    // ✅ MARK AS PAID
    @PatchMapping("/{loanAccountId}/repayments/{repaymentId}/pay")
    public String pay(
            @PathVariable Long loanAccountId,
            @PathVariable Long repaymentId) {

        service.markAsPaid(repaymentId, loanAccountId);
        return "✅ Payment successful";
    }
}