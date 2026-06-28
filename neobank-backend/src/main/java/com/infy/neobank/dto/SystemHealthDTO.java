package com.infy.neobank.dto;

public class SystemHealthDTO {

    private String dbStatus;
    private Long activeSessions;
    private Long serverUptimeSeconds;

    public SystemHealthDTO(String dbStatus,
                           Long activeSessions,
                           Long serverUptimeSeconds) {
        this.dbStatus = dbStatus;
        this.activeSessions = activeSessions;
        this.serverUptimeSeconds = serverUptimeSeconds;
    }

    public String getDbStatus() { return dbStatus; }
    public Long getActiveSessions() { return activeSessions; }
    public Long getServerUptimeSeconds() { return serverUptimeSeconds; }
}