package com.infy.neobank.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infy.neobank.entity.LoanProduct;

public interface LoanProductRepository extends JpaRepository<LoanProduct, Long> {}
