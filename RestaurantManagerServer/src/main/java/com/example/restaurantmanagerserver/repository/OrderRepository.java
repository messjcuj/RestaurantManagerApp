package com.example.restaurantmanagerserver.repository;

import com.example.restaurantmanagerserver.entity.Order;
import com.example.restaurantmanagerserver.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Modifying
    @Query(value = "INSERT INTO orders (vat,status,time,type) values(:VAT,:status,:time,:type)", nativeQuery = true)
    int addOrder(@Param("VAT") double VAT, @Param("status") String status, @Param("time") LocalDateTime time, @Param("type") String type);
    
    @Modifying
    @Query(value = "select *from orders where vat like %:vat% and time like %:time% and type like %:type% and status like %:status%", nativeQuery = true)
    List<Order> searchOrder(@Param("vat") String vat, @Param("time") String time, @Param("type") String type, @Param("status") String status);

    @Modifying
    @Query(value = "UPDATE orders set vat= :vat,time= :time,type= :type,status= :status where id=:id", nativeQuery = true)
    int updateOrder(@Param("id") long id, @Param("vat") double vat, @Param("time") LocalDateTime time, @Param("type") String type, @Param("status") String status);

    @Modifying
    @Query(value = "delete from orders where id = :id", nativeQuery = true)
    int deleteOrderById(@Param("id") long id);

    @Modifying
    @Query(value = "delete from orders_dishs where order_id = :id", nativeQuery = true)
    int deleteOrderDishByOrderId(@Param("id") long id);

    @Modifying
    @Query(value = "delete from orders_drinks where order_id = :id", nativeQuery = true)
    int deleteOrderDrinksByOrderId(@Param("id") long id);

    @Modifying
    @Query(value = "delete from orders_users where order_id = :id", nativeQuery = true)
    int deleteOrderUserByOrderId(@Param("id") long id);

    @Modifying
    @Query(value = "delete from orders_diningtables where order_id = :id", nativeQuery = true)
    int deleteOrderDiningTableByOrderId(@Param("id") long id);

}
