package com.infy.neobank.repository;

import com.infy.neobank.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BillRepository extends JpaRepository<Bill, Long> {

    Optional<Bill> findByUserIdAndBillerNameAndDueDateBetween(
            Long userId,
            String billerName,
            LocalDate startDate,
            LocalDate endDate
    );

    List<Bill> findByUserId(Long userId);
}