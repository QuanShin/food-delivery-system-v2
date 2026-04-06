package com.fooddelivery.delivery.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class DeliveryRequest {

    @NotNull(message = "Order ID is required")
    private Long orderId;

    @NotBlank(message = "Rider name is required")
    private String riderName;

    @NotBlank(message = "Delivery address is required")
    private String deliveryAddress;

    public DeliveryRequest() {
    }

    public Long getOrderId() {
        return orderId;
    }

    public String getRiderName() {
        return riderName;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public void setRiderName(String riderName) {
        this.riderName = riderName;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }
}