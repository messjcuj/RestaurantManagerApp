package com.example.restaurantmanagerserver.entity;

import com.example.restaurantmanagerserver.entity.embeddable.OrderDiningTable;
import com.example.restaurantmanagerserver.entity.embeddable.OrderDrink;
import com.example.restaurantmanagerserver.entity.embeddable.ShipmentDrink;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "drinks")
public class Drink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "nvarchar(255)")
    private String name;
    @Column(columnDefinition = "nvarchar(255)")
    private String unit;
    @Column(columnDefinition = "nvarchar(255)")
    private String description;
    @Column(columnDefinition = "nvarchar(255)")
    private String urlImage;
    private double price;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "drinktype_id")
    //@JsonBackReference
    @JsonIgnoreProperties("drinks")
    private DrinkType drinkType;

    @OneToMany(
            mappedBy = "drink",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnoreProperties("drink")
    private Set<OrderDrink> orders;


    @OneToMany(
            mappedBy = "drink",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnoreProperties("drink")
    private Set<ShipmentDrink> shipments;
}
