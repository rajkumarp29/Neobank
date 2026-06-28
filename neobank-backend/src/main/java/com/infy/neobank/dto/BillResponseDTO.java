package com.infy.neobank.dto;

import java.time.LocalDate;

import com.infy.neobank.entity.BillStatus;

public class BillResponseDTO {

	 private Long id;
	    private String billerName;
	    private Double amount;
	    private LocalDate dueDate;
	    private BillStatus status;
	    private boolean remindMe;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
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
		public BillStatus getStatus() {
			return status;
		}
		public void setStatus(BillStatus status) {
			this.status = status;
		}
		public boolean isRemindMe() {
			return remindMe;
		}
		public void setRemindMe(boolean remindMe) {
			this.remindMe = remindMe;
		}

}
