package com.fooddelivery.order.service;

import com.fooddelivery.order.dto.OrderRequest;
import com.fooddelivery.order.dto.OrderResponse;
import com.fooddelivery.order.entity.FoodOrder;
import com.fooddelivery.order.entity.OrderStatus;
import com.fooddelivery.order.repository.FoodOrderRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final FoodOrderRepository foodOrderRepository;

    public OrderService(FoodOrderRepository foodOrderRepository) {
        this.foodOrderRepository = foodOrderRepository;
    }

    public OrderResponse createOrder(OrderRequest request) {
        BigDecimal totalPrice = request.unitPrice().multiply(BigDecimal.valueOf(request.quantity()));

        FoodOrder order = new FoodOrder(
                request.customerEmail(),
                request.menuItemName(),
                request.quantity(),
                request.unitPrice(),
                totalPrice,
                OrderStatus.PENDING,
                LocalDateTime.now()
        );

        FoodOrder saved = foodOrderRepository.save(order);

        return new OrderResponse(
                saved.getId(),
                saved.getCustomerEmail(),
                saved.getMenuItemName(),
                saved.getQuantity(),
                saved.getUnitPrice(),
                saved.getTotalPrice(),
                saved.getStatus().name()
        );
    }

    public List<OrderResponse> getAllOrders() {
        return foodOrderRepository.findAll()
                .stream()
                .map(order -> new OrderResponse(
                        order.getId(),
                        order.getCustomerEmail(),
                        order.getMenuItemName(),
                        order.getQuantity(),
                        order.getUnitPrice(),
                        order.getTotalPrice(),
                        order.getStatus().name()
                ))
                .toList();
    }

    public OrderResponse getOrderById(Long id) {
        FoodOrder order = foodOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return new OrderResponse(
                order.getId(),
                order.getCustomerEmail(),
                order.getMenuItemName(),
                order.getQuantity(),
                order.getUnitPrice(),
                order.getTotalPrice(),
                order.getStatus().name()
        );
    }
}