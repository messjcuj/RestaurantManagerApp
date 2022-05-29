package com.example.restaurantmanagerserver.repository;

import com.example.restaurantmanagerserver.entity.DiningTable;
import com.example.restaurantmanagerserver.entity.Notification;
import com.example.restaurantmanagerserver.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Modifying
    @Query(value = "delete from notifications  where id = :id", nativeQuery = true)
    int deleteNotificationById(@Param("id") long id);

    @Modifying
    @Query("Update Notification t SET t.name=:name,t.detail=:detail,t.time=:time,t.status=:status,t.user.id=:user_id where t.id= :id")
    int updateNotification(@Param("id") long id, @Param("name") String name, @Param("detail") String detail, @Param("time") LocalDateTime time, @Param("status") Boolean status, @Param("user_id") long user_id);

    @Modifying
    @Query(value = "INSERT INTO notifications (detail,name,status,time,user_id) values(:detail,:name,:status,:time,:user_id)", nativeQuery = true)
    int addNotification(@Param("name") String name, @Param("detail") String detail, @Param("time") LocalDateTime time, @Param("status") Boolean status, @Param("user_id") long user_id);

    @Modifying
    @Query(value = "select *from notifications where name like %:name% and status like %:status% and time like %:time%", nativeQuery = true)
    List<Notification> searchNotification(@Param("name") String name,@Param("status") String status,@Param("time")String time);

}
