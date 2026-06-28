package com.infy.neobank.service;

import org.springframework.stereotype.Service;
import com.infy.neobank.entity.AuditLog;
import com.infy.neobank.repository.AuditLogRepository;

@Service
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    public AuditService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public void log(Long adminId, String action, Long targetUserId) {
        AuditLog log = new AuditLog();
        log.setActingAdminId(adminId);
        log.setAction(action);
        log.setTargetUserId(targetUserId);

        auditLogRepository.save(log);
    }
}