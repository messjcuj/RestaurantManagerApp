package com.example.restaurantmanagerserver.controller;

import com.example.restaurantmanagerserver.dto.LogDTO;
import com.example.restaurantmanagerserver.dto.OrderDiningTableDTO;
import com.example.restaurantmanagerserver.dto.OrderUserDTO;
import com.example.restaurantmanagerserver.entity.Order;
import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.log.LogMethod;
import com.example.restaurantmanagerserver.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    OrderService service;

    MessageDTO successMessage = MessageDTO.getInstance();
    Logger logger = LoggerFactory.getLogger(OrderController.class);
    LogDTO logDTO = LogDTO.getInstance();

    @GetMapping("/")
    public ResponseEntity<List<Order>> getAllOrder() {
        logDTO.setTitle("Get_list_order");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<List<Order>>(service.getAllOrder(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable("id") long id) {
        logDTO.setTitle("Get_order");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<Order>(service.getOrder(id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Order> addOrder(@RequestBody Order x) {
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<Order>( service.addOrder(x), HttpStatus.CREATED);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageDTO> deleteOrderById(@PathVariable("id") long id) {
        successMessage=service.deleteOrderById(id);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }
    @DeleteMapping("/delete/orderdish/{id}")
    public ResponseEntity<MessageDTO> deleteOrderDishByOrderId(@PathVariable("id") long id) {
        successMessage=service.deleteOrderDishByOrderId(id);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }
    @DeleteMapping("/delete/orderdrink/{id}")
    public ResponseEntity<MessageDTO> deleteOrderDrinksByOrderId(@PathVariable("id") long id) {
        successMessage=service.deleteOrderDrinksByOrderId(id);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }
    @DeleteMapping("/delete/orderuser/{id}")
    public ResponseEntity<MessageDTO> deleteOrderUserByOrderId(@PathVariable("id") long id) {
        successMessage=service.deleteOrderUserByOrderId(id);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }
    @DeleteMapping("/delete/orderdiningtable/{id}")
    public ResponseEntity<MessageDTO> deleteOrder(@PathVariable("id") long id) {
        successMessage=service.deleteOrderDiningTableByOrderId(id);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<MessageDTO> updateOrder(@PathVariable("id") long id, @RequestBody Order x) {
        successMessage=service.updateOrder(id, x);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Order>> searchOrder(@RequestParam("vat") String vat, @RequestParam("time") String time, @RequestParam("type") String type, @RequestParam("status") String status) {
        logDTO.setTitle("Search order");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<List<Order>>(service.searchOrder(vat, time, type, status), HttpStatus.OK);
    }
}
