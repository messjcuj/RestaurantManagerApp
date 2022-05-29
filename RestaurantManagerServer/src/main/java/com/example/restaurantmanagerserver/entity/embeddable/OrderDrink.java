package com.example.restaurantmanagerserver.entity.embeddable;

import com.example.restaurantmanagerserver.entity.Dish;
import com.example.restaurantmanagerserver.entity.Drink;
import com.example.restaurantmanagerserver.entity.Order;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders_drinks")
public class OrderDrink implements Serializable {

    @EmbeddedId
    private OrderDrinkRatingKey id;

    @ManyToOne
    @MapsId("order_id")
    @JoinColumn(name = "order_id")
    @JsonIgnoreProperties("drinks")
    private Order order;

    @ManyToOne
    @MapsId("drink_id")
    @JoinColumn(name = "drink_id")
    @JsonIgnoreProperties("orders")
    private Drink drink;

    @Column(name = "quantity")
    private long quantity;

    @Column(name = "price")
    private double price;

    @Column(name = "unit",columnDefinition = "nvarchar(255)")
    private String unit;

    @Column(name = "type",columnDefinition = "nvarchar(255)")
    private String type;

}

