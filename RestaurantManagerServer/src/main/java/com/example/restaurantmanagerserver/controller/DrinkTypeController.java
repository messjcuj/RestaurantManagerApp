package com.example.restaurantmanagerserver.controller;

import com.example.restaurantmanagerserver.dto.LogDTO;
import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.entity.DrinkType;
import com.example.restaurantmanagerserver.log.LogMethod;
import com.example.restaurantmanagerserver.service.DrinkTypeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/drinktype")
public class DrinkTypeController {
    @Autowired
    DrinkTypeService service;

    Logger logger = LoggerFactory.getLogger(DrinkTypeController.class);
    MessageDTO successMessage = MessageDTO.getInstance();
    LogDTO logDTO = LogDTO.getInstance();

    @GetMapping("/")
    public ResponseEntity<List<DrinkType>> getAllDrinkType() {
        logDTO.setTitle("Get_list_drinkType");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<List<DrinkType>>(service.getAllDrinkType(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DrinkType> getDrinkType(@PathVariable("id") long id) {
        logDTO.setTitle("Get_drinkType");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<DrinkType>(service.getDrinkType(id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<MessageDTO> addDrinkType(@RequestBody DrinkType x) {
        successMessage = service.addDrinkType(x);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage,HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageDTO> deleteDrinkType(@PathVariable("id") long id) {
        successMessage=service.deleteDrinkType(id);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage,HttpStatus.ACCEPTED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<MessageDTO> updateDrinkType(@PathVariable("id") long id, @RequestBody DrinkType x) {
        successMessage= service.updateDrinkType(id, x);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }

    @GetMapping("/search")
    public ResponseEntity<List<DrinkType>> searchDrinkType(@RequestParam("name") String name) {
        DrinkType drinkType=new DrinkType();
        drinkType.setName(name);
        logDTO.setTitle("Search drinkType");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<List<DrinkType>>(service.searchDrinkType(drinkType),HttpStatus.OK);
    }
}
