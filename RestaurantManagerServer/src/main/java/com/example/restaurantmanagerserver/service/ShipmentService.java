package com.example.restaurantmanagerserver.service;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.dto.ShipmentResourceDTO;
import com.example.restaurantmanagerserver.dto.ShipmentDrinkDTO;
import com.example.restaurantmanagerserver.entity.Shipment;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ShipmentService {

    List<Shipment> getAllShipment();

    Shipment getShipment(long id);

    Shipment addShipment(Shipment shipment);


    MessageDTO addShipmentResource(ShipmentResourceDTO shipmentResourceDTO);


    MessageDTO addShipmentDrink(ShipmentDrinkDTO shipmentDrinkDTO);

    MessageDTO deleteShipment(long id);

    MessageDTO deleteShipmentResourceByResourceId(long id);

    MessageDTO deleteShipmentResourceByShipmentResourceId(ShipmentResourceDTO shipmentResourceDTO);

    MessageDTO deleteShipmentDrinkByDrinkId(long id);

    MessageDTO deleteShipmentDrinkByShipmentDrinkId(ShipmentDrinkDTO shipmentDrinkDTO);

    MessageDTO updateShipment(long id, Shipment shipment);

    MessageDTO updateShipmentResourceByShipmentResourceId(long shipment_id, long resource_id, ShipmentResourceDTO shipmentResourceDTO);

    MessageDTO updateShipmentDrinkByShipmentDrinkId(long shipment_id, long resource_id, ShipmentDrinkDTO shipmentDrinkDTO);

    List<Shipment> searchShipment(String name, String time);
}
