package com.infy.neobank.dto;

import java.time.LocalDate;

public class BillRequestDTO {

    private String billerName;
    private Double amount;
    private LocalDate dueDate;
	public String getBillerName() {
		return billerName;
	}
	public void setBillerName(String billerName) {
		this.billerName = billerName;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public LocalDate getDueDate() {
		return dueDate;
	}
	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
	}
    
    
}
