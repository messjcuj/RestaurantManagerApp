package com.example.restaurantmanagerserver.service.impl;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.entity.Notification;
import com.example.restaurantmanagerserver.repository.NotificationRepository;
import com.example.restaurantmanagerserver.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {


    @Autowired
    private NotificationRepository repo;

    @Override
    @Transactional
    public List<Notification> getAllNotification() {
        return repo.findAll();
    }

    @Override
    @Transactional
    public Notification getNotification(long id) {
        Notification x = new Notification();
        try {

            x = repo.findById(id).get();
        } catch (Exception e) {

            return null;
        }

        return x;
    }

    @Override
    @Transactional
    public MessageDTO addNotification(Notification x) {

        try {
            x.setTime(LocalDateTime.now());
            repo.addNotification(x.getName(), x.getDetail(), x.getTime(), x.getStatus(), x.getUser().getId());
        } catch (Exception e) {
            //e.printStackTrace();
            return new MessageDTO("Add notification", "Unsuccessfully");
        }
        return new MessageDTO("Add notification", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteNotification(long id) {
        try {

            repo.deleteNotificationById(id);
        } catch (Exception e) {
            return new MessageDTO("Delete notification", "Unsuccessfully");
        }
        return new MessageDTO("Delete notification", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO updateNotification(long id, Notification x) {
        try {
            repo.updateNotification(id, x.getName(), x.getDetail(), x.getTime(), x.getStatus(), x.getUser().getId());

        } catch (Exception e) {
            //e.printStackTrace();
            return new MessageDTO("Update notification", "Unsuccessfully");
        }
        return new MessageDTO("Update notification", "Successfully");
    }

    @Override
    @Transactional
    public List<Notification> searchNotification(String name, String status, String time) {
        //String time="2022-03-29 16:25:27.195";
        return repo.searchNotification(name, status, time);//searchNotification(notification.getName(),notification.getStatus(),notification.getTime());
    }
}
