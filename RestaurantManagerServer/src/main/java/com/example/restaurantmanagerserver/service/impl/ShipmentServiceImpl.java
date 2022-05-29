package com.example.restaurantmanagerserver.service.impl;


import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.dto.ShipmentResourceDTO;
import com.example.restaurantmanagerserver.dto.ShipmentDrinkDTO;
import com.example.restaurantmanagerserver.entity.Shipment;
import com.example.restaurantmanagerserver.repository.ShipmentRepository;
import com.example.restaurantmanagerserver.service.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ShipmentServiceImpl implements ShipmentService {
    @Autowired
    private ShipmentRepository repo;

    @Override
    @Transactional
    public List<Shipment> getAllShipment() {
        return repo.findAll();
    }

    @Override
    @Transactional
    public Shipment getShipment(long id) {
        Shipment x = new Shipment();
        try {

            x = repo.findById(id).get();
        } catch (Exception e) {

            return null;
        }

        return x;
    }

    @Override
    @Transactional
    public Shipment addShipment(Shipment shipment) {


        return repo.save(shipment);

    }

    @Override
    @Transactional
    public MessageDTO addShipmentResource(ShipmentResourceDTO shipmentResourceDTO) {
        try {
            repo.addShipmentResource(shipmentResourceDTO.getShipment_id(), shipmentResourceDTO.getResource_id(), shipmentResourceDTO.getQuantity(), shipmentResourceDTO.getPreserveTime(), shipmentResourceDTO.getPrice());
        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Add shipment", "Unsuccessfully");
        }
        return new MessageDTO("Add shipment", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO addShipmentDrink(ShipmentDrinkDTO shipmentDrinkDTO) {
        try {
            repo.addShipmentDrink(shipmentDrinkDTO.getShipment_id(), shipmentDrinkDTO.getDrink_id(), shipmentDrinkDTO.getQuantity(), shipmentDrinkDTO.getPreserveTime(), shipmentDrinkDTO.getPrice());

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Add shipment", "Unsuccessfully");
        }
        return new MessageDTO("Add shipment", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteShipment(long id) {
        try {
            repo.deleteShipmentById(id);

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete shipment", "Unsuccessfully");
        }
        return new MessageDTO("Delete shipment", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteShipmentResourceByResourceId(long id) {
        try {
            repo.deleteShipmentResourceByResourceId(id);

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete shipment", "Unsuccessfully");
        }
        return new MessageDTO("Delete shipment", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteShipmentResourceByShipmentResourceId(ShipmentResourceDTO shipmentResourceDTO) {
        try {
            repo.deleteShipmentResourceByShipmentResourceId(shipmentResourceDTO.getShipment_id(), shipmentResourceDTO.getResource_id());

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete shipment", "Unsuccessfully");
        }
        return new MessageDTO("Delete shipment", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteShipmentDrinkByDrinkId(long id) {
        try {
            repo.deleteShipmentDrinkByDrinkId(id);

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete shipment", "Unsuccessfully");
        }
        return new MessageDTO("Delete shipment", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteShipmentDrinkByShipmentDrinkId(ShipmentDrinkDTO shipmentDrinkDTO) {
        try {
            repo.deleteShipmentDrinkByShipmentDrinkId(shipmentDrinkDTO.getShipment_id(), shipmentDrinkDTO.getDrink_id());

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete shipment", "Unsuccessfully");
        }
        return new MessageDTO("Delete shipment", "Successfully");
    }


    @Override
    @Transactional
    public MessageDTO updateShipment(long id, Shipment shipment) {
        try {

            repo.updateShipment(id, shipment.getName(), shipment.getTime(), shipment.getWarehouse().getId());
        } catch (Exception e) {

            //e.printStackTrace();
            return new MessageDTO("Update", "Unsuccessfully");
        }
        return new MessageDTO("Update", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO updateShipmentResourceByShipmentResourceId(long shipment_id, long resource_id, ShipmentResourceDTO shipmentResourceDTO) {
        try {

            repo.updateShipmentResourceByShipmentResourceId(shipment_id, resource_id, shipmentResourceDTO.getShipment_id(), shipmentResourceDTO.getResource_id(), shipmentResourceDTO.getQuantity(), shipmentResourceDTO.getPreserveTime(), shipmentResourceDTO.getPrice());

        } catch (Exception e) {

            e.printStackTrace();
            return new MessageDTO("Update", "Unsuccessfully");
        }
        return new MessageDTO("Update", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO updateShipmentDrinkByShipmentDrinkId(long shipment_id, long drink_id, ShipmentDrinkDTO shipmentDrinkDTO) {
        try {

            repo.updateShipmentDrinkByShipmentDrinkId(shipment_id, drink_id, shipmentDrinkDTO.getShipment_id(), shipmentDrinkDTO.getDrink_id(), shipmentDrinkDTO.getQuantity(), shipmentDrinkDTO.getPreserveTime(), shipmentDrinkDTO.getPrice());

        } catch (Exception e) {

            e.printStackTrace();
            return new MessageDTO("Update", "Unsuccessfully");
        }
        return new MessageDTO("Update", "Successfully");
    }

    @Override
    @Transactional
    public List<Shipment> searchShipment(String name, String time) {
        return repo.searchShipment(name, time);
    }
}
