package com.example.restaurantmanagerserver.entity.embeddable;

import com.example.restaurantmanagerserver.entity.Dish;
import com.example.restaurantmanagerserver.entity.Order;
import com.example.restaurantmanagerserver.entity.Resource;
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
@Table(name = "resources_dishs")
public class ResourceDish implements Serializable {

    @EmbeddedId
    private ResourceDishRatingKey id;

    @ManyToOne
    @MapsId("resource_id")
    @JoinColumn(name = "resource_id")
    @JsonIgnoreProperties("dishs")
    private Resource resource;

    @ManyToOne
    @MapsId("dish_id")
    @JoinColumn(name = "dish_id")
    @JsonIgnoreProperties("resources")
    private Dish dish;

    @Column(name = "quantity")
    private long quantity;

    @Column(name = "unit",columnDefinition = "nvarchar(255)")
    private String unit;

}

