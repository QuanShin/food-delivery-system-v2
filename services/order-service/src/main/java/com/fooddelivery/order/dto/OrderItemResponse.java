package com.fooddelivery.order.dto;

import java.math.BigDecimal;

public record OrderItemResponse(
        String menuItemName,
        Integer quantity,
        BigDecimal unitPrice,
        BigDecimal lineTotal
) {
}