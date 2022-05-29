package com.example.restaurantmanagerserver.service;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.dto.OrderDiningTableDTO;
import com.example.restaurantmanagerserver.entity.DiningTable;
import com.example.restaurantmanagerserver.entity.DiningTable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface DiningTableService {
    List<DiningTable> getAllDiningTable();

    DiningTable getDiningTable(long id);

    MessageDTO addDiningTable(DiningTable diningTable);

    MessageDTO addOrderDiningTable(OrderDiningTableDTO orderDiningTableDTO);

    MessageDTO deleteDiningTable(long id);

    MessageDTO deleteOrderDiningTableByDiningTableId(long id);

    MessageDTO deleteOrderDiningTableByOrderDiningTableId(OrderDiningTableDTO orderDiningTableDTO);

    MessageDTO updateDiningTable(long id, DiningTable diningTable);

    MessageDTO updateOrderdiningTableByOrderDiningTableId(long order_id, long diningTable_id, OrderDiningTableDTO orderDiningTableDTO);

    List<DiningTable> searchDiningTable(String name);
}


