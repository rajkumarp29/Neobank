package com.infy.neobank.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.infy.neobank.entity.TransactionType;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TransactionResponse {

   private Long id;
   private TransactionType type;
   private BigDecimal amount;
   private String description;
   private LocalDateTime transactionDate;
   private BigDecimal balanceAfter;
}