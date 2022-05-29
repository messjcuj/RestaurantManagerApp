package com.example.restaurantmanagerserver.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
public class ErrorMessageDTO extends RuntimeException{
    private int statusCode;
    private String message;

    private static ErrorMessageDTO instance;

    private ErrorMessageDTO(){}

    public static ErrorMessageDTO getInstance(){
        if(instance == null){
            instance = new ErrorMessageDTO();
        }
        return instance;
    }
}
