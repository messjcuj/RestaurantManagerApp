package com.example.restaurantmanagerserver.service;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.entity.UserRole;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserRoleService {
    List<UserRole> getAllUserRole();

    UserRole getUserRole(long id);

    MessageDTO addUserRole(UserRole x);

    MessageDTO deleteUserRole(long id);

    MessageDTO updateUserRole(long id, UserRole khoHang);

    List<UserRole> searchUserRole(String name);
}
