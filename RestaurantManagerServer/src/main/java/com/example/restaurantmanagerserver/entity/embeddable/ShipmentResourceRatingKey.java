package com.example.restaurantmanagerserver.entity.embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class ShipmentResourceRatingKey implements Serializable {
    @Column(name = "shipment_id")
    long shipment_id;

    @Column(name = "resource_id")
    long resource_id;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShipmentResourceRatingKey that = (ShipmentResourceRatingKey) o;
        return shipment_id == that.shipment_id && resource_id == that.resource_id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(shipment_id, resource_id);
    }
}
