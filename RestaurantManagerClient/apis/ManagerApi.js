//server
const host = 'http://13.213.49.35';
const port = '9000';
const loginUrl = '/api/login';
//warehouse
const warehouseListUrl = '/warehouse/';
const warehouseAddUrl = '/warehouse/add';
const warehouseDeleteUrl = '/warehouse/delete/';
const warehouseUpdateUrl = '/warehouse/update/';
const warehouseSearchUrl = '/warehouse/search?';
//userrole
const roleListUrl = '/userrole/';
const roleAddUrl = '/userrole/add';
const roleDeleteUrl = '/userrole/delete/';
const roleUpdateUrl = '/userrole/update/';
const roleSearchUrl = '/userrole/search?';
//user
const userListUrl = '/user/';
const userAddUrl = '/user/add';
const userDeleteUrl = '/user/delete/';
const userUpdateUrl = '/user/update/';
const userSearchUrl = '/user/search?';
const userAddorderUserUrl = '/user/add/orderuser';
const userUpdateorderUserUrl = '/user/update/orderuser/';
const userDeleteByUserIdUrl = '/user/delete/orderuser/';
const userDeleteByOrderUserIdUrl = '/user/delete/orderuser';
//Area
const areaListUrl = '/area/'
const areaAddUrl = '/area/add';
const areaDeleteUrl = '/area/delete/';
const areaUpdateUrl = '/area/update/';
const areaSearchUrl = '/area/search?';
//diningtable
const diningTableListUrl = '/diningtable/'
const diningTableAddUrl = '/diningtable/add';
const diningTableDeleteUrl = '/diningtable/delete/';
const diningTableUpdateUrl = '/diningtable/update/';
const diningTableSearchUrl = '/diningtable/search?';
const diningTableAddorderDiningTableUrl = '/diningtable/add/orderdiningtable';
const diningTableUpdateorderDiningTableUrl = '/diningtable/update/orderdiningtable/';
const diningTableDeleteByDiningTableIdUrl = '/diningtable/delete/orderdiningtable/';
const diningTableDeleteByOrderDiningTableIdUrl = '/diningtable/delete/orderdiningtable';
//Dish
const dishListUrl = '/dish/';
const dishAddUrl = '/dish/add';
const dishDeleteUrl = '/dish/delete/';
const dishUpdateUrl = '/dish/update/';
const dishSearchUrl = '/dish/search?';
const dishAddorderDishUrl = '/dish/add/orderdish';
const dishUpdateorderDishUrl = '/dish/update/orderdish/';
const dishDeleteByDishIdUrl = '/dish/delete/orderdish/';
const dishDeleteByOrderDishIdUrl = '/dish/delete/orderdish';
//DishType
const dishTypeListUrl = '/dishtype/';
const dishTypeAddUrl = '/dishtype/add';
const dishTypeDeleteUrl = '/dishtype/delete/';
const dishTypeUpdateUrl = '/dishtype/update/';
const dishTypeSearchUrl = '/dishtype/search?';
//Drink
const drinkListUrl = '/drink/';
const drinkAddUrl = '/drink/add';
const drinkDeleteUrl = '/drink/delete/';
const drinkUpdateUrl = '/drink/update/';
const drinkSearchUrl = '/drink/search?';
const drinkAddorderDrinkUrl = '/drink/add/orderdrink';
const drinkUpdateorderDrinkUrl = '/drink/update/orderdrink/';
const drinkDeleteByDrinkIdUrl = '/drink/delete/orderdrink/';
const drinkDeleteByOrderDrinkIdUrl = '/drink/delete/orderdrink';
//DrinkType
const drinkTypeListUrl = '/drinktype/';
const drinkTypeAddUrl = '/drinktype/add';
const drinkTypeDeleteUrl = '/drinktype/delete/';
const drinkTypeUpdateUrl = '/drinktype/update/';
const drinkTypeSearchUrl = '/drinktype/search?';
//Resource
const resourceListUrl = '/resource/';
const resourceAddUrl = '/resource/add';
const resourceDeleteUrl = '/resource/delete/';
const resourceUpdateUrl = '/resource/update/';
const resourceSearchUrl = '/resource/search?';
const resourceAddResourceDishUrl = '/resource/add/resourcedish';
const resourceUpdateResourceDishUrl = '/resource/update/resourcedish/';
const resourceDeleteByResourceIdUrl = '/resource/delete/shipmentresource/';
const resourceDeleteByResourceDishIdUrl = '/resource/delete/resourcedish';
//ResourceType
const resourceTypeListUrl = '/resourcetype/';
const resourceTypeAddUrl = '/resourcetype/add';
const resourceTypeDeleteUrl = '/resourcetype/delete/';
const resourceTypeUpdateUrl = '/resourcetype/update/';
const resourceTypeSearchUrl = '/resourcetype/search?';

//Shipment
const shipmentListUrl = '/shipment/';
const shipmentAddUrl = '/shipment/add';
const shipmentDeleteUrl = '/shipment/delete/';
const shipmentUpdateUrl = '/shipment/update/';
const shipmentSearchUrl = '/shipment/search?';
const shipmentAddShipmentDrinkUrl = '/shipment/add/shipmentdrink';
const shipmentAddShipmentResourceUrl = '/shipment/add/shipmentresource';
const shipmentUpdateShipmentDrinkUrl = '/shipment/update/shipmentdrink/';
const shipmentUpdateShipmentResourceUrl = '/shipment/update/shipmentresource/';
const shipmentDeleteShipmentResourceByResourceIdUrl = '/shipment/delete/shipmentresource/';
const shipmentDeleteShipmentResourceByShipmentResourceIdUrl = '/shipment/delete/shipmentresource';
const shipmentDeleteShipmentDrinkByDrinkIdUrl = '/shipment/delete/shipmentdrink/';
const shipmentDeleteShipmentDrinkByShipmentDrinkIdUrl = '/shipment/delete/shipmentdrink';

//Order
const orderListUrl = '/order/';
const orderAddUrl = '/order/add';
const orderDeleteUrl = '/order/delete/';
const orderDishDeleteByOrderIdUrl = '/order/delete/orderdish/';
const orderUserDeleteByOrderIdUrl = '/order/delete/orderuser/';
const orderDrinkDeleteByOrderIdUrl = '/order/delete/orderdrink/';
const orderDiningTableDeleteByOrderIdUrl = '/order/delete/orderdiningtable/';
const orderUpdateUrl = '/order/update/';
const orderSearchUrl = '/order/search?';

//Notification
const notificationListUrl='/notification/';
const notificationAddUrl='/notification/add';
const notificationDeleteUrl='/notification/delete/';
const notificationUpdateUrl='/notification/update/';


export {
    host,
    port,
    loginUrl,
    warehouseListUrl,
    warehouseAddUrl,
    warehouseDeleteUrl,
    warehouseUpdateUrl,
    warehouseSearchUrl,
    roleListUrl,
    roleAddUrl,
    roleDeleteUrl,
    roleUpdateUrl,
    roleSearchUrl,
    userListUrl,
    userAddUrl,
    userDeleteUrl,
    userUpdateUrl,
    userSearchUrl,
    userAddorderUserUrl,
    userDeleteByOrderUserIdUrl,
    userDeleteByUserIdUrl,
    userUpdateorderUserUrl,
    areaListUrl,
    areaAddUrl,
    areaDeleteUrl,
    areaUpdateUrl,
    areaSearchUrl,
    diningTableListUrl,
    diningTableAddUrl,
    diningTableDeleteUrl,
    diningTableUpdateUrl,
    diningTableSearchUrl,
    diningTableAddorderDiningTableUrl,
    diningTableDeleteByDiningTableIdUrl,
    diningTableDeleteByOrderDiningTableIdUrl,
    diningTableUpdateorderDiningTableUrl,
    dishAddUrl,
    dishDeleteUrl,
    dishListUrl,
    dishSearchUrl,
    dishUpdateUrl,
    dishAddorderDishUrl,
    dishDeleteByDishIdUrl,
    dishDeleteByOrderDishIdUrl,
    dishUpdateorderDishUrl,
    dishTypeAddUrl,
    dishTypeDeleteUrl,
    dishTypeListUrl,
    dishTypeSearchUrl,
    dishTypeUpdateUrl,
    drinkAddUrl,
    drinkDeleteUrl,
    drinkListUrl,
    drinkSearchUrl,
    drinkUpdateUrl,
    drinkAddorderDrinkUrl,
    drinkDeleteByDrinkIdUrl,
    drinkDeleteByOrderDrinkIdUrl,
    drinkUpdateorderDrinkUrl,
    drinkTypeAddUrl,
    drinkTypeDeleteUrl,
    drinkTypeListUrl,
    drinkTypeSearchUrl,
    drinkTypeUpdateUrl,
    resourceAddUrl,
    resourceDeleteUrl,
    resourceListUrl,
    resourceSearchUrl,
    resourceUpdateUrl,
    resourceAddResourceDishUrl,
    resourceDeleteByResourceIdUrl,
    resourceDeleteByResourceDishIdUrl,
    resourceUpdateResourceDishUrl,
    resourceTypeAddUrl,
    resourceTypeDeleteUrl,
    resourceTypeListUrl,
    resourceTypeSearchUrl,
    resourceTypeUpdateUrl,
    shipmentAddUrl,
    shipmentDeleteUrl,
    shipmentListUrl,
    shipmentSearchUrl,
    shipmentUpdateUrl,
    shipmentAddShipmentDrinkUrl,
    shipmentAddShipmentResourceUrl,
    shipmentDeleteShipmentDrinkByShipmentDrinkIdUrl,
    shipmentDeleteShipmentDrinkByDrinkIdUrl,
    shipmentDeleteShipmentResourceByResourceIdUrl,
    shipmentDeleteShipmentResourceByShipmentResourceIdUrl,
    shipmentUpdateShipmentDrinkUrl,
    shipmentUpdateShipmentResourceUrl,
    orderAddUrl,
    orderDeleteUrl,
    orderListUrl,
    orderSearchUrl,
    orderUpdateUrl,
    orderDiningTableDeleteByOrderIdUrl,
    orderDishDeleteByOrderIdUrl,
    orderDrinkDeleteByOrderIdUrl,
    orderUserDeleteByOrderIdUrl,
    notificationAddUrl,
    notificationDeleteUrl,
    notificationListUrl,
    notificationUpdateUrl
};