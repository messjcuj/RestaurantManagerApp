package com.example.restaurantmanagerserver.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResourceDishDTO {
    private long resource_id;
    private long dish_id;
    private long quantity;
    private String unit;
}
