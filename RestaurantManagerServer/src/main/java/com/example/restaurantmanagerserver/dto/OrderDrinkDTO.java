package com.example.restaurantmanagerserver.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OrderDrinkDTO {
    private long order_id;
    private long drink_id;
    private long quantity;
    private double price;
    private String unit;
    private String type;

}
