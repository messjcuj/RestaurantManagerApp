package com.example.restaurantmanagerserver.entity;

import com.example.restaurantmanagerserver.entity.embeddable.ShipmentResource;
import com.example.restaurantmanagerserver.entity.embeddable.ShipmentDrink;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "shipments")
public class Shipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "nvarchar(255)")
    private String name;
    @Column(columnDefinition = "nvarchar(255)")
    private LocalDate time;

    @OneToMany(
            mappedBy = "shipment",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnoreProperties("shipment")
    private Set<ShipmentResource> resources;

    @OneToMany(
            mappedBy = "shipment",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnoreProperties("shipment")
    private Set<ShipmentDrink> drinks;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "warehouse_id")
    //@JsonBackReference
    @JsonIgnoreProperties("shipments")
    private Warehouse warehouse;
}
