package com.example.restaurantmanagerserver.entity.embeddable;

import com.example.restaurantmanagerserver.entity.DiningTable;
import com.example.restaurantmanagerserver.entity.Dish;
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
@Table(name = "orders_dishs")
public class OrderDish implements Serializable {

    @EmbeddedId
    private OrderDishRatingKey id;

    @ManyToOne
    @MapsId("order_id")
    @JoinColumn(name = "order_id")
    @JsonIgnoreProperties("dishs")
    private Order order;

    @ManyToOne
    @MapsId("dish_id")
    @JoinColumn(name = "dish_id")
    @JsonIgnoreProperties("orders")
    private Dish dish;

    @Column(name = "quantity")
    private long quantity;


    @Column(name = "price")
    private double price;

    @Column(name = "unit",columnDefinition = "nvarchar(255)")
    private String unit;

    @Column(name = "type",columnDefinition = "nvarchar(255)")
    private String type;
}
