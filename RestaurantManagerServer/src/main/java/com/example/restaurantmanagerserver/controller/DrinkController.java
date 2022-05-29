package com.example.restaurantmanagerserver.controller;

import com.example.restaurantmanagerserver.dto.LogDTO;
import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.dto.OrderDrinkDTO;
import com.example.restaurantmanagerserver.entity.Drink;
import com.example.restaurantmanagerserver.entity.Drink;
import com.example.restaurantmanagerserver.log.LogMethod;
import com.example.restaurantmanagerserver.service.DrinkService;
import com.example.restaurantmanagerserver.service.DrinkService;
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
@RequestMapping("/drink")
public class DrinkController {
    @Autowired
    DrinkService service;

    Logger logger = LoggerFactory.getLogger(DrinkController.class);
    MessageDTO successMessage = MessageDTO.getInstance();
    LogDTO logDTO = LogDTO.getInstance();

    @GetMapping("/")
    public ResponseEntity<List<Drink>> getAllDrink() {
        logDTO.setTitle("Get_list_drink");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<List<Drink>>(service.getAllDrink(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Drink> getDrink(@PathVariable("id") long id) {
        logDTO.setTitle("Get_drink");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<Drink>(service.getDrink(id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Drink> addDrink(@RequestBody Drink x) {

        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<Drink>( service.addDrink(x), HttpStatus.CREATED);
    }



    @PostMapping("/add/orderdrink")
    public ResponseEntity<MessageDTO> addOrderDrink(@RequestBody OrderDrinkDTO orderDrinkDTO) {
        successMessage = service.addOrderDrink(orderDrinkDTO);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageDTO> deleteDrink(@PathVariable("id") long id) {
        successMessage = service.deleteDrink(id);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }


    @DeleteMapping("/delete/orderdrink/{id}")
    public ResponseEntity<MessageDTO> deleteOrderDrinkByDrinkid(@PathVariable("id") long id) {
        successMessage = service.deleteOrderDrinkByDrinkId(id);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/orderdrink")
    public ResponseEntity<MessageDTO> deleteOrderDrinkByOrderDrinkId(@RequestBody OrderDrinkDTO orderDrinkDTO) {
        successMessage = service.deleteOrderDrinkByOrderDrinkId(orderDrinkDTO);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<MessageDTO> updateDrink(@PathVariable("id") long id, @RequestBody Drink drink) {
        successMessage = service.updateDrink(id, drink);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }

    @PutMapping("/update/orderdrink/{order_id}/{drink_id}")
    public ResponseEntity<MessageDTO> updateOrderDrinkByResorceDrinkId(@PathVariable("order_id") long order_id,@PathVariable("drink_id") long drink_id,@RequestBody OrderDrinkDTO orderDrinkDTO) {
        successMessage = service.updateOrderdrinkByOrderDrinkId(order_id,drink_id,orderDrinkDTO);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Drink>> searchDrink(@RequestParam("name") String name,@RequestParam("price") String price,@RequestParam("unit") String unit) {
        Drink drink = new Drink();
        drink.setName(name);
        logDTO.setTitle("Search drink");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<List<Drink>>(service.searchDrink(name,price,unit), HttpStatus.OK);
    }


}
