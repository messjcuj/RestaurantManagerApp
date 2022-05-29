package com.example.restaurantmanagerserver.entity.embeddable;

import com.example.restaurantmanagerserver.entity.Drink;
import com.example.restaurantmanagerserver.entity.Shipment;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "shipments_drinks")
public class ShipmentDrink implements Serializable {
    @EmbeddedId
    private ShipmentDrinkRatingKey id;

    @ManyToOne
    @MapsId("shipment_id")
    @JoinColumn(name = "shipment_id")
    @JsonIgnoreProperties("drinks")
    private Shipment shipment;

    @ManyToOne
    @MapsId("drink_id")
    @JoinColumn(name = "drink_id")
    @JsonIgnoreProperties("shipments")
    private Drink drink;
    @Column(name = "quantity")
    private long quantity;
    @Column(name = "preserveTime")
    private LocalDate preserveTime;
    private double price;

}
