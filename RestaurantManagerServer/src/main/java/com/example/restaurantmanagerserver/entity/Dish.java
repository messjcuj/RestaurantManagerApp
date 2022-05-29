package com.example.restaurantmanagerserver.entity;


import com.example.restaurantmanagerserver.entity.embeddable.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "dishs")
public class Dish {


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
    @JoinColumn(name = "dishtype_id")
    //@JsonBackReference
    @JsonIgnoreProperties("dishs")
    private DishType dishType;

    @OneToMany(
            mappedBy = "dish",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnoreProperties("dish")
    private Set<OrderDish> orders;
    @OneToMany(
            mappedBy = "dish",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnoreProperties("dish")
    private Set<ResourceDish> resources;

}
