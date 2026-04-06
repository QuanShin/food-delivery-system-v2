package com.fooddelivery.delivery.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "deliveries")
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long orderId;

    @Column(nullable = false)
    private String riderName;

    @Column(nullable = false, length = 255)
    private String deliveryAddress;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeliveryStatus status;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public Delivery() {
    }

    public Delivery(Long orderId, String riderName, String deliveryAddress, DeliveryStatus status, LocalDateTime createdAt) {
        this.orderId = orderId;
        this.riderName = riderName;
        this.deliveryAddress = deliveryAddress;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
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

    public DeliveryStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
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

    public void setStatus(DeliveryStatus status) {
        this.status = status;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}