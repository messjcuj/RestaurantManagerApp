package com.example.restaurantmanagerserver.repository;

import com.example.restaurantmanagerserver.entity.ResourceType;
import com.example.restaurantmanagerserver.entity.ResourceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceTypeRepository extends JpaRepository<ResourceType,Long> {
    @Modifying
    @Query(value = "INSERT INTO resourcetypes (name,description) values(:name,:description)", nativeQuery = true)
    int addResourceType(@Param("name") String name, @Param("description") String description);

    @Modifying
    @Query(value = "UPDATE resourcetypes set name= :name,description= :description where id= :id",nativeQuery = true)
    int updateResourceType(@Param("id")long id,@Param("name") String name,@Param("description") String description);

    @Modifying
    @Query(value = "select *from resourcetypes where name like %:name%",nativeQuery = true)
    List<ResourceType> searchResourceType(@Param("name") String name);

    @Modifying
    @Query(value = "delete from resourcetypes  where id = :id",nativeQuery = true)
    int deleteResourceTypeById(@Param("id") long id);
}
