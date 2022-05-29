package com.example.restaurantmanagerserver.repository;

import com.example.restaurantmanagerserver.entity.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    @Modifying
    @Query(value = "INSERT INTO shipments (name,time,warehouse_id) values(:name,:time,:warehouse_id)", nativeQuery = true)
    int addShipment(@Param("name") String name, @Param("time") LocalDate time,@Param("warehouse_id")long warehouse_id);

    @Modifying
    @Query(value = "INSERT INTO shipments_resources (shipment_id,resource_id,quantity,preserveTime,price) values(:shipment_id,:resource_id,:quantity,:preserveTime,:price)", nativeQuery = true)
    int addShipmentResource(@Param("shipment_id") long shipment_id, @Param("resource_id") long resource_id, @Param("quantity") long quantity, @Param("preserveTime") LocalDate preserveTime, @Param("price") double price);

    @Modifying
    @Query(value = "INSERT INTO shipments_drinks (shipment_id,drink_id,quantity,preserveTime,price) values(:shipment_id,:drink_id,:quantity,:preserveTime,:price)", nativeQuery = true)
    int addShipmentDrink(@Param("shipment_id") long shipment_id, @Param("drink_id") long drink_id, @Param("quantity") long quantity, @Param("preserveTime") LocalDate preserveTime, @Param("price") double price);


    @Modifying
    @Query(value = "select *from shipments where name like %:name% and time like %:time%", nativeQuery = true)
    List<Shipment> searchShipment(@Param("name") String name, @Param("time") String time);

    @Modifying
    @Query(value = "UPDATE shipments set name= :name,time= :time,warehouse_id=:warehouse_id where id=:id", nativeQuery = true)
    int updateShipment(@Param("id") long id, @Param("name") String name, @Param("time") LocalDate time,@Param("warehouse_id") long warehouse_id);

    @Modifying
    @Query(value = "UPDATE shipments_resources set quantity= :quantity,preserveTime= :preserveTime,price=:price,shipment_id=:newShipment_id,resource_id=:newResource_id where shipment_id=:shipment_id and resource_id=:resource_id", nativeQuery = true)
    int updateShipmentResourceByShipmentResourceId(@Param("shipment_id") long shipment_id,@Param("resource_id") long resource_id,@Param("newShipment_id") long newShipment_id, @Param("newResource_id") long newResource_id, @Param("quantity") long quantity, @Param("preserveTime") LocalDate preserveTime, @Param("price") double price);

    @Modifying
    @Query(value = "UPDATE shipments_drinks set quantity= :quantity,preserveTime= :preserveTime,price=:price,shipment_id=:newShipment_id,drink_id=:newDrink_id where shipment_id=:shipment_id and drink_id=:drink_id", nativeQuery = true)
    int updateShipmentDrinkByShipmentDrinkId(@Param("shipment_id") long shipment_id, @Param("drink_id") long drink_id,@Param("newShipment_id") long newShipment_id, @Param("newDrink_id") long newDrink_id, @Param("quantity") long quantity, @Param("preserveTime") LocalDate preserveTime, @Param("price") double price);

    @Modifying
    @Query(value = "delete from shipments  where id = :id", nativeQuery = true)
    int deleteShipmentById(@Param("id") long id);

    @Modifying
    @Query(value = "delete from shipments_resources  where resource_id = :resource_id", nativeQuery = true)
    int deleteShipmentResourceByResourceId(@Param("resource_id") long resource_id);

    @Modifying
    @Query(value = "delete from shipments_resources  where shipment_id=:shipment_id and resource_id = :resource_id", nativeQuery = true)
    int deleteShipmentResourceByShipmentResourceId(@Param("shipment_id") long shipment_id,@Param("resource_id") long resource_id);

    @Modifying
    @Query(value = "delete from shipments_drinks  where drink_id = :drink_id", nativeQuery = true)
    int deleteShipmentDrinkByDrinkId(@Param("drink_id") long drink_id);

    @Modifying
    @Query(value = "delete from shipments_drinks  where shipment_id=:shipment_id and drink_id = :drink_id", nativeQuery = true)
    int deleteShipmentDrinkByShipmentDrinkId(@Param("shipment_id") long shipment_id,@Param("drink_id") long drink_id);
}
