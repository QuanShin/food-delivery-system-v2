package com.fooddelivery.delivery.service;

import com.fooddelivery.delivery.dto.DeliveryRequest;
import com.fooddelivery.delivery.dto.DeliveryResponse;
import com.fooddelivery.delivery.dto.UpdateDeliveryStatusRequest;
import com.fooddelivery.delivery.entity.Delivery;
import com.fooddelivery.delivery.entity.DeliveryStatus;
import com.fooddelivery.delivery.repository.DeliveryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;

    public DeliveryService(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    public DeliveryResponse createDelivery(DeliveryRequest request) {
        Delivery delivery = new Delivery(
                request.getOrderId(),
                request.getRiderName(),
                request.getDeliveryAddress(),
                DeliveryStatus.ASSIGNED,
                LocalDateTime.now()
        );

        Delivery saved = deliveryRepository.save(delivery);

        return new DeliveryResponse(
                saved.getId(),
                saved.getOrderId(),
                saved.getRiderName(),
                saved.getDeliveryAddress(),
                saved.getStatus().name()
        );
    }

    public List<DeliveryResponse> getAllDeliveries() {
        return deliveryRepository.findAll()
                .stream()
                .map(delivery -> new DeliveryResponse(
                        delivery.getId(),
                        delivery.getOrderId(),
                        delivery.getRiderName(),
                        delivery.getDeliveryAddress(),
                        delivery.getStatus().name()
                ))
                .toList();
    }

    public DeliveryResponse getDeliveryById(Long id) {
        Delivery delivery = deliveryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Delivery not found"));

        return new DeliveryResponse(
                delivery.getId(),
                delivery.getOrderId(),
                delivery.getRiderName(),
                delivery.getDeliveryAddress(),
                delivery.getStatus().name()
        );
    }

    public DeliveryResponse updateDeliveryStatus(Long id, UpdateDeliveryStatusRequest request) {
        Delivery delivery = deliveryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Delivery not found"));

        delivery.setStatus(DeliveryStatus.valueOf(request.getStatus().toUpperCase()));

        Delivery updated = deliveryRepository.save(delivery);

        return new DeliveryResponse(
                updated.getId(),
                updated.getOrderId(),
                updated.getRiderName(),
                updated.getDeliveryAddress(),
                updated.getStatus().name()
        );
    }
}