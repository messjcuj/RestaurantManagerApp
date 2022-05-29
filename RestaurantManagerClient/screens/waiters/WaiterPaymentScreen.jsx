import React from 'react';
import { LogBox, Animated, ScrollView, Dimensions, Alert, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Input, Badge } from 'react-native-elements';
import { WaiterPaymentStyle } from '../../styles/LayoutStyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { host, port, diningTableSearchUrl, userAddorderUserUrl, notificationAddUrl, orderAddUrl, drinkDeleteByOrderDrinkIdUrl, dishDeleteByOrderDishIdUrl, drinkDeleteByDrinkIdUrl, dishDeleteByDishIdUrl, diningTableAddorderDiningTableUrl, shipmentUpdateShipmentResourceUrl, resourceListUrl, dishAddorderDishUrl, drinkAddorderDrinkUrl, dishTypeListUrl, dishListUrl, orderListUrl, orderUpdateUrl, areaListUrl, shipmentAddUrl, shipmentAddShipmentDrinkUrl, shipmentDeleteShipmentDrinkByShipmentDrinkIdUrl, shipmentDeleteShipmentDrinkByDrinkIdUrl, shipmentUpdateShipmentDrinkUrl, warehouseListUrl, drinkSearchUrl, drinkAddUrl, drinkDeleteUrl, drinkListUrl, drinkUpdateUrl, drinkTypeListUrl, diningTableListUrl, diningTableUpdateUrl } from '../../apis/ManagerApi';
import { Icon } from 'react-native-elements';
import AnimatedLoader from "react-native-animated-loader";
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import * as ImagePicker from 'expo-image-picker';
import { initializeApp } from "firebase/app";
import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";
import 'intl';
import 'intl/locale-data/jsonp/en';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Checkbox from 'expo-checkbox';
import { Table, Row, Rows } from 'react-native-table-component';
const { firebaseConfig } = require('../../configs/Firebase');

class WaiterPaymentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchModal: false,
      searchModalInitial: 0,
      modalBill: false,
      modalOrderBringHomeSearch: false,
      modalOrderBringHomeSearchInitial: 0,
      modalFoodCartAdd: false,
      modalDishFilter: false,
      modalDrinkFilter: false,
      modalDishQuantity: false,
      modalDrinkQuantity: false,
      modalDiningTableType: false,
      shipmentDrinkModal: false,
      shipmentDrinkModalInitial: 1,
      paymentModal: false,
      paymentModalInitial: 1,
      fadeAnimUpdate: new Animated.Value(0),
      fadeAnimAdd: new Animated.Value(0),
      fadeAnimHome: new Animated.Value(0),
      fadeAnimShipmentDrink: new Animated.Value(0),
      id: '',
      inputName: '',
      inputShipmentName: '',
      inputUnit: '',
      inputDescription: '',
      inputPrice: '',
      inputDrinkType: null,
      inputUrlImage: null,
      inputWarehouse: null,
      inputShipmentDrinkName: '',
      inputShipmentDrinkQuantity: '',
      inputShipmentDrinkpreserveTime: null,
      inputPriceCustomer: '',
      inputDishQuantity: '',
      inputDrinkQuantity: '',
      outputShipmentDrinkPreserveTime: null,
      outputDishQuantity: '',
      outputDrinkQuantity: '',
      outputPriceTotal: 0,
      outputPriceTotalCart: 0,
      outputPriceResidual: 0,
      outputDiningTableForm: '',
      flagShipmentDrinkPreserve: false,
      inputShipmentDrinkPrice: '',
      optionType: [],
      optionTypeSetup: false,
      optionTypeValue: 0,
      optionWarehouse: '',
      optionWarehouseSetup: false,
      optionDrinkType: '',
      optionDrinkTypeSetup: false,
      optionDiningTableAddType: [],
      optionDiningTableTypeAddSetup: false,
      optionDiningTableTypeAddValue: '',
      optionDiningTableAddType: [],
      optionDiningTableTypeAddSetup: false,
      optionDiningTableTypeAddValue: '',
      optionDishAddType: [],
      optionDishTypeAddSetup: false,
      optionDishTypeAddValue: '',
      optionDrinkTableAddType: [],
      optionDrinkTypeAddSetup: false,
      optionDrinkTypeAddValue: '',
      optionFoodType: 'Tại bàn',
      optionFoodTypeValue: 1,
      windowWidth: Dimensions.get('window').width,
      windowHeight: Dimensions.get('window').height,
      status: 'homeview',
      statusShipmentDrink: 'homeview',
      statusOderDishDetail: 'homeview',
      statusOderDiningTableDetail: 'homeview',
      statusOderDrinkDetail: 'homeview',
      flag: true,
      flagOrderBringHome: true,
      flagDishAdd: true,
      flagDrinkAdd: true,
      flagDiningTableAdd: true,
      data: [],
      dataSingleOrder: {},
      datasingleDish: {},
      datasingleDrink: {},
      dataSingleDiningTable: {},
      datasingleDiningTable: {},
      dataFoodOrder: [],
      dataShipment: {},
      dataShipmentDrink: [],
      dataDrinkById: { id: '', name: '' },
      dataShipmentDrinkToUpdate: {},
      dataRole: [],
      dataOrderBringHome: [],
      dataOrderDishDetail: [],
      dataOrderDrinkDetail: [],
      dataOrderDiningTableDetail: [],
      dataDishAdd: [],
      dataDishTypeAdd: [],
      dataDrinkAdd: [],
      dataDrinkTypeAdd: [],
      dataDiningTableAdd: [],
      dataDiningTableTypeAdd: [],
      dataDiningTableReloadAdd: {},
      dataFoodCart: [],
      timKiem: '',
      error: '',
      errorDishModal: '',
      errorDrinkModal: '',
      errorPaymentModal: '',
      resourceDrinkQuantityTotal: 0,
      presentTime: new Date(Date.now()),
      tabIndex: 0,
      tabOderDetail: 0,
      tabOderDetailReCheck: 0,
      tableHead: ['Mã', 'Tên', 'Đơn vị', 'Số lượng', 'Đơn giá', 'Thành tiền'],
      tableData: []
    };
  }
  isDateAfterToday(date) {
    var presentDate = new Date(Date.now());
    var preserveDate = new Date(date);
    if (
      (presentDate.getDate() == preserveDate.getDate() + 1) &&
      (presentDate.getMonth() == preserveDate.getMonth()) &&
      (presentDate.getFullYear() == preserveDate.getFullYear())
    ) {

      return true;
    }
    return new Date(Date.now()) < new Date(date);
  }
  onChangeDatetoInsertDatabase = (event, selectedDate) => {
    const currentDate = selectedDate;
    var extraDate = '';
    var extraMonth = '';
    if ((currentDate.getMonth() + 1) < 10) extraMonth = '0';
    if (currentDate.getDate() < 10) extraDate = '0';

    this.setState({ flagShipmentDrinkPreserve: false, inputShipmentDrinkpreserveTime: currentDate.getFullYear() + '-' + extraMonth + (currentDate.getMonth() + 1) + '-' + extraDate + currentDate.getDate(), outputShipmentDrinkPreserveTime: extraDate + currentDate.getDate() + '/' + extraMonth + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear() });
    //console.log(this.state.inputBirthDay);S
  };
  formatDateControllerToView = (input) => {
    var datePart = input.match(/\d+/g),
      year = datePart[0], // get only two digits
      month = datePart[1], day = datePart[2];

    return day + '/' + month + '/' + year;
  }
  formatDateViewToController = (s) => {
    var b = s.split(/\D/);
    return b.reverse().join('-');
  }
  formatMoneyDatabasetoView = (input) => {
    const formatter = new Intl.NumberFormat('vi-VN',
      {
        style: 'currency', currency: 'VND'
      })
    return formatter.format(input);
  }
  formatLocalDateTimeDatabaseToView(date) {
    var formatDate = new Date(date);
    return formatDate.getUTCHours() + ' : ' + formatDate.getMinutes() + ' : ' + formatDate.getSeconds() + '   ' + formatDate.getDate() + '/' + (formatDate.getMonth() + 1) + '/' + formatDate.getFullYear();
  }
  componentDidMount() {
    // Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
    Animated.timing(this.state.fadeAnimHome, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
    fetch(host + ':' + port + areaListUrl, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var getType = [];
            getType.push({ label: 'Tất cả', value: 0 });
            for (const element of dataJson) {
              getType.push({ label: element.name, value: element.id });
            }
            this.setState({ optionType: getType, optionDiningTableAddType: getType });
          },
          1
        )

      })
      .catch(error => {
        console.log(error);
      });

    fetch(host + ':' + port + diningTableListUrl, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var getUseDiningTable = [];
            for (const element of dataJson) {
              if (element.status != 'Trống' && element.type == 'Bàn chính') {
                getUseDiningTable.push(element);
              }
            }
            var getDiningTable = [];
            var getUseDiningTableUpdate = [];
            for (const element of getUseDiningTable) {
              var i = 0;
              var getNewOrder = [];
              for (const element_or of element.orders) {
                //if (element_or.order.type == 'Đơn hàng mới') {
                  getNewOrder.push(element_or);
                //}
              }

              getNewOrder.sort(function (a, b) {
                a = new Date(a.order.time);
                b = new Date(b.order.time);
                return a > b ? -1 : a < b ? 1 : 0;
              });
              fetch(host + ':' + port + orderListUrl + getNewOrder[0].order.id, {
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': 'Bearer ' + this.props.user.token,
                }
              })
                .then(response => response.json())
                .then(dataJson => {
                  getUseDiningTableUpdate.push({ id: element.id, name: element.name, type: element.type, orders: element.orders, area: element.area, quantity: Number(dataJson.diningTables.length) - 1 });
                  this.setState({ flag: false, data: getUseDiningTableUpdate });

                })
                .catch(error => {
                  console.log(error);
                });
            }



          },
          1
        )

      })
      .catch(error => {
        console.log(error);
      });





    fetch(host + ':' + port + dishTypeListUrl, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var getDishType = [];
            getDishType.push({ label: 'Tất cả', value: 0 });
            for (const element of dataJson) {
              getDishType.push({ label: element.name, value: element.id });
            }
            this.setState({ flagDishAdd: false, dataDishTypeAdd: getDishType });
          },
          100
        )

      })
      .catch(error => {
        console.log(error);
      });
    fetch(host + ':' + port + dishListUrl, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var statusDishOver = '';
            var getExtraDishOver = [];
            for (const element_f of dataJson) {
              var statusDish = null;
              var getExtraDish = [];
              for (const element_s of element_f.resources) {
                var getShipmentResourceTotal = 0;
                if (element_s.resource.shipments.length == 0) statusDish = 0;
                for (const element_t of element_s.resource.shipments) {
                  if (this.isDateAfterToday(element_t.preserveTime)) {
                    getShipmentResourceTotal = getShipmentResourceTotal + element_t.quantity;
                  }
                }
                if (element_s.quantity > getShipmentResourceTotal) { statusDish = 0 }
                else { statusDish = getShipmentResourceTotal / element_s.quantity }

                getExtraDish.push({ id: element_s.id, quantity: statusDish });
              }
              if (element_f.resources.length != 0) {
                var minDishQuantity = getExtraDish[0].quantity;
                for (var i = 0; i < getExtraDish.length; i++) {
                  if (minDishQuantity > getExtraDish[i].quantity) {
                    minDishQuantity = getExtraDish[i].quantity;
                  }
                }
                if (minDishQuantity > 0) {
                  statusDishOver = 'Còn hàng';
                }
                else {
                  statusDishOver = 'Tạm hết';
                }
              }
              else statusDishOver = 'Tạm hết';
              this.setState({ outputFoodQuantity: minDishQuantity });
              getExtraDishOver.push({ id: element_f.id, food: element_f, statusFood: statusDishOver });
            }

            this.setState({ flagDishAdd: false, dataDishAdd: getExtraDishOver });
          },
          100
        )

      })
      .catch(error => {
        console.log(error);
      });


    fetch(host + ':' + port + drinkTypeListUrl, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var getDrinkType = [];
            getDrinkType.push({ label: 'Tất cả', value: 0 });
            for (const element of dataJson) {
              getDrinkType.push({ label: element.name, value: element.id });
            }
            this.setState({ flagDrinkAdd: false, dataDrinkTypeAdd: getDrinkType });
          },
          100
        )

      })
      .catch(error => {
        console.log(error);
      });



    fetch(host + ':' + port + drinkListUrl, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var statusDrink = '';
            var getExtraDrink = [];
            for (const element_f of dataJson) {
              var getShipmentDrinkTotal = 0;
              //console.log('Testttttttt'+element_f.shipments);
              if (element_f.shipments.length == 0) { statusDrink = 'Tạm hết'; }
              for (const element_s of element_f.shipments) {
                element_s
                //console.log(element_f.shipments);
                if (this.isDateAfterToday(element_s.preserveTime)) {
                  getShipmentDrinkTotal = getShipmentDrinkTotal + element_s.quantity;
                }
              }
              if (getShipmentDrinkTotal < 1) { statusDrink = 'Tạm hết' }
              else { statusDrink = 'Còn hàng' }
              getExtraDrink.push({ id: element_f.id, food: element_f, statusFood: statusDrink });
            }


            this.setState({ flagDrinkAdd: false, dataDrinkAdd: getExtraDrink });
          },
          100
        )

      })
      .catch(error => {
        console.log(error);
      });
    fetch(host + ':' + port + areaListUrl, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var getArea = [{ label: 'Tất cả', value: 0 }];
            for (const element of dataJson) {
              getArea.push({ label: element.name, value: element.id });

            }

            this.setState({ flagDiningTableAdd: false, dataDiningTableTypeAdd: getArea });

          },
          100
        )

      })
      .catch(error => {
        console.log(error);
      });
    fetch(host + ':' + port + diningTableListUrl, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var getDiningTable = [];
            for (const element of dataJson) {
              if (element.status == 'Trống') {
                getDiningTable.push({ id: element.id, diningTable: element, checkBoxDiningTale: false });
              }
            }

            this.setState({ flagDiningTableAdd: false, dataDiningTableAdd: getDiningTable });
            //console.log(this.state.dataDiningTable);
          },
          100
        )

      })
      .catch(error => {
        console.log(error);
      });


    fetch(host + ':' + port + orderListUrl, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var getOrder = [];
            for (const element of dataJson) {
              if (element.diningTables.length == 0 && element.status != 'Đã thanh toán') {
                getOrder.push(element);
              }
            }
            this.setState({ flagOrderBringHome: false, dataOrderBringHome: getOrder });
          },
          100
        )

      })
      .catch(error => {
        console.log(error);
      });
  }


temporaryOrder(){
if(this.state.dataSingleOrder.status!='Đã giao hàng'){
  Alert.alert(
    "Thông báo",
    "Vui lòng chọn đơn hàng khác",
    [
      {
        text: "Đóng",
        onPress: () => {},
      }
    ]
  );
return;
}


  Alert.alert(
    "Thông báo",
    "Xác nhận tạm tính đơn hàng?",
    [
      {
        text: "Đóng",
        onPress: () => { }
      },
      {
        text: "Đồng ý", onPress: () => {
        
          fetch(host + ':' + port + orderUpdateUrl + this.state.dataSingleOrder.id, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.props.user.token,
            },
            body: JSON.stringify({

              type: this.state.dataSingleOrder.type,
              status: 'Đang tạm tính',
              vat: this.state.dataSingleOrder.vat,
              time: this.state.dataSingleOrder.time

            }),
          })
            .then(response => response.text())
            .then(data => {
              console.log(data);
              this.componentDidMount();

              var getOrder = this.state.dataSingleOrder;
              getOrder.status = 'Đang tạm tính';
              this.setState({ dataSingleOrder: getOrder });


            })
            .catch((error) => {

              console.log(error);

            });


        }
      }
    ]
  );



}

  totalPiceCart() {
    var getTotalPrice = 0;
    for (const element of this.state.dataFoodCart) {
      getTotalPrice = Number(getTotalPrice) + (Number(element.quantity) * Number(element.dish.food.price));
    }
    this.setState({ outputPriceTotalCart: getTotalPrice });
  }
  addToCart() {
    if (this.state.tabOderDetail == 0) {
      if (this.state.datasingleDish.statusFood == 'Tạm hết') {
        Alert.alert(
          "Thông báo",
          "Vui lòng chọn món ăn khác vì tạm thời hết hàng",
          [
            {
              text: "Đóng",
              onPress: () => { this.setState({ inputDishQuantity: '', errorModal: '', modalDishQuantity: false }); },
              style: "cancel"
            }
          ]
        );
        return;
      }

      var regDishQuantity = /^[0-9]+$/;
      if (!(regDishQuantity.test(this.state.inputDishQuantity) && this.state.inputDishQuantity <= this.state.outputDishQuantity)) {
        this.setState({ errorDishModal: 'Số lượng không hợp lệ!' });
        return;
      }
      else {
        this.setState({ errorDishModal: '' });
      }

      var getOrderDish = {
        id: this.state.datasingleDish.id,
        dish: this.state.datasingleDish,
        quantity: this.state.inputDishQuantity
      };

      var getOrderDishFoodList = this.state.dataFoodCart;
      var setCategoryType = null;
      if (this.state.statusDish) { setCategoryType = true }
      else setCategoryType = false;

      if (getOrderDishFoodList.length == 0) {
        getOrderDishFoodList.push({ id: getOrderDish.id, dish: getOrderDish.dish, quantity: getOrderDish.quantity, type: { label: 'Tại bàn', value: 1 }, CategoryType: true, optionShow: false });
        this.setState({ dataFoodCart: getOrderDishFoodList, inputDishQuantity: '', modalDishQuantity: false });
        this.totalPiceCart();
        return;
      }


      for (const element of getOrderDishFoodList) {
        if (element.id == getOrderDish.id) {
          Alert.alert(
            "Thông báo",
            "Vui lòng chọn món ăn khác vì đã có sẵn trong giỏ hàng",
            [
              {
                text: "Đóng",
                onPress: () => { this.setState({ inputDishQuantity: '', errorDishModal: '', modalDishQuantity: false }); },
                style: "cancel"
              }
            ]
          );
          return;
        }

      }
      getOrderDishFoodList.push({ id: getOrderDish.id, dish: getOrderDish.dish, quantity: getOrderDish.quantity, type: { label: 'Tại bàn', value: 1 }, CategoryType: true, optionShow: false });
      this.setState({ dataFoodCart: getOrderDishFoodList, inputDishQuantity: '', modalDishQuantity: false });
      this.totalPiceCart();

    }

    if (this.state.tabOderDetail == 1) {
      if (this.state.datasingleDrink.statusFood == 'Tạm hết') {
        Alert.alert(
          "Thông báo",
          "Vui lòng chọn đồ uống khác vì tạm thời hết hàng",
          [
            {
              text: "Đóng",
              onPress: () => { this.setState({ inputDishQuantity: '', errorModal: '', modalDrinkQuantity: false }); },
              style: "cancel"
            }
          ]
        );
        return;



      }

      var regDrinkQuantity = /^[0-9]+$/;
      if (!(regDrinkQuantity.test(this.state.inputDrinkQuantity) && this.state.inputDrinkQuantity <= this.state.outputDrinkQuantity)) {
        this.setState({ errorDrinkModal: 'Số lượng không hợp lệ!' });
        return;
      }
      else {
        this.setState({ errorDrinkModal: '' });
      }
      var getOrderDrink = {
        id: this.state.datasingleDrink.id,
        drink: this.state.datasingleDrink,
        quantity: this.state.inputDrinkQuantity
      };

      var getOrderDrinkFoodList = this.state.dataFoodCart;
      var setCategoryType = null;
      if (this.state.statusDish) { setCategoryType = true }
      else setCategoryType = false;

      if (getOrderDrinkFoodList.length == 0) {
        getOrderDrinkFoodList.push({ id: getOrderDrink.id, dish: getOrderDrink.drink, quantity: getOrderDrink.quantity, type: { label: 'Tại bàn', value: 1 }, CategoryType: false, optionShow: false });
        this.setState({ dataFoodCart: getOrderDrinkFoodList, inputDrinkQuantity: '', modalDrinkQuantity: false });
        this.totalPiceCart();
        return;
      }

      for (const element of getOrderDrinkFoodList) {
        if (element.id == getOrderDrink.id) {
          Alert.alert(
            "Thông báo",
            "Vui lòng chọn đồ uống khác vì đã có sẵn trong giỏ hàng",
            [
              {
                text: "Đóng",
                onPress: () => { this.setState({ inputDrinkQuantity: '', errorDrinkModal: '', modalDrinkQuantity: false }); },
                style: "cancel"
              }
            ]
          );
          return;
        }

      }
      getOrderDrinkFoodList.push({ id: getOrderDrink.id, dish: getOrderDrink.drink, quantity: getOrderDrink.quantity, type: { label: 'Tại bàn', value: 1 }, CategoryType: false, optionShow: false });
      this.setState({ dataFoodCart: getOrderDrinkFoodList, inputDrinkQuantity: '', modalDrinkQuantity: false });
      this.totalPiceCart();


    }





  }


  saveOrderItem() {


    Alert.alert(
      "Thông báo",
      "Chắc chắn thêm vào đơn hàng?",
      [
        {
          text: "Đóng",
          onPress: () => { },
        },
        {
          text: "Đồng ý", onPress: () => {


            if (this.state.dataFoodCart.length == 0) {
              Alert.alert(
                "Thông báo",
                "Vui lòng thêm món ăn hoặc đồ uống vào giỏ hàng",
                [
                  {
                    text: "Đóng",
                    onPress: () => { }
                  }
                ]
              );
              return;
            }
            var getDataFoodCart = JSON.parse(JSON.stringify(this.state.dataFoodCart));

            for (const element_fc of getDataFoodCart) {

              for (const element_dish of this.state.dataSingleOrder.dishs) {
                if (element_fc.id == element_dish.dish.id && element_fc.CategoryType == true) {
                  element_fc.quantity = Number(element_fc.quantity) + Number(element_dish.quantity);
                }
              }

              for (const element_drink of this.state.dataSingleOrder.drinks) {
                if (element_fc.id == element_drink.drink.id && element_fc.CategoryType == false) {
                  element_fc.quantity = Number(element_fc.quantity) + Number(element_drink.quantity);
                }
              }

            }
            for (const element of getDataFoodCart) {
              console.log(element.id);
              if (element.CategoryType) {

                //for (const element_s of element.dish.food.resources) {
                // this.minusResourceQuantityIntoWareHouse(element_s.id.resource_id, element_s.quantity);
                //}


                fetch(host + ':' + port + dishDeleteByOrderDishIdUrl, {
                  method: 'DELETE',
                  headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Bearer ' + this.props.user.token,
                  },
                  body: JSON.stringify({
                    order_id: this.state.dataSingleOrder.id,
                    dish_id: element.id
                  }),
                })
                  .then(response => response.json())
                  .then(data => {

                    fetch(host + ':' + port + dishAddorderDishUrl, {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.props.user.token,
                      },
                      body: JSON.stringify({
                        order_id: this.state.dataSingleOrder.id,
                        dish_id: element.id,
                        quantity: element.quantity,
                        price: element.dish.price,
                        unit: element.dish.unit,
                        type: element.type.label
                      }),
                    })
                      .then(response => response.json())
                      .then(data => {
                        this.updateDataSingleDiningTable(this.state.dataSingleDiningTable);
                        this.setState({
                          dataFoodCart: [],
                          outputPriceTotalCart: 0,
                          modalFoodCartAdd: false
                        });
                        this.componentDidMount();
                      })
                      .catch((error) => {

                        console.log(error);

                      });


                  })
                  .catch((error) => {

                    console.log(error);

                  });


              }
              else {
                //this.minusDrinkQuantityIntoWareHouse(element.id, element.quantity);


                fetch(host + ':' + port + drinkDeleteByOrderDrinkIdUrl, {
                  method: 'DELETE',
                  headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Bearer ' + this.props.user.token,
                  },
                  body: JSON.stringify({
                    order_id: this.state.dataSingleOrder.id,
                    drink_id: element.id
                  }),
                })
                  .then(response => response.json())
                  .then(data => {
                    fetch(host + ':' + port + drinkAddorderDrinkUrl, {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.props.user.token,
                      },
                      body: JSON.stringify({
                        order_id: this.state.dataSingleOrder.id,
                        drink_id: element.id,
                        quantity: element.quantity,
                        price: element.dish.price,
                        unit: element.dish.unit,
                        type: element.type.label
                      }),
                    })
                      .then(response => response.json())
                      .then(data => {
                        this.updateDataSingleDiningTable(this.state.dataSingleDiningTable);
                        this.setState({
                          dataFoodCart: [],
                          outputPriceTotalCart: 0,
                          modalFoodCartAdd: false
                        });
                        this.componentDidMount();
                      })
                      .catch((error) => {

                        console.log(error);

                      });
                  })
                  .catch((error) => {

                    console.log(error);

                  });


              }
            }


            Alert.alert(
              "Thông báo",
              "Đã thêm thành công",
              [
                {
                  text: "Đóng",
                  onPress: () => {

                  }
                }
              ]
            );

            // this.componentDidMount();



          }
        }
      ]
    );


  }


  saveExtraOrderItem() {

    fetch(host + ':' + port + orderAddUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      },
      body: JSON.stringify({
        type: 'Đơn hàng bổ sung',
        status: 'Đang chờ nhà bếp xử lý',
        vat: 0.08
      }),
    })
      .then(response => response.json())
      .then(data => {
        fetch(host + ':' + port + userAddorderUserUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.user.token,
          },
          body: JSON.stringify({
            order_id: data.id,
            user_id: this.props.user.id,
          }),
        })
          .then(response => response.json())
          .then(data => {



          })
          .catch((error) => {

            console.log(error);

          });


        fetch(host + ':' + port + notificationAddUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.user.token,
          },
          body: JSON.stringify({
            name: data.id,
            detail: "Nhà bếp nhận được một đơn hàng mới",
            status: false,
            user: {
              id: 1
            }
          }),
        })
          .then(response => response.json())
          .then(data => {



          })
          .catch((error) => {

            console.log(error);

          });



        for (const element of this.state.dataOrderDiningTableDetail) {
          fetch(host + ':' + port + diningTableAddorderDiningTableUrl, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.props.user.token,
            },
            body: JSON.stringify({
              order_id: data.id,
              diningTable_id: element.id,
              type: ''
            }),
          })
            .then(response => response.json())
            .then(data => {


            })
            .catch((error) => {

              console.log(error);

            });

        }
        for (const element of this.state.dataFoodCart) {
          //console.log(element.id + ' / ' + element.CategoryType);

          if (element.CategoryType) {

            for (const element_s of element.dish.food.resources) {
              this.minusResourceQuantityIntoWareHouse(element_s.id.resource_id, element_s.quantity);
            }

            fetch(host + ':' + port + dishAddorderDishUrl, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
              },
              body: JSON.stringify({
                order_id: data.id,
                dish_id: element.id,
                quantity: element.quantity,
                price: element.dish.price,
                unit: element.dish.unit,
                type: element.type.label
              }),
            })
              .then(response => response.json())
              .then(data => {

              })
              .catch((error) => {

                console.log(error);

              });
          }
          else {
            this.minusDrinkQuantityIntoWareHouse(element.id, element.quantity);
            fetch(host + ':' + port + drinkAddorderDrinkUrl, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
              },
              body: JSON.stringify({
                order_id: data.id,
                drink_id: element.id,
                quantity: element.quantity,
                price: element.dish.price,
                unit: element.dish.unit,
                type: element.type.label
              }),
            })
              .then(response => response.json())
              .then(data => {

              })
              .catch((error) => {

                console.log(error);

              });
          }
        }


      })
      .catch((error) => {

        console.log(error);

      });

  }
  setUpOptionFoodShow(item) {
    var getDataFoodCart = this.state.dataFoodCart;
    var foodIndex = getDataFoodCart.findIndex((obj => obj.dish.food.id == item.dish.food.id));
    if (getDataFoodCart[foodIndex].optionShow) {
      getDataFoodCart[foodIndex].optionShow = false;
    }
    else {
      getDataFoodCart[foodIndex].optionShow = true;
    }
    this.setState({ dataFoodCart: getDataFoodCart });
    this.totalPiceCart();
  }
  setUpOptionFoodType(itemOption, item) {


    var getDataFoodCart = this.state.dataFoodCart;
    var foodIndex = getDataFoodCart.findIndex((obj => obj.dish.food.id == item.dish.food.id));
    getDataFoodCart[foodIndex].type = itemOption;
    getDataFoodCart[foodIndex].optionShow = false;

    this.setState({ dataFoodCart: getDataFoodCart });
    this.totalPiceCart();

  }
  orderDishCartPlusItem(item) {
    var getDataFoodCart = this.state.dataFoodCart;
    var foodIndex = getDataFoodCart.findIndex((obj => obj.dish.food.id == item.dish.food.id));
    getDataFoodCart[foodIndex].quantity = Number(getDataFoodCart[foodIndex].quantity) + 1;

    this.setState({ dataFoodCart: getDataFoodCart });
    this.totalPiceCart();
  }
  orderDishCartMinusItem(item) {
    var getDataFoodCart = this.state.dataFoodCart;
    var foodIndex = getDataFoodCart.findIndex((obj => obj.dish.food.id == item.dish.food.id));
    getDataFoodCart[foodIndex].quantity = Number(getDataFoodCart[foodIndex].quantity) - 1;
    if (getDataFoodCart[foodIndex].quantity < 1) { getDataFoodCart.splice(foodIndex, 1); }
    this.setState({ dataFoodCart: getDataFoodCart });
    this.totalPiceCart();
    // console.log(this.state.dataFoodCart);

  }
  renderItemDetailOrderFoodList = ({ item }) => (
    <TouchableOpacity onPress={() => { }}>
      <View style={WaiterPaymentStyle.itemDetailOrderCartList}>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.orderDishCartPlusItem(item);
              // console.log(item);
            }}>
            <Image
              style={WaiterPaymentStyle.itemDetailOrderListPlus}
              source={require('./../../assets/plus.png')}
            />
          </TouchableOpacity>
          <Text></Text>
          <TouchableOpacity onPress={() => {
            this.orderDishCartMinusItem(item);
            // console.log(item);
          }}>
            <Image
              style={WaiterPaymentStyle.itemDetailOrderListPlus}
              source={require('./../../assets/minus.png')}
            />
          </TouchableOpacity>

        </View>
        <View style={{ flex: 1 }}>
          <Text><Text style={{ fontWeight: 'bold' }}>Mã: </Text>{item.dish.food.id}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Tên: </Text>{item.dish.food.name}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Giá: </Text>{this.formatMoneyDatabasetoView(item.dish.food.price)}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Đơn vị: </Text>{item.dish.food.unit}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Số lượng: </Text> {item.quantity}</Text>
          <DropDownPicker
            style={{ height: '70%', marginTop: '1%' }}
            open={item.optionShow}

            placeholder={'Hình thức'}
            value={item.type.value}
            items={
              [
                {
                  label: 'Tại bàn',
                  value: 1,
                },
                {
                  label: 'Mang về',
                  value: 2
                }
              ]
            }
            onPress={() => { this.setUpOptionFoodShow(item); }}

            containerStyle={{ height: 40 }}
            onSelectItem={(itemOption) => { this.setState({ optionFoodTypeValue: itemOption.value, optionTypeSetup: false }); this.setUpOptionFoodType(itemOption, item); }}
            dropDownDirection="TOP"
            bottomOffset={100}
          />
        </View>
        <View>
          <Image
            style={WaiterPaymentStyle.itemDetailOrderListLogo}
            source={{
              uri: item.dish.food.urlImage + '/',
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
  BillView = () => {
    return (
      <View style={WaiterPaymentStyle.container}>
        <SafeAreaProvider>
          <View style={{ width: '100%', height: '100%', padding: '2%', borderWidth: 0.3 }}>

            <View style={WaiterPaymentStyle.itemDetailOrderListExtraContainer}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: this.state.windowWidth / 22 }}> Thanh toán thành công </Text>
            </View>
            <Text></Text>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: this.state.windowWidth / 25 }}> Chi tiết hóa đơn: </Text>
            <Text></Text>
            <Text style={{ color: 'white' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>Mã: </Text>{this.state.dataSingleOrder.id}</Text>
            <Text style={{ color: 'white' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>Thời gian: </Text>{this.formatLocalDateTimeDatabaseToView(this.state.dataSingleOrder.time)}</Text>
            <Text></Text>
            <ScrollView style={{ backgroundColor: 'white' }}>
              <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Row data={this.state.tableHead} style={{ color: 'black' }} textStyle={{ fontWeight: 'bold', textAlign: 'center' }} />
                <Rows data={this.state.tableData} />
              </Table>
            </ScrollView>
            <Text></Text>
            <Text style={{ color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Tổng tiền sản phẩm: </Text>{this.formatMoneyDatabasetoView(this.state.outputPriceTotal)}</Text>
            <Text style={{ color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Thuế GTGT: </Text>8%</Text>
            <Text style={{ color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Tổng tiền cần thanh toán: </Text>{this.formatMoneyDatabasetoView(this.state.outputPriceTotal + (this.state.outputPriceTotal * 0.08))}</Text>
            <Text style={{ color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Tiền trả: </Text>{this.formatMoneyDatabasetoView(this.state.inputPriceCustomer)}</Text>
            <Text style={{ color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Tiền dư: </Text>{this.formatMoneyDatabasetoView(this.state.outputPriceResidual)}</Text>
            <Text></Text>
            <View style={WaiterPaymentStyle.itemDetailOrderListExtraContainer}>
              <TouchableOpacity onPress={() => { this.setState({ inputPriceCustomer: '', outputPriceResidual: '', status: 'shipmentdrinkview' }) }}>
                <Image
                  style={WaiterPaymentStyle.itemDetailOrderListnextButton}
                  source={require('./../../assets/cancel.png')}
                />
              </TouchableOpacity>
            </View>
            <Text></Text>
          </View>

        </SafeAreaProvider>
      </View>
    );
  }
  modalSearchOrderBringHomeView(isVisible) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isVisible}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 20, padding: '5%' }}>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}></View>
            <Text></Text>
            <Text style={{ fontWeight: 'bold' }}>Tìm kiếm</Text>
            <Text></Text>
            <RadioForm
              radio_props={
                [
                  { label: 'Mã', value: 0 }

                ]
              }
              initial={this.state.modalOrderBringHomeSearchInitial}
              onPress={(value) => { this.setState({ modalOrderBringHomeSearchInitial: value }); }}
            />


            <View style={{ height: this.state.windowHeight / 3.5 }}></View>
            <Button title="Xác nhận" onPress={() => { this.setState({ modalOrderBringHomeSearch: false }); }} />
          </View>




        </Modal>
      </View>
    );
  }
  modalFoodCartAddView(isVisible) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isVisible}
        >
          <SafeAreaProvider>
            <View style={{ backgroundColor: '#103667', width: '100%', height: '95%', borderRadius: 15, padding: '2%' }}>
              <Text></Text>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: this.state.windowWidth / 25 }}> Danh sách: </Text>
              <Text></Text>
              <FlatList
                style={{ borderWidth: 0.3, borderRadius: 10, borderColor: 'white' }}
                data={this.state.dataFoodCart}
                renderItem={this.renderItemDetailOrderFoodList}
                keyExtractor={item => item.id}
              />
              <Text></Text>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: this.state.windowWidth / 25 }}> Thuế GTGT: 8%</Text>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: this.state.windowWidth / 25 }}> Tổng thành tiến: {this.formatMoneyDatabasetoView(Number(this.state.outputPriceTotalCart) + (Number(this.state.outputPriceTotalCart) * 0.08))}</Text>
              <Text></Text>
              <View style={WaiterPaymentStyle.itemDetailOrderListExtraContainer}>
                <TouchableOpacity onPress={() => { this.saveOrderItem(); this.saveExtraOrderItem(); }}>
                  <Image
                    style={WaiterPaymentStyle.itemDetailOrderListnextButton}
                    source={require('./../../assets/complete.png')}
                  />
                </TouchableOpacity>
                <Text>    </Text>
                <TouchableOpacity onPress={() => { this.setState({ modalFoodCartAdd: false }) }}>
                  <Image
                    style={WaiterPaymentStyle.itemDetailOrderListpreviousButton}
                    source={require('./../../assets/cancel.png')}
                  />
                </TouchableOpacity>
              </View>

            </View>

          </SafeAreaProvider>
        </Modal>
      </View>
    );
  }

  modalDrinkQuantityView(isVisible) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isVisible}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 20 }}>
            <Text></Text>
            <Text style={{ marginLeft: '5%', fontWeight: 'bold', fontSize: this.state.windowWidth / 25 }}>Số lượng tối đa: {Math.floor(this.state.outputDrinkQuantity)}</Text>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}><Text style={WaiterPaymentStyle.error}>{this.state.errorDrinkModal}</Text></View>
            <Text></Text>
            <Input
              inputStyle={{ fontSize: this.state.windowWidth / 28 }}
              inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
              leftIconContainerStyle={{ paddingLeft: '5%' }}
              name='quantity'
              placeholder='Nhập số lượng'
              placeholderTextColor="#999999"
              onChangeText={(quantity) => this.setState({ inputDrinkQuantity: quantity })}
              value={this.state.inputDrinkQuantity}
              leftIcon={{ color: 'grey', type: 'material', name: 'format-list-numbered' }}
              keyboardType='default' />
            <Text></Text>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}>
              <TouchableOpacity onPress={() => { this.addToCart(); }}>
                <Image
                  style={WaiterPaymentStyle.saveButton}
                  source={require('./../../assets/save.png')}
                />
              </TouchableOpacity>
              <Text>                  </Text>
              <TouchableOpacity onPress={() => { this.setState({ inputDrinkQuantity: '', errorDrinkModal: '', modalDrinkQuantity: false }); }}>
                <Image
                  style={WaiterPaymentStyle.cancelButton}
                  source={require('./../../assets/cancel.png')}
                />
              </TouchableOpacity>

            </View>
            <Text>                  </Text>
          </View>
        </Modal>
      </View>
    );
  }
  modalDishQuantityView(isVisible) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isVisible}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 20 }}>
            <Text></Text>
            <Text style={{ marginLeft: '5%', fontWeight: 'bold', fontSize: this.state.windowWidth / 25 }}>Số lượng tối đa: {Math.floor(this.state.outputDishQuantity)}</Text>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}><Text style={WaiterPaymentStyle.error}>{this.state.errorDishModal}</Text></View>
            <Text></Text>
            <Input
              inputStyle={{ fontSize: this.state.windowWidth / 28 }}
              inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
              leftIconContainerStyle={{ paddingLeft: '5%' }}
              name='quantity'
              placeholder='Nhập số lượng'
              placeholderTextColor="#999999"
              onChangeText={(quantity) => this.setState({ inputDishQuantity: quantity })}
              value={this.state.inputDishQuantity}
              leftIcon={{ color: 'grey', type: 'material', name: 'format-list-numbered' }}
              keyboardType='default' />
            <Text></Text>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}>
              <TouchableOpacity onPress={() => { this.addToCart(); }}>
                <Image
                  style={WaiterPaymentStyle.saveButton}
                  source={require('./../../assets/save.png')}
                />
              </TouchableOpacity>
              <Text>                  </Text>
              <TouchableOpacity onPress={() => { this.setState({ inputDishQuantity: '', errorDishModal: '', modalDishQuantity: false }); }}>
                <Image
                  style={WaiterPaymentStyle.cancelButton}
                  source={require('./../../assets/cancel.png')}
                />
              </TouchableOpacity>

            </View>
            <Text>                  </Text>
          </View>
        </Modal>
      </View>
    );
  }
  modalDiningTableTypeView(isVisible) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isVisible}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 20, padding: '5%' }}>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}></View>
            <Text></Text>
            <Text style={{ fontWeight: 'bold' }}>Lọc bàn theo khu vực:</Text>
            <Text></Text>


            <ScrollView nestedScrollEnabled={false}>
              <DropDownPicker
                listMode="SCROLLVIEW"
                style={WaiterPaymentStyle.setupItemCenterContainerRowOption}
                open={this.state.optionDiningTableTypeAddSetup}

                placeholder={'Tất cả'}
                value={this.state.optionDiningTableTypeAddValue}
                items={
                  this.state.optionDiningTableAddType
                }
                onPress={() => { LogBox.ignoreLogs(["VirtualizedLists should never be nested"]); if (this.state.optionDiningTableTypeAddSetup) { this.setState({ optionDiningTableTypeAddSetup: false }) } else { this.setState({ optionDiningTableTypeAddSetup: true }); } }}

                containerStyle={{ height: 40 }}
                onSelectItem={(item) => { this.optionGetDiningTableFromAreaTypeAdd(item.value); this.setState({ optionDiningTableTypeAddValue: item.value, optionDiningTableTypeAddSetup: false }); }}
                dropDownDirection="BOTTOM"
              />
              <View style={{ height: this.state.windowHeight / 3.5 }}></View>
            </ScrollView>
            <Button title="Xác nhận" onPress={() => { this.setState({ modalDiningTableType: false }); }} />
          </View>




        </Modal >
      </View >
    );
  }

  modalDishFilterView(isVisible) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isVisible}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 20, padding: '5%' }}>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}></View>
            <Text></Text>

            <Text style={{ fontWeight: 'bold' }}>Lọc theo nhóm {this.state.outputCategory}:</Text>
            <Text></Text>

            <ScrollView nestedScrollEnabled={true}>
              <DropDownPicker
                listMode="SCROLLVIEW"
                style={WaiterPaymentStyle.setupItemCenterContainerRowOption}
                open={this.state.optionDishTypeAddSetup}

                placeholder={'Tất cả'}
                value={this.state.optionDishTypeAddValue}
                items={
                  this.state.dataDishTypeAdd
                }
                onPress={() => { if (this.state.optionDishTypeAddSetup) { this.setState({ optionDishTypeAddSetup: false }) } else { this.setState({ optionDishTypeAddSetup: true }); } }}

                containerStyle={{ height: 40 }}
                onSelectItem={(item) => { this.optionGetDishFromFoodTypeAdd(item.value); this.setState({ flagDishAdd: true, optionDishTypeAddValue: item.value, optionDishTypeAddSetup: false }); }}
                dropDownDirection="BOTTOM"
                bottomOffset={100}
              />
              <View style={{ height: this.state.windowHeight / 3.5 }}></View>
            </ScrollView>
            <Button title="Xác nhận" onPress={() => { this.setState({ modalDishFilter: false }); }} />
          </View>




        </Modal>
      </View>
    );
  }
  modalDrinkFilterView(isVisible) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isVisible}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 20, padding: '5%' }}>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}></View>
            <Text></Text>

            <Text style={{ fontWeight: 'bold' }}>Lọc theo nhóm {this.state.outputCategory}:</Text>
            <Text></Text>

            <ScrollView nestedScrollEnabled={true}>
              <DropDownPicker
                listMode="SCROLLVIEW"
                style={WaiterPaymentStyle.setupItemCenterContainerRowOption}
                open={this.state.optionDrinkTypeAddSetup}

                placeholder={'Tất cả'}
                value={this.state.optionDrinkTypeAddValue}
                items={
                  this.state.dataDrinkTypeAdd
                }
                onPress={() => { if (this.state.optionDrinkTypeAddSetup) { this.setState({ optionDrinkTypeAddSetup: false }) } else { this.setState({ optionDrinkTypeAddSetup: true }); } }}

                containerStyle={{ height: 40 }}
                onSelectItem={(item) => { this.optionGetDrinkFromFoodTypeAdd(item.value); this.setState({ flagDrinkAdd: true, optionDrinkTypeAddValue: item.value, optionDrinkTypeAddSetup: false }); }}
                dropDownDirection="BOTTOM"
                bottomOffset={100}
              />
              <View style={{ height: this.state.windowHeight / 3.5 }}></View>
            </ScrollView>
            <Button title="Xác nhận" onPress={() => { this.setState({ modalDrinkFilter: false }); }} />
          </View>




        </Modal>
      </View>
    );
  }
  paymentModalView(isVisible) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isVisible}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 20, padding: '5%' }}>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}></View>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}><Text style={WaiterPaymentStyle.error}>{this.state.errorPaymentModal}</Text></View>
            <Text></Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Tổng tiền sản phẩm: </Text>{this.formatMoneyDatabasetoView(this.state.outputPriceTotal)}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Thuế GTGT: </Text>8%</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Tổng tiền cần thanh toán: </Text>{this.formatMoneyDatabasetoView(this.state.outputPriceTotal + (this.state.outputPriceTotal * 0.08))}</Text>
            <Text></Text>
            <Input
              inputStyle={{ fontSize: this.state.windowWidth / 28 }}
              inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
              leftIconContainerStyle={{ paddingLeft: '5%' }}
              name='price'
              placeholder='Tiền trả'
              placeholderTextColor="#999999"
              onChangeText={(price) => { this.calculatePriceResidual(price); }}
              value={this.state.inputPriceCustomer}
              leftIcon={{ color: 'grey', type: 'material', name: 'euro' }}
              keyboardType='default' />
            <Text><Text style={{ fontWeight: 'bold' }}>Tiền dư: </Text>{this.formatMoneyDatabasetoView(this.state.outputPriceResidual)}</Text>
            <Text></Text>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}>
              <TouchableOpacity onPress={() => { this.paymentOrder(); }} >
                <Image
                  style={WaiterPaymentStyle.cancelButton}
                  source={require('./../../assets/complete.png')}
                />
              </TouchableOpacity>
              <Text>             </Text>
              <TouchableOpacity onPress={() => { this.setState({ inputPriceCustomer: '', errorPaymentModal: '', paymentModal: false }); }} >
                <Image
                  style={WaiterPaymentStyle.cancelButton}
                  source={require('./../../assets/cancel.png')}
                />
              </TouchableOpacity>

            </View>
          </View>




        </Modal>
      </View>
    );
  }
  searchModalView(isVisible) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isVisible}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 20, padding: '5%' }}>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}></View>
            <Text>Tìm kiếm theo:</Text>
            <Text></Text>
            <RadioForm
              radio_props={
                [{ label: 'Tên', value: 0 }]
              }
              initial={this.state.searchModalInitial}
              onPress={(value) => { this.setState({ searchModalInitial: value }) }}
            />
            <Text></Text>
            <Text style={{ fontWeight: 'bold' }}>Lọc theo nhóm {this.state.outputCategory}:</Text>
            <Text></Text>

            <ScrollView nestedScrollEnabled={true}>
              <DropDownPicker
                listMode="SCROLLVIEW"
                style={WaiterPaymentStyle.setupItemCenterContainerRowOption}
                open={this.state.optionTypeSetup}

                placeholder={'Tất cả'}
                value={this.state.optionTypeValue}
                items={
                  this.state.optionType
                }
                onPress={() => { if (this.state.optionTypeSetup) { this.setState({ optionTypeSetup: false }) } else { this.setState({ optionTypeSetup: true }); } }}

                containerStyle={{ height: 40 }}
                onSelectItem={(item) => { this.optionGetDiningTableFromAreaType(item.value); this.setState({ optionTypeValue: item.value, optionTypeSetup: false }); }}
                dropDownDirection="BOTTOM"
                bottomOffset={100}
              />
              <View style={{ height: this.state.windowHeight / 3.5 }}></View>
            </ScrollView>
            <Button title="Xác nhận" onPress={() => { this.setState({ searchModal: false }); }} />
          </View>




        </Modal>
      </View>
    );
  }


  countAvailableDishById(id) {
    fetch(host + ':' + port + dishListUrl + id, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var statusDish = null;
            var getExtraDish = [];
            if (dataJson.resources.length == 0) {
              statusDish = 0;
              this.setState({ outputDishQuantity: statusDish });
              return;
            }

            for (const element_s of dataJson.resources) {
              var getShipmentResourceTotal = 0;
              if (element_s.resource.shipments.length == 0) statusDish = 0;
              for (const element_t of element_s.resource.shipments) {
                if (this.isDateAfterToday(element_t.preserveTime)) {
                  getShipmentResourceTotal = getShipmentResourceTotal + element_t.quantity;
                }
              }
              if (element_s.quantity > getShipmentResourceTotal) { statusDish = 0 }
              else { statusDish = getShipmentResourceTotal / element_s.quantity }

              getExtraDish.push({ id: element_s.id, quantity: statusDish });
            }
            var minDishQuantity = getExtraDish[0].quantity;
            for (var i = 0; i < getExtraDish.length; i++) {
              if (minDishQuantity > getExtraDish[i].quantity) {
                minDishQuantity = getExtraDish[i].quantity;
              }
            }
            this.setState({ outputDishQuantity: minDishQuantity });
          },
          100
        )


      })
      .catch(error => {
        console.log(error);
      });

  }
  countAvailableDishById(id) {
    fetch(host + ':' + port + dishListUrl + id, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var statusDish = null;
            var getExtraDish = [];
            if (dataJson.resources.length == 0) {
              statusDish = 0;
              this.setState({ outputDishQuantity: statusDish });
              return;
            }

            for (const element_s of dataJson.resources) {
              var getShipmentResourceTotal = 0;
              if (element_s.resource.shipments.length == 0) statusDish = 0;
              for (const element_t of element_s.resource.shipments) {
                if (this.isDateAfterToday(element_t.preserveTime)) {
                  getShipmentResourceTotal = getShipmentResourceTotal + element_t.quantity;
                }
              }
              if (element_s.quantity > getShipmentResourceTotal) { statusDish = 0 }
              else { statusDish = getShipmentResourceTotal / element_s.quantity }

              getExtraDish.push({ id: element_s.id, quantity: statusDish });
            }
            var minDishQuantity = getExtraDish[0].quantity;
            for (var i = 0; i < getExtraDish.length; i++) {
              if (minDishQuantity > getExtraDish[i].quantity) {
                minDishQuantity = getExtraDish[i].quantity;
              }
            }
            this.setState({ outputDishQuantity: minDishQuantity });
          },
          100
        )


      })
      .catch(error => {
        console.log(error);
      });

  }
  minusResourceQuantityIntoWareHouse(id, quantity) {
    fetch(host + ':' + port + resourceListUrl + id, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var getShipmentOfResource = [];
            var residual = quantity;
            for (const element of dataJson.shipments) {
              if (this.isDateAfterToday(element.preserveTime)) {
                getShipmentOfResource.push(element);
              }
            }
            getShipmentOfResource.sort(function (a, b) {
              a = new Date(a.preserveTime);
              b = new Date(b.preserveTime);
              return a > b ? 1 : a < b ? -1 : 0;
            })




            for (var i = 0; i < getShipmentOfResource.length; i++) {
              if (getShipmentOfResource[i].quantity >= residual) {
                getShipmentOfResource[i].quantity = getShipmentOfResource[i].quantity - residual;
                residual = 0;
              }
              if (getShipmentOfResource[i].quantity < residual) {
                residual = residual - getShipmentOfResource[i].quantity;
                getShipmentOfResource[i].quantity = 0;

              }

            }
            for (const element of getShipmentOfResource) {
              // console.log(host + ':' + port + shipmentUpdateShipmentResourceUrl+element.id.shipment_id+'/'+element.id.resource_id);
              fetch(host + ':' + port + shipmentUpdateShipmentResourceUrl + element.id.shipment_id + '/' + element.id.resource_id, {
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + this.props.user.token,
                },
                body: JSON.stringify({
                  shipment_id: element.id.shipment_id,
                  resource_id: element.id.resource_id,
                  quantity: element.quantity,
                  preserveTime: element.preserveTime,
                  price: element.price
                }),
              })
                .then(response => response.json())
                .then(data => {


                })
                .catch((error) => {

                  console.log(error);

                });


            }
          },
          100
        )

      })
      .catch(error => {
        console.log(error);
      });

  }
  minusDrinkQuantityIntoWareHouse(id, quantity) {
    fetch(host + ':' + port + drinkListUrl + id, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var getShipmentOfResource = [];
            var residual = quantity;
            for (const element of dataJson.shipments) {
              if (this.isDateAfterToday(element.preserveTime)) {
                getShipmentOfResource.push(element);
              }
            }
            getShipmentOfResource.sort(function (a, b) {
              a = new Date(a.preserveTime);
              b = new Date(b.preserveTime);
              return a > b ? 1 : a < b ? -1 : 0;
            })




            for (var i = 0; i < getShipmentOfResource.length; i++) {
              if (getShipmentOfResource[i].quantity >= residual) {
                getShipmentOfResource[i].quantity = getShipmentOfResource[i].quantity - residual;
                residual = 0;
              }
              if (getShipmentOfResource[i].quantity < residual) {
                residual = residual - getShipmentOfResource[i].quantity;
                getShipmentOfResource[i].quantity = 0;

              }

            }
            for (const element of getShipmentOfResource) {
              // console.log(host + ':' + port + shipmentUpdateShipmentResourceUrl+element.id.shipment_id+'/'+element.id.resource_id);
              fetch(host + ':' + port + shipmentUpdateShipmentDrinkUrl + element.id.shipment_id + '/' + element.id.drink_id, {
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + this.props.user.token,
                },
                body: JSON.stringify({
                  shipment_id: element.id.shipment_id,
                  drink_id: element.id.drink_id,
                  quantity: element.quantity,
                  preserveTime: element.preserveTime,
                  price: element.price
                }),
              })
                .then(response => response.json())
                .then(data => {


                })
                .catch((error) => {

                  console.log(error);

                });


            }
          },
          100
        )

      })
      .catch(error => {
        console.log(error);
      });

  }


  countAvailableDrinkById(id) {

    fetch(host + ':' + port + drinkListUrl + id, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var getExtraDrink = [];
            var getShipmentDrinkTotal = 0;
            //console.log('Testttttttt'+element_f.shipments);
            for (const element_s of dataJson.shipments) {
              //console.log(element_f.shipments);
              if (this.isDateAfterToday(element_s.preserveTime)) {
                getShipmentDrinkTotal = getShipmentDrinkTotal + element_s.quantity;
              }
            }

            this.setState({ outputDrinkQuantity: getShipmentDrinkTotal });
          },
          100
        )

      })
      .catch(error => {
        console.log(error);
      });

  }
  optionGetDiningTableFromAreaTypeAdd(id) {

    if (id > 0) {
      fetch(host + ':' + port + areaListUrl + id, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        }
      })
        .then(response => response.json())
        .then(dataJson => {
          setTimeout(
            () => {
              var getExtraDiningTable = [];
              for (const element of dataJson.diningTables) {
                if (element.status == 'Trống') {
                  getExtraDiningTable.push({ id: element.id, diningTable: { id: element.id, name: element.name, status: element.status, area: dataJson }, checkBoxDiningTale: false });
                }
              }
              for (const element_f of this.state.dataDiningTableCart) {
                var objIndex = getExtraDiningTable.findIndex((obj => obj.id == element_f.id));
                if (objIndex != -1) {
                  getExtraDiningTable[objIndex].checkBoxDiningTale = true;
                }
              }
              this.setState({ dataDiningTableAdd: getExtraDiningTable });
            },
            100
          )

        })
        .catch(error => {
          console.log(error);
        });
    }
    else {
      fetch(host + ':' + port + diningTableListUrl, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        }
      })
        .then(response => response.json())
        .then(dataJson => {
          setTimeout(
            () => {
              var getDiningTable = [];


              if (this.state.dataDiningTableCart.length == 0) {
                for (const element of dataJson) {
                  if (element.status == 'Trống') {
                    getDiningTable.push({ id: element.id, diningTable: { id: element.id, name: element.name, status: element.status, area: element.area }, checkBoxDiningTale: false });

                  }
                }
                this.setState({ dataDiningTableAdd: getDiningTable });
                return;
              }
              else {
                for (const element_f of dataJson) {
                  if (element_f.status == 'Trống') {
                    getDiningTable.push({ id: element_f.id, diningTable: { id: element_f.id, name: element_f.name, status: element_f.status, area: element_f.area }, checkBoxDiningTale: false });
                  }
                }
                for (const element_s of this.state.dataDiningTableCart) {
                  var objIndex = getDiningTable.findIndex((obj => obj.id == element_s.id));
                  getDiningTable[objIndex].checkBoxDiningTale = true;
                }

              }
              this.setState({ flag: false, dataDiningTableAdd: getDiningTable });
              //console.log(this.state.dataDiningTable);
            },
            100
          )

        })
        .catch(error => {
          console.log(error);
        });
    }

  }
  optionGetDishFromFoodTypeAdd(id) {
    if (id == 0) {
      fetch(host + ':' + port + dishListUrl, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        }
      })
        .then(response => response.json())
        .then(dataJson => {
          setTimeout(
            () => {
              var statusDishOver = '';
              var getExtraDishOver = [];
              for (const element_f of dataJson) {
                var statusDish = null;
                var getExtraDish = [];
                for (const element_s of element_f.resources) {
                  var getShipmentResourceTotal = 0;
                  if (element_s.resource.shipments.length == 0) statusDish = 0;
                  for (const element_t of element_s.resource.shipments) {
                    if (this.isDateAfterToday(element_t.preserveTime)) {
                      getShipmentResourceTotal = getShipmentResourceTotal + element_t.quantity;
                    }
                  }
                  if (element_s.quantity > getShipmentResourceTotal) { statusDish = 0 }
                  else { statusDish = getShipmentResourceTotal / element_s.quantity }

                  getExtraDish.push({ id: element_s.id, quantity: statusDish });
                }
                if (element_f.resources.length != 0) {
                  var minDishQuantity = getExtraDish[0].quantity;
                  for (var i = 0; i < getExtraDish.length; i++) {
                    if (minDishQuantity > getExtraDish[i].quantity) {
                      minDishQuantity = getExtraDish[i].quantity;
                    }
                  }
                  if (minDishQuantity > 0) {
                    statusDishOver = 'Còn hàng';
                  }
                  else {
                    statusDishOver = 'Hết hàng';
                  }
                }
                else statusDishOver = 'Tạm hết';
                this.setState({ outputFoodQuantity: minDishQuantity });
                getExtraDishOver.push({ id: element_f.id, food: element_f, statusFood: statusDishOver });
              }

              this.setState({ flagDishAdd: false, dataDishAdd: getExtraDishOver });
            },
            10
          )

        })
        .catch(error => {
          console.log(error);
        });

      return;
    }
    fetch(host + ':' + port + dishTypeListUrl + id, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var statusDishOver = '';
            var getExtraDishOver = [];
            for (const element_f of dataJson.dishs) {
              var statusDish = null;
              var getExtraDish = [];
              for (const element_s of element_f.resources) {
                var getShipmentResourceTotal = 0;
                if (element_s.resource.shipments.length == 0) statusDish = 0;
                for (const element_t of element_s.resource.shipments) {
                  if (this.isDateAfterToday(element_t.preserveTime)) {
                    getShipmentResourceTotal = getShipmentResourceTotal + element_t.quantity;
                  }
                }
                if (element_s.quantity > getShipmentResourceTotal) { statusDish = 0 }
                else { statusDish = getShipmentResourceTotal / element_s.quantity }

                getExtraDish.push({ id: element_s.id, quantity: statusDish });
              }
              if (element_f.resources.length != 0) {
                var minDishQuantity = getExtraDish[0].quantity;
                for (var i = 0; i < getExtraDish.length; i++) {
                  if (minDishQuantity > getExtraDish[i].quantity) {
                    minDishQuantity = getExtraDish[i].quantity;
                  }
                }
                if (minDishQuantity > 0) {
                  statusDishOver = 'Còn hàng';
                }
                else {
                  statusDishOver = 'Hết hàng';
                }
              }
              else statusDishOver = 'Tạm hết';
              this.setState({ outputFoodQuantity: minDishQuantity });
              getExtraDishOver.push({ id: element_f.id, food: element_f, statusFood: statusDishOver });
            }


            this.setState({ flagDishAdd: false, dataDishAdd: getExtraDishOver });
          },
          10
        )
      })
      .catch(error => {
        console.log(error);
      });



  }
  optionGetDrinkFromFoodTypeAdd(id) {
    if (id == 0) {
      fetch(host + ':' + port + drinkListUrl, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        }
      })
        .then(response => response.json())
        .then(dataJson => {
          setTimeout(
            () => {
              var statusDrink = '';
              var getExtraDrink = [];
              for (const element_f of dataJson) {
                var getShipmentDrinkTotal = 0;
                //console.log('Testttttttt'+element_f.shipments);
                if (element_f.shipments.length == 0) { statusDrink = 'Tạm hết'; }
                for (const element_s of element_f.shipments) {
                  element_s
                  //console.log(element_f.shipments);
                  if (this.isDateAfterToday(element_s.preserveTime)) {
                    getShipmentDrinkTotal = getShipmentDrinkTotal + element_s.quantity;
                  }
                }
                if (getShipmentDrinkTotal < 1) { statusDrink = 'Tạm hết' }
                else { statusDrink = 'Còn hàng' }
                getExtraDrink.push({ id: element_f.id, food: element_f, statusFood: statusDrink });
              }


              this.setState({ flagDrinkAdd: false, dataDrinkAdd: getExtraDrink });
            },
            10
          )

        })
        .catch(error => {
          console.log(error);
        });
      return;
    }
    fetch(host + ':' + port + drinkTypeListUrl + id, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var statusDrink = '';
            var getExtraDrink = [];
            var getShipmentDrinkTotal = 0;
            for (const element_f of dataJson.drinks) {
              if (element_f.shipments.length == 0) { statusDrink = 'Tạm hết'; }
              for (const element_s of element_f.shipments) {
                if (this.isDateAfterToday(element_s.preserveTime)) {
                  getShipmentDrinkTotal = getShipmentDrinkTotal + element_s.quantity;
                }
                if (getShipmentDrinkTotal < 1) { statusDrink = 'Tạm hết' }
                else { statusDrink = 'Còn hàng' }

              }

              getExtraDrink.push({ id: element_f.id, food: element_f, statusFood: statusDrink });
            }


            this.setState({ dataDrinkAdd: getExtraDrink });
          },
          10
        )

      })
      .catch(error => {
        console.log(error);
      });

  }

  optionGetDiningTableFromAreaTypeAdd(id) {

    if (id > 0) {
      fetch(host + ':' + port + areaListUrl + id, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        }
      })
        .then(response => response.json())
        .then(dataJson => {
          setTimeout(
            () => {


              var getDiningTable = [];
              let getdiningTableForm = '';
              for (const element of dataJson.diningTables) {
                var i = 0;

                if (element.status != 'Trống') {
                  element.orders.sort(function (a, b) {
                    a = new Date(a.order.time);
                    b = new Date(b.order.time);
                    return a > b ? -1 : a < b ? 1 : 0;
                  });
                  for (const element_f of element.orders) {
                    if (element_f.order.id == element.orders[0].order.id) { i = i + 1; }
                  }

                  if (i > 1) { getdiningTableForm = 'Bàn ghép'; }
                  else {
                    getdiningTableForm = 'Bàn đơn';
                  }
                  getDiningTable.push({ id: element.id, diningTable: { id: element.id, name: element.name, area: dataJson }, diningTableForm: getdiningTableForm });





                }

              }

              this.setState({ dataDiningTableAdd: getDiningTable });
              //console.log(this.state.dataDiningTable);
            },
            1
          )

        })
        .catch(error => {
          console.log(error);
        });
    }
    else {
      this.componentDidMount();
    }

  }

  optionGetDiningTableFromAreaTypeAdd(id) {
    if (id > 0) {
      fetch(host + ':' + port + areaListUrl + id, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        }
      })
        .then(response => response.json())
        .then(dataJson => {
          setTimeout(
            () => {
              var getDiningTable = [];
              for (const element of dataJson.diningTables) {
                if (element.status == 'Trống') {
                  getDiningTable.push({ id: element.id, diningTable: { id: element.id, name: element.name, area: dataJson }, checkBoxDiningTale: false });
                }
              }

              this.setState({ flagDiningTableAdd: false, dataDiningTableAdd: getDiningTable });
              //console.log(this.state.dataDiningTable);
            },
            1
          )

        })
        .catch(error => {
          console.log(error);
        });
    }
    else {
      this.componentDidMount();
    }

  }


  optionGetDiningTableFromAreaType(id) {

  
    if (id > 0) {
      fetch(host + ':' + port + areaListUrl + id, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        }
      })
        .then(response => response.json())
        .then(dataJson => {
          setTimeout(
            () => {
              /////////Addition
              var getUseDiningTable = [];
              for (const element of dataJson.diningTables) {
                if (element.status != 'Trống' && element.type == 'Bàn chính') {
                  getUseDiningTable.push({ id: element.id, name: element.name, area: dataJson, orders: element.orders });
                }
              }

              var getUseDiningTableUpdate = [];
              if (getUseDiningTable.length==0) {
                this.setState({ flag: false, data: getUseDiningTableUpdate });
              }
              for (const element of getUseDiningTable) {
                var i = 0;
                var getNewOrder = [];
                for (const element_or of element.orders) {
                  //if (element_or.order.type == 'Đơn hàng mới') {
                    getNewOrder.push(element_or);
                  //}
                }

                getNewOrder.sort(function (a, b) {
                  a = new Date(a.order.time);
                  b = new Date(b.order.time);
                  return a > b ? -1 : a < b ? 1 : 0;
                });
                fetch(host + ':' + port + orderListUrl + getNewOrder[0].order.id, {
                  headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.user.token,
                  }
                })
                  .then(response => response.json())
                  .then(dataJson => {
                    getUseDiningTableUpdate.push({ id: element.id, name: element.name, type: element.type, orders: element.orders, area: element.area, quantity: Number(dataJson.diningTables.length) - 1 });

                      this.setState({ flag: false, data: getUseDiningTableUpdate });

                  })
                  .catch(error => {
                    console.log(error);
                  });
              }

              ///////

            },
            10
          )

        })
        .catch(error => {
          console.log(error);
        });
    }
    else {
      this.componentDidMount();
    }

    

  }
  calculatePriceResidual(price) {
    this.setState({ inputPriceCustomer: price });
    var getPriceResidual = price - (Number(this.state.outputPriceTotal) + Number(this.state.outputPriceTotal) * 0.08);
    var regPrice = /^[0-9]+$/;
    if (!(regPrice.test(this.state.inputPriceCustomer)) || getPriceResidual < 0) {
      this.setState({ errorPaymentModal: 'Số tiền trả không đủ để thanh toán!', outputPriceResidual: 0 });
      return;
    }
    else {
      this.setState({ errorPaymentModal: '' });
      this.setState({ outputPriceResidual: getPriceResidual });
    }


  }






  paymentOrder() {

    if (this.state.dataSingleOrder.status == 'Đã thanh toán') { this.setState({ errorPaymentModal: 'Đơn hàng đã được thanh toán!' }); return; }
    if (this.state.errorPaymentModal != '' || this.state.inputPriceCustomer == '') { this.setState({ errorPaymentModal: 'Số tiền trả không hợp lệ!' }); return; }


    fetch(host + ':' + port + orderListUrl + this.state.dataSingleOrder.id, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            fetch(host + ':' + port + userAddorderUserUrl, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
              },
              body: JSON.stringify({
                order_id: this.state.dataSingleOrder.id,
                user_id: this.props.user.id,
              }),
            })
              .then(response => response.json())
              .then(data => {



              })
              .catch((error) => {

                console.log(error);

              });



            for (const element of dataJson.diningTables) {
              fetch(host + ':' + port + diningTableUpdateUrl + element.diningTable.id, {
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + this.props.user.token,
                },
                body: JSON.stringify({
                  name: element.diningTable.name,
                  status: "Trống",
                  area: {
                    id: element.diningTable.area.id
                  }
                }),
              })
                .then(response => response.json())
                .then(data => {


                })
                .catch((error) => {

                  console.log(error);

                });






            }

            fetch(host + ':' + port + orderUpdateUrl + this.state.dataSingleOrder.id, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
              },
              body: JSON.stringify({

                type: this.state.dataSingleOrder.type,
                status: 'Đã thanh toán',
                vat: this.state.dataSingleOrder.vat,
                time: this.state.dataSingleOrder.time

              }),
            })
              .then(response => response.text())
              .then(data => {
                var getTable = [];
                var getSingleDining = this.state.dataSingleOrder;
                getSingleDining.status = 'Đã thanh toán';
                for (const element_dish of this.state.dataOrderDishDetail) {
                  getTable.push([element_dish.food.id, element_dish.food.name, element_dish.food.unit, element_dish.quantity, this.formatMoneyDatabasetoView(element_dish.food.price), this.formatMoneyDatabasetoView(element_dish.food.price * element_dish.quantity)])
                }
                for (const element_drink of this.state.dataOrderDrinkDetail) {
                  getTable.push([element_drink.food.id, element_drink.food.name, element_drink.food.unit, element_drink.quantity, this.formatMoneyDatabasetoView(element_drink.food.price), this.formatMoneyDatabasetoView(element_drink.food.price * element_drink.quantity)])
                }
                this.setState({ dataSingleOrder: getSingleDining, paymentModal: false, tableData: getTable, status: 'billview' });
                this.componentDidMount();
              })
              .catch((error) => {

                console.log(error);

              });
          },
          1
        )

      })
      .catch(error => {
        console.log(error);
      });




  }
  addMoreDishToOrder(id) {

  }
  addMoreDrinkToOrder(id) {

  }
  addMoreDiningTableToOrder(item) {
    Alert.alert(
      "Thông báo",
      "Chắc chắn thêm bàn vào đơn hàng?",
      [
        {
          text: "Đóng",
          onPress: () => { },
        },
        {
          text: "Đồng ý", onPress: () => {

            fetch(host + ':' + port + diningTableAddorderDiningTableUrl, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
              },
              body: JSON.stringify({
                order_id: this.state.dataSingleOrder.id,
                diningTable_id: item.diningTable.id,
                type: ''
              }),
            })
              .then(response => response.json())
              .then(data => {
                this.updateDataSingleDiningTable(item);
                this.componentDidMount();
              })
              .catch((error) => {

                console.log(error);

              });
            fetch(host + ':' + port + diningTableUpdateUrl + item.diningTable.id, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
              },
              body: JSON.stringify({
                name: item.diningTable.name,
                status: 'Đang sử dụng',
                area: {
                  id: item.diningTable.area.id
                }
              }),
            })
              .then(response => response.json())
              .then(data => {
                //console.log(element);
                this.componentDidMount();

              })
              .catch((error) => {

                console.log(error);

              });

          }
        }
      ]
    );
  }

  searchOrderBringHomeItem(value) {
    this.setState({ flagOrderBringHome: true });
    if (value == '') { this.componentDidMount(); return; }
    fetch(host + ':' + port + orderListUrl + value, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var getOrder = [];
            if (dataJson.diningTables.length == 0 && dataJson.status != 'Đã thanh toán')
              getOrder.push(dataJson);
            this.setState({ flagOrderBringHome: false, dataOrderBringHome: getOrder });
            if (getOrder.length == 0) {
              this.componentDidMount();
            }

          },
          50
        )

      })
      .catch(error => {
        this.componentDidMount();
        console.log(error);
      });



  }

  searchItem(value) {
    this.setState({ flag: true });
    fetch(host + ':' + port + diningTableSearchUrl + 'name=' + value, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        var getBlankDiningTable = [];
        var getUseDiningTable = [];
        for (const element of dataJson) {
          if (element.status != 'Trống' && element.type == 'Bàn chính') {
            getUseDiningTable.push(element);
          }
        }



        var getUseDiningTableUpdate = [];
        for (const element of getUseDiningTable) {
          var i = 0;
          var getNewOrder = [];
          for (const element_or of element.orders) {
            //if (element_or.order.type == 'Đơn hàng mới') {
              getNewOrder.push(element_or);
            //}
          }

          getNewOrder.sort(function (a, b) {
            a = new Date(a.order.time);
            b = new Date(b.order.time);
            return a > b ? -1 : a < b ? 1 : 0;
          });
          fetch(host + ':' + port + orderListUrl + getNewOrder[0].order.id, {
            headers: {
              'Content-type': 'application/json',
              'Authorization': 'Bearer ' + this.props.user.token,
            }
          })
            .then(response => response.json())
            .then(dataJson => {
              getUseDiningTableUpdate.push({ id: element.id, name: element.name, type: element.type, orders: element.orders, area: element.area, quantity: Number(dataJson.diningTables.length) - 1 });

                this.setState({ flag: false, data: getUseDiningTableUpdate });

            })
            .catch(error => {
              console.log(error);
            });
        }

      })
      .catch(error => {
        this.componentDidMount();
        console.log(error);
      });



  }

  orderDiningTablerenderItem = ({ item }) => (
    <View>
      <View style={WaiterPaymentStyle.item}>
        <View style={{ flex: 1 }}>
          <Text></Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Tên: </Text>{item.name}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Khu vực: </Text>{item.area.name}</Text>


        </View>
        <View>
          <Image
            style={WaiterPaymentStyle.itemDetailListLogo}
            source={require('./../../assets/diningtable.png')}
          />
        </View>
      </View>
    </View>
  );

  orderFoodrenderItem = ({ item }) => (
    <View>






      <View style={WaiterPaymentStyle.item}>

        <View style={{ flex: 1 }}>
          <Text><Text style={{ fontWeight: 'bold' }}>Mã: </Text>{item.food.id}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Tên: </Text>{item.food.name}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Loại: </Text>{item.foodType}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Đơn vị: </Text>{item.food.unit}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Giá: </Text>{this.formatMoneyDatabasetoView(item.food.price)}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Số lượng: </Text>{item.quantity}</Text>

        </View>
        <View>
          <Image
            style={WaiterPaymentStyle.itemDetailListLogo}
            source={{
              uri: item.food.urlImage + '/',
            }}
          />
        </View>
      </View>
    </View>
  );

  orderReloadResult() {
    fetch(host + ':' + port + orderListUrl + this.state.dataSingleOrder.id, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            setTimeout(
              () => {

                var i = 0;
                var getOrderDiningTable = [];
                for (const element_f of dataJson.dishs) {
                  getDishOrder.push({ id: i, foodType: 'Món ăn', food: element_f.dish, quantity: element_f.quantity, price: element_f.price, unit: element_f.unit, type: element_f.type });
                  getPriceToTal = getPriceToTal + (element_f.dish.price * element_f.quantity);
                  i = i + 1;
                }
                for (const element_s of dataJson.drinks) {
                  getDrinkOrder.push({ id: i, foodType: 'Đồ uống', food: element_s.drink, quantity: element_s.quantity, price: element_s.price, unit: element_s.unit, type: element_s.type });
                  getPriceToTal = getPriceToTal + (element_s.drink.price * element_s.quantity);
                  i = i + 1;
                }



                for (const element of dataJson.diningTables) {
                  getOrderDiningTable.push(element.diningTable);
                }
                this.setState({ dataOrderDiningTableDetail: getOrderDiningTable });




                this.setState({ dataOrderDishDetail: getDishOrder, dataOrderDrinkDetail: getDrinkOrder });



              },
              1
            )
          },
          1
        )

      })
      .catch(error => {
        console.log(error);
      });





  }
  updateDataSingleDiningTable(item) {

    if (this.state.tabIndex == 0) {
      fetch(host + ':' + port + diningTableListUrl + item.diningTable.id, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        }
      })
        .then(response => response.json())
        .then(dataJson => {
          setTimeout(
            () => {

              var getDiningTable = {};
              let getdiningTableForm = '';
              getDiningTable = { id: dataJson.id, diningTable: dataJson, diningTableForm: getdiningTableForm };
              this.orderDetailItem(getDiningTable);
              // console.log(getDiningTable);
            },
            1
          )

        })
        .catch(error => {
          console.log(error);
        });
    }
    if (this.state.tabIndex == 1) {
      fetch(host + ':' + port + orderListUrl + item.id, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        }
      })
        .then(response => response.json())
        .then(dataJson => {
          setTimeout(
            () => {
              this.orderBringHomeDetailItem(dataJson);
            },
            1
          )

        })
        .catch(error => {
          console.log(error);
        });

    }
  }


  orderBringHomeDetailItem(item) {
    var getOrderOfDiningTable = [];
    var getSingleOrder = {};
    var getDishOrder = [];
    var getDrinkOrder = [];
    var getOrderDiningTable = [];
    var getPriceToTal = 0;
    var i = 0;
    for (const element_f of item.dishs) {
      getDishOrder.push({ id: i, foodType: 'Món ăn', food: element_f.dish, quantity: element_f.quantity, price: element_f.price, unit: element_f.unit, type: element_f.type });
      getPriceToTal = getPriceToTal + (element_f.dish.price * element_f.quantity);
      i = i + 1;
    }
    for (const element_s of item.drinks) {
      getDrinkOrder.push({ id: i, foodType: 'Đồ uống', food: element_s.drink, quantity: element_s.quantity, price: element_s.price, unit: element_s.unit, type: element_s.type });
      getPriceToTal = getPriceToTal + (element_s.drink.price * element_s.quantity);
      i = i + 1;
    }

    for (const element of item.diningTables) {
      getOrderDiningTable.push(element.diningTable);
    }
    this.setState({ dataOrderDiningTableDetail: getOrderDiningTable });


    this.setState({ outputPriceTotal: getPriceToTal, dataOrderDishDetail: getDishOrder, dataOrderDrinkDetail: getDrinkOrder, dataSingleDiningTable: item, dataSingleOrder: item, status: 'shipmentdrinkview' });
    Animated.timing(this.state.fadeAnimShipmentDrink, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();


  }

  orderDetailItem = (item) => {
    var getOrderOfDiningTable = [];
    var getSingleOrder = {};
    var getDishOrder = [];
    var getDrinkOrder = [];
    var getPriceToTal = 0;
    var i = 0;
    for (const element of item.orders) {
      //if (element.order.type == 'Đơn hàng mới') {
        getOrderOfDiningTable.push(element);
      //}
    }
    getOrderOfDiningTable.sort(function (a, b) {
      a = new Date(a.order.time);
      b = new Date(b.order.time);
      return a > b ? -1 : a < b ? 1 : 0;
    });
    for (const element_f of getOrderOfDiningTable[0].order.dishs) {
      getDishOrder.push({ id: i, foodType: 'Món ăn', food: element_f.dish, quantity: element_f.quantity, price: element_f.price, unit: element_f.unit, type: element_f.type });
      getPriceToTal = getPriceToTal + (element_f.dish.price * element_f.quantity);
      i = i + 1;
    }
    for (const element_s of getOrderOfDiningTable[0].order.drinks) {
      getDrinkOrder.push({ id: i, foodType: 'Đồ uống', food: element_s.drink, quantity: element_s.quantity, price: element_s.price, unit: element_s.unit, type: element_s.type });
      getPriceToTal = getPriceToTal + (element_s.drink.price * element_s.quantity);
      i = i + 1;
    }



    fetch(host + ':' + port + orderListUrl + getOrderOfDiningTable[0].order.id, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var getOrderDiningTable = [];
            for (const element of dataJson.diningTables) {
              if (element.diningTable.id != this.state.datasingleDiningTable.id) {
                getOrderDiningTable.push(element.diningTable);
              }
            }
            this.setState({ flagDiningTableDetail: false, flagDrinkDetail: false, flagDishDetail: false, dataOrderDiningTableDetail: getOrderDiningTable });

          },
          10
        )

      })
      .catch(error => {
        console.log(error);
      });



    this.setState({ outputPriceTotal: getPriceToTal, dataOrderDishDetail: getDishOrder, dataOrderDrinkDetail: getDrinkOrder, dataSingleDiningTable: item, dataSingleOrder: getOrderOfDiningTable[0].order, dataDiningTableReloadAdd: item, dataDrinkById: item, statusShipmentDrink: 'homeview', status: 'orderdetails' });
    this.setState({ statusBlankDiningTable: false, statusUseDiningTable: true, flagDiningTable: false });

    Animated.timing(this.state.fadeAnimShipmentDrink, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  }
  orderDetailView = () => {
    return (
      <Animated.View
        style={[
          WaiterPaymentStyle.container,
          {
            opacity: this.state.fadeAnimShipmentDrink
          }
        ]}>
        <TabView
          renderTabBar={this.renderTabBar}
          navigationState={{
            index: this.state.tabOderDetail,
            routes: [
              { key: 'orderDishDetail', title: 'Món ăn' },
              { key: 'orderDrinkDetail', title: 'Đồ uống' },
              { key: 'orderDiningTableDetail', title: 'Bàn phụ' }
            ]
          }}
          renderScene={this.renderOrderDetail}
          onIndexChange={(index) => { this.setState({ tabOderDetail: index }); }}
        />
        <View style={{ height: '1%' }}>
          <Text>
            {this.modalDrinkFilterView(this.state.modalDrinkFilter)}
            {this.modalDrinkQuantityView(this.state.modalDrinkQuantity)}
            {this.modalDishFilterView(this.state.modalDishFilter)}
            {this.modalDishQuantityView(this.state.modalDishQuantity)}
            {this.paymentModalView(this.state.paymentModal)}
            {this.modalFoodCartAddView(this.state.modalFoodCartAdd)}
          </Text>
        </View>

      </Animated.View>
    );
  }
  shipmentDrinkGetShipmentDrinkList(item) {
    fetch(host + ':' + port + drinkListUrl + item.id, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            //console.log(dataJson);
            var getShipmentDrink = [];
            var shipmentDrink_Id = {};
            var shipmentDrink_shipment = {};
            var shipmentDrink_quantity = 0;
            var shipmentDrink_preserveTime = '';
            var shipmentDrink_price = 0;
            var shipment_key = 0;
            for (const element of dataJson.shipments) {
              shipment_key = shipment_key + 1;
              shipmentDrink_Id = element.id;
              shipmentDrink_preserveTime = element.preserveTime;
              shipmentDrink_price = element.price;
              shipmentDrink_quantity = element.quantity;
              shipmentDrink_shipment = element.shipment;
              this.setState({ resourceDrinkQuantityTotal: this.state.resourceDrinkQuantityTotal + shipmentDrink_quantity });
              getShipmentDrink.push({ id: shipment_key, shipmentDrink_Id, shipmentDrink_shipment, shipmentDrink_quantity, shipmentDrink_preserveTime, shipmentDrink_price });
            }
            this.setState({ dataShipmentDrink: getShipmentDrink });
            //console.log(this.state.dataShipmentDrink);
          },
          200
        )

      })
      .catch(error => {
        console.log(error);
      });
    fetch(host + ':' + port + warehouseListUrl, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var getWarehouse = [];

            for (const element of dataJson) {
              getWarehouse.push({ label: element.name, value: element.id });
            }
            this.setState({ optionWarehouseType: getWarehouse });
          },
          200
        )

      })
      .catch(error => {
        console.log(error);
      });

  }
  shipmentDrinkSaveShipmentDrink = () => {
    var regPrice = /^[0-9]+$/;
    var regQuantity = /^[0-9]+$/;
    if ((!(regQuantity.test(this.state.inputShipmentDrinkQuantity))) || this.state.inputShipmentDrinkQuantity <= 0) {
      this.setState({ error: 'Số lượng không hợp lệ!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    if ((!(regPrice.test(this.state.inputShipmentDrinkPrice))) || this.state.inputShipmentDrinkPrice <= 0) {
      this.setState({ error: 'Số tiền không hợp lệ!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    if (this.state.inputShipmentDrinkpreserveTime == null) {
      this.setState({ error: 'Vui lòng chọn hạn sử dụng!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    if (this.state.inputWarehouse == null) {
      this.setState({ error: 'Vui lòng chọn nhà kho!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    fetch(host + ':' + port + shipmentAddUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      },
      body: JSON.stringify({
        name: 'Chuyến hàng lần ' + (this.state.dataShipmentDrink.length + 1),
        time: '',
        warehouse: {
          id: this.state.inputWarehouse
        }
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 500) { this.setState({ error: 'System fail!' }); return; }
        this.setState({ dataShipment: data });

        fetch(host + ':' + port + shipmentAddShipmentDrinkUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.user.token,
          },
          body: JSON.stringify({
            shipment_id: this.state.dataShipment.id,
            drink_id: this.state.dataDrinkById.id,
            quantity: this.state.inputShipmentDrinkQuantity,
            preserveTime: this.state.inputShipmentDrinkpreserveTime,
            price: this.state.inputShipmentDrinkPrice
          }),
        })
          .then(response => response.json())
          .then(data => {
            if (data.status == 500) { this.setState({ error: 'System fail!' }); return; }

            Alert.alert(
              "Thông báo",
              "Thêm thành công!",
              [
                {
                  text: "Xác nhận",
                  onPress: () => {
                    this.setState({
                      resourceDrinkQuantityTotal: 0,
                      inputShipmentDrinkName: '',
                      inputShipmentDrinkPrice: '',
                      inputShipmentDrinkQuantity: '',
                      inputShipmentDrinkpreserveTime: '',
                      inputWarehouse: null,
                      inputShipmentDrinkpreserveTime: null,
                      outputShipmentDrinkPreserveTime: '',
                      error: '',
                      fadeAnimAdd: new Animated.Value(0),
                      fadeAnimUpdate: new Animated.Value(0),
                      fadeAnimHome: new Animated.Value(0),
                      statusShipmentDrink: 'homeview',
                    });
                    setTimeout(() => {
                      Animated.timing(this.state.fadeAnimShipmentDrink, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true
                      }).start();
                      this.shipmentDrinkGetShipmentDrinkList(this.state.dataDrinkById);
                    }, 50);
                  },
                },
              ]
            );
          })
          .catch((error) => {

            console.log(error);

          });

      })
      .catch((error) => {

        console.log(error);

      });
  }
  shipmentDrinkdeleteItem = (item) => {

    Alert.alert(
      "Thông báo",
      "Chắc chắn xóa?",
      [
        {
          text: "Hủy",
          onPress: () => {
            this.setState({ statusShipmentDrink: 'homeview' });
          }
        },
        {
          text: "Đồng ý", onPress: () => {



            fetch(host + ':' + port + shipmentDeleteShipmentDrinkByShipmentDrinkIdUrl, {
              method: 'DELETE',
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + this.props.user.token,
              },
              body: JSON.stringify({

                shipment_id: item.shipmentDrink_Id.shipment_id,
                drink_id: item.shipmentDrink_Id.drink_id


              }),
            })
              .then(response => response.json())
              .then(data => {
                // console.log(item);
                this.setState({
                  fadeAnimAdd: new Animated.Value(0),
                  fadeAnimUpdate: new Animated.Value(0),
                  fadeAnimHome: new Animated.Value(0),
                  fadeAnimShipmentDrink: new Animated.Value(0),
                  statusShipmentDrink: 'homeview',
                });

                setTimeout(() => {
                  Animated.timing(this.state.fadeAnimShipmentDrink, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                  }).start();
                  this.setState({ resourceDrinkQuantityTotal: 0 });
                  this.shipmentDrinkGetShipmentDrinkList(this.state.dataDrinkById);
                }, 50);

              })
              .catch((error) => {

                console.log(error);

              });




          }
        }
      ]
    );
  }


  cancelItem = () => {
    this.setState({
      dataFoodCart: [],
      inputName: '',
      inputPrice: '',
      inputDescription: '',
      inputUnit: '',
      inputUrlImage: null,
      inputDrinkType: null,
      error: '',
      error: '',
      fadeAnimAdd: new Animated.Value(0),
      fadeAnimUpdate: new Animated.Value(0),
      fadeAnimHome: new Animated.Value(0),
      fadeAnimShipmentDrink: new Animated.Value(0),
      status: 'homeview',
    });
    setTimeout(() => {
      Animated.timing(this.state.fadeAnimHome, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true
      }).start();
    }, 50);
  }
  renderItemDetailOrderDiningTableList = ({ item }) => (
    <TouchableOpacity onPress={() => { }}>
      <View style={WaiterPaymentStyle.itemDetailOrderList}>
        <View>
          <TouchableOpacity onPress={() => { this.addMoreDiningTableToOrder(item); }}>
            <Image
              style={WaiterPaymentStyle.itemDetailListPlus}
              source={require('./../../assets/plus.png')}
            />
          </TouchableOpacity>

        </View>
        <View style={{ flex: 1 }}>
          <Text></Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Mã: </Text>{item.diningTable.id}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Tên: </Text>{item.diningTable.name}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Khu vực: </Text>{item.diningTable.area.name}</Text>
        </View>
        <View>
          <Image
            style={WaiterPaymentStyle.itemDetailOrderListLogo}
            source={require('./../../assets/diningtable.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
  renderItemDrinkDetailList = ({ item }) => (
    <TouchableOpacity onPress={() => { }}>
      <View style={WaiterPaymentStyle.itemDetailList}>
        <View>
          <TouchableOpacity onPress={() => { this.countAvailableDrinkById(item.food.id); this.setState({ datasingleDrink: item, modalDrinkQuantity: true }); }}>
            <Image
              style={WaiterPaymentStyle.itemDetailListPlus}
              source={require('./../../assets/plus.png')}
            />
          </TouchableOpacity>

        </View>
        <View style={{ flex: 1 }}>
          <Text><Text style={{ fontWeight: 'bold' }}>Mã: </Text>{item.food.id}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Tên: </Text>{item.food.name}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Giá: </Text>{this.formatMoneyDatabasetoView(item.food.price)}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Đơn vị: </Text>{item.food.unit}</Text>
          <Text style={{ fontWeight: 'bold' }}>{item.statusFood}</Text>
        </View>
        <View>
          <Image
            style={WaiterPaymentStyle.itemDetailListLogo}
            source={{
              uri: item.food.urlImage + '/'
            }}
          />
        </View>
      </View>
    </TouchableOpacity>

  );
  renderItemDishDetailList = ({ item }) => (
    <TouchableOpacity onPress={() => { }}>
      <View style={WaiterPaymentStyle.itemDetailList}>
        <View>
          <TouchableOpacity onPress={() => { this.countAvailableDishById(item.food.id); this.setState({ datasingleDish: item, modalDishQuantity: true }); }}>
            <Image
              style={WaiterPaymentStyle.itemDetailListPlus}
              source={require('./../../assets/plus.png')}
            />
          </TouchableOpacity>

        </View>
        <View style={{ flex: 1 }}>
          <Text><Text style={{ fontWeight: 'bold' }}>Mã: </Text>{item.food.id}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Tên: </Text>{item.food.name}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Giá: </Text>{this.formatMoneyDatabasetoView(item.food.price)}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Đơn vị: </Text>{item.food.unit}</Text>
          <Text style={{ fontWeight: 'bold' }}>{item.statusFood}</Text>
        </View>
        <View>
          <Image
            style={WaiterPaymentStyle.itemDetailListLogo}
            source={{
              uri: item.food.urlImage + '/'
            }}
          />
        </View>
      </View>
    </TouchableOpacity>

  );
  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => { }}>
      <View style={WaiterPaymentStyle.item}>
        <View>
        <TouchableOpacity onPress={() => {this.setState({ datasingleDiningTable: item });this.orderDetailItem(item) }}>
              <Image
                style={WaiterPaymentStyle.itemDetailListPlus}
                source={require('./../../assets/next.png')}
              />
            </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Text><Text style={{ fontWeight: 'bold' }}>Tên: </Text>{item.name}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Khu vực: </Text>{item.area.name}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Số lượng bàn phụ: </Text>{item.quantity}</Text>

        </View>
        <View>
          <Image
            style={WaiterPaymentStyle.logo}
            source={require('./../../assets/diningtable.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  orderDrinkDetailView = () => {
    return (
      <SafeAreaProvider>
        {this.state.statusOderDrinkDetail == 'homeview' ?
          <View style={WaiterPaymentStyle.addExtraItemContainer}>

            <View style={WaiterPaymentStyle.setupItemCenterContainer}>


              <Text style={WaiterPaymentStyle.titleResourceDrink}>Thông tin đơn hàng: </Text>

            </View>

            <Text style={{ color: 'white' }}>Mã: {this.state.dataSingleOrder.id}</Text>
            <Text style={{ color: 'white' }}>Trạng thái: {this.state.dataSingleOrder.status}</Text>
            <Text style={{ color: 'white' }}>Thời gian: {this.formatLocalDateTimeDatabaseToView(this.state.dataSingleOrder.time)}</Text>
            <Text></Text>
            <FlatList
              style={{ backgroundColor: 'white', borderRadius: 15 }}
              data={this.state.dataOrderDrinkDetail}
              renderItem={this.orderFoodrenderItem}
              keyExtractor={item => item.id}
            />
            <Text></Text>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}>
              <TouchableOpacity onPress={() => { this.temporaryOrder(); }} >
                <Image
                  style={WaiterPaymentStyle.cancelButton}
                  source={require('./../../assets/dollar.png')}
                />
              </TouchableOpacity>
              <Text>             </Text>
              <TouchableOpacity onPress={() => { this.setState({ resourceDrinkQuantityTotal: 0 }); this.cancelItem() }} >
                <Image
                  style={WaiterPaymentStyle.cancelButton}
                  source={require('./../../assets/cancel.png')}
                />
              </TouchableOpacity>

            </View>
            <Text></Text>
            <Text></Text>
            <Text></Text>
          </View>
          : null}
        {this.state.statusOderDrinkDetail == 'addview' ?
          <View style={WaiterPaymentStyle.addExtraItemContainer}>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}>
              <View>
                <Text style={WaiterPaymentStyle.titleResourceDrink}>Thêm đồ uống vào đơn hàng: </Text>

              </View>
            </View>

            <View style={WaiterPaymentStyle.itemMenuContainerTouchable}>
              <View style={WaiterPaymentStyle.itemMenuContainerTouchableContentFoodType}>


                <TouchableOpacity
                  style={{ marginLeft: '1%' }}
                  onPress={() => {
                    this.setState({
                      modalDrinkFilter: true
                    });

                  }}
                >
                  <Icon
                    style={{ marginRight: '3%' }}
                    name='caret-down-outline'
                    type='ionicon'
                    color='white'
                  />




                </TouchableOpacity>
                <Text style={WaiterPaymentStyle.title}>Danh sách {this.state.outputCategory}:</Text>

              </View>

            </View>
            {this.state.flagDrinkAdd ?
              <ActivityIndicator size="large" color="#DDDDDD" />
              :
              <FlatList
                data={this.state.dataDrinkAdd}
                renderItem={this.renderItemDrinkDetailList}
                keyExtractor={item => item.id}

              />

            }


            <Text></Text>

            <View style={WaiterPaymentStyle.setupItemCenterContainer}>
              <TouchableOpacity
                onPress={() => { this.setState({ modalFoodCartAdd: true }); }}
                style={{ width: '20%', marginLeft: '1%', paddingRight: '15%' }}
              >
                <Image
                  style={WaiterPaymentStyle.cart}
                  source={require('./../../assets/cart.png')}
                />

                <Badge
                  status="error"
                  value={this.state.dataFoodCart.length}
                  containerStyle={{ position: 'absolute', left: '80%' }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginRight: '20%', marginLeft: '47%' }}
                onPress={() => { this.setState({ statusOderDrinkDetail: 'homeview' }); }} >
                <Image
                  style={WaiterPaymentStyle.cancelButton}
                  source={require('./../../assets/previous.png')}
                />
              </TouchableOpacity>
            </View>
            <Text></Text>
            <Text></Text>
          </View>
          : null}

      </SafeAreaProvider>

    );
  }
  orderDishDetailView = () => {
    return (
      <SafeAreaProvider>
        {this.state.statusOderDishDetail == 'homeview' ?
          <View style={WaiterPaymentStyle.addExtraItemContainer}>

            <View style={WaiterPaymentStyle.setupItemCenterContainer}>

              <Text style={WaiterPaymentStyle.titleResourceDrink}>Thông tin đơn hàng: </Text>

            </View>

            <Text style={{ color: 'white' }}>Mã: {this.state.dataSingleOrder.id}</Text>
            <Text style={{ color: 'white' }}>Trạng thái: {this.state.dataSingleOrder.status}</Text>
            <Text style={{ color: 'white' }}>Thời gian: {this.formatLocalDateTimeDatabaseToView(this.state.dataSingleOrder.time)}</Text>
            <Text></Text>
            <FlatList
              style={{ backgroundColor: 'white', borderRadius: 15 }}
              data={this.state.dataOrderDishDetail}
              renderItem={this.orderFoodrenderItem}
              keyExtractor={item => item.id}
            />
            <Text></Text>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}>
              <TouchableOpacity onPress={() => { this.temporaryOrder(); }} >
                <Image
                  style={WaiterPaymentStyle.cancelButton}
                  source={require('./../../assets/dollar.png')}
                />
              </TouchableOpacity>
              <Text>             </Text>
              <TouchableOpacity onPress={() => { this.setState({ resourceDrinkQuantityTotal: 0 }); this.cancelItem() }} >
                <Image
                  style={WaiterPaymentStyle.cancelButton}
                  source={require('./../../assets/cancel.png')}
                />
              </TouchableOpacity>

            </View>
            <Text></Text>
            <Text></Text>
            <Text></Text>
          </View>
          : null}
        {this.state.statusOderDishDetail == 'addview' ?
          <View style={WaiterPaymentStyle.addExtraItemContainer}>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}>
              <View>
                <Text style={WaiterPaymentStyle.titleResourceDrink}>Thêm món vào đơn hàng: </Text>

              </View>

            </View>
            <View style={WaiterPaymentStyle.itemMenuContainerTouchable}>
              <View style={WaiterPaymentStyle.itemMenuContainerTouchableContentFoodType}>


                <TouchableOpacity
                  style={{ marginLeft: '1%' }}
                  onPress={() => {
                    this.setState({
                      modalDishFilter: true
                    });
                  }}
                >
                  <Icon
                    style={{ marginRight: '3%' }}
                    name='caret-down-outline'
                    type='ionicon'
                    color='white'
                  />




                </TouchableOpacity>
                <Text style={WaiterPaymentStyle.title}>Danh sách {this.state.outputCategory}:</Text>

              </View>

            </View>
            {this.state.flagDishAdd ?
              <ActivityIndicator size="large" color="#DDDDDD" />
              :
              <FlatList

                data={this.state.dataDishAdd}
                renderItem={this.renderItemDishDetailList}
                keyExtractor={item => item.id}

              />

            }

            <Text></Text>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}>

              <TouchableOpacity
                onPress={() => { this.setState({ modalFoodCartAdd: true }); }}
                style={{ width: '20%', marginLeft: '1%', paddingRight: '15%' }}
              >
                <Image
                  style={WaiterPaymentStyle.cart}
                  source={require('./../../assets/cart.png')}
                />

                <Badge
                  status="error"
                  value={this.state.dataFoodCart.length}
                  containerStyle={{ position: 'absolute', left: '80%' }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginRight: '20%', marginLeft: '47%' }}
                onPress={() => { this.setState({ statusOderDishDetail: 'homeview' }); }} >
                <Image
                  style={WaiterPaymentStyle.cancelButton}
                  source={require('./../../assets/previous.png')}
                />
              </TouchableOpacity>
            </View>
            <Text></Text>
            <Text></Text>
          </View>
          : null}

      </SafeAreaProvider>

    );
  }
  orderDiningTableDetailView = () => {
    return (
      <SafeAreaProvider>
        {this.state.statusOderDiningTableDetail == 'homeview' ?
          <View style={WaiterPaymentStyle.addExtraItemContainer}>

            <View style={WaiterPaymentStyle.setupItemCenterContainer}>
              <Text style={WaiterPaymentStyle.titleResourceDrink}>Thông tin đơn hàng: </Text>

            </View>

            <Text style={{ color: 'white' }}>Mã: {this.state.dataSingleOrder.id}</Text>
            <Text style={{ color: 'white' }}>Trạng thái: {this.state.dataSingleOrder.status}</Text>
            <Text style={{ color: 'white' }}>Thời gian: {this.formatLocalDateTimeDatabaseToView(this.state.dataSingleOrder.time)}</Text>
            <Text></Text>
            <FlatList
              style={{ backgroundColor: 'white', borderRadius: 15 }}
              data={this.state.dataOrderDiningTableDetail}
              renderItem={this.orderDiningTablerenderItem}
              keyExtractor={item => item.id}
            />
            <Text></Text>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}>
              <TouchableOpacity onPress={() => { this.temporaryOrder(); }} >
                <Image
                  style={WaiterPaymentStyle.cancelButton}
                  source={require('./../../assets/dollar.png')}
                />
              </TouchableOpacity>
              <Text>             </Text>
              <TouchableOpacity onPress={() => { this.setState({ resourceDrinkQuantityTotal: 0 }); this.cancelItem() }} >
                <Image
                  style={WaiterPaymentStyle.cancelButton}
                  source={require('./../../assets/cancel.png')}
                />
              </TouchableOpacity>

            </View>
            <Text></Text>
            <Text></Text>
            <Text></Text>
          </View>
          : null}
        {this.state.statusOderDiningTableDetail == 'addview' ?
          <View style={WaiterPaymentStyle.addExtraItemContainer}>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}>
              <View>
                <Text style={WaiterPaymentStyle.titleResourceDrink}>Thêm bàn vào đơn hàng: </Text>
              </View>
            </View>
            <View style={WaiterPaymentStyle.itemMenuContainerTouchable}>
              <View style={WaiterPaymentStyle.itemMenuContainerTouchableContentFoodType}>


                <TouchableOpacity
                  style={{ marginLeft: '1%' }}
                  onPress={() => { this.setState({ modalDiningTableType: true }); }}
                >
                  <Icon
                    style={{ marginRight: '3%' }}
                    name='caret-down-outline'
                    type='ionicon'
                    color='white'
                  />



                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: this.state.windowWidth / 25 }}>Danh sách bàn trống:</Text>

              </View>

            </View>
            <FlatList
              style={{ borderRadius: 10, borderWidth: 0.3, borderColor: 'white' }}
              data={this.state.dataDiningTableAdd}
              renderItem={this.renderItemDetailOrderDiningTableList}
              keyExtractor={item => item.id}
            />
            <Text></Text>

            <Text></Text>
            <View style={WaiterPaymentStyle.setupItemCenterContainer}>

              <TouchableOpacity onPress={() => { this.setState({ statusOderDiningTableDetail: 'homeview' }); }} >
                <Image
                  style={WaiterPaymentStyle.cancelButton}
                  source={require('./../../assets/previous.png')}
                />
              </TouchableOpacity>
            </View>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <View><Text>{this.modalDiningTableTypeView(this.state.modalDiningTableType)}</Text></View>
          </View>
          : null}

      </SafeAreaProvider>

    );
  }

  renderOrderDetail = SceneMap({
    orderDishDetail: this.orderDishDetailView,
    orderDrinkDetail: this.orderDrinkDetailView,
    orderDiningTableDetail: this.orderDiningTableDetailView

  });


  renderScene = SceneMap({
    orderDiningTable: this.OrderDiningTableView,
    bringHome: this.BringHomeView,
  });
  renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#103667' }}
    />
  );

  render() {
    return (
      <View style={WaiterPaymentStyle.container}>
        {this.state.status == 'homeview' ?
          <View style={WaiterPaymentStyle.container}>
            <Animated.View
              style={[
                WaiterPaymentStyle.container,
                {
                  opacity: this.state.fadeAnimHome
                }
              ]}>
              <SafeAreaProvider>
                <View style={WaiterPaymentStyle.topcontainer}>
                  <TouchableOpacity
                    onPress={() => { this.setState({ searchModal: true }); }}

                  >
                    <Icon
                      style={{ marginTop: '40%', marginRight: '3%' }}
                      name='caret-down-outline'
                      type='ionicon'
                      color='white'
                    />
                  </TouchableOpacity>
                  <Input
                    inputStyle={{ fontSize: 14 }}
                    inputContainerStyle={{ marginRight: '-2%', marginLeft: '10%', marginTop: '3%', backgroundColor: 'white', borderRadius: 20 }}
                    leftIconContainerStyle={{ paddingLeft: '2%' }}
                    name='search'
                    placeholder='Nhập nội dung tìm kiếm...'
                    placeholderTextColor="#BBBBBB"
                    onChangeText={(search) => this.searchItem(search)}
                    //value={this.state.inputSearch}
                    leftIcon={{ color: 'grey', type: 'material', name: 'search' }}
                    keyboardType='default' />
                </View>
                <View style={{ padding: '2%', marginTop: -10 }}>
                  <View style={WaiterPaymentStyle.itemMenuContainerTouchableContentFoodType}>

                    <TouchableOpacity
                      style={{ marginLeft: '1%' }}
                      onPress={() => {
                        this.setState({ flag: true });
                        this.componentDidMount();
                      }}
                    >
                      <Icon

                        name='cached'
                        type='material'
                        color='white'
                      />



                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: this.state.windowWidth / 25 }}>Danh sách bàn đã đặt:</Text>

                  </View>

                </View>

                <View style={{ backgroundColor: 'white', margin: '2%', borderRadius: 15, height: '75%' }}>
                  {this.state.flag ?
                    <View>
                      <Text></Text>
                      <ActivityIndicator size="large" color="#DDDDDD" />
                    </View>

                    :
                    <FlatList
                      data={this.state.data}
                      renderItem={this.renderItem}
                      keyExtractor={item => item.id}
                    />
                  }
                </View>

              </SafeAreaProvider>
              <View style={{ height: '1%' }}>{this.searchModalView(this.state.searchModal)}</View>
            </Animated.View>
          </View>
          : null}

        {this.state.status == 'billview' ?
          <this.BillView />
          : null}
        {this.state.status == 'orderdetails' ?
          <this.orderDetailView />
          : null}
      </View>

    );
  }
}


const mapStateToProps = state => {
  return { user: state.users }
};

export default connect(mapStateToProps)(WaiterPaymentScreen);