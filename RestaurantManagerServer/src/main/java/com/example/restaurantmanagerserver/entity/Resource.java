package com.example.restaurantmanagerserver.entity;

import com.example.restaurantmanagerserver.entity.embeddable.OrderDiningTable;
import com.example.restaurantmanagerserver.entity.embeddable.ResourceDish;
import com.example.restaurantmanagerserver.entity.embeddable.ShipmentResource;
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
@Table(name = "resources")
public class Resource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "nvarchar(255)")
    private String name;
    @Column(columnDefinition = "nvarchar(255)")
    private String description;
    @Column(columnDefinition = "nvarchar(255)")
    private String unit;
    @Column(columnDefinition = "nvarchar(255)")
    private String urlImage;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "resourcetype_id")
    //@JsonBackReference
    @JsonIgnoreProperties("resources")
    private ResourceType resourceType;

    @OneToMany(
            mappedBy = "resource",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnoreProperties("resource")
    private Set<ResourceDish> dishs;
    @OneToMany(
            mappedBy = "resource",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnoreProperties("resource")
    private Set<ShipmentResource> shipments;
}
