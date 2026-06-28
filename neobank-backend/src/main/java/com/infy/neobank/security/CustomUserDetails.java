package com.infy.neobank.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class CustomUserDetails extends User {

    private Long userId;

    public CustomUserDetails(String username, String password,
                             Collection<? extends GrantedAuthority> authorities,
                             Long userId) {
        super(username, password, authorities);
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }
}