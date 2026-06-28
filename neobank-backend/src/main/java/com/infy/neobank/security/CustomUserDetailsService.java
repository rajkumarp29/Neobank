package com.infy.neobank.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.infy.neobank.entity.User;
import com.infy.neobank.repository.UserRepository;

import java.util.List;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Service
public class CustomUserDetailsService implements UserDetailsService {

   private final UserRepository userRepository;

   // ✅ Constructor Injection
   public CustomUserDetailsService(UserRepository userRepository) {
       this.userRepository = userRepository;
   }

   // ✅ Load user by email (username)
   @Override
   public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

       User user = userRepository.findByEmailIgnoreCase(email)
               .orElseThrow(() -> new UsernameNotFoundException("User not found"));

       // ✅ RETURN CUSTOM USER DETAILS (WITH userId)
       return new CustomUserDetails(
               user.getEmail(),
               user.getPassword(),
               List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name())),
               user.getId()   // ✅ VERY IMPORTANT (FIX)
       );
   }
}