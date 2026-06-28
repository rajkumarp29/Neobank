package com.infy.neobank.controller;

import com.infy.neobank.dto.RewardDTO;
import com.infy.neobank.service.RewardService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rewards")
public class RewardController {

    private final RewardService rewardService;

    public RewardController(RewardService rewardService) {
        this.rewardService = rewardService;
    }

    /* =========================
       GET /api/rewards/{userId}
    ========================= */
    @GetMapping("/{userId}")
    public RewardDTO getRewardBalance(
            @PathVariable Long userId
    ) {
        return rewardService.getRewardBalance(userId);
    }
}