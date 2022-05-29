package com.example.restaurantmanagerserver.service;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.entity.DrinkType;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface DrinkTypeService {

    List<DrinkType> getAllDrinkType();

    DrinkType getDrinkType(long id);

    MessageDTO addDrinkType(DrinkType x);

    MessageDTO deleteDrinkType(long id);

    MessageDTO updateDrinkType(long id, DrinkType drinkType);

    List<DrinkType> searchDrinkType(DrinkType drinkType);
}
