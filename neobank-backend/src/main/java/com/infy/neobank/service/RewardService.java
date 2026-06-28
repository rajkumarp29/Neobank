package com.infy.neobank.service;

import com.infy.neobank.dto.RewardDTO;
import com.infy.neobank.entity.Reward;
import com.infy.neobank.repository.RewardRepository;
import com.infy.neobank.repository.UserRepository;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RewardService {

    private final RewardRepository rewardRepository;
    private final UserRepository userRepository;

    public RewardService(RewardRepository rewardRepository,
                         UserRepository userRepository) {
        this.rewardRepository = rewardRepository;
        this.userRepository = userRepository;
    }

    /* =========================
       SESSION 1 — GET BALANCE
    ========================= */
    public RewardDTO getRewardBalance(Long pathUserId) {

        Long tokenUserId = getCurrentUserId();

        // ✅ JWT user validation
        if (!tokenUserId.equals(pathUserId)) {
            throw new SecurityException("Unauthorized reward access");
        }

        Reward reward = rewardRepository.findByUserId(pathUserId)
                .orElseGet(() -> {
                    Reward r = new Reward();
                    r.setUserId(pathUserId);
                    r.setPointsBalance(0);
                    return rewardRepository.save(r);
                });

        return toDTO(reward);
    }

    /* =========================
       SESSION 2 — ADD POINTS
       (Bill PAID / Large Txn)
    ========================= */
    @Transactional
    public void addPoints(Long userId, int points) {

        Reward reward = rewardRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Reward r = new Reward();
                    r.setUserId(userId);
                    r.setPointsBalance(0);
                    return rewardRepository.save(r);
                });

        reward.setPointsBalance(reward.getPointsBalance() + points);
        rewardRepository.save(reward);
    }

    /* =========================
       SESSION 2 — DEDUCT POINTS
    ========================= */
    @Transactional
    public void deductPoints(Long userId, int points) {

        Reward reward = rewardRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new IllegalStateException("Reward record not found"));

        if (reward.getPointsBalance() < points) {
            throw new IllegalStateException("Insufficient reward points");
        }

        reward.setPointsBalance(reward.getPointsBalance() - points);
        rewardRepository.save(reward);
    }

    /* =========================
       HELPERS
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

    private RewardDTO toDTO(Reward reward) {
        RewardDTO dto = new RewardDTO();
        dto.setUserId(reward.getUserId());
        dto.setPointsBalance(reward.getPointsBalance());
        return dto;
    }
}