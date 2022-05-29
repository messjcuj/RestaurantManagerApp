package com.example.restaurantmanagerserver.controller;

import com.example.restaurantmanagerserver.dto.LogDTO;
import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.dto.OrderDishDTO;
import com.example.restaurantmanagerserver.entity.Dish;
import com.example.restaurantmanagerserver.entity.Dish;
import com.example.restaurantmanagerserver.log.LogMethod;
import com.example.restaurantmanagerserver.service.DishService;
import com.example.restaurantmanagerserver.service.DishService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("/dish")
public class DishController {
    @Autowired
    DishService service;

    Logger logger = LoggerFactory.getLogger(DishController.class);
    MessageDTO successMessage = MessageDTO.getInstance();
    LogDTO logDTO = LogDTO.getInstance();

    @GetMapping("/")
    public ResponseEntity<List<Dish>> getAllDish() {
        logDTO.setTitle("Get_list_dish");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<List<Dish>>(service.getAllDish(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dish> getDish(@PathVariable("id") long id) {
        logDTO.setTitle("Get_dish");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<Dish>(service.getDish(id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Dish> addDish(@RequestBody Dish x){
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<Dish>(service.addDish(x), HttpStatus.CREATED);
    }



    @PostMapping("/add/orderdish")
    public ResponseEntity<MessageDTO> addOrderDish(@RequestBody OrderDishDTO orderDishDTO) {
        successMessage = service.addOrderDish(orderDishDTO);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageDTO> deleteDish(@PathVariable("id") long id) {
        successMessage = service.deleteDish(id);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }


    @DeleteMapping("/delete/orderdish/{id}")
    public ResponseEntity<MessageDTO> deleteOrderDishByDishid(@PathVariable("id") long id) {
        successMessage = service.deleteOrderDishByDishId(id);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/orderdish")
    public ResponseEntity<MessageDTO> deleteOrderDishByOrderDishId(@RequestBody OrderDishDTO orderDishDTO) {
        successMessage = service.deleteOrderDishByOrderDishId(orderDishDTO);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<MessageDTO> updateDish(@PathVariable("id") long id, @RequestBody Dish dish) {
        successMessage = service.updateDish(id, dish);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }

    @PutMapping("/update/orderdish/{order_id}/{dish_id}")
    public ResponseEntity<MessageDTO> updateOrderDishByResorceDishId(@PathVariable("order_id") long order_id,@PathVariable("dish_id") long dish_id,@RequestBody OrderDishDTO orderDishDTO) {
        successMessage = service.updateOrderdishByOrderDishId(order_id,dish_id,orderDishDTO);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Dish>> searchDish(@RequestParam("name") String name,@RequestParam("price") String price,@RequestParam("unit") String unit) {
        Dish dish = new Dish();
        dish.setName(name);
        logDTO.setTitle("Search dish");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<List<Dish>>(service.searchDish(name,price,unit), HttpStatus.OK);
    }


}
