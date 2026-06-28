package com.infy.neobank.dto;

import lombok.Data;

@Data
public class RegisterRequest {

   private String fullName;
   private String email;
   private String password;
    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public RegisterRequest(String fullName, String email, String password) {
        super();
        this.fullName = fullName;
        this.email = email;
        this.password = password;
    }
    public RegisterRequest() {
        super();
        // TODO Auto-generated constructor stub
    }
   
   
}