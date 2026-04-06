package com.fooddelivery.menu.service;

import com.fooddelivery.menu.dto.MenuItemRequest;
import com.fooddelivery.menu.dto.MenuItemResponse;
import com.fooddelivery.menu.entity.MenuItem;
import com.fooddelivery.menu.repository.MenuItemRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MenuService {

    private final MenuItemRepository menuItemRepository;

    public MenuService(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    public MenuItemResponse createMenuItem(MenuItemRequest request) {
        MenuItem menuItem = new MenuItem(
                request.name(),
                request.category(),
                request.price(),
                request.description(),
                request.available(),
                LocalDateTime.now()
        );

        MenuItem saved = menuItemRepository.save(menuItem);

        return new MenuItemResponse(
                saved.getId(),
                saved.getName(),
                saved.getCategory(),
                saved.getPrice(),
                saved.getDescription(),
                saved.getAvailable()
        );
    }

    public List<MenuItemResponse> getAllMenuItems() {
        return menuItemRepository.findAll()
                .stream()
                .map(item -> new MenuItemResponse(
                        item.getId(),
                        item.getName(),
                        item.getCategory(),
                        item.getPrice(),
                        item.getDescription(),
                        item.getAvailable()
                ))
                .toList();
    }

    public MenuItemResponse getMenuItemById(Long id) {
        MenuItem item = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        return new MenuItemResponse(
                item.getId(),
                item.getName(),
                item.getCategory(),
                item.getPrice(),
                item.getDescription(),
                item.getAvailable()
        );
    }
}