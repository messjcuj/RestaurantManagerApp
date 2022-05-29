package com.example.restaurantmanagerserver;

import com.example.restaurantmanagerserver.entity.Notification;
import com.example.restaurantmanagerserver.entity.Order;
import com.example.restaurantmanagerserver.entity.User;
import com.example.restaurantmanagerserver.entity.UserRole;
import com.example.restaurantmanagerserver.log.LogMethod;
import com.example.restaurantmanagerserver.repository.UserRepository;
import com.example.restaurantmanagerserver.repository.UserRoleRepository;
import com.example.restaurantmanagerserver.service.UserRoleService;
import com.example.restaurantmanagerserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.HashSet;

@SpringBootApplication
public class RestaurantManagerServerApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(RestaurantManagerServerApplication.class, args);
    }

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserRoleRepository userRoleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        try {
            UserRole userRole = new UserRole();
            UserRole userRole_1=new UserRole();
            UserRole userRole_2=new UserRole();
            UserRole userRole_3=new UserRole();
            User user = new User();
            userRole.setName("Quản lý");
            userRole.setDescription("Quản lý toàn bộ hệ thống nhà hàng");
            user.setUserName("quanly");
            user.setName("Trương Tuấn Phúc");
            user.setGender("Nam");
            user.setBirthDay(LocalDate.of(2000, 4, 23));
            user.setPhone("0123456789");
            user.setPassword(passwordEncoder.encode("123456"));
            userRole.setName("Quản lý");
            userRole.setDescription("Người phụ trách quản lý hệ thống nhà hàng");
            user.setUserRole(userRole);
            if (userRepository.findByUserName("quanly") == null) {
                userRepository.save(user);
                userRole_1.setName("Phục vụ");
                userRole_1.setDescription("Phụ trách mang dọn thức ăn, thanh toán");
                userRole_1.setUsers(null);
                userRoleRepository.save(userRole_1);
                userRole_2.setName("Thu ngân");
                userRole_2.setDescription("Tạo đơn hàng,thanh toán, in hóa đơn");
                userRole_2.setUsers(null);
                userRoleRepository.save(userRole_2);
                userRole_3.setName("Đầu bếp");
                userRole_3.setDescription("Chế biến món ăn theo yêu cầu khách hàng");
                userRole_3.setUsers(null);
                userRoleRepository.save(userRole_3);
            }


            //LogMethod.writeDataLineByLine("src/main/java/com/example/restaurantmanagerserver/log/restaurant_log.csv");
            System.out.println("Server on port 9000");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}