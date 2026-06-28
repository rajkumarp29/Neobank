package com.infy.neobank.controller;

import java.util.*;

import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.infy.neobank.entity.*;
import com.infy.neobank.repository.*;
import com.infy.neobank.security.CustomUserDetails;
import com.infy.neobank.service.AuditService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final LoginEventRepository loginEventRepository;
    private final AuditService auditService;

    public AdminController(UserRepository userRepository,
                           TransactionRepository transactionRepository,
                           LoginEventRepository loginEventRepository,
                           AuditService auditService) {

        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
        this.loginEventRepository = loginEventRepository;
        this.auditService = auditService;
    }

    // ✅ 1. PAGINATED USERS (SAFE)
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<Map<String, Object>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        return userRepository.findAll(pageable)
                .map(user -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("id", user.getId());
                    m.put("fullName", user.getFullName());
                    m.put("email", user.getEmail());
                    m.put("role", user.getRole());
                    m.put("isActive", user.getIsActive());
                    m.put("createdAt", user.getCreatedAt());
                    return m;
                });
    }

    // ✅ 2. UPDATE USER STATUS
    @PatchMapping("/users/{userId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long userId,
            @RequestBody Map<String, Boolean> payload,
            Authentication auth) {

        Long adminId = ((CustomUserDetails) auth.getPrincipal()).getUserId();

        boolean newStatus = payload.get("isActive");

        // ❌ Self-deactivation blocked
        if (adminId.equals(userId) && !newStatus) {
            return ResponseEntity.badRequest().body("Admin cannot deactivate own account");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setIsActive(newStatus);
        userRepository.save(user);

        auditService.log(adminId, "STATUS_UPDATED", userId);

        return ResponseEntity.ok("Status updated");
    }

    // ✅ 3. USER ACTIVITY
    @GetMapping("/users/{userId}/activity")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getActivity(@PathVariable Long userId) {

        List<Transaction> transactions =
                transactionRepository.findTop20ByUserId(
                        userId,
                        PageRequest.of(0, 20)
                );

        List<LoginEvent> logins =
                loginEventRepository.findTop5ByUserIdOrderByLoginTimeDesc(userId);

        Map<String, Object> res = new HashMap<>();
        res.put("transactions", transactions);
        res.put("loginEvents", logins);

        return ResponseEntity.ok(res);
    }
}