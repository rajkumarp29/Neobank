package com.infy.neobank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.infy.neobank.dto.AdminDashboardDTO;
import com.infy.neobank.dto.PendingApprovalDTO;
import com.infy.neobank.dto.SystemHealthDTO;
import com.infy.neobank.service.AdminDashboardService;

@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {

    @Autowired
    private AdminDashboardService service;

    // ✅ DASHBOARD (already working)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/dashboard")
    public AdminDashboardDTO getDashboard() {
        return service.getDashboardData();
    }

    // ✅ UPDATED: Pending approvals with module filter
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/pending-approvals")
    public List<PendingApprovalDTO> getPendingApprovals(
            @RequestParam(required = false) String module
    ) {
        return service.getPendingApprovals(module);
    }

    // ✅ NEW: System health API
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/system-health")
    public SystemHealthDTO getSystemHealth() {
        return service.getSystemHealth();
    }
}
