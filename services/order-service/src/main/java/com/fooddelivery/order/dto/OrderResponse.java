package com.fooddelivery.order.dto;

import java.math.BigDecimal;

public record OrderResponse(
        Long id,
        String customerEmail,
        String menuItemName,
        Integer quantity,
        BigDecimal unitPrice,
        BigDecimal totalPrice,
        String status
) {
}