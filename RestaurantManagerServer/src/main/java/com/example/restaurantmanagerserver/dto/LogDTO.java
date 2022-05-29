package com.example.restaurantmanagerserver.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class LogDTO {
    private String title;
    private String time;
    private String detail;

    private static LogDTO instance;

    private LogDTO(){}

    public static LogDTO getInstance(){
        if(instance == null){
            instance = new LogDTO();
        }
        return instance;
    }

}
