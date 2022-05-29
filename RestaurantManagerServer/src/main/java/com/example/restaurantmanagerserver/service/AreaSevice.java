package com.example.restaurantmanagerserver.service;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.entity.Area;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AreaSevice {
    List<Area> getAllArea();

    Area getArea(long id);

    MessageDTO addArea(Area x);

    MessageDTO deleteArea(long id);

    MessageDTO updateArea(long id, Area khoHang);

    List<Area> searchArea(Area area);
}
