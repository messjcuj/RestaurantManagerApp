package com.example.restaurantmanagerserver.service.impl;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.dto.OrderDishDTO;
import com.example.restaurantmanagerserver.entity.Dish;
import com.example.restaurantmanagerserver.entity.Dish;
import com.example.restaurantmanagerserver.entity.Drink;
import com.example.restaurantmanagerserver.repository.DishRepository;
import com.example.restaurantmanagerserver.repository.DishRepository;
import com.example.restaurantmanagerserver.service.DishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DishServiceImpl implements DishService {
    @Autowired
    private DishRepository repo;

    @Override
    @Transactional
    public List<Dish> getAllDish() {
        return repo.findAll();
    }

    @Override
    @Transactional
    public Dish getDish(long id) {
        Dish x = new Dish();
        try {

            x = repo.findById(id).get();
        } catch (Exception e) {

            return null;
        }

        return x;
    }

    @Override
    @Transactional
    public Dish addDish(Dish dish) {
       // try {
         //   repo.addDish(dish.getName(), dish.getUrlImage(),dish.getDescription(),dish.getPrice(),dish.getUnit(),dish.getDishType().getId());
        //} catch (Exception e) {
         //   e.printStackTrace();
          //  return new MessageDTO("Add dish", "Unsuccessfully");
       // }
        //return new MessageDTO("Add dish", "Successfully");
    return  repo.save(dish);
    }
    @Override
    @Transactional
    public MessageDTO addOrderDish(OrderDishDTO orderDishDTO) {
        try {
            repo.addOrderDish(orderDishDTO.getOrder_id(),orderDishDTO.getDish_id(),orderDishDTO.getPrice(),orderDishDTO.getQuantity(),orderDishDTO.getUnit(),orderDishDTO.getType());
        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Add dish", "Unsuccessfully");
        }
        return new MessageDTO("Add dish", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteDish(long id) {
        try {
            repo.deleteDishById(id);

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete dish", "Unsuccessfully");
        }
        return new MessageDTO("Delete dish", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteOrderDishByDishId(long id) {
        try {
            repo.deleteOrderDishByDishId(id);

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete dish", "Unsuccessfully");
        }
        return new MessageDTO("Delete dish", "Successfully");
    }
    @Override
    @Transactional
    public MessageDTO deleteOrderDishByOrderDishId(OrderDishDTO orderDishDTO) {
        try {
            repo.deleteOrderDishByOrderDishId(orderDishDTO.getOrder_id(),orderDishDTO.getDish_id());

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete dish", "Unsuccessfully");
        }
        return new MessageDTO("Delete dish", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO updateDish(long id, Dish dish) {
        try {

            repo.updateDish(id,dish.getName(),dish.getUrlImage(),dish.getDescription(),dish.getPrice(),dish.getUnit(),dish.getDishType().getId());

        } catch (Exception e) {

            //e.printStackTrace();
            return new MessageDTO("Update", "Unsuccessfully");
        }
        return new MessageDTO("Update", "Successfully");
    }
    @Override
    @Transactional
    public MessageDTO updateOrderdishByOrderDishId(long order_id, long dish_id, OrderDishDTO orderDishDTO) {
        try {

            repo.updateOrderdishByOrderDishId(order_id,dish_id,orderDishDTO.getOrder_id(),orderDishDTO.getDish_id(),orderDishDTO.getPrice(),orderDishDTO.getQuantity(),orderDishDTO.getUnit(),orderDishDTO.getType());

        } catch (Exception e) {

            //e.printStackTrace();
            return new MessageDTO("Update", "Unsuccessfully");
        }
        return new MessageDTO("Update", "Successfully");
    }
    @Override
    @Transactional
    public List<Dish> searchDish(String name, String price, String unit) {
        return repo.searchDish(name,price,unit);
    }
}
