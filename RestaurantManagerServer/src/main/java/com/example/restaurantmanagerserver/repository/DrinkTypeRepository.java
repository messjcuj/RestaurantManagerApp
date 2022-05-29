package com.example.restaurantmanagerserver.repository;

import com.example.restaurantmanagerserver.entity.Area;
import com.example.restaurantmanagerserver.entity.DishType;
import com.example.restaurantmanagerserver.entity.DrinkType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DrinkTypeRepository extends JpaRepository<DrinkType,Long> {
    @Modifying
    @Query(value = "INSERT INTO drinktypes (name,description) values(:name,:description)", nativeQuery = true)
    int addDrinkType(@Param("name") String name, @Param("description") String description);

    @Modifying
    @Query(value = "UPDATE drinktypes set name= :name,description= :description where id= :id",nativeQuery = true)
    int updateDrinkType(@Param("id")long id,@Param("name") String name,@Param("description") String description);

    @Modifying
    @Query(value = "select *from drinktypes where name like %:name%",nativeQuery = true)
    List<DrinkType> searchDrinkType(@Param("name") String name);

    @Modifying
    @Query(value = "delete from drinktypes  where id = :id",nativeQuery = true)
    int deleteDinkTypeById(@Param("id") long id);
}
