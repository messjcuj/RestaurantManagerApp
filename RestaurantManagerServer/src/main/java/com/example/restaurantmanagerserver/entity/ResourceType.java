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
@Table(name = "resourcetypes")
public class ResourceType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "nvarchar(255)")
    private String name;
    @Column(columnDefinition = "nvarchar(255)")
    private String description;

    @OneToMany(mappedBy = "resourceType", fetch = FetchType.EAGER,
            cascade = CascadeType.ALL)
    //@JsonBackReference
    @Column(nullable = true)
    @JsonIgnoreProperties("resourceType")
    private Set<Resource> resources;
}
