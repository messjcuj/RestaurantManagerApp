package com.example.restaurantmanagerserver.controller;

import com.example.restaurantmanagerserver.dto.LogDTO;
import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.dto.OrderDiningTableDTO;
import com.example.restaurantmanagerserver.entity.DiningTable;
import com.example.restaurantmanagerserver.entity.DiningTable;
import com.example.restaurantmanagerserver.log.LogMethod;
import com.example.restaurantmanagerserver.service.DiningTableService;
import com.example.restaurantmanagerserver.service.DiningTableService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/diningtable")
public class DiningTableController {
    @Autowired
    DiningTableService service;

    Logger logger = LoggerFactory.getLogger(DiningTableController.class);
    MessageDTO successMessage = MessageDTO.getInstance();
    LogDTO logDTO = LogDTO.getInstance();

    @GetMapping("/")
    public ResponseEntity<List<DiningTable>> getAllDiningTable() {
        logDTO.setTitle("Get_list_diningTable");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<List<DiningTable>>(service.getAllDiningTable(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiningTable> getDiningTable(@PathVariable("id") long id) {
        logDTO.setTitle("Get_diningTable");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<DiningTable>(service.getDiningTable(id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<MessageDTO> addDiningTable(@RequestBody DiningTable x) {
        successMessage = service.addDiningTable(x);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }



    @PostMapping("/add/orderdiningtable")
    public ResponseEntity<MessageDTO> addOrderDiningTable(@RequestBody OrderDiningTableDTO orderDiningTableDTO) {
        successMessage = service.addOrderDiningTable(orderDiningTableDTO);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageDTO> deleteDiningTable(@PathVariable("id") long id) {
        successMessage = service.deleteDiningTable(id);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }


    @DeleteMapping("/delete/orderdiningtable/{id}")
    public ResponseEntity<MessageDTO> deleteOrderDiningTableByDiningTableid(@PathVariable("id") long id) {
        successMessage = service.deleteOrderDiningTableByDiningTableId(id);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/orderdiningtable")
    public ResponseEntity<MessageDTO> deleteOrderDiningTableByOrderDiningTableId(@RequestBody OrderDiningTableDTO orderDiningTableDTO) {
        successMessage = service.deleteOrderDiningTableByOrderDiningTableId(orderDiningTableDTO);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<MessageDTO> updateDiningTable(@PathVariable("id") long id, @RequestBody DiningTable diningTable) {
        successMessage = service.updateDiningTable(id, diningTable);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }

    @PutMapping("/update/orderdiningtable/{order_id}/{diningTable_id}")
    public ResponseEntity<MessageDTO> updateOrderDiningTableByResorceDiningTableId(@PathVariable("order_id") long order_id,@PathVariable("diningTable_id") long diningTable_id,@RequestBody OrderDiningTableDTO orderDiningTableDTO) {
        successMessage = service.updateOrderdiningTableByOrderDiningTableId(order_id,diningTable_id,orderDiningTableDTO);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }

    @GetMapping("/search")
    public ResponseEntity<List<DiningTable>> searchDiningTable(@RequestParam("name") String name) {
        DiningTable diningTable = new DiningTable();
        diningTable.setName(name);
        logDTO.setTitle("Search diningTable");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<List<DiningTable>>(service.searchDiningTable(name), HttpStatus.OK);
    }


}
