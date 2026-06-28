package com.infy.neobank.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.infy.neobank.entity.LoginEvent;

public interface LoginEventRepository extends JpaRepository<LoginEvent, Long> {

    List<LoginEvent> findTop5ByUserIdOrderByLoginTimeDesc(Long userId);
}