package com.infy.neobank.security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    // ✅ Secret key (minimum 32 chars)
    private static final String SECRET =
            "mysecretkeymysecretkeymysecretkeymysecretkey";

    private final Key SECRET_KEY =
            Keys.hmacShaKeyFor(SECRET.getBytes());

    /* =========================
       GENERATE TOKEN
    ========================= */
    public String generateToken(String email, String role) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role); // ✅ RBAC support

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)  // ✅ EMAIL as subject
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis()
                                + 1000 * 60 * 60 * 24) // 24 hours
                )
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    /* =========================
       EXTRACT EMAIL
    ========================= */
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    /* =========================
       EXTRACT ROLE
    ========================= */
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    /* =========================
       TOKEN VALIDATION
    ========================= */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String email = extractEmail(token);
        return email.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    /* =========================
       CHECK EXPIRY
    ========================= */
    public boolean isTokenExpired(String token) {
        return extractAllClaims(token)
                .getExpiration()
                .before(new Date());
    }

    /* =========================
       PARSE CLAIMS
    ========================= */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
