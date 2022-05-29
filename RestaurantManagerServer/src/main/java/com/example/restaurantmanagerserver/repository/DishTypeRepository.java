package com.example.restaurantmanagerserver.repository;

import com.example.restaurantmanagerserver.entity.Area;
import com.example.restaurantmanagerserver.entity.DishType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DishTypeRepository extends JpaRepository<DishType,Long> {
    @Modifying
    @Query(value = "INSERT INTO dishtypes (name,description) values(:name,:description)", nativeQuery = true)
    int addDishType(@Param("name") String name, @Param("description") String description);

    @Modifying
    @Query(value = "UPDATE dishtypes set name= :name,description= :description where id= :id",nativeQuery = true)
    int updateDishType(@Param("id")long id,@Param("name") String name,@Param("description") String description);

    @Modifying
    @Query(value = "select *from dishtypes where name like %:name%",nativeQuery = true)
    List<DishType> searchDishType(@Param("name") String name);

    @Modifying
    @Query(value = "delete from dishtypes  where id = :id",nativeQuery = true)
    int deleteDishTypeById(@Param("id") long id);
}
