package com.fooddelivery.menu.dto;

import java.math.BigDecimal;

public record MenuItemResponse(
        Long id,
        String name,
        String category,
        BigDecimal price,
        String description,
        Boolean available
) {
}