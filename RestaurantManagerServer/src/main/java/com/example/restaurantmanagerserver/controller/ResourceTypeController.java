package com.example.restaurantmanagerserver.controller;

import com.example.restaurantmanagerserver.dto.LogDTO;
import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.entity.ResourceType;
import com.example.restaurantmanagerserver.log.LogMethod;
import com.example.restaurantmanagerserver.service.ResourceTypeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/resourcetype")
public class ResourceTypeController {
    @Autowired
    ResourceTypeService service;

    Logger logger = LoggerFactory.getLogger(ResourceTypeController.class);
    MessageDTO successMessage = MessageDTO.getInstance();
    LogDTO logDTO = LogDTO.getInstance();

    @GetMapping("/")
    public ResponseEntity<List<ResourceType>> getAllResourceType() {
        logDTO.setTitle("Get_list_resourceType");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<List<ResourceType>>(service.getAllResourceType(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResourceType> getResourceType(@PathVariable("id") long id) {
        logDTO.setTitle("Get_resourceType");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<ResourceType>(service.getResourceType(id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<MessageDTO> addResourceType(@RequestBody ResourceType x) {
        successMessage = service.addResourceType(x);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage,HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageDTO> deleteResourceType(@PathVariable("id") long id) {
        successMessage=service.deleteResourceType(id);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage,HttpStatus.ACCEPTED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<MessageDTO> updateResourceType(@PathVariable("id") long id, @RequestBody ResourceType x) {
        successMessage= service.updateResourceType(id, x);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ResourceType>> searchResourceType(@RequestParam("name") String name) {
        ResourceType resourceType=new ResourceType();
        resourceType.setName(name);
        logDTO.setTitle("Search resourceType");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<List<ResourceType>>(service.searchResourceType(resourceType),HttpStatus.OK);
    }
}
