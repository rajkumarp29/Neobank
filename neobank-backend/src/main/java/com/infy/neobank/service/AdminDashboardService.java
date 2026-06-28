package com.infy.neobank.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;

import com.infy.neobank.dto.AdminDashboardDTO;
import com.infy.neobank.dto.PendingApprovalDTO;
import com.infy.neobank.dto.SystemHealthDTO;
import com.infy.neobank.entity.LoanApplication;
import com.infy.neobank.entity.LoanStatus;
import com.infy.neobank.repository.*;

@Service
public class AdminDashboardService {

    @Autowired
    private AdminDashboardRepository repository;

    @Autowired
    private LoanApplicationRepository loanApplicationRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired(required = false)
    private UserRepository userRepository;

    @Autowired(required = false)
    private LoanAccountRepository loanAccountRepository;

    @Autowired
    private EntityManager entityManager;

    // ✅ Server start time
    private static final long START_TIME = System.currentTimeMillis();

    // ✅ DASHBOARD
    public AdminDashboardDTO getDashboardData() {

        Long totalUsers = repository.getTotalUsers();
        Long totalAccounts = repository.getTotalAccounts();
        Long totalTransactions = repository.getTotalTransactions();

        Long totalActiveUsers =
                (userRepository != null) ? userRepository.countByIsActiveTrue() : 0L;

        Long totalLoans =
                (loanAccountRepository != null) ? loanAccountRepository.count() : 0L;

        Long pendingApprovals =
                loanApplicationRepository.countByStatus(LoanStatus.PENDING);

        // ✅ Savings Rate
        Double income = transactionRepository.getTotalCredits();
        Double expense = transactionRepository.getTotalDebits();

        double savingsRate = 0;

        if (income != null && income > 0) {
            double exp = (expense != null) ? expense : 0;
            savingsRate = ((income - exp) / income) * 100;
        }

        return new AdminDashboardDTO(
                totalUsers,
                totalAccounts,
                totalTransactions,
                totalActiveUsers,
                totalLoans,
                pendingApprovals,
                savingsRate
        );
    }

    // ✅ ✅ UPDATED: Pending Approvals with module filter
    public List<PendingApprovalDTO> getPendingApprovals(String module) {

        // ✅ Module filter (LOAN)
        if (module != null && module.equalsIgnoreCase("LOAN")) {

            List<LoanApplication> loans =
                    loanApplicationRepository.findByStatusOrderByAppliedAtAsc(LoanStatus.PENDING);

            return loans.stream()
                    .map(l -> new PendingApprovalDTO(
                            l.getId(),
                            "LOAN_APPLICATION",
                            l.getUserId(),
                            l.getLoanProductId(),
                            l.getRequestedAmount(),
                            l.getAppliedAt()
                    ))
                    .collect(Collectors.toList());
        }

        // ✅ Default: same
        List<LoanApplication> list =
                loanApplicationRepository.findByStatusOrderByAppliedAtAsc(LoanStatus.PENDING);

        return list.stream()
                .map(l -> new PendingApprovalDTO(
                        l.getId(),
                        "LOAN_APPLICATION",
                        l.getUserId(),
                        l.getLoanProductId(),
                        l.getRequestedAmount(),
                        l.getAppliedAt()
                ))
                .collect(Collectors.toList());
    }

    // ✅ ✅ SYSTEM HEALTH
    public SystemHealthDTO getSystemHealth() {

        String dbStatus = "DOWN";

        try {
            // ✅ DB health check
            entityManager.createNativeQuery("SELECT 1").getSingleResult();
            dbStatus = "UP";
        } catch (Exception e) {
            dbStatus = "DOWN";
        }

        // ✅ Active sessions (approximation)
        long activeSessions = Thread.activeCount();

        // ✅ Uptime
        long uptimeSeconds =
                (System.currentTimeMillis() - START_TIME) / 1000;

        return new SystemHealthDTO(
                dbStatus,
                activeSessions,
                uptimeSeconds
        );
    }
}
