package com.example.restaurantmanagerserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDTO {
    private long id;
    private String userName;
    private String password;
    private String gender;
    private String token;
    private String phone;
    private String name;
    private String birthDay;
    private String role;

    private static UserDTO instance;

    private UserDTO() {
    }

    public static UserDTO getInstance() {
        if (instance == null) {
            instance = new UserDTO();
        }
        return instance;
    }

}
