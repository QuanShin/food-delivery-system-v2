package com.fooddelivery.menu.controller;

import com.fooddelivery.menu.dto.MenuItemRequest;
import com.fooddelivery.menu.dto.MenuItemResponse;
import com.fooddelivery.menu.service.MenuService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/menu")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of(
                "service", "menu-service",
                "status", "running"
        );
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MenuItemResponse createMenuItem(@Valid @RequestBody MenuItemRequest request) {
        return menuService.createMenuItem(request);
    }

    @GetMapping
    public List<MenuItemResponse> getAllMenuItems() {
        return menuService.getAllMenuItems();
    }

    @GetMapping("/{id}")
    public MenuItemResponse getMenuItemById(@PathVariable Long id) {
        return menuService.getMenuItemById(id);
    }
}