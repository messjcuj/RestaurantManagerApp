package com.example.restaurantmanagerserver.service.impl;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.entity.DishType;
import com.example.restaurantmanagerserver.repository.DishTypeRepository;
import com.example.restaurantmanagerserver.service.DishTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DishTypeServiceImpl implements DishTypeService {
    @Autowired
    private DishTypeRepository repo;

    @Override
    @Transactional
    public List<DishType> getAllDishType() {
        return repo.findAll();
    }

    @Override
    @Transactional
    public DishType getDishType(long id) {
        DishType x = new DishType();
        try {

            x = repo.findById(id).get();
        } catch (Exception e) {

            return null;
        }

        return x;
    }

    @Override
    @Transactional
    public MessageDTO addDishType(DishType x) {

        try {
            repo.addDishType(x.getName(), x.getDescription());
        } catch (Exception e) {
            //e.printStackTrace();
            return new MessageDTO("Add dishType", "Unsuccessfully");
        }
        return new MessageDTO("Add dishType", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteDishType(long id) {
        try {

            repo.deleteDishTypeById(id);

        } catch (Exception e) {
            //e.printStackTrace();
            return new MessageDTO("Delete dishType", "Unsuccessfully");
        }
        return new MessageDTO("Delete dishType","Successfully");
    }

    @Override
    @Transactional
    public MessageDTO updateDishType(long id, DishType dishType) {
        try {
            repo.updateDishType(id,dishType.getName(),dishType.getDescription());

        } catch (Exception e) {
            //e.printStackTrace();
            return new MessageDTO("Update dishType", "Unsuccessfully");
        }
        return new MessageDTO("Update dishType", "Successfully");
    }

    @Override
    @Transactional
    public List<DishType> searchDishType(DishType dishType) {
        return repo.searchDishType(dishType.getName());
    }
}
