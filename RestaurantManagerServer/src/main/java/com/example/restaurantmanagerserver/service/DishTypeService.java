package com.example.restaurantmanagerserver.service;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.entity.DishType;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface DishTypeService {

    List<DishType> getAllDishType();

    DishType getDishType(long id);

    MessageDTO addDishType(DishType x);

    MessageDTO deleteDishType(long id);

    MessageDTO updateDishType(long id, DishType dishType);

    List<DishType> searchDishType(DishType dishType);
}
