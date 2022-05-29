package com.example.restaurantmanagerserver.service.impl;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.entity.ResourceType;
import com.example.restaurantmanagerserver.repository.ResourceTypeRepository;
import com.example.restaurantmanagerserver.service.ResourceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ResourceTypeServiceImpl implements ResourceTypeService {
    @Autowired
    private ResourceTypeRepository repo;

    @Override
    @Transactional
    public List<ResourceType> getAllResourceType() {
        return repo.findAll();
    }

    @Override
    @Transactional
    public ResourceType getResourceType(long id) {
        ResourceType x = new ResourceType();
        try {

            x = repo.findById(id).get();
        } catch (Exception e) {

            return null;
        }

        return x;
    }

    @Override
    @Transactional
    public MessageDTO addResourceType(ResourceType x) {

        try {
            repo.addResourceType(x.getName(), x.getDescription());
        } catch (Exception e) {
            //e.printStackTrace();
            return new MessageDTO("Add resourceType", "Unsuccessfully");
        }
        return new MessageDTO("Add resourceType", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteResourceType(long id) {
        try {

            repo.deleteResourceTypeById(id);

        } catch (Exception e) {
            //e.printStackTrace();
            return new MessageDTO("Delete resourceType", "Unsuccessfully");
        }
        return new MessageDTO("Delete resourceType","Successfully");
    }

    @Override
    @Transactional
    public MessageDTO updateResourceType(long id, ResourceType resourceType) {
        try {
            repo.updateResourceType(id,resourceType.getName(),resourceType.getDescription());

        } catch (Exception e) {
            //e.printStackTrace();
            return new MessageDTO("Update resourceType", "Unsuccessfully");
        }
        return new MessageDTO("Update resourceType", "Successfully");
    }

    @Override
    @Transactional
    public List<ResourceType> searchResourceType(ResourceType resourceType) {
        return repo.searchResourceType(resourceType.getName());
    }

}
