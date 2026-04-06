package com.fooddelivery.order.repository;

import com.fooddelivery.order.entity.FoodOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodOrderRepository extends JpaRepository<FoodOrder, Long> {
}