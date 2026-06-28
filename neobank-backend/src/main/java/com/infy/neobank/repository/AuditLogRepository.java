package com.infy.neobank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.infy.neobank.entity.AuditLog;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
}