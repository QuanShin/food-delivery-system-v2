package com.fooddelivery.delivery.controller;

import com.fooddelivery.delivery.dto.DeliveryRequest;
import com.fooddelivery.delivery.dto.DeliveryResponse;
import com.fooddelivery.delivery.dto.UpdateDeliveryStatusRequest;
import com.fooddelivery.delivery.service.DeliveryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/deliveries")
public class DeliveryController {

    private final DeliveryService deliveryService;

    public DeliveryController(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of(
                "service", "delivery-service",
                "status", "running"
        );
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DeliveryResponse createDelivery(@Valid @RequestBody DeliveryRequest request) {
        return deliveryService.createDelivery(request);
    }

    @GetMapping
    public List<DeliveryResponse> getAllDeliveries() {
        return deliveryService.getAllDeliveries();
    }

    @GetMapping("/{id}")
    public DeliveryResponse getDeliveryById(@PathVariable Long id) {
        return deliveryService.getDeliveryById(id);
    }

    @PatchMapping("/{id}/status")
    public DeliveryResponse updateDeliveryStatus(@PathVariable Long id,
                                                 @Valid @RequestBody UpdateDeliveryStatusRequest request) {
        return deliveryService.updateDeliveryStatus(id, request);
    }
}