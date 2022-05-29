package com.example.restaurantmanagerserver.repository;

import com.example.restaurantmanagerserver.entity.Area;
import com.example.restaurantmanagerserver.entity.DiningTable;
import com.example.restaurantmanagerserver.entity.DiningTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DiningTableRepository extends JpaRepository<DiningTable,Long> {
    @Modifying
    @Query(value = "delete from diningtables  where id = :id",nativeQuery = true)
    int deleteDiningTableById(@Param("id") long id);

    @Modifying
    @Query(value = "delete from orders_diningTables where diningTable_id = :id", nativeQuery = true)
    int deleteOrderDiningTableByDiningTableId(@Param("id") long id);

    @Modifying
    @Query(value = "delete from orders_diningTables where order_id = :order_id and diningTable_id=:diningTable_id", nativeQuery = true)
    int deleteOrderDiningTableByOrderDiningTableId(@Param("order_id") long order_id, @Param("diningTable_id") long diningTable_id);


    @Modifying
    @Query(value = "Update diningtables SET name=:name,status=:status,type=:type,area_id=:area_id where id= :id",nativeQuery = true)
    int updateDiningTable(@Param("id") long id, @Param("name") String name, @Param("status") String status,@Param("type") String type,@Param("area_id") long area_id);

    @Modifying
    @Query(value = "UPDATE orders_diningTables set type=:type,diningTable_id=:newDiningTable_id,order_id=:newOrder_id where order_id=:order_id and diningTable_id=:diningTable_id", nativeQuery = true)
    int updateOrderdiningTableByOrderDiningTableId(@Param("order_id") long order_id, @Param("diningTable_id") long diningTable_id, @Param("newOrder_id") long newOrder_id, @Param("newDiningTable_id") long newDiningTable_id,@Param("type") String type);


    @Modifying
    @Query(value = "INSERT INTO diningtables (name,status,type,area_id) values(:name,:status,:type,:area_id)",nativeQuery = true)
    int addDiningTable(@Param("name") String name, @Param("status") String status,@Param("type") String type,@Param("area_id") long area_id);


    @Modifying
    @Query(value = "INSERT INTO orders_diningTables (order_id,diningTable_id,type) values(:order_id,:diningTable_id,:type)", nativeQuery = true)
    int addOrderDiningTable(@Param("order_id") long order_id, @Param("diningTable_id") long diningTable_id, @Param("type") String type);



    @Modifying
    @Query(value = "select *from diningtables where name like %:name%",nativeQuery = true)
    List<DiningTable> searchDiningTable(@Param("name") String name);

/////








}
