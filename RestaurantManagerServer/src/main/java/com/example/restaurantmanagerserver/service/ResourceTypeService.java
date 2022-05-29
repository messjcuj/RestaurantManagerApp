package com.example.restaurantmanagerserver.service;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.entity.ResourceType;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ResourceTypeService {

    List<ResourceType> getAllResourceType();

    ResourceType getResourceType(long id);

    MessageDTO addResourceType(ResourceType x);

    MessageDTO deleteResourceType(long id);

    MessageDTO updateResourceType(long id, ResourceType resourceType);

    List<ResourceType> searchResourceType(ResourceType resourceType);
}
