package com.infy.neobank.dto;

import java.math.BigDecimal;

import com.infy.neobank.entity.AccountType;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountResponse {

   private Long id;
   private String accountNumber;
   private AccountType accountType;
   private BigDecimal balance;
   
// NEW
   private Long userId;

   private String userName;

   private String userEmail;
}