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
public class ShipmentResourceDTO {
    private long shipment_id;
    private long resource_id;
    private long quantity;
    private LocalDate preserveTime;
    private double price;
}
