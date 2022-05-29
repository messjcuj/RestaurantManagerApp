package com.example.restaurantmanagerserver.repository;


import com.example.restaurantmanagerserver.entity.User;
import com.example.restaurantmanagerserver.entity.Notification;
import com.example.restaurantmanagerserver.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserName(String username);

    @Modifying
    @Query(value = "INSERT INTO users (birthDay,name,password,phone,token,userName,userrole_id,gender) values(:birthDay,:name,:password,:phone,:token,:userName,:userrole_id,:gender)", nativeQuery = true)
    int addUser(@Param("birthDay") LocalDate birthDay, @Param("name") String name, @Param("password") String password, @Param("phone") String phone, @Param("token") String token, @Param("userName") String userName, @Param("userrole_id") long userrole_id, @Param("gender") String gender);

    @Modifying
    @Query(value = "INSERT INTO orders_users (order_id,user_id) values(:order_id,:user_id)", nativeQuery = true)
    int addOrderUser(@Param("order_id") long order_id, @Param("user_id") long user_id);


    @Modifying
    @Query(value = "UPDATE users set birthDay= :birthDay,name= :name,password= :password,phone= :phone,token= :token,userName= :userName,userrole_id= :userrole_id,gender=:gender where id=:id", nativeQuery = true)
    int updateUser(@Param("id") long id, @Param("birthDay") LocalDate birthDay, @Param("name") String name, @Param("password") String password, @Param("phone") String phone, @Param("token") String token, @Param("userName") String userName, @Param("userrole_id") long userrole_id,@Param("gender") String gender);

    @Modifying
    @Query(value = "UPDATE orders_users set user_id=:newUser_id,order_id=:newOrder_id where order_id=:order_id and user_id=:user_id", nativeQuery = true)
    int updateOrderuserByOrderUserId(@Param("order_id") long order_id, @Param("user_id") long user_id, @Param("newOrder_id") long newOrder_id, @Param("newUser_id") long newUser_id);


    @Modifying
    @Query(value = "delete from users where id = :id", nativeQuery = true)
    int deleteUserById(@Param("id") long id);

    @Modifying
    @Query(value = "delete from orders_users where user_id = :id", nativeQuery = true)
    int deleteOrderUserByUserId(@Param("id") long id);

    @Modifying
    @Query(value = "delete from orders_users where order_id = :order_id and user_id=:user_id", nativeQuery = true)
    int deleteOrderUserByOrderUserId(@Param("order_id") long order_id, @Param("user_id") long user_id);


    @Modifying
    @Query(value = "select *from users where birthDay like %:birthDay% and name like %:name% and phone like %:phone% and userName like %:userName% and gender like %:gender% ", nativeQuery = true)
    List<User> searchUser(@Param("birthDay") String birthDay, @Param("name") String name, @Param("phone") String phone, @Param("userName") String userName,@Param("gender") String gender);


}
