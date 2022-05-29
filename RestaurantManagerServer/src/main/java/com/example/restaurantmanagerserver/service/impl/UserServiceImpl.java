package com.example.restaurantmanagerserver.service.impl;

import com.example.restaurantmanagerserver.authen.CustomUserDetails;
import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.dto.OrderUserDTO;
import com.example.restaurantmanagerserver.entity.User;
import com.example.restaurantmanagerserver.entity.User;
import com.example.restaurantmanagerserver.repository.UserRepository;
import com.example.restaurantmanagerserver.repository.UserRepository;
import com.example.restaurantmanagerserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {
    @Autowired
    private UserRepository repo;


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) {

        User user = repo.findByUserName(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return new CustomUserDetails(user);
    }

    @Override
    @Transactional
    public UserDetails loadUserById(long id) {
        User user = new User();
        try {

            user = repo.findById(id).get();
            if (user == null) {
                throw new UsernameNotFoundException(id + "");
            }
            return new CustomUserDetails(user);
        } catch (Exception e) {
            return new CustomUserDetails(user);
        }


    }
    
    @Override
    @Transactional
    public List<User> getAllUser() {
        return repo.findAll();
    }

    @Override
    @Transactional
    public User getUser(long id) {
        User x = new User();
        try {

            x = repo.findById(id).get();
        } catch (Exception e) {

            return null;
        }

        return x;
    }

    @Override
    @Transactional
    public MessageDTO addUser(User user) {
        try {
            repo.addUser(user.getBirthDay(),user.getName(),user.getPassword(),user.getPhone(),user.getToken(),user.getUserName(),user.getUserRole().getId(),user.getGender());
        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Add user", "Unsuccessfully");
        }
        return new MessageDTO("Add user", "Successfully");
    }
    @Override
    @Transactional
    public MessageDTO addOrderUser(OrderUserDTO orderUserDTO) {
        try {
            repo.addOrderUser(orderUserDTO.getOrder_id(),orderUserDTO.getUser_id());
        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Add user", "Unsuccessfully");
        }
        return new MessageDTO("Add user", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteUser(long id) {
        try {
            repo.deleteUserById(id);

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete user", "Unsuccessfully");
        }
        return new MessageDTO("Delete user", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO deleteOrderUserByUserId(long id) {
        try {
            repo.deleteOrderUserByUserId(id);

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete user", "Unsuccessfully");
        }
        return new MessageDTO("Delete user", "Successfully");
    }
    @Override
    @Transactional
    public MessageDTO deleteOrderUserByOrderUserId(OrderUserDTO orderUserDTO) {
        try {
            repo.deleteOrderUserByOrderUserId(orderUserDTO.getOrder_id(),orderUserDTO.getUser_id());

        } catch (Exception e) {
            e.printStackTrace();
            return new MessageDTO("Delete user", "Unsuccessfully");
        }
        return new MessageDTO("Delete user", "Successfully");
    }

    @Override
    @Transactional
    public MessageDTO updateUser(long id, User user) {
        try {

            repo.updateUser(id,user.getBirthDay(),user.getName(),user.getPassword(),user.getPhone(),user.getToken(),user.getUserName(),user.getUserRole().getId(),user.getGender());

        } catch (Exception e) {

            //e.printStackTrace();
            return new MessageDTO("Update", "Unsuccessfully");
        }
        return new MessageDTO("Update", "Successfully");
    }
    @Override
    @Transactional
    public MessageDTO updateOrderuserByOrderUserId(long order_id, long user_id, OrderUserDTO orderUserDTO) {
        try {

            repo.updateOrderuserByOrderUserId(order_id,user_id,orderUserDTO.getOrder_id(),orderUserDTO.getUser_id());

        } catch (Exception e) {

            //e.printStackTrace();
            return new MessageDTO("Update", "Unsuccessfully");
        }
        return new MessageDTO("Update", "Successfully");
    }
    @Override
    @Transactional
    public List<User> searchUser(String birthDay,String name, String phone, String userName,String gender) {
        return repo.searchUser(birthDay,name,phone,userName,gender);
    }
}
