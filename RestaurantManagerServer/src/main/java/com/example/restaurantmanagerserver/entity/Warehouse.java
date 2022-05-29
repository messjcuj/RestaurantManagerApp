package com.example.restaurantmanagerserver.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Set;


@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "warehouses")
public class Warehouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(columnDefinition = "nvarchar(255)")
    private String name;

    @Column(columnDefinition = "nvarchar(255)")
    private String description;


    @OneToMany(mappedBy = "warehouse", fetch = FetchType.EAGER,
            cascade = CascadeType.ALL)
    //@JsonBackReference
    @Column(nullable = true)
    @JsonIgnoreProperties("warehouse")
    private Set<Shipment> shipments;

}
