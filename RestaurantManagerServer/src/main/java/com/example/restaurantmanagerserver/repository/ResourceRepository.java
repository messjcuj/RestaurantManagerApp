package com.example.restaurantmanagerserver.repository;

import com.example.restaurantmanagerserver.entity.Resource;
import com.example.restaurantmanagerserver.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource,Long> {
    @Modifying
    @Query(value = "INSERT INTO resources (name,description,unit,resourcetype_id) values(:name,:description,:unit,:resourcetype_id)", nativeQuery = true)
    int addResource(@Param("name") String name, @Param("description") String description, @Param("unit") String unit, @Param("resourcetype_id") long resourcetype_id);

    @Modifying
    @Query(value = "INSERT INTO resources_dishs (resource_id,dish_id,quantity,unit) values(:resource_id,:dish_id,:quantity,:unit)", nativeQuery = true)
    int addResourceDish(@Param("resource_id") long resource_id, @Param("dish_id") long dish_id, @Param("quantity") long quantity, @Param("unit") String unit);


    @Modifying
    @Query(value = "UPDATE resources set name= :name,description= :description,unit= :unit,urlImage=:urlImage,resourcetype_id= :resourcetype_id where id=:id", nativeQuery = true)
    int updateResource(@Param("id") long id, @Param("name") String name, @Param("description") String description, @Param("unit") String unit,@Param("urlImage") String urlImage, @Param("resourcetype_id") long resourcetype_id);

    @Modifying
    @Query(value = "UPDATE resources_dishs set quantity= :quantity,unit=:unit,dish_id=:newDish_id,resource_id=:newResource_id where resource_id=:resource_id and dish_id=:dish_id", nativeQuery = true)
    int updateResourcedishByResourceDishId(@Param("resource_id") long resource_id, @Param("dish_id") long dish_id,@Param("newResource_id") long newResource_id,@Param("newDish_id") long newDish_id, @Param("quantity") long quantity, @Param("unit") String unit);


    @Modifying
    @Query(value = "delete from resources where id = :id", nativeQuery = true)
    int deleteResourceById(@Param("id") long id);

    @Modifying
    @Query(value = "delete from resources_dishs where resource_id = :id", nativeQuery = true)
    int deleteResourceDishByResourceId(@Param("id") long id);

    @Modifying
    @Query(value = "delete from resources_dishs where resource_id = :resource_id and dish_id=:dish_id", nativeQuery = true)
    int deleteResourceDishByResourceDishId(@Param("resource_id") long resource_id,@Param("dish_id") long dish_id);

    @Modifying
    @Query(value = "select *from resources where name like %:name% and unit like %:unit%", nativeQuery = true)
    List<Resource> searchResource(@Param("name") String name, @Param("unit") String unit);


}
