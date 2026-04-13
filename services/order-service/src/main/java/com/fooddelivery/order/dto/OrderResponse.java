package com.fooddelivery.order.dto;

import java.math.BigDecimal;
import java.util.List;

public record OrderResponse(
        Long id,
        String customerEmail,
        BigDecimal totalPrice,
        String status,
        List<OrderItemResponse> items
) {
}