package com.infy.neobank.service;

import com.infy.neobank.dto.BillRequestDTO;
import com.infy.neobank.dto.BillResponseDTO;
import com.infy.neobank.entity.Bill;
import com.infy.neobank.entity.BillStatus;
import com.infy.neobank.repository.BillRepository;
import com.infy.neobank.repository.UserRepository;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BillService {

    private final BillRepository billRepository;
    private final UserRepository userRepository;
    private final RewardService rewardService;

    public BillService(BillRepository billRepository,
                       UserRepository userRepository,
                       RewardService rewardService) {
        this.billRepository = billRepository;
        this.userRepository = userRepository;
        this.rewardService = rewardService;
    }

    /* =========================
       CREATE BILL
       POST /api/bills
    ========================= */
    @Transactional
    public BillResponseDTO createBill(BillRequestDTO request) {

        Long userId = getCurrentUserId();

        // ✅ Due date validation
        if (!request.getDueDate().isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Due date must be in the future");
        }

        // ✅ Duplicate bill restriction (same biller, same month)
        LocalDate start = request.getDueDate().withDayOfMonth(1);
        LocalDate end = start.plusMonths(1).minusDays(1);

        billRepository
            .findByUserIdAndBillerNameAndDueDateBetween(
                userId,
                request.getBillerName(),
                start,
                end
            )
            .ifPresent(bill -> {
                throw new IllegalStateException(
                    "Bill already exists for this biller in the selected month"
                );
            });

        Bill bill = new Bill();
        bill.setUserId(userId);
        bill.setBillerName(request.getBillerName());
        bill.setAmount(request.getAmount());
        bill.setDueDate(request.getDueDate());
        bill.setStatus(BillStatus.PENDING);

        return toDTO(billRepository.save(bill));
    }

    /* =========================
       UPDATE BILL STATUS
       PATCH /api/bills/{id}/status
       ✅ PENDING → PAID
       ✅ Reward trigger
    ========================= */
    @Transactional   // ✅ ✅ CRITICAL FIX
    public BillResponseDTO updateStatus(Long billId, BillStatus newStatus) {

        Long userId = getCurrentUserId();

        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new RuntimeException("Bill not found"));

        // ✅ Ownership validation
        if (!bill.getUserId().equals(userId)) {
            throw new SecurityException("Unauthorized bill access");
        }

        // ✅ Prevent multiple updates
        if (bill.getStatus() == BillStatus.PAID) {
            throw new IllegalStateException("Paid bill cannot be modified");
        }

        // ✅ Reward on successful payment
        if (bill.getStatus() == BillStatus.PENDING
                && newStatus == BillStatus.PAID) {
            rewardService.addPoints(userId, 10);
        }

        bill.setStatus(newStatus);

        // ✅ Persist status update
        return toDTO(billRepository.save(bill));
    }

    /* =========================
       GET ALL BILLS
       GET /api/bills
       ✅ Reminder flag
    ========================= */
    public List<BillResponseDTO> getBills() {

        Long userId = getCurrentUserId();

        return billRepository.findByUserId(userId)
            .stream()
            .map(bill -> {
                BillResponseDTO dto = toDTO(bill);

                // ✅ Reminder if due within 3 days
                if (!bill.getDueDate().isAfter(LocalDate.now().plusDays(3))) {
                    dto.setRemindMe(true);
                }

                return dto;
            })
            .collect(Collectors.toList());
    }

    /* =========================
       HELPER METHODS
    ========================= */

    private Long getCurrentUserId() {
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmailIgnoreCase(email)
                .orElseThrow()
                .getId();
    }

    private BillResponseDTO toDTO(Bill bill) {
        BillResponseDTO dto = new BillResponseDTO();
        dto.setId(bill.getId());
        dto.setBillerName(bill.getBillerName());
        dto.setAmount(bill.getAmount());
        dto.setDueDate(bill.getDueDate());
        dto.setStatus(bill.getStatus());
        return dto;
    }
}