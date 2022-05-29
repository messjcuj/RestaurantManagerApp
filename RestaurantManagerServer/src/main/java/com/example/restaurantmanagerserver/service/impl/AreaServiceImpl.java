package com.example.restaurantmanagerserver.service.impl;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.entity.Area;
import com.example.restaurantmanagerserver.repository.AreaRepository;
import com.example.restaurantmanagerserver.service.AreaSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AreaServiceImpl implements AreaSevice {
    @Autowired
    private AreaRepository repo;

    @Override
    @Transactional
    public List<Area> getAllArea() {
        return repo.findAll();
    }

    @Override
    @Transactional
    public Area getArea(long id) {
        Area x = new Area();
        try {

            x = repo.findById(id).get();
        } catch (Exception e) {

            return null;
        }

        return x;
    }

    @Override
    @Transactional
    public MessageDTO addArea(Area x) {

        try {
            repo.addArea(x.getName(), x.getDescription());
        } catch (Exception e) {
            //e.printStackTrace();
            return new MessageDTO("Add area", "Unsuccessfully");
        }
        return new MessageDTO("Add area", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteArea(long id) {
        try {
            repo.deleteAreaById(id);

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete area", "Unsuccessfully");
        }
        return new MessageDTO("Delete area", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO updateArea(long id, Area area) {
        try {
            repo.updateArea(id,area.getName(),area.getDescription());

        } catch (Exception e) {
            //e.printStackTrace();
            return new MessageDTO("Update area", "Unsuccessfully");
        }
        return new MessageDTO("Update area", "Successfully");
    }

    @Override
    @Transactional
    public List<Area> searchArea(Area area) {
        return repo.searchArea(area.getName());
    }

}
