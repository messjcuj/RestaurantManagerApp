package com.example.restaurantmanagerserver.service.impl;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.dto.ResourceDishDTO;
import com.example.restaurantmanagerserver.entity.Resource;
import com.example.restaurantmanagerserver.repository.ResourceRepository;
import com.example.restaurantmanagerserver.repository.ResourceRepository;
import com.example.restaurantmanagerserver.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ResourceServiceImpl implements ResourceService {
    @Autowired
    private ResourceRepository repo;

    @Override
    @Transactional
    public List<Resource> getAllResource() {
        return repo.findAll();
    }

    @Override
    @Transactional
    public Resource getResource(long id) {
        Resource x = new Resource();
        try {

            x = repo.findById(id).get();
        } catch (Exception e) {

            return null;
        }

        return x;
    }

    @Override
    @Transactional
    public Resource addResource(Resource resource) {

          //  repo.addResource(resource.getName(),resource.getDescription(),resource.getUnit(),resource.getResourceType().getId());
        //} catch (Exception e) {
       //     e.printStackTrace();
         //   return new MessageDTO("Add resource", "Unsuccessfully");
      //  }
        //return new MessageDTO("Add resource", "Successfully");
        return repo.save(resource);
    }
    @Override
    @Transactional
    public MessageDTO addResourceDish(ResourceDishDTO resourceDishDTO) {
        try {
            repo.addResourceDish(resourceDishDTO.getResource_id(), resourceDishDTO.getDish_id(), resourceDishDTO.getQuantity(), resourceDishDTO.getUnit());
        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Add resource", "Unsuccessfully");
        }
        return new MessageDTO("Add resource", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteResource(long id) {
        try {
            repo.deleteResourceById(id);

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete resource", "Unsuccessfully");
        }
        return new MessageDTO("Delete resource", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteResourceDishByResourceid(long id) {
        try {
            repo.deleteResourceDishByResourceId(id);

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete resource", "Unsuccessfully");
        }
        return new MessageDTO("Delete resource", "Successfully");
    }
    @Override
    @Transactional
    public MessageDTO deleteResourceDishByResourceDishId(ResourceDishDTO resourceDishDTO) {
        try {
            repo.deleteResourceDishByResourceDishId(resourceDishDTO.getResource_id(),resourceDishDTO.getDish_id());

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete resource", "Unsuccessfully");
        }
        return new MessageDTO("Delete resource", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO updateResource(long id, Resource resource) {
        try {

            repo.updateResource(id,resource.getName(),resource.getDescription(),resource.getUnit(),resource.getUrlImage(),resource.getResourceType().getId());

        } catch (Exception e) {

            //e.printStackTrace();
            return new MessageDTO("Update", "Unsuccessfully");
        }
        return new MessageDTO("Update", "Successfully");
    }
    @Override
    @Transactional
    public MessageDTO updateResourceDishByResourceDishId(long resource_id,long dish_id, ResourceDishDTO resourceDishDTO) {
        try {

            repo.updateResourcedishByResourceDishId(resource_id,dish_id, resourceDishDTO.getResource_id(), resourceDishDTO.getDish_id(), resourceDishDTO.getQuantity(), resourceDishDTO.getUnit());

        } catch (Exception e) {

            //e.printStackTrace();
            return new MessageDTO("Update", "Unsuccessfully");
        }
        return new MessageDTO("Update", "Successfully");
    }
    @Override
    @Transactional
    public List<Resource> searchResource(String name,String unit) {
        return repo.searchResource(name,unit);
    }
}
