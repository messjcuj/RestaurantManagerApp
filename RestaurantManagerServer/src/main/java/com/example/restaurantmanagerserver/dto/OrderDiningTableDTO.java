package com.example.restaurantmanagerserver.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OrderDiningTableDTO {
    private long order_id;
    private long diningTable_id;
    private String type;
}
