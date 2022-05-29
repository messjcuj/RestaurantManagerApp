package com.example.restaurantmanagerserver.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "dishtypes")
public class DishType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long  id;
    @Column(columnDefinition = "nvarchar(255)")
    private String name;
    @Column(columnDefinition = "nvarchar(255)")
    private String description;

    @OneToMany(mappedBy = "dishType", fetch = FetchType.EAGER,
            cascade = CascadeType.ALL)
    //@JsonBackReference
    @Column(nullable = true)
    @JsonIgnoreProperties("dishType")
    private Set<Dish> dishs;
}
