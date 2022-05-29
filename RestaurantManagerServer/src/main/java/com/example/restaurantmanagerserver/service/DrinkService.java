package com.example.restaurantmanagerserver.service;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.dto.OrderDrinkDTO;
import com.example.restaurantmanagerserver.entity.Drink;
import com.example.restaurantmanagerserver.entity.Drink;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface DrinkService {


    List<Drink> getAllDrink();

    Drink getDrink(long id);

    Drink addDrink(Drink drink);

    MessageDTO addOrderDrink(OrderDrinkDTO orderDrinkDTO);

    MessageDTO deleteDrink(long id);

    MessageDTO deleteOrderDrinkByDrinkId(long id);

    MessageDTO deleteOrderDrinkByOrderDrinkId(OrderDrinkDTO orderDrinkDTO);

    MessageDTO updateDrink(long id, Drink drink);

    MessageDTO updateOrderdrinkByOrderDrinkId(long order_id, long drink_id, OrderDrinkDTO orderDrinkDTO);

    List<Drink> searchDrink(String name, String price, String unit);
}
