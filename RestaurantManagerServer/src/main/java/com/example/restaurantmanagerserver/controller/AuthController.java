package com.example.restaurantmanagerserver.controller;

import com.example.restaurantmanagerserver.authen.CustomUserDetails;
import com.example.restaurantmanagerserver.authen.JwtTokenProvider;
import com.example.restaurantmanagerserver.dto.LogDTO;
import com.example.restaurantmanagerserver.dto.UserDTO;
import com.example.restaurantmanagerserver.dto.MessageDTO;
import com.example.restaurantmanagerserver.entity.User;
import com.example.restaurantmanagerserver.log.LogMethod;
import com.example.restaurantmanagerserver.repository.UserRepository;
import com.example.restaurantmanagerserver.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@Slf4j
@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    UserService service;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    Logger logger = LoggerFactory.getLogger(AuthController.class);
    MessageDTO successMessage= MessageDTO.getInstance();
    LogDTO logDTO=LogDTO.getInstance();
    UserDTO userDTO=UserDTO.getInstance();

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody UserDTO userDTO) {
        User user=new User();
        // Xác thực từ username và password.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userDTO.getUserName(),
                        userDTO.getPassword()
                )
        );

        // Nếu không xảy ra exception tức là thông tin hợp lệ
        // Set thông tin authentication vào Security Context
        //SecurityContextHolder.getContext().setAuthentication(authentication);

        // Trả về jwt cho người dùng.
        String jwt = tokenProvider.generateToken((CustomUserDetails) authentication.getPrincipal());
        //user.setUserName(userDTO.getUserName());
        //user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user=userRepository.findByUserName(userDTO.getUserName());
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setUserName(user.getUserName());
        userDTO.setPassword(user.getPassword());
        userDTO.setGender(user.getGender());
        userDTO.setBirthDay(user.getBirthDay().toString());
        userDTO.setPhone(user.getPhone());
        userDTO.setRole(user.getUserRole().getName());
        userDTO.setToken(jwt);
        service.updateUser(user.getId(),user);
        logDTO.setTitle("Login");
        logDTO.setDetail("Successfully");
        logDTO.setTime(LocalDateTime.now().toString());
        logger.info(logDTO.getTitle()+" - "+logDTO.getDetail());
        LogMethod.writeDataLineByLine(logDTO);
        return new ResponseEntity<UserDTO>(userDTO, HttpStatus.OK);
    }

}
