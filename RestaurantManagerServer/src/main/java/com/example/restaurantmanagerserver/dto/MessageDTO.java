package com.example.restaurantmanagerserver.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class MessageDTO {
    String title;
    String detail;

    private static MessageDTO instance;

    private MessageDTO(){}

    public static MessageDTO getInstance(){
        if(instance == null){
            instance = new MessageDTO();
        }
        return instance;
    }

}
