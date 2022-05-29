package com.example.restaurantmanagerserver.repository;

import com.example.restaurantmanagerserver.entity.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AreaRepository extends JpaRepository<Area,Long> {
    @Modifying
    @Query(value = "INSERT INTO areas (name,description) values(:name,:description)", nativeQuery = true)
    int addArea(@Param("name") String name, @Param("description") String description);

    @Modifying
    @Query(value = "UPDATE areas set name= :name,description= :description where id= :id",nativeQuery = true)
    int updateArea(@Param("id")long id,@Param("name") String name,@Param("description") String description);

    @Modifying
    @Query(value = "select *from areas where name like %:name%",nativeQuery = true)
    List<Area> searchArea(@Param("name") String name);

    @Modifying
    @Query(value = "delete from areas  where id = :id",nativeQuery = true)
    int deleteAreaById(@Param("id") long id);
}
