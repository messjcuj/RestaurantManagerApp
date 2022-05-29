package com.example.restaurantmanagerserver.service;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.dto.OrderUserDTO;
import com.example.restaurantmanagerserver.entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserService {


    UserDetails loadUserById(long id);


    List<User> getAllUser();

    User getUser(long id);

    MessageDTO addUser(User user);

    MessageDTO addOrderUser(OrderUserDTO orderUserDTO);

    MessageDTO deleteUser(long id);

    MessageDTO deleteOrderUserByUserId(long id);

    MessageDTO deleteOrderUserByOrderUserId(OrderUserDTO orderUserDTO);

    MessageDTO updateUser(long id, User user);

    MessageDTO updateOrderuserByOrderUserId(long order_id, long user_id, OrderUserDTO orderUserDTO);

    List<User> searchUser(String birthDay, String name, String phone, String userName, String gender);
}
