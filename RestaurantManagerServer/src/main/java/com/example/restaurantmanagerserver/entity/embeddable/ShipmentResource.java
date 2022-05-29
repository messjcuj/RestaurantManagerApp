package com.example.restaurantmanagerserver.entity.embeddable;

import com.example.restaurantmanagerserver.entity.Resource;
import com.example.restaurantmanagerserver.entity.Shipment;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "shipments_resources")
public class ShipmentResource implements Serializable {

    @EmbeddedId
    private ShipmentResourceRatingKey id;

    @ManyToOne
    @MapsId("shipment_id")
    @JoinColumn(name = "shipment_id")
    @JsonIgnoreProperties("resources")
    private Shipment shipment;

    @ManyToOne
    @MapsId("resource_id")
    @JoinColumn(name = "resource_id")
    @JsonIgnoreProperties("shipments")
    private Resource resource;

    @Column(name = "quantity")
    private long quantity;
    @Column(name = "preserveTime")
    private LocalDate preserveTime;
    private double price;
}
