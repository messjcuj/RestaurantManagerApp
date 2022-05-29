package com.example.restaurantmanagerserver.entity;

import com.example.restaurantmanagerserver.entity.embeddable.OrderDiningTable;
import com.example.restaurantmanagerserver.entity.embeddable.OrderUser;
import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.*;
import javax.persistence.Table;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;


@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false, unique = true)
    private String userName;
    @Column(nullable = false)
    private String password;
    @Column(columnDefinition = "nvarchar(255)")
    private String name;
    //@Column(name = "birthDay")
    private LocalDate birthDay;
    @Column(columnDefinition = "nvarchar(255)")
    private String gender;
    //@Column(name = "phone",columnDefinition = "nvarchar(255)")
    private String phone;
    //@Column(name = "token",columnDefinition = "nvarchar(255)")
    private String token;


    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "userrole_id")
    //@JsonBackReference
    @JsonIgnoreProperties("users")
    private UserRole userRole;


    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Column(nullable = true)
    //@JsonManagedReference
    @JsonIgnoreProperties("user")
    private Set<Notification> notifications;

    //@ManyToMany(mappedBy = "users", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    //@JsonBackReference
    //@JsonIgnoreProperties("users")
    //private Set<Order> orders;
    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnoreProperties("user")
    private Set<OrderUser> orders;
}
