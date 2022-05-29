package com.example.restaurantmanagerserver.service;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.dto.OrderDishDTO;
import com.example.restaurantmanagerserver.entity.Dish;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface DishService {


    List<Dish> getAllDish();

    Dish getDish(long id);

    Dish addDish(Dish dish);

    MessageDTO addOrderDish(OrderDishDTO orderDishDTO);

    MessageDTO deleteDish(long id);

    MessageDTO deleteOrderDishByDishId(long id);

    MessageDTO deleteOrderDishByOrderDishId(OrderDishDTO orderDishDTO);

    MessageDTO updateDish(long id, Dish dish);

    MessageDTO updateOrderdishByOrderDishId(long order_id, long dish_id, OrderDishDTO orderDishDTO);

    List<Dish> searchDish(String name, String price, String unit);
}
