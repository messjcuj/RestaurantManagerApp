package com.example.restaurantmanagerserver.entity.embeddable;

import com.example.restaurantmanagerserver.entity.DiningTable;
import com.example.restaurantmanagerserver.entity.Order;
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
@Table(name = "orders_diningtables")
public class OrderDiningTable implements Serializable {

    @EmbeddedId
    private OrderDiningTableRatingKey id;

    @ManyToOne
    @MapsId("order_id")
    @JoinColumn(name = "order_id")
    @JsonIgnoreProperties("diningTables")
    private Order order;

    @ManyToOne
    @MapsId("diningtable_id")
    @JoinColumn(name = "diningtable_id")
    @JsonIgnoreProperties("orders")
    private DiningTable diningTable;

    @Column(name = "type",columnDefinition = "nvarchar(255)")
    private String type;

}
