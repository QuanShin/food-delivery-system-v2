package com.fooddelivery.menu.config;

import com.fooddelivery.menu.entity.MenuItem;
import com.fooddelivery.menu.repository.MenuItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedMenuData(MenuItemRepository menuItemRepository) {
        return args -> {
            menuItemRepository.deleteAll();

            List<MenuItem> items = List.of(
                    new MenuItem("Hamburger", "American", new BigDecimal("12.95"), "Classic grilled hamburger with soft bun and fresh toppings.", true, LocalDateTime.now()),
                    new MenuItem("Cheeseburger", "American", new BigDecimal("13.95"), "Juicy cheeseburger with melted cheese and signature sauce.", true, LocalDateTime.now()),
                    new MenuItem("Hot Dog", "American", new BigDecimal("9.00"), "Grilled hot dog served in a toasted bun.", true, LocalDateTime.now()),
                    new MenuItem("Veggie Burger", "American", new BigDecimal("10.50"), "Plant-based burger with crisp vegetables and house dressing.", true, LocalDateTime.now()),
                    new MenuItem("Mac & Cheese", "American", new BigDecimal("7.00"), "Creamy macaroni with rich cheese sauce.", true, LocalDateTime.now()),
                    new MenuItem("French Fries", "American", new BigDecimal("7.00"), "Crispy golden fries with light seasoning.", true, LocalDateTime.now()),

                    new MenuItem("Orange Chicken", "Asian", new BigDecimal("16.50"), "Crispy chicken tossed in sweet orange glaze.", true, LocalDateTime.now()),
                    new MenuItem("Tofu Pad Thai", "Asian", new BigDecimal("14.50"), "Rice noodles with tofu, peanuts, and tamarind sauce.", true, LocalDateTime.now()),
                    new MenuItem("Korean Beef Bowl", "Asian", new BigDecimal("17.95"), "Savory beef bowl with rice and Korean-inspired sauce.", true, LocalDateTime.now()),
                    new MenuItem("Pork Ramen", "Asian", new BigDecimal("17.95"), "Hot ramen broth with pork, noodles, and toppings.", true, LocalDateTime.now()),
                    new MenuItem("California Roll", "Asian", new BigDecimal("11.95"), "Fresh sushi roll with crab-style filling and avocado.", true, LocalDateTime.now()),
                    new MenuItem("Salmon Roll", "Asian", new BigDecimal("14.95"), "Salmon sushi roll with clean fresh flavor.", true, LocalDateTime.now()),
                    new MenuItem("Edamame", "Asian", new BigDecimal("5.00"), "Steamed soybeans lightly salted.", true, LocalDateTime.now()),
                    new MenuItem("Potstickers", "Asian", new BigDecimal("9.00"), "Pan-seared dumplings with dipping sauce.", true, LocalDateTime.now()),

                    new MenuItem("Chicken Tacos", "Mexican", new BigDecimal("11.95"), "Soft tacos filled with seasoned chicken and salsa.", true, LocalDateTime.now()),
                    new MenuItem("Steak Tacos", "Mexican", new BigDecimal("13.95"), "Steak tacos with fresh toppings and lime.", true, LocalDateTime.now()),
                    new MenuItem("Chicken Burrito", "Mexican", new BigDecimal("12.95"), "Hearty burrito with chicken, rice, and beans.", true, LocalDateTime.now()),
                    new MenuItem("Steak Burrito", "Mexican", new BigDecimal("14.95"), "Grilled steak burrito with rich, savory filling.", true, LocalDateTime.now()),
                    new MenuItem("Chicken Torta", "Mexican", new BigDecimal("11.95"), "Mexican sandwich with chicken and fresh toppings.", true, LocalDateTime.now()),
                    new MenuItem("Steak Torta", "Mexican", new BigDecimal("13.95"), "Steak torta with bold flavors and soft bread.", true, LocalDateTime.now()),
                    new MenuItem("Cheese Quesadillas", "Mexican", new BigDecimal("10.50"), "Toasted tortilla filled with melted cheese.", true, LocalDateTime.now()),
                    new MenuItem("Chips & Salsa", "Mexican", new BigDecimal("7.00"), "Crunchy tortilla chips with fresh salsa.", true, LocalDateTime.now()),
                    new MenuItem("Chips & Guacamole", "Mexican", new BigDecimal("9.00"), "Tortilla chips served with creamy guacamole.", true, LocalDateTime.now()),

                    new MenuItem("Spaghetti", "Italian", new BigDecimal("14.50"), "Traditional spaghetti with savory tomato sauce.", true, LocalDateTime.now()),
                    new MenuItem("Spaghetti & Meatballs", "Italian", new BigDecimal("17.95"), "Classic spaghetti topped with hearty meatballs.", true, LocalDateTime.now()),
                    new MenuItem("Fettuccine Alfredo", "Italian", new BigDecimal("14.50"), "Creamy Alfredo pasta with rich parmesan flavor.", true, LocalDateTime.now()),
                    new MenuItem("Meat Lasagna", "Italian", new BigDecimal("17.95"), "Layered pasta with meat sauce and cheese.", true, LocalDateTime.now()),
                    new MenuItem("Cheese Lasagna", "Italian", new BigDecimal("15.50"), "Vegetarian lasagna with cheese-rich layers.", true, LocalDateTime.now()),
                    new MenuItem("Mushroom Ravioli", "Italian", new BigDecimal("15.50"), "Stuffed pasta with mushroom filling and sauce.", true, LocalDateTime.now()),
                    new MenuItem("Shrimp Scampi", "Italian", new BigDecimal("19.95"), "Garlic butter shrimp over pasta.", true, LocalDateTime.now()),
                    new MenuItem("Chicken Parmesan", "Italian", new BigDecimal("17.95"), "Crispy chicken topped with tomato sauce and cheese.", true, LocalDateTime.now()),
                    new MenuItem("Eggplant Parmesan", "Italian", new BigDecimal("16.95"), "Breaded eggplant baked with sauce and cheese.", true, LocalDateTime.now())
            );

            menuItemRepository.saveAll(items);
        };
    }
}