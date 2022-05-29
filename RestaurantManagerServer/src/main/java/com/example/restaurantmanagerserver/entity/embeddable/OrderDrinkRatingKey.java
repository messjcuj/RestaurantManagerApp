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
public class OrderDrinkRatingKey implements Serializable {

    @Column(name = "order_id")
    long order_id;

    @Column(name = "drink_id")
    long drink_id;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderDrinkRatingKey that = (OrderDrinkRatingKey) o;
        return order_id == that.order_id && drink_id == that.drink_id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(order_id, drink_id);
    }
}

