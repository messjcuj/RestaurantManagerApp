package com.example.restaurantmanagerserver.dto;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OrderUserDTO {
    private long order_id;
    private long user_id;
}
