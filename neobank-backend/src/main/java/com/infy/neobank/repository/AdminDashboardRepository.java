package com.infy.neobank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import com.infy.neobank.entity.User;

@Repository
public interface AdminDashboardRepository extends JpaRepository<User, Long> {

    @Query("SELECT COUNT(u) FROM User u")
    Long getTotalUsers();

    @Query("SELECT COUNT(a) FROM Account a")
    Long getTotalAccounts();

    @Query("SELECT COUNT(t) FROM Transaction t")
    Long getTotalTransactions();
}