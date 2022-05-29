package com.example.restaurantmanagerserver.entity;

import com.example.restaurantmanagerserver.entity.embeddable.OrderDiningTable;
import com.example.restaurantmanagerserver.entity.embeddable.OrderDish;
import com.example.restaurantmanagerserver.entity.embeddable.OrderDrink;
import com.example.restaurantmanagerserver.entity.embeddable.OrderUser;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;


@Entity
@Setter
@Getter
@AllArgsConstructor 
@NoArgsConstructor
@Table(name = "orders")
public class Order implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDateTime time;
    @Column(columnDefinition = "nvarchar(255)")
    private String type;
    @Column(columnDefinition = "nvarchar(255)")
    private String status;
    private double vat;


    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnoreProperties("order")
    private Set<OrderDiningTable> diningTables;

    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnoreProperties("order")
    private Set<OrderUser> users;

    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnoreProperties("order")
    private Set<OrderDish> dishs;

    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnoreProperties("order")
    private Set<OrderDrink> drinks;


}
