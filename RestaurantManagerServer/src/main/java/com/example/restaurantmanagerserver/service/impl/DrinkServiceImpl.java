package com.example.restaurantmanagerserver.service.impl;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.dto.OrderDrinkDTO;
import com.example.restaurantmanagerserver.entity.Drink;
import com.example.restaurantmanagerserver.entity.Drink;
import com.example.restaurantmanagerserver.repository.DrinkRepository;
import com.example.restaurantmanagerserver.repository.DrinkRepository;
import com.example.restaurantmanagerserver.service.DrinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DrinkServiceImpl implements DrinkService {
    @Autowired
    private DrinkRepository repo;

    @Override
    @Transactional
    public List<Drink> getAllDrink() {
        return repo.findAll();
    }

    @Override
    @Transactional
    public Drink getDrink(long id) {
        Drink x = new Drink();
        try {

            x = repo.findById(id).get();
        } catch (Exception e) {

            return null;
        }

        return x;
    }

    @Override
    @Transactional
    public Drink addDrink(Drink drink) {

            //repo.addDrink(drink.getName(), drink.getUrlImage(),drink.getDescription(),drink.getPrice(),drink.getUnit(),drink.getDrinkType().getId());
        return repo.save(drink);

    }
    @Override
    @Transactional
    public MessageDTO addOrderDrink(OrderDrinkDTO orderDrinkDTO) {
        try {
            repo.addOrderDrink(orderDrinkDTO.getOrder_id(),orderDrinkDTO.getDrink_id(),orderDrinkDTO.getPrice(),orderDrinkDTO.getQuantity(),orderDrinkDTO.getUnit(),orderDrinkDTO.getType());
        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Add drink", "Unsuccessfully");
        }
        return new MessageDTO("Add drink", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteDrink(long id) {
        try {
            repo.deleteDrinkById(id);

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete drink", "Unsuccessfully");
        }
        return new MessageDTO("Delete drink", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteOrderDrinkByDrinkId(long id) {
        try {
            repo.deleteOrderDrinkByDrinkId(id);

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete drink", "Unsuccessfully");
        }
        return new MessageDTO("Delete drink", "Successfully");
    }
    @Override
    @Transactional
    public MessageDTO deleteOrderDrinkByOrderDrinkId(OrderDrinkDTO orderDrinkDTO) {
        try {
            repo.deleteOrderDrinkByOrderDrinkId(orderDrinkDTO.getOrder_id(),orderDrinkDTO.getDrink_id());

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete drink", "Unsuccessfully");
        }
        return new MessageDTO("Delete drink", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO updateDrink(long id, Drink drink) {
        try {

            repo.updateDrink(id,drink.getName(),drink.getUrlImage(),drink.getDescription(),drink.getPrice(),drink.getUnit(),drink.getDrinkType().getId());

        } catch (Exception e) {

            //e.printStackTrace();
            return new MessageDTO("Update", "Unsuccessfully");
        }
        return new MessageDTO("Update", "Successfully");
    }
    @Override
    @Transactional
    public MessageDTO updateOrderdrinkByOrderDrinkId(long order_id, long drink_id, OrderDrinkDTO orderDrinkDTO) {
        try {

            repo.updateOrderdrinkByOrderDrinkId(order_id,drink_id,orderDrinkDTO.getOrder_id(),orderDrinkDTO.getDrink_id(),orderDrinkDTO.getPrice(),orderDrinkDTO.getQuantity(),orderDrinkDTO.getUnit(),orderDrinkDTO.getType());

        } catch (Exception e) {

            //e.printStackTrace();
            return new MessageDTO("Update", "Unsuccessfully");
        }
        return new MessageDTO("Update", "Successfully");
    }
    @Override
    @Transactional
    public List<Drink> searchDrink(String name, String price, String unit) {
        return repo.searchDrink(name,price,unit);
    }
}
