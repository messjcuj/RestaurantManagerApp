package com.example.restaurantmanagerserver.entity;


import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.*;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Set;


@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "userroles")
public class UserRole implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "nvarchar(255)")
    private String name;
    @Column(columnDefinition = "nvarchar(255)")
    private String description;



    @OneToMany(mappedBy = "userRole", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Column(nullable = true)
    //@JsonManagedReference
    @JsonIgnoreProperties("userRole")
    private Set<User> users;



}
