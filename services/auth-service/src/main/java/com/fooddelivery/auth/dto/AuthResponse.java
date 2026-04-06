package com.fooddelivery.auth.dto;

public record AuthResponse(
        String message,
        String username,
        String email,
        String role,
        String token
) {
}