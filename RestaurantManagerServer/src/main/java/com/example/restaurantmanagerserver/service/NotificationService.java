package com.example.restaurantmanagerserver.service;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.entity.Notification;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface NotificationService {
    List<Notification> getAllNotification();

    Notification getNotification(long id);

    MessageDTO addNotification(Notification x);

    MessageDTO deleteNotification(long id);

    MessageDTO updateNotification(long id, Notification khoHang);

    List<Notification> searchNotification(String name, String status, String time);
}
