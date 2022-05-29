package com.example.restaurantmanagerserver.service.impl;

import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.entity.UserRole;

import com.example.restaurantmanagerserver.repository.UserRoleRepository;
import com.example.restaurantmanagerserver.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserRoleServiceImpl implements UserRoleService {
    @Autowired
    private UserRoleRepository repo;

    @Override
    public List<UserRole> getAllUserRole() {
        return repo.findAll();
    }

    @Override
    @Transactional
    public UserRole getUserRole(long id) {
        UserRole x = new UserRole();
        try {

            x = repo.findById(id).get();
        } catch (Exception e) {

            return null;
        }

        return x;
    }

    @Override
    @Transactional
    public MessageDTO addUserRole(UserRole x) {
        try {
            repo.addUserRole(x.getName(),x.getDescription());
        } catch (Exception e) {
            //e.printStackTrace();
            return new MessageDTO("Add userrole","Unsuccessfully");
        }
        return new MessageDTO("Add userrole","Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteUserRole(long id) {
        try {

            repo.deleteById(id);

        } catch (Exception e) {
            //e.printStackTrace();
            return new MessageDTO("Delete userrole","Unsuccessfully");
        }
        return new MessageDTO("Delete userrole","Successfully");
    }

    @Override
    @Transactional
    public MessageDTO updateUserRole(long id, UserRole userRole) {
        try {
            repo.updateUserRole(id,userRole.getName(),userRole.getDescription());
        } catch (Exception e) {
            //e.printStackTrace();
            return new MessageDTO("Update userrole","Unsuccessfully");
        }
        return new MessageDTO("Update userrole","Successfully");
    }

    @Override
    @Transactional
    public List<UserRole> searchUserRole(String name) {
        return repo.searchUserRole(name);
    }
}
