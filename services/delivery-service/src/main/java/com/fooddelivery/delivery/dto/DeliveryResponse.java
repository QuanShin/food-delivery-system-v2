package com.fooddelivery.delivery.dto;

public record DeliveryResponse(
        Long id,
        Long orderId,
        String riderName,
        String deliveryAddress,
        String status
) {
}