package com.fooddelivery.auth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuthHealthController {

    @GetMapping("/auth/health")
    public Map<String, String> health() {
        return Map.of(
                "service", "auth-service",
                "status", "running"
        );
    }
}