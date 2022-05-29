package com.example.restaurantmanagerserver.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class OrderDishDTO {
    private long order_id;
    private long dish_id;
    private long quantity;
    private double price;
    private String unit;
    private String type;
}
