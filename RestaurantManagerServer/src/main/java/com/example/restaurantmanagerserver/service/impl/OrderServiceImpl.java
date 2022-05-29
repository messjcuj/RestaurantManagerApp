package com.example.restaurantmanagerserver.service.impl;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.dto.OrderDiningTableDTO;
import com.example.restaurantmanagerserver.dto.OrderUserDTO;
import com.example.restaurantmanagerserver.entity.Order;
import com.example.restaurantmanagerserver.repository.OrderRepository;
import com.example.restaurantmanagerserver.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository repo;

    @Override
    @Transactional
    public List<Order> getAllOrder() {
        return repo.findAll();
    }

    @Override
    @Transactional
    public Order getOrder(long id) {
        Order x = new Order();
        try {

            x = repo.findById(id).get();
        } catch (Exception e) {

            return null;
        }

        return x;
    }

    @Override
    @Transactional
    public Order addOrder(Order x) {

        //try {
            x.setTime(LocalDateTime.now());
            //repo.addOrder(x.getVat(), x.getStatus(), x.getTime(), x.getType());
        //} catch (Exception e) {

          //  return new MessageDTO("Add order", "Unsuccessfully");
        //}
        //return new MessageDTO("Add", "Successfully");
        return repo.save(x);
    }


    @Override
    @Transactional
    public MessageDTO deleteOrderById(long id) {
        try {

            repo.deleteOrderById(id);

        } catch (Exception e) {

            return new MessageDTO("Delete order", "Unsuccessfully");
        }
        return new MessageDTO("Delete order", "Successfully");
    }
    @Override
    @Transactional
    public MessageDTO deleteOrderDishByOrderId(long id) {
        try {

            repo.deleteOrderDishByOrderId(id);

        } catch (Exception e) {

            return new MessageDTO("Delete order", "Unsuccessfully");
        }
        return new MessageDTO("Delete order", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteOrderUserByOrderId(long id) {
        try {

            repo.deleteOrderUserByOrderId(id);

        } catch (Exception e) {

            return new MessageDTO("Delete order", "Unsuccessfully");
        }
        return new MessageDTO("Delete order", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteOrderDrinksByOrderId(long id) {
        try {

            repo.deleteOrderDrinksByOrderId(id);

        } catch (Exception e) {

            return new MessageDTO("Delete order", "Unsuccessfully");
        }
        return new MessageDTO("Delete order", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteOrderDiningTableByOrderId(long id) {
        try {

            repo.deleteOrderDiningTableByOrderId(id);

        } catch (Exception e) {

            return new MessageDTO("Delete order", "Unsuccessfully");
        }
        return new MessageDTO("Delete order", "Successfully");
    }


    @Override
    @Transactional
    public MessageDTO updateOrder(long id, Order order) {
        try {
            //order.setTime(LocalDateTime.now());
            repo.updateOrder(id, order.getVat(), order.getTime(), order.getType(), order.getStatus());

        } catch (Exception e) {
            return new MessageDTO("Update order", "Unsuccessfully");
            ////e.printStackTrace();
        }
        return new MessageDTO("Update order", "Successfully");
    }


    @Override
    @Transactional
    public List<Order> searchOrder(String vat, String time, String type, String status) {
        return repo.searchOrder(vat, time, type, status);
    }
}
