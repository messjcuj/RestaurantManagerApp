package com.example.restaurantmanagerserver.service.impl;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.entity.DrinkType;
import com.example.restaurantmanagerserver.repository.DrinkTypeRepository;
import com.example.restaurantmanagerserver.service.DrinkTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DrinkTypeServiceImpl implements DrinkTypeService {
    @Autowired
    private DrinkTypeRepository repo;

    @Override
    @Transactional
    public List<DrinkType> getAllDrinkType() {
        return repo.findAll();
    }

    @Override
    @Transactional
    public DrinkType getDrinkType(long id) {
        DrinkType x = new DrinkType();
        try {

            x = repo.findById(id).get();
        } catch (Exception e) {

            return null;
        }

        return x;
    }

    @Override
    @Transactional
    public MessageDTO addDrinkType(DrinkType x) {

        try {
            repo.addDrinkType(x.getName(), x.getDescription());
        } catch (Exception e) {
            //e.printStackTrace();
            return new MessageDTO("Add drinkType", "Unsuccessfully");
        }
        return new MessageDTO("Add drinkType", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteDrinkType(long id) {
        try {

            repo.deleteDinkTypeById(id);

        } catch (Exception e) {
            //e.printStackTrace();
            return new MessageDTO("Delete drinkType", "Unsuccessfully");
        }
        return new MessageDTO("Delete drinkType","Successfully");
    }

    @Override
    @Transactional
    public MessageDTO updateDrinkType(long id, DrinkType drinkType) {
        try {
            repo.updateDrinkType(id,drinkType.getName(),drinkType.getDescription());

        } catch (Exception e) {
            //e.printStackTrace();
            return new MessageDTO("Update drinkType", "Unsuccessfully");
        }
        return new MessageDTO("Update drinkType", "Successfully");
    }

    @Override
    @Transactional
    public List<DrinkType> searchDrinkType(DrinkType drinkType) {
        return repo.searchDrinkType(drinkType.getName());
    }
}
