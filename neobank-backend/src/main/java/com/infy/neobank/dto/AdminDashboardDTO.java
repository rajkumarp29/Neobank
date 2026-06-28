package com.infy.neobank.dto;

public class AdminDashboardDTO {

    private Long totalUsers;
    private Long totalAccounts;
    private Long totalTransactions;

    private Long totalActiveUsers;
    private Long totalLoans;
    private Long pendingApprovals;

    private Double platformSavingsRate;

    public AdminDashboardDTO(Long totalUsers,
                             Long totalAccounts,
                             Long totalTransactions,
                             Long totalActiveUsers,
                             Long totalLoans,
                             Long pendingApprovals,
                             Double platformSavingsRate) {

        this.totalUsers = totalUsers;
        this.totalAccounts = totalAccounts;
        this.totalTransactions = totalTransactions;
        this.totalActiveUsers = totalActiveUsers;
        this.totalLoans = totalLoans;
        this.pendingApprovals = pendingApprovals;
        this.platformSavingsRate = platformSavingsRate;
    }

    public Long getTotalUsers() { return totalUsers; }
    public Long getTotalAccounts() { return totalAccounts; }
    public Long getTotalTransactions() { return totalTransactions; }

    public Long getTotalActiveUsers() { return totalActiveUsers; }
    public Long getTotalLoans() { return totalLoans; }
    public Long getPendingApprovals() { return pendingApprovals; }

    public Double getPlatformSavingsRate() { return platformSavingsRate; }
}
