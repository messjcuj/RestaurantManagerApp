package com.example.restaurantmanagerserver.service;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.dto.OrderDiningTableDTO;
import com.example.restaurantmanagerserver.dto.OrderUserDTO;
import com.example.restaurantmanagerserver.entity.Order;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderService {

    List<Order> getAllOrder();

    Order getOrder(long id);

    Order addOrder(Order x);

    MessageDTO deleteOrderById(long id);

    MessageDTO deleteOrderDishByOrderId(long id);

    MessageDTO deleteOrderUserByOrderId(long id);

    MessageDTO deleteOrderDrinksByOrderId(long id);

    MessageDTO deleteOrderDiningTableByOrderId(long id);

    MessageDTO updateOrder(long id, Order order);

    List<Order> searchOrder(String vat, String time, String type, String status);
}
