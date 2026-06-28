package com.infy.neobank.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "users")
public class User {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @Column(nullable = false, unique = true)
   private String email;

   @Column(name = "password_hash", nullable = false)
   private String password;

   @Column(name = "full_name", nullable = false)
   private String fullName;

   @Enumerated(EnumType.STRING)
   @Column(nullable = false)
   private Role role; // ✅ IMPORTANT

   @Column(name = "is_active")
   private Boolean isActive = true;

   @Column(name = "created_at")
   private LocalDateTime createdAt = LocalDateTime.now();

   // 🔹 Getters & Setters

   public Long getId() {
       return id;
   }

   public void setId(Long id) {
       this.id = id;
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

   public String getFullName() {
       return fullName;
   }

   public void setFullName(String fullName) {
       this.fullName = fullName;
   }

   public Role getRole() {
       return role;
   }

   public void setRole(Role role) {
       this.role = role;
   }

   public Boolean getIsActive() {
       return isActive;
   }

   public void setIsActive(Boolean isActive) {
       this.isActive = isActive;
   }

   public LocalDateTime getCreatedAt() {
       return createdAt;
   }

   public void setCreatedAt(LocalDateTime createdAt) {
       this.createdAt = createdAt;
   }
}