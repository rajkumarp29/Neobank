package com.infy.neobank.repository;

import com.infy.neobank.entity.Reward;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RewardRepository extends JpaRepository<Reward, Long> {

    Optional<Reward> findByUserId(Long userId);
}