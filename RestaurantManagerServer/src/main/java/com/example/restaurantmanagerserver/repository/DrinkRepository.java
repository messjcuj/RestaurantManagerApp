package com.example.restaurantmanagerserver.repository;

import com.example.restaurantmanagerserver.entity.Drink;
import com.example.restaurantmanagerserver.entity.Drink;
import com.example.restaurantmanagerserver.entity.Drink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DrinkRepository extends JpaRepository<Drink, Long> {
    @Modifying
    @Query(value = "INSERT INTO drinks (name,urlImage,description,price,unit,drinktype_id) values(:name,:urlImage,:description,:price,:unit,:drinktype_id)", nativeQuery = true)
    int addDrink(@Param("name") String name, @Param("urlImage") String urlImage, @Param("description") String description, @Param("price") double price, @Param("unit") String unit, @Param("drinktype_id") long drinktype_id);

    @Modifying
    @Query(value = "INSERT INTO orders_drinks (order_id,drink_id,price,quantity,unit,type) values(:order_id,:drink_id,:price,:quantity,:unit,:type)", nativeQuery = true)
    int addOrderDrink(@Param("order_id") long order_id, @Param("drink_id") long drink_id, @Param("price") double price, @Param("quantity") long quantity, @Param("unit") String unit, @Param("type") String type);

    @Modifying
    @Query(value = "UPDATE drinks set name= :name,urlImage= :urlImage,description= :description,price= :price,unit= :unit,drinktype_id= :drinktype_id where id=:id", nativeQuery = true)
    int updateDrink(@Param("id") long id, @Param("name") String name, @Param("urlImage") String urlImage, @Param("description") String description, @Param("price") double price, @Param("unit") String unit, @Param("drinktype_id") long drinktype_id);

    @Modifying
    @Query(value = "UPDATE orders_drinks set quantity= :quantity,unit=:unit,type=:type,price=:price,drink_id=:newDrink_id,order_id=:newOrder_id where order_id=:order_id and drink_id=:drink_id", nativeQuery = true)
    int updateOrderdrinkByOrderDrinkId(@Param("order_id") long order_id, @Param("drink_id") long drink_id, @Param("newOrder_id") long newOrder_id, @Param("newDrink_id") long newDrink_id, @Param("price") double price, @Param("quantity") long quantity, @Param("unit") String unit, @Param("type") String type);


    @Modifying
    @Query(value = "delete from drinks where id = :id", nativeQuery = true)
    int deleteDrinkById(@Param("id") long id);

    @Modifying
    @Query(value = "delete from orders_drinks where drink_id = :id", nativeQuery = true)
    int deleteOrderDrinkByDrinkId(@Param("id") long id);

    @Modifying
    @Query(value = "delete from orders_drinks where order_id = :order_id and drink_id=:drink_id", nativeQuery = true)
    int deleteOrderDrinkByOrderDrinkId(@Param("order_id") long order_id, @Param("drink_id") long drink_id);

    @Modifying
    @Query(value = "select *from drinks where name like %:name% and price like %:price% and unit like %:unit%", nativeQuery = true)
    List<Drink> searchDrink(@Param("name") String name, @Param("price") String price, @Param("unit") String unit);

}
