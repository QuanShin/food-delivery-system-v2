package com.fooddelivery.delivery.dto;

import jakarta.validation.constraints.NotBlank;

public class UpdateDeliveryStatusRequest {

    @NotBlank(message = "Status is required")
    private String status;

    public UpdateDeliveryStatusRequest() {
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}