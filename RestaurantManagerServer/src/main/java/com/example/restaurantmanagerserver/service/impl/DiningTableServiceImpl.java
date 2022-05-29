package com.example.restaurantmanagerserver.service.impl;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.dto.OrderDiningTableDTO;
import com.example.restaurantmanagerserver.entity.DiningTable;
import com.example.restaurantmanagerserver.entity.DiningTable;
import com.example.restaurantmanagerserver.repository.DiningTableRepository;
import com.example.restaurantmanagerserver.repository.DiningTableRepository;
import com.example.restaurantmanagerserver.service.DiningTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class DiningTableServiceImpl implements DiningTableService {
    @Autowired
    private DiningTableRepository repo;

    @Override
    @Transactional
    public List<DiningTable> getAllDiningTable() {
        return repo.findAll();
    }

    @Override
    @Transactional
    public DiningTable getDiningTable(long id) {
        DiningTable x = new DiningTable();
        try {

            x = repo.findById(id).get();
        } catch (Exception e) {

            return null;
        }

        return x;
    }

    @Override
    @Transactional
    public MessageDTO addDiningTable(DiningTable diningTable) {
        try {
            repo.addDiningTable(diningTable.getName(),diningTable.getStatus(),diningTable.getType(),diningTable.getArea().getId());
        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Add diningTable", "Unsuccessfully");
        }
        return new MessageDTO("Add diningTable", "Successfully");
    }
    @Override
    @Transactional
    public MessageDTO addOrderDiningTable(OrderDiningTableDTO orderDiningTableDTO) {
        try {
            repo.addOrderDiningTable(orderDiningTableDTO.getOrder_id(),orderDiningTableDTO.getDiningTable_id(),orderDiningTableDTO.getType());
        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Add diningTable", "Unsuccessfully");
        }
        return new MessageDTO("Add diningTable", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteDiningTable(long id) {
        try {
            repo.deleteDiningTableById(id);

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete diningTable", "Unsuccessfully");
        }
        return new MessageDTO("Delete diningTable", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteOrderDiningTableByDiningTableId(long id) {
        try {
            repo.deleteOrderDiningTableByDiningTableId(id);

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete diningTable", "Unsuccessfully");
        }
        return new MessageDTO("Delete diningTable", "Successfully");
    }
    @Override
    @Transactional
    public MessageDTO deleteOrderDiningTableByOrderDiningTableId(OrderDiningTableDTO orderDiningTableDTO) {
        try {
            repo.deleteOrderDiningTableByOrderDiningTableId(orderDiningTableDTO.getOrder_id(),orderDiningTableDTO.getDiningTable_id());

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete diningTable", "Unsuccessfully");
        }
        return new MessageDTO("Delete diningTable", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO updateDiningTable(long id, DiningTable diningTable) {
        try {

            repo.updateDiningTable(id,diningTable.getName(),diningTable.getStatus(),diningTable.getType(),diningTable.getArea().getId());

        } catch (Exception e) {

            //e.printStackTrace();
            return new MessageDTO("Update", "Unsuccessfully");
        }
        return new MessageDTO("Update", "Successfully");
    }
    @Override
    @Transactional
    public MessageDTO updateOrderdiningTableByOrderDiningTableId(long order_id, long diningTable_id, OrderDiningTableDTO orderDiningTableDTO) {
        try {

            repo.updateOrderdiningTableByOrderDiningTableId(order_id,diningTable_id,orderDiningTableDTO.getOrder_id(),orderDiningTableDTO.getDiningTable_id(),orderDiningTableDTO.getType());

        } catch (Exception e) {

            //e.printStackTrace();
            return new MessageDTO("Update", "Unsuccessfully");
        }
        return new MessageDTO("Update", "Successfully");
    }
    @Override
    @Transactional
    public List<DiningTable> searchDiningTable(String name) {
        return repo.searchDiningTable(name);
    }
}
