package com.infy.neobank.dto;

import java.time.LocalDateTime;

public class UserActivityDTO {

    private Long userId;
    private String activity;
    private LocalDateTime timestamp;

    public UserActivityDTO(Long userId, String activity, LocalDateTime timestamp) {
        this.userId = userId;
        this.activity = activity;
        this.timestamp = timestamp;
    }

    public Long getUserId() { return userId; }
    public String getActivity() { return activity; }
    public LocalDateTime getTimestamp() { return timestamp; }
}