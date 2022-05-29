package com.example.restaurantmanagerserver.repository;

import com.example.restaurantmanagerserver.entity.Area;
import com.example.restaurantmanagerserver.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    @Modifying
    @Query(value = "INSERT INTO userroles (name,description) values(:name,:description)", nativeQuery = true)
    int addUserRole(@Param("name") String name, @Param("description") String description);

    @Modifying
    @Query(value = "UPDATE userroles set name= :name,description= :description where id= :id",nativeQuery = true)
    int updateUserRole(@Param("id")long id,@Param("name") String name,@Param("description") String description);

    @Modifying
    @Query(value = "select *from userroles where name like %:name%",nativeQuery = true)
    List<UserRole> searchUserRole(@Param("name") String name);
}
