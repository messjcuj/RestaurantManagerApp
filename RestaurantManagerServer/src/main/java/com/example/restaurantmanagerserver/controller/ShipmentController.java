package com.example.restaurantmanagerserver.controller;

import com.example.restaurantmanagerserver.dto.*;
import com.example.restaurantmanagerserver.entity.Shipment;
import com.example.restaurantmanagerserver.log.LogMethod;
import com.example.restaurantmanagerserver.service.ShipmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;


@RestController
@RequestMapping("/shipment")
public class ShipmentController {

    @Autowired
    ShipmentService service;

    Logger logger = LoggerFactory.getLogger(ShipmentController.class);
    MessageDTO successMessage = MessageDTO.getInstance();
    LogDTO logDTO = LogDTO.getInstance();

    @GetMapping("/")
    public ResponseEntity<List<Shipment>> getAllShipment() {
        logDTO.setTitle("Get_list_shipment");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<List<Shipment>>(service.getAllShipment(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shipment> getShipment(@PathVariable("id") long id) {
        logDTO.setTitle("Get_shipment");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<Shipment>(service.getShipment(id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Shipment> addShipment(@RequestBody Shipment x) {
        x.setTime(LocalDate.now());
        logDTO.setTitle("Add shipment");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<Shipment>(service.addShipment(x), HttpStatus.CREATED);
    }

    @PostMapping("/add/shipmentresource")
    public ResponseEntity<MessageDTO> addShipmentResource(@RequestBody ShipmentResourceDTO shipmentResourceDTO) {
        System.out.println(shipmentResourceDTO.getPreserveTime());
        successMessage = service.addShipmentResource(shipmentResourceDTO);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }

    @PostMapping("/add/shipmentdrink")
    public ResponseEntity<MessageDTO> addShipmentDrink(@RequestBody ShipmentDrinkDTO shipmentDrinkDTO) {
        successMessage = service.addShipmentDrink(shipmentDrinkDTO);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageDTO> deleteShipment(@PathVariable("id") long id) {
        successMessage = service.deleteShipment(id);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/shipmentresource")
    public ResponseEntity<MessageDTO> deleteShipmentResourceByShipmentResourceId(@RequestBody ShipmentResourceDTO shipmentResourceDTO) {
        successMessage = service.deleteShipmentResourceByShipmentResourceId(shipmentResourceDTO);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/shipmentdrink/{id}")
    public ResponseEntity<MessageDTO> deleteShipmentDrinkByDrinkId(@PathVariable("id") long id) {
        successMessage = service.deleteShipmentDrinkByDrinkId(id);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/shipmentresource/{id}")
    public ResponseEntity<MessageDTO> deleteShipmentResourceByShipmentId(@PathVariable("id") long id) {
        successMessage = service.deleteShipmentResourceByResourceId(id);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/shipmentdrink")
    public ResponseEntity<MessageDTO> deleteShipmentDrinkByDrink_id(@RequestBody ShipmentDrinkDTO shipmentDrinkDTO) {
        successMessage = service.deleteShipmentDrinkByShipmentDrinkId(shipmentDrinkDTO);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.ACCEPTED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<MessageDTO> updateShipment(@PathVariable("id") long id, @RequestBody Shipment shipment) {
        successMessage = service.updateShipment(id, shipment);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }

    @PutMapping("/update/shipmentresource/{shipment_id}/{resource_id}")
    public ResponseEntity<MessageDTO> updateShipmentResourceByShipmentResourceId(@PathVariable("shipment_id") long shipment_id, @PathVariable("resource_id") long resource_id, @RequestBody ShipmentResourceDTO shipmentResourceDTO) {
        successMessage = service.updateShipmentResourceByShipmentResourceId(shipment_id, resource_id, shipmentResourceDTO);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }

    @PutMapping("/update/shipmentdrink/{shipment_id}/{drink_id}")
    public ResponseEntity<MessageDTO> updateShipmentDrinkByShipmentDrinkId(@PathVariable("shipment_id") long shipment_id, @PathVariable("drink_id") long drink_id, @RequestBody ShipmentDrinkDTO shipmentDrinkDTO) {
        successMessage = service.updateShipmentDrinkByShipmentDrinkId(shipment_id, drink_id, shipmentDrinkDTO);
        logDTO.setTitle(successMessage.getTitle());
        logDTO.setDetail(successMessage.getDetail());
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<MessageDTO>(successMessage, HttpStatus.CREATED);
    }


    @GetMapping("/search")
    public ResponseEntity<List<Shipment>> searchShipment(@RequestParam("name") String name, String time) {
        Shipment shipment = new Shipment();
        shipment.setName(name);
        logDTO.setTitle("Search shipment");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle() + " - " + logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<List<Shipment>>(service.searchShipment(name, time), HttpStatus.OK);
    }


}
