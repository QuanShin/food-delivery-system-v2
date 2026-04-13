package com.fooddelivery.order.service;

import com.fooddelivery.order.dto.*;
import com.fooddelivery.order.entity.FoodOrder;
import com.fooddelivery.order.entity.OrderItem;
import com.fooddelivery.order.entity.OrderStatus;
import com.fooddelivery.order.repository.FoodOrderRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private final FoodOrderRepository foodOrderRepository;

    public OrderService(FoodOrderRepository foodOrderRepository) {
        this.foodOrderRepository = foodOrderRepository;
    }

    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        BigDecimal totalPrice = request.items().stream()
                .map(item -> item.unitPrice().multiply(BigDecimal.valueOf(item.quantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        FoodOrder order = new FoodOrder(
                request.customerEmail(),
                totalPrice,
                OrderStatus.PENDING,
                LocalDateTime.now()
        );

        for (OrderItemRequest itemRequest : request.items()) {
            BigDecimal lineTotal = itemRequest.unitPrice().multiply(BigDecimal.valueOf(itemRequest.quantity()));

            OrderItem item = new OrderItem(
                    itemRequest.menuItemName(),
                    itemRequest.quantity(),
                    itemRequest.unitPrice(),
                    lineTotal
            );

            order.addItem(item);
        }

        FoodOrder saved = foodOrderRepository.save(order);
        return mapToResponse(saved);
    }
    
    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {
        return foodOrderRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long id) {
        FoodOrder order = foodOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return mapToResponse(order);
    }

    private OrderResponse mapToResponse(FoodOrder order) {
        List<OrderItemResponse> items = order.getItems()
                .stream()
                .map(item -> new OrderItemResponse(
                        item.getMenuItemName(),
                        item.getQuantity(),
                        item.getUnitPrice(),
                        item.getLineTotal()
                ))
                .toList();

        return new OrderResponse(
                order.getId(),
                order.getCustomerEmail(),
                order.getTotalPrice(),
                order.getStatus().name(),
                items
        );
    }
}