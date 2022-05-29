package com.example.restaurantmanagerserver.service.impl;


import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.entity.Warehouse;
import com.example.restaurantmanagerserver.entity.Warehouse;
import com.example.restaurantmanagerserver.repository.WarehouseRepository;
import com.example.restaurantmanagerserver.repository.WarehouseRepository;
import com.example.restaurantmanagerserver.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class WarehouseServiceImpl implements WarehouseService {
    @Autowired
    private WarehouseRepository repo;

    @Override
    @Transactional
    public List<Warehouse> getAllWarehouse() {
        return repo.findAll();
    }

    @Override
    @Transactional
    public Warehouse getWarehouse(long id) {
        Warehouse x = new Warehouse();
        try {

            x = repo.findById(id).get();
        } catch (Exception e) {

            return null;
        }

        return x;
    }

    @Override
    @Transactional
    public MessageDTO addWarehouse(Warehouse x) {

        try {
            repo.addWarehouse(x.getName(), x.getDescription());
        } catch (Exception e) {
            //e.printStackTrace();
            return new MessageDTO("Add warehouse", "Unsuccessfully");
        }
        return new MessageDTO("Add warehouse", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteWarehouse(long id) {
        try {

            repo.deleteWarehouseById(id);

        } catch (Exception e) {
            //e.printStackTrace();
            return new MessageDTO("Delete warehouse", "Unsuccessfully");
        }
        return new MessageDTO("Delete warehouse","Successfully");
    }

    @Override
    @Transactional
    public MessageDTO updateWarehouse(long id, Warehouse warehouse) {
        try {
            repo.updateWarehouse(id,warehouse.getName(),warehouse.getDescription());

        } catch (Exception e) {
            //e.printStackTrace();
            return new MessageDTO("Update warehouse", "Unsuccessfully");
        }
        return new MessageDTO("Update warehouse", "Successfully");
    }

    @Override
    @Transactional
    public List<Warehouse> searchWarehouse(Warehouse warehouse) {
        return repo.searchWarehouse(warehouse.getName());
    }

}
