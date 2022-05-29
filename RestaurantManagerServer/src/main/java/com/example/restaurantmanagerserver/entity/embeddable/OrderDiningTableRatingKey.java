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
public class OrderDiningTableRatingKey implements Serializable {

    @Column(name = "order_id")
    long order_id;

    @Column(name = "diningtable_id")
    long diningtable_id;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderDiningTableRatingKey that = (OrderDiningTableRatingKey) o;
        return order_id == that.order_id && diningtable_id == that.diningtable_id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(order_id, diningtable_id);
    }
}
