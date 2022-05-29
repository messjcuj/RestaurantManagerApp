package com.example.restaurantmanagerserver.entity.embeddable;

import com.example.restaurantmanagerserver.entity.Dish;
import com.example.restaurantmanagerserver.entity.Order;
import com.example.restaurantmanagerserver.entity.User;
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
@Table(name = "orders_users")
public class OrderUser implements Serializable {

    @EmbeddedId
    private OrderUserRatingKey id;

    @ManyToOne
    @MapsId("order_id")
    @JoinColumn(name = "order_id")
    @JsonIgnoreProperties("users")
    private Order order;

    @ManyToOne
    @MapsId("user_id")
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("orders")
    private User user;


}

