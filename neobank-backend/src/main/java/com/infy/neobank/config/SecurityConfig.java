package com.infy.neobank.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.infy.neobank.security.JwtAuthFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    // ✅ Password Encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ✅ Security Filter Chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // ✅ Disable CSRF (for REST APIs)
            .csrf(csrf -> csrf.disable())

            // ✅ Enable CORS
            .cors(Customizer.withDefaults())

            // ✅ Stateless session (JWT)
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // ✅ Authorization rules
            .authorizeHttpRequests(auth -> auth

                // =========================
                // ✅ PUBLIC APIs
                // =========================

                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // =========================
                // ✅ LOAN PRODUCT APIs
                // =========================

                .requestMatchers("/api/loans/products").permitAll()
                .requestMatchers("/api/loans/products/**").permitAll()

                // =========================
                // ✅ LOAN APPLICATION
                // =========================

                .requestMatchers("/api/loans/apply").permitAll()

                // =========================
                // ✅ ✅ ADMIN LOAN APPROVAL (CRITICAL FIX 🔥)
                // =========================

                .requestMatchers("/api/admin/loans/pending").permitAll()
                .requestMatchers("/api/admin/loans/**").permitAll()

                // =========================
                // ✅ EVERYTHING ELSE SECURED
                // =========================

                .anyRequest().authenticated()
            )

            // ✅ JWT Filter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
