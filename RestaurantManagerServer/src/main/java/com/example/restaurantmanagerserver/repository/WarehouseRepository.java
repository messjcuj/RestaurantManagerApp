package com.example.restaurantmanagerserver.repository;

import com.example.restaurantmanagerserver.entity.Warehouse;
import com.example.restaurantmanagerserver.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse,Long> {
    @Modifying
    @Query(value = "INSERT INTO warehouses (name,description) values(:name,:description)", nativeQuery = true)
    int addWarehouse(@Param("name") String name, @Param("description") String description);

    @Modifying
    @Query(value = "UPDATE warehouses set name= :name,description= :description where id= :id",nativeQuery = true)
    int updateWarehouse(@Param("id")long id,@Param("name") String name,@Param("description") String description);

    @Modifying
    @Query(value = "select *from warehouses where name like %:name%",nativeQuery = true)
    List<Warehouse> searchWarehouse(@Param("name") String name);

    @Modifying
    @Query(value = "delete from warehouses  where id = :id",nativeQuery = true)
    int deleteWarehouseById(@Param("id") long id);
}
