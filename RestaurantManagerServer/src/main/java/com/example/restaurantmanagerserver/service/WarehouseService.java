package com.example.restaurantmanagerserver.service;


import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.entity.Warehouse;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface WarehouseService {


    @Transactional
    List<Warehouse> getAllWarehouse();

    @Transactional
    Warehouse getWarehouse(long id);

    @Transactional
    MessageDTO addWarehouse(Warehouse x);

    @Transactional
    MessageDTO deleteWarehouse(long id);

    @Transactional
    MessageDTO updateWarehouse(long id, Warehouse warehouse);

    @Transactional
    List<Warehouse> searchWarehouse(Warehouse warehouse);
}
