package com.example.restaurantmanagerserver.entity;


import com.example.restaurantmanagerserver.entity.embeddable.OrderDiningTable;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;


@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "diningtables")
public class DiningTable implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(columnDefinition = "nvarchar(255)")
    private String name;

    @Column(columnDefinition = "nvarchar(255)")
    private String status;

    @Column(columnDefinition = "nvarchar(255)")
    private String type;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "area_id")
    //@JsonBackReference
    @JsonIgnoreProperties("diningTables")
    private Area area;


//    @ManyToMany(mappedBy = "diningTables")
    //@JsonManagedReference
  //  @JsonIgnoreProperties("diningTables")
    //private Set<Order> orders;

    @OneToMany(
            mappedBy = "diningTable",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnoreProperties("diningTable")
    private Set<OrderDiningTable> orders;
}
