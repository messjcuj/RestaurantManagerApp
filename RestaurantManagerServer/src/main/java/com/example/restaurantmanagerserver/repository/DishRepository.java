package com.example.restaurantmanagerserver.repository;

import com.example.restaurantmanagerserver.entity.Dish;
import com.example.restaurantmanagerserver.entity.Dish;
import com.example.restaurantmanagerserver.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface DishRepository extends JpaRepository<Dish, Long> {
    @Modifying
    @Query(value = "INSERT INTO dishs (name,urlImage,description,price,unit,dishtype_id) values(:name,:urlImage,:description,:price,:unit,:dishtype_id)", nativeQuery = true)
    int addDish(@Param("name") String name, @Param("urlImage") String urlImage, @Param("description") String description, @Param("price") double price, @Param("unit") String unit, @Param("dishtype_id") long dishtype_id);

    @Modifying
    @Query(value = "INSERT INTO orders_dishs (order_id,dish_id,price,quantity,unit,type) values(:order_id,:dish_id,:price,:quantity,:unit,:type)", nativeQuery = true)
    int addOrderDish(@Param("order_id") long order_id, @Param("dish_id") long dish_id, @Param("price") double price, @Param("quantity") long quantity, @Param("unit") String unit, @Param("type") String type);

    @Modifying
    @Query(value = "UPDATE dishs set name= :name,urlImage= :urlImage,description= :description,price= :price,unit= :unit,dishtype_id= :dishtype_id where id=:id", nativeQuery = true)
    int updateDish(@Param("id") long id, @Param("name") String name, @Param("urlImage") String urlImage, @Param("description") String description, @Param("price") double price, @Param("unit") String unit, @Param("dishtype_id") long dishtype_id);

    @Modifying
    @Query(value = "UPDATE orders_dishs set quantity= :quantity,unit=:unit,type=:type,price=:price,dish_id=:newDish_id,order_id=:newOrder_id where order_id=:order_id and dish_id=:dish_id", nativeQuery = true)
    int updateOrderdishByOrderDishId(@Param("order_id") long order_id, @Param("dish_id") long dish_id, @Param("newOrder_id") long newOrder_id, @Param("newDish_id") long newDish_id, @Param("price") double price, @Param("quantity") long quantity, @Param("unit") String unit, @Param("type") String type);


    @Modifying
    @Query(value = "delete from dishs where id = :id", nativeQuery = true)
    int deleteDishById(@Param("id") long id);

    @Modifying
    @Query(value = "delete from orders_dishs where dish_id = :id", nativeQuery = true)
    int deleteOrderDishByDishId(@Param("id") long id);

    @Modifying
    @Query(value = "delete from orders_dishs where order_id = :order_id and dish_id=:dish_id", nativeQuery = true)
    int deleteOrderDishByOrderDishId(@Param("order_id") long order_id, @Param("dish_id") long dish_id);

    @Modifying
    @Query(value = "select *from dishs where name like %:name% and price like %:price% and unit like %:unit%", nativeQuery = true)
    List<Dish> searchDish(@Param("name") String name, @Param("price") String price, @Param("unit") String unit);


}
