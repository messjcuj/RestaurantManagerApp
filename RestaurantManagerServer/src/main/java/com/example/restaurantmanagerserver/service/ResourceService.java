package com.example.restaurantmanagerserver.service;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.dto.ResourceDishDTO;
import com.example.restaurantmanagerserver.entity.Resource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ResourceService {
    List<Resource> getAllResource();

    Resource getResource(long id);

    Resource addResource(Resource resource);

    MessageDTO addResourceDish(ResourceDishDTO resourceDishDTO);

    MessageDTO deleteResource(long id);

    MessageDTO deleteResourceDishByResourceid(long id);

    MessageDTO deleteResourceDishByResourceDishId(ResourceDishDTO resourceDishDTO);

    MessageDTO updateResource(long id, Resource resource);

    MessageDTO updateResourceDishByResourceDishId(long resource_id, long dish_id, ResourceDishDTO resourceDishDTO);

    List<Resource> searchResource(String name, String unit);
}
