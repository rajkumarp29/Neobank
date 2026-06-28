package com.infy.neobank.dto;

public class RewardDTO {

    private Long userId;
    private Integer pointsBalance;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getPointsBalance() {
        return pointsBalance;
    }

    public void setPointsBalance(Integer pointsBalance) {
        this.pointsBalance = pointsBalance;
    }
}
