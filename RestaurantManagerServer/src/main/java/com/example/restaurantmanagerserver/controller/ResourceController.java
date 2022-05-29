package com.example.restaurantmanagerserver.controller;

import com.example.restaurantmanagerserver.dto.LogDTO;
import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.dto.ResourceDishDTO;
import com.example.restaurantmanagerserver.entity.Resource;
import com.example.restaurantmanagerserver.entity.Shipment;
import com.example.restaurantmanagerserver.entity.embeddable.ResourceDish;
import com.example.restaurantmanagerserver.log.LogMethod;
import com.example.restaurantmanagerserver.service.ResourceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/resource")
public class ResourceController {
    @Autowired
    ResourceService service;

    Logger logger = LoggerFactory.getLogger(ResourceController.class);
    MessageDTO successMessage = MessageDTO.getInstance();
    LogDTO logDTO = LogDTO.getInstance();

    @GetMapping("/")
    public ResponseEntity<List<Resource>> getAllResource() {
        logDTO.setTitle("Get_list_resource");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<List<Resource>>(service.getAllResource(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> getResource(@PathVariable("id") long id) {
        logDTO.setTitle("Get_resource");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<Resource>(service.getResource(id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Resource> addResource(@RequestBody Resource x) {
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<Resource>(service.addResource(x), HttpStatus.CREATED);
    }



    @PostMapping("/add/resourcedish")
    public ResponseEntity<MessageDTO> addResourceDrink(@RequestBody ResourceDishDTO resourceDishDTO) {
        successMessage = service.addResourceDish(resourceDishDTO);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageDTO> deleteResource(@PathVariable("id") long id) {
        successMessage = service.deleteResource(id);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }


    @DeleteMapping("/delete/resourcedish/{id}")
    public ResponseEntity<MessageDTO> deleteResourceDishByResourceid(@PathVariable("id") long id) {
        successMessage = service.deleteResourceDishByResourceid(id);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/resourcedish")
    public ResponseEntity<MessageDTO> deleteResourceDishByResourceDishId(@RequestBody ResourceDishDTO resourceDishDTO) {
        successMessage = service.deleteResourceDishByResourceDishId(resourceDishDTO);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<MessageDTO> updateResource(@PathVariable("id") long id, @RequestBody Resource resource) {
        successMessage = service.updateResource(id, resource);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }

    @PutMapping("/update/resourcedish/{resource_id}/{dish_id}")
    public ResponseEntity<MessageDTO> updateResourceDishByResorceDishId(@PathVariable("resource_id") long resource_id,@PathVariable("dish_id") long dish_id,@RequestBody ResourceDishDTO resourceDishDTO) {
        successMessage = service.updateResourceDishByResourceDishId(resource_id,dish_id,resourceDishDTO);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Resource>> searchResource(@RequestParam("name") String name,@RequestParam("unit") String unit) {
        Resource resource = new Resource();
        resource.setName(name);
        logDTO.setTitle("Search resource");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<List<Resource>>(service.searchResource(name,unit), HttpStatus.OK);
    }



}
