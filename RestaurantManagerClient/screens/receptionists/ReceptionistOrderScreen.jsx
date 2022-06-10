import React from 'react';
import { Alert, Animated, ActivityIndicator, Dimensions, Button, ScrollView, Text, View, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Badge } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { ReceptionistOrderStyle } from '../../styles/LayoutStyle';
import { Input } from 'react-native-elements';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';
import { store } from '../../configs/ReduxStore';
import { host, port,diningTableUpdateUrl, dishUpdateorderDishUrl, drinkUpdateorderDrinkUrl, notificationAddUrl, userListUrl, orderListUrl, orderUpdateUrl, userAddorderUserUrl } from '../../apis/ManagerApi';
import Modal from "react-native-modal";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DropDownPicker from 'react-native-dropdown-picker';
import Checkbox from 'expo-checkbox';
import { Table, Row, Rows } from 'react-native-table-component';





let userName;
let password;
let phone;
let name;
let role;
let birthDay;
let token;
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

class ReceptionistOrderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      tabIndex: 0,
      tabIndexDetail: 0,
      statusChef: 'homeview',
      modalSearch: false,
      modalSearchInitial: 0,
      modalPayment: false,
      dataOrderWaitHandle: [],
      dataSingleOrder: {},
      dataOrderDoing: [],
      dataOrderWaitShip: [],
      dataOrderDishDetail: [],
      dataOrderDrinkDetail: [],
      dataOrderDiningTableDetail: [],
      inputPriceCustomer: '',
      outputPriceTotal: 0,
      outputDiningTableTotal: 0,
      outputFoodQuantity: 0,
      outputPriceTotalCart: 0,
      outputPriceResidual: 0,
      flag: true,
      flagOrderDishDetail: true,
      flagOrderDrinkDetail: true,
      flagOrderDiningTableDetail: true,
      windowWidth: Dimensions.get('window').width,
      windowHeight: Dimensions.get('window').height,
      fadeAnimUpdate: new Animated.Value(0),
      fadeAnimAdd: new Animated.Value(0),
      fadeAnimHome: new Animated.Value(0),
      fadeAnimShipmentDrink: new Animated.Value(0),
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
            var getWaitHandleOrder = [];


            for (const element of dataJson) {
              if (element.status == 'Đang chờ quầy thu ngân xử lý') {
                getWaitHandleOrder.push(element);

              }
            }
            this.setState({ flag: false, dataOrderWaitHandle: getWaitHandleOrder });
          },
          100
        )

      })
      .catch(error => {
        console.log(error);
      });

    fetch(host + ':' + port + userListUrl + this.props.user.id, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var getWaitHandleOrder = [];
            var getDoingOrder = [];
            var getWaitShipOrder = [];

            for (const element of dataJson.orders) {
              if (element.order.status == 'Đang tạm tính')
                getDoingOrder.push(element.order);
              if (element.order.status == 'Đang thanh toán')
                getWaitShipOrder.push(element.order);
            }
            this.setState({ flag: false, dataOrderDoing: getDoingOrder, dataOrderWaitShip: getWaitShipOrder });
          },
          100
        )

      })
      .catch(error => {
        console.log(error);
      });


  }

  modalPaymentView(isVisible) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isVisible}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 20, padding: '5%' }}>
            <View style={ReceptionistOrderStyle.setupItemCenterContainer}></View>
            <View style={ReceptionistOrderStyle.setupItemCenterContainer}><Text style={ReceptionistOrderStyle.error}>{this.state.errorPaymentModal}</Text></View>
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
            <View style={ReceptionistOrderStyle.setupItemCenterContainer}>
              <TouchableOpacity onPress={() => { this.tranferOrder(); }} >
                <Image
                  style={ReceptionistOrderStyle.cancelButton}
                  source={require('./../../assets/complete.png')}
                />
              </TouchableOpacity>
              <Text>             </Text>
              <TouchableOpacity onPress={() => { this.setState({ inputPriceCustomer: '', errorPaymentModal: '', modalPayment: false }); }} >
                <Image
                  style={ReceptionistOrderStyle.cancelButton}
                  source={require('./../../assets/cancel.png')}
                />
              </TouchableOpacity>

            </View>
          </View>




        </Modal>
      </View>
    );
  }
  searchItem(value) {
    this.setState({ flag: true });
    if (value == '') { this.componentDidMount(); return; }
    if (this.state.tabIndex == 0) {
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
              var getWaitHandleOrder = [];
              if (dataJson.status == 'Đang chờ quầy thu ngân xử lý')
                getWaitHandleOrder.push(dataJson);
              this.setState({ flag: false, dataOrderWaitHandle: getWaitHandleOrder });
              if (getWaitHandleOrder.length == 0) {
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
    if (this.state.tabIndex == 1) {
      fetch(host + ':' + port + userListUrl + this.props.user.id, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        }
      })
        .then(response => response.json())
        .then(dataJson => {
          setTimeout(
            () => {
              var getDoingOrder = [];

              for (const element of dataJson.orders) {
                if (element.order.id == value)
                  getDoingOrder.push(element.order);
              }
              console.log(getDoingOrder);
              this.setState({ flag: false, dataOrderDoing: getDoingOrder });
              if (getDoingOrder.length == 0) { this.componentDidMount(); }

            },
            100
          )

        })
        .catch(error => {
          console.log(error);
        });
    }
    if (this.state.tabIndex == 2) {
      fetch(host + ':' + port + userListUrl + this.props.user.id, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        }
      })
        .then(response => response.json())
        .then(dataJson => {
          setTimeout(
            () => {
              var getDoingOrder = [];

              for (const element of dataJson.orders) {
                if (element.order.id == value)
                  getDoingOrder.push(element.order);
              }
              console.log(getDoingOrder);
              this.setState({ flag: false, dataOrderWaitShip: getDoingOrder });
              if (getDoingOrder.length == 0) { this.componentDidMount(); }

            },
            100
          )

        })
        .catch(error => {
          console.log(error);
        });
    }


  }

  updateOrderFoodType(item) {
    if (this.state.tabIndexDetail == 0) {
      this.setState({ flagOrderDishDetail: true });
      if (item.type == 'Đang chế biến') {
        fetch(host + ':' + port + dishUpdateorderDishUrl + this.state.dataSingleOrder.id + '/' + item.food.id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.user.token,
          },
          body: JSON.stringify({
            order_id: this.state.dataSingleOrder.id,
            dish_id: item.food.id,
            quantity: item.quantity,
            price: item.food.price,
            unit: item.food.unit,
            type: 'Đã chế biến: ' + item.quantity
          }),
        })
          .then(response => response.json())
          .then(data => {


            fetch(host + ':' + port + orderListUrl + this.state.dataSingleOrder.id, {
              headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
              }
            })
              .then(response => response.json())
              .then(dataJson => {

                var flagFood = true;
                for (const element of dataJson.dishs) {
                  if (element.type == 'Đang chế biến') {
                    flagFood = false;
                  }
                }
                for (const element of dataJson.drinks) {
                  if (element.type == 'Đang chế biến') {
                    flagFood = false;
                  }
                }

                if (flagFood == true) {

                  fetch(host + ':' + port + orderUpdateUrl + this.state.dataSingleOrder.id, {
                    method: 'PUT',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + this.props.user.token,
                    },
                    body: JSON.stringify({

                      type: this.state.dataSingleOrder.type,
                      status: 'Đang giao hàng',
                      vat: this.state.dataSingleOrder.vat,
                      time: this.state.dataSingleOrder.time

                    }),
                  })
                    .then(response => response.text())
                    .then(data => {
                      this.componentDidMount();
                      var getOrder = this.state.dataSingleOrder;
                      getOrder.status = 'Đang giao hàng';
                      this.setState({ dataSingleOrder: getOrder });
                      this.orderDetailItem(dataJson);


                      fetch(host + ':' + port + notificationAddUrl, {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + this.props.user.token,
                        },
                        body: JSON.stringify({
                          name: this.state.dataSingleOrder.id,
                          detail: "Phòng phục vụ đã nhận một đơn hàng mới",
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

                    })
                    .catch((error) => {

                      console.log(error);

                    });

                }
                else {

                  fetch(host + ':' + port + orderUpdateUrl + this.state.dataSingleOrder.id, {
                    method: 'PUT',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + this.props.user.token,
                    },
                    body: JSON.stringify({

                      type: this.state.dataSingleOrder.type,
                      status: 'Đang chế biến',
                      vat: this.state.dataSingleOrder.vat,
                      time: this.state.dataSingleOrder.time

                    }),
                  })
                    .then(response => response.text())
                    .then(data => {
                      this.componentDidMount();
                      var getOrder = this.state.dataSingleOrder;
                      getOrder.status = 'Đang chế biến';
                      this.setState({ dataSingleOrder: getOrder });
                      this.orderDetailItem(dataJson);

                    })
                    .catch((error) => {

                      console.log(error);

                    });
                }

              })
              .catch(error => {
                console.log(error);
              });

          })
          .catch((error) => {

            console.log(error);

          });
      }
      else {

        fetch(host + ':' + port + dishUpdateorderDishUrl + this.state.dataSingleOrder.id + '/' + item.food.id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.user.token,
          },
          body: JSON.stringify({
            order_id: this.state.dataSingleOrder.id,
            dish_id: item.food.id,
            quantity: item.quantity,
            price: item.food.price,
            unit: item.food.unit,
            type: 'Đang chế biến'
          }),
        })
          .then(response => response.json())
          .then(data => {


            fetch(host + ':' + port + orderListUrl + this.state.dataSingleOrder.id, {
              headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
              }
            })
              .then(response => response.json())
              .then(dataJson => {
                var flagFood = true;
                for (const element of dataJson.dishs) {
                  if (element.type == 'Đang chế biến') {
                    flagFood = false;
                  }
                }
                for (const element of dataJson.drinks) {
                  if (element.type == 'Đang chế biến') {
                    flagFood = false;
                  }
                }

                if (flagFood == true) {

                  fetch(host + ':' + port + orderUpdateUrl + this.state.dataSingleOrder.id, {
                    method: 'PUT',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + this.props.user.token,
                    },
                    body: JSON.stringify({

                      type: this.state.dataSingleOrder.type,
                      status: 'Đang giao hàng',
                      vat: this.state.dataSingleOrder.vat,
                      time: this.state.dataSingleOrder.time

                    }),
                  })
                    .then(response => response.text())
                    .then(data => {
                      this.componentDidMount();
                      var getOrder = this.state.dataSingleOrder;
                      getOrder.status = 'Đang giao hàng';
                      this.setState({ dataSingleOrder: getOrder });
                      this.orderDetailItem(dataJson);

                      fetch(host + ':' + port + notificationAddUrl, {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + this.props.user.token,
                        },
                        body: JSON.stringify({
                          name: this.state.dataSingleOrder.id,
                          detail: "Phòng phục vụ đã nhận một đơn hàng mới",
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


                    })
                    .catch((error) => {

                      console.log(error);

                    });

                }
                else {

                  fetch(host + ':' + port + orderUpdateUrl + this.state.dataSingleOrder.id, {
                    method: 'PUT',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + this.props.user.token,
                    },
                    body: JSON.stringify({

                      type: this.state.dataSingleOrder.type,
                      status: 'Đang chế biến',
                      vat: this.state.dataSingleOrder.vat,
                      time: this.state.dataSingleOrder.time

                    }),
                  })
                    .then(response => response.text())
                    .then(data => {
                      this.componentDidMount();
                      var getOrder = this.state.dataSingleOrder;
                      getOrder.status = 'Đang chế biến';
                      this.setState({ dataSingleOrder: getOrder });
                      this.orderDetailItem(dataJson);

                    })
                    .catch((error) => {

                      console.log(error);

                    });
                }
              })
              .catch(error => {
                console.log(error);
              });



          })
          .catch((error) => {

            console.log(error);

          });

      }

    }


    if (this.state.tabIndexDetail == 1) {
      this.setState({ flagOrderDrinkDetail: true });
      if (item.type == 'Đang chế biến') {
        fetch(host + ':' + port + drinkUpdateorderDrinkUrl + this.state.dataSingleOrder.id + '/' + item.food.id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.user.token,
          },
          body: JSON.stringify({
            order_id: this.state.dataSingleOrder.id,
            drink_id: item.food.id,
            quantity: item.quantity,
            price: item.food.price,
            unit: item.food.unit,
            type: 'Đã chế biến: ' + item.quantity
          }),
        })
          .then(response => response.json())
          .then(data => {



            fetch(host + ':' + port + orderListUrl + this.state.dataSingleOrder.id, {
              headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
              }
            })
              .then(response => response.json())
              .then(dataJson => {
                var flagFood = true;
                for (const element of dataJson.dishs) {
                  if (element.type == 'Đang chế biến') {
                    flagFood = false;
                  }
                }
                for (const element of dataJson.drinks) {
                  if (element.type == 'Đang chế biến') {
                    flagFood = false;
                  }
                }

                if (flagFood == true) {

                  fetch(host + ':' + port + orderUpdateUrl + this.state.dataSingleOrder.id, {
                    method: 'PUT',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + this.props.user.token,
                    },
                    body: JSON.stringify({

                      type: this.state.dataSingleOrder.type,
                      status: 'Đang giao hàng',
                      vat: this.state.dataSingleOrder.vat,
                      time: this.state.dataSingleOrder.time

                    }),
                  })
                    .then(response => response.text())
                    .then(data => {
                      this.componentDidMount();
                      var getOrder = this.state.dataSingleOrder;
                      getOrder.status = 'Đang giao hàng';
                      this.setState({ dataSingleOrder: getOrder });
                      this.orderDetailItem(dataJson);
                      fetch(host + ':' + port + notificationAddUrl, {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + this.props.user.token,
                        },
                        body: JSON.stringify({
                          name: this.state.dataSingleOrder.id,
                          detail: "Phòng phục vụ đã nhận một đơn hàng mới",
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
                    })
                    .catch((error) => {

                      console.log(error);

                    });

                }
                else {

                  fetch(host + ':' + port + orderUpdateUrl + this.state.dataSingleOrder.id, {
                    method: 'PUT',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + this.props.user.token,
                    },
                    body: JSON.stringify({

                      type: this.state.dataSingleOrder.type,
                      status: 'Đang chế biến',
                      vat: this.state.dataSingleOrder.vat,
                      time: this.state.dataSingleOrder.time

                    }),
                  })
                    .then(response => response.text())
                    .then(data => {
                      this.componentDidMount();
                      var getOrder = this.state.dataSingleOrder;
                      getOrder.status = 'Đang chế biến';
                      this.setState({ dataSingleOrder: getOrder });
                      this.orderDetailItem(dataJson);

                    })
                    .catch((error) => {

                      console.log(error);

                    });
                }
              })
              .catch(error => {
                console.log(error);
              });



          })
          .catch((error) => {

            console.log(error);

          });
      }
      else {

        fetch(host + ':' + port + drinkUpdateorderDrinkUrl + this.state.dataSingleOrder.id + '/' + item.food.id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.user.token,
          },
          body: JSON.stringify({
            order_id: this.state.dataSingleOrder.id,
            drink_id: item.food.id,
            quantity: item.quantity,
            price: item.food.price,
            unit: item.food.unit,
            type: 'Đang chế biến'
          }),
        })
          .then(response => response.json())
          .then(data => {



            fetch(host + ':' + port + orderListUrl + this.state.dataSingleOrder.id, {
              headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
              }
            })
              .then(response => response.json())
              .then(dataJson => {
                var flagFood = true;
                for (const element of dataJson.dishs) {
                  if (element.type == 'Đang chế biến') {
                    flagFood = false;
                  }
                }
                for (const element of dataJson.drinks) {
                  if (element.type == 'Đang chế biến') {
                    flagFood = false;
                  }
                }

                if (flagFood == true) {

                  fetch(host + ':' + port + orderUpdateUrl + this.state.dataSingleOrder.id, {
                    method: 'PUT',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + this.props.user.token,
                    },
                    body: JSON.stringify({

                      type: this.state.dataSingleOrder.type,
                      status: 'Đang giao hàng',
                      vat: this.state.dataSingleOrder.vat,
                      time: this.state.dataSingleOrder.time

                    }),
                  })
                    .then(response => response.text())
                    .then(data => {
                      this.componentDidMount();
                      var getOrder = this.state.dataSingleOrder;
                      getOrder.status = 'Đang giao hàng';
                      this.setState({ dataSingleOrder: getOrder });
                      this.orderDetailItem(dataJson);
                      fetch(host + ':' + port + notificationAddUrl, {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + this.props.user.token,
                        },
                        body: JSON.stringify({
                          name: this.state.dataSingleOrder.id,
                          detail: "Phòng phục vụ đã nhận một đơn hàng mới",
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
                    })
                    .catch((error) => {

                      console.log(error);

                    });

                }
                else {

                  fetch(host + ':' + port + orderUpdateUrl + this.state.dataSingleOrder.id, {
                    method: 'PUT',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + this.props.user.token,
                    },
                    body: JSON.stringify({

                      type: this.state.dataSingleOrder.type,
                      status: 'Đang chế biến',
                      vat: this.state.dataSingleOrder.vat,
                      time: this.state.dataSingleOrder.time

                    }),
                  })
                    .then(response => response.text())
                    .then(data => {
                      this.componentDidMount();
                      var getOrder = this.state.dataSingleOrder;
                      getOrder.status = 'Đang chế biến';
                      this.setState({ dataSingleOrder: getOrder });
                      this.orderDetailItem(dataJson);

                    })
                    .catch((error) => {

                      console.log(error);

                    });
                }
              })
              .catch(error => {
                console.log(error);
              });



          })
          .catch((error) => {

            console.log(error);

          });

      }

    }

  }
  modalSearchView(isVisible) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isVisible}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 20, padding: '5%' }}>
            <View style={ReceptionistOrderStyle.setupItemCenterContainer}></View>
            <Text></Text>
            <Text style={{ fontWeight: 'bold' }}>Tìm kiếm</Text>
            <Text></Text>
            <RadioForm
              radio_props={
                [
                  { label: 'Mã', value: 0 }

                ]
              }
              initial={this.state.modalSearchInitial}
              onPress={(value) => { this.setState({ modalSearchInitial: value }); }}
            />


            <View style={{ height: this.state.windowHeight / 3.5 }}></View>
            <Button title="Xác nhận" onPress={() => { this.setState({ modalSearch: false }); }} />
          </View>




        </Modal>
      </View>
    );
  }

  orderDiningTablerenderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={ReceptionistOrderStyle.item}>

        <View style={{ flex: 1 }}>
          <Text><Text style={{ fontWeight: 'bold' }}>Tên: </Text>{item.name}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Hình thức: </Text>{item.type}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Khu vực: </Text>{item.area.name}</Text>


        </View>
        <View>
          <Image
            style={ReceptionistOrderStyle.logo}
            source={require('./../../assets/diningtable.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  orderFoodrenderItem = ({ item }) => (
    <TouchableOpacity onPress={() => { }}>
      <View style={ReceptionistOrderStyle.item}>

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
            style={ReceptionistOrderStyle.logo}
            source={{
              uri: item.food.urlImage + '/',
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );


  orderDrinkDetailView = () => {
    return (
      <SafeAreaProvider>
        <View style={ReceptionistOrderStyle.addExtraItemContainer}>

          <View style={ReceptionistOrderStyle.setupItemCenterContainer}>
            <Text style={ReceptionistOrderStyle.titleResourceDrink}>Thông tin đơn hàng: </Text>

          </View>

          <Text style={{ color: 'white' }}>Mã: {this.state.dataSingleOrder.id}</Text>
          <Text style={{ color: 'white' }}>Trạng thái: {this.state.dataSingleOrder.status}</Text>
          <Text style={{ color: 'white' }}>Thời gian: {this.formatLocalDateTimeDatabaseToView(this.state.dataSingleOrder.time)}</Text>

          <Text></Text>
          {this.state.flagOrderDrinkDetail ?
            <View style={{ height: '65%' }}>
              <Text></Text>
              <ActivityIndicator size="large" color="#DDDDDD" />
            </View>
            :
            <FlatList
              style={{ backgroundColor: 'white', borderRadius: 15 }}
              data={this.state.dataOrderDrinkDetail}
              renderItem={this.orderFoodrenderItem}
              keyExtractor={item => item.id}
            />
          }
          <Text></Text>
          {this.state.tabIndex == 1 || this.state.tabIndex == 2 ?
            <View style={ReceptionistOrderStyle.setupItemCenterContainer}>
 <TouchableOpacity onPress={() => { if (this.state.tabIndex == 1) { this.tranferOrder(); } else { this.setState({ modalPayment: true }); } }} >
                <Image
                  style={ReceptionistOrderStyle.cancelButton}
                  source={require('./../../assets/dollar.png')}
                />
              </TouchableOpacity>
              <Text>            </Text>
              <TouchableOpacity onPress={() => { this.setState({ statusChef: 'homeview' }); }} >
                <Image
                  style={ReceptionistOrderStyle.cancelButton}
                  source={require('./../../assets/cancel.png')}
                />
              </TouchableOpacity>
            </View>
            :
            <View style={ReceptionistOrderStyle.setupItemCenterContainer}>
              <TouchableOpacity onPress={() => { this.tranferOrder(); }} >
                <Image
                  style={ReceptionistOrderStyle.cancelButton}
                  source={require('./../../assets/complete.png')}
                />
              </TouchableOpacity>
              <Text>            </Text>
              <TouchableOpacity onPress={() => { this.setState({ statusChef: 'homeview' }); }} >
                <Image
                  style={ReceptionistOrderStyle.cancelButton}
                  source={require('./../../assets/cancel.png')}
                />
              </TouchableOpacity>
            </View>
          }
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </View>

      </SafeAreaProvider>

    );
  }
  orderDishDetailView = () => {
    return (
      <SafeAreaProvider>
        <View style={ReceptionistOrderStyle.addExtraItemContainer}>

          <View style={ReceptionistOrderStyle.setupItemCenterContainer}>
            <Text style={ReceptionistOrderStyle.titleResourceDrink}>Thông tin đơn hàng: </Text>

          </View>

          <Text style={{ color: 'white' }}>Mã: {this.state.dataSingleOrder.id}</Text>
          <Text style={{ color: 'white' }}>Trạng thái: {this.state.dataSingleOrder.status}</Text>
          <Text style={{ color: 'white' }}>Thời gian: {this.formatLocalDateTimeDatabaseToView(this.state.dataSingleOrder.time)}</Text>
          <Text></Text>
          {this.state.flagOrderDishDetail ?
            <View style={{ height: '65%' }}>
              <Text></Text>
              <ActivityIndicator size="large" color="#DDDDDD" />
            </View>
            :
            <FlatList
              style={{ backgroundColor: 'white', borderRadius: 15 }}
              data={this.state.dataOrderDishDetail}
              renderItem={this.orderFoodrenderItem}
              keyExtractor={item => item.id}
            />
          }
          <Text></Text>
          {this.state.tabIndex == 1 || this.state.tabIndex == 2 ?
            <View style={ReceptionistOrderStyle.setupItemCenterContainer}>
              <TouchableOpacity onPress={() => { if (this.state.tabIndex == 1) { this.tranferOrder(); } else { this.setState({ modalPayment: true }); } }} >
                <Image
                  style={ReceptionistOrderStyle.cancelButton}
                  source={require('./../../assets/dollar.png')}
                />
              </TouchableOpacity>
              <Text>            </Text>
              <TouchableOpacity onPress={() => { this.setState({ statusChef: 'homeview' }); }} >
                <Image
                  style={ReceptionistOrderStyle.cancelButton}
                  source={require('./../../assets/cancel.png')}
                />
              </TouchableOpacity>
            </View>
            :
            <View style={ReceptionistOrderStyle.setupItemCenterContainer}>
              <TouchableOpacity onPress={() => { this.tranferOrder(); }} >
                <Image
                  style={ReceptionistOrderStyle.cancelButton}
                  source={require('./../../assets/complete.png')}
                />
              </TouchableOpacity>
              <Text>            </Text>
              <TouchableOpacity onPress={() => { this.setState({ statusChef: 'homeview' }); }} >
                <Image
                  style={ReceptionistOrderStyle.cancelButton}
                  source={require('./../../assets/cancel.png')}
                />
              </TouchableOpacity>
            </View>
          }
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </View>

      </SafeAreaProvider>

    );
  }
  orderDiningTableDetailView = () => {
    return (
      <SafeAreaProvider>
        <View style={ReceptionistOrderStyle.addExtraItemContainer}>

          <View style={ReceptionistOrderStyle.setupItemCenterContainer}>
            <Text style={ReceptionistOrderStyle.titleResourceDrink}>Thông tin đơn hàng: </Text>

          </View>

          <Text style={{ color: 'white' }}>Mã: {this.state.dataSingleOrder.id}</Text>
          <Text style={{ color: 'white' }}>Trạng thái: {this.state.dataSingleOrder.status}</Text>
          <Text style={{ color: 'white' }}>Thời gian: {this.formatLocalDateTimeDatabaseToView(this.state.dataSingleOrder.time)}</Text>
          <Text></Text>
          {this.state.flagOrderDiningTableDetail ?
            <View style={{ height: '65%' }}>
              <Text></Text>
              <ActivityIndicator size="large" color="#DDDDDD" />
            </View>
            :
            <FlatList
              style={{ backgroundColor: 'white', borderRadius: 15 }}
              data={this.state.dataOrderDiningTableDetail}
              renderItem={this.orderDiningTablerenderItem}
              keyExtractor={item => item.id}
            />
          }
          <Text></Text>

          {this.state.tabIndex == 1 || this.state.tabIndex == 2 ?
            <View style={ReceptionistOrderStyle.setupItemCenterContainer}>
              <TouchableOpacity onPress={() => { if (this.state.tabIndex == 1) { this.tranferOrder(); } else { this.setState({ modalPayment: true }); } }} >
                <Image
                  style={ReceptionistOrderStyle.cancelButton}
                  source={require('./../../assets/dollar.png')}
                />
              </TouchableOpacity>
              <Text>            </Text>
              <TouchableOpacity onPress={() => { this.setState({ statusChef: 'homeview' }); }} >
                <Image
                  style={ReceptionistOrderStyle.cancelButton}
                  source={require('./../../assets/cancel.png')}
                />
              </TouchableOpacity>
            </View>
            :
            <View style={ReceptionistOrderStyle.setupItemCenterContainer}>
              <TouchableOpacity onPress={() => { this.tranferOrder(); }} >
                <Image
                  style={ReceptionistOrderStyle.cancelButton}
                  source={require('./../../assets/complete.png')}
                />
              </TouchableOpacity>
              <Text>            </Text>
              <TouchableOpacity onPress={() => { this.setState({ statusChef: 'homeview' }); }} >
                <Image
                  style={ReceptionistOrderStyle.cancelButton}
                  source={require('./../../assets/cancel.png')}
                />
              </TouchableOpacity>
            </View>
          }
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </View>



      </SafeAreaProvider >

    );
  }

  renderOrderDetail = SceneMap({
    orderDishDetail: this.orderDishDetailView,
    orderDrinkDetail: this.orderDrinkDetailView,
    orderDiningTableDetail: this.orderDiningTableDetailView

  });

  orderDetailItem = (item) => {
    var getOrderOfDiningTable = [];
    var getDishOrder = [];
    var getDrinkOrder = [];
    var getPriceToTal = 0;
    var i = 0;
    var getOrderDiningTable = [];
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

    this.setState({ flagOrderDiningTableDetail: false, flagOrderDishDetail: false, flagOrderDrinkDetail: false, outputPriceTotal: getPriceToTal, dataOrderDishDetail: getDishOrder, dataOrderDrinkDetail: getDrinkOrder, dataSingleDiningTable: getOrderDiningTable, dataDrinkById: item });
    Animated.timing(this.state.fadeAnimShipmentDrink, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
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


  tranferOrder() {

    if (this.state.tabIndex == 0) {
      if (this.state.dataSingleOrder.status != 'Đang chờ quầy thu ngân xử lý') {

        Alert.alert(
          "Thông báo",
          "Vui lòng chọn đơn hàng khác",
          [
            {
              text: "Đóng",
              onPress: () => {

              }
            }


          ]
        );


      }
      else {

        Alert.alert(
          "Thông báo",
          "Xác nhận đơn hàng?",
          [
            {
              text: "Đóng",
              onPress: () => { }
            },
            {
              text: "Đồng ý", onPress: () => {

                fetch(host + ':' + port + notificationAddUrl, {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.user.token,
                  },
                  body: JSON.stringify({
                    name: this.state.dataSingleOrder.id,
                    detail: "Quầy thu ngân đã xác nhận đơn hàng",
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
    }

    if (this.state.tabIndex == 1) {
      if (this.state.dataSingleOrder.status != 'Đang tạm tính') {

        Alert.alert(
          "Thông báo",
          "Vui lòng chọn đơn hàng khác",
          [
            {
              text: "Đóng",
              onPress: () => {

              }
            }


          ]
        );
        return;

      }
      else {

        Alert.alert(
          "Thông báo",
          "Xác nhận xuất tạm tính cho đơn hàng?",
          [
            {
              text: "Đóng",
              onPress: () => { }
            },
            {
              text: "Đồng ý", onPress: () => {

                /// fetch(host + ':' + port + notificationAddUrl, {
                // method: 'POST',
                // headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + this.props.user.token,
                //  },
                //  body: JSON.stringify({
                //    name: this.state.dataSingleOrder.id,
                ////    detail: "Phòng phục vụ đã nhận một đơn hàng mới",
                //  status: false,
                //   user: {
                //   id: 1
                //  }
                //  }),
                //   })
                //  .then(response => response.json())
                //  .then(data => {



                //    })
                //  .catch((error) => {

                //    console.log(error);
                //
                //  });

                fetch(host + ':' + port + orderUpdateUrl + this.state.dataSingleOrder.id, {
                  method: 'PUT',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.user.token,
                  },
                  body: JSON.stringify({

                    type: this.state.dataSingleOrder.type,
                    status: 'Đang thanh toán',
                    vat: this.state.dataSingleOrder.vat,
                    time: this.state.dataSingleOrder.time

                  }),
                })
                  .then(response => response.text())
                  .then(data => {

                    var getTable = [];
                    var getSingleDining = this.state.dataSingleOrder;
                    getSingleDining.status = 'Đang thanh toán';
                    for (const element_dish of this.state.dataOrderDishDetail) {
                      getTable.push([element_dish.food.id, element_dish.food.name, element_dish.food.unit, element_dish.quantity, this.formatMoneyDatabasetoView(element_dish.food.price), this.formatMoneyDatabasetoView(element_dish.food.price * element_dish.quantity)])
                    }
                    for (const element_drink of this.state.dataOrderDrinkDetail) {
                      getTable.push([element_drink.food.id, element_drink.food.name, element_drink.food.unit, element_drink.quantity, this.formatMoneyDatabasetoView(element_drink.food.price), this.formatMoneyDatabasetoView(element_drink.food.price * element_drink.quantity)])
                    }
                    this.setState({ dataSingleOrder: getSingleDining, modalPayment: false, tableData: getTable, statusChef: 'billview' });

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
    }
    if (this.state.tabIndex == 2) {
      if (this.state.dataSingleOrder.status == 'Đã thanh toán') { this.setState({ errorPaymentModal: 'Đơn hàng đã được thanh toán!' }); return; }
      if (this.state.errorPaymentModal != '' || this.state.inputPriceCustomer == '') { this.setState({ errorPaymentModal: 'Số tiền trả không hợp lệ!' }); return; }

      if (this.state.dataSingleOrder.status == 'Đang thanh toán') {
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
                      this.componentDidMount();

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
                    this.setState({ dataSingleOrder: getSingleDining, modalPayment: false, tableData: getTable, statusChef: 'billview' });
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
      else {
        this.setState({ errorPaymentModal: 'Chưa thể thanh toán đơn hàng này' });
      }


    }
  }
  renderOrderWaitHandleItem = ({ item }) => (
    <TouchableOpacity >
      <View style={ReceptionistOrderStyle.item}>
        <TouchableOpacity onPress={() => { this.setState({ dataSingleOrder: item, statusChef: 'orderview' }); this.orderDetailItem(item) }}>
          <Image
            style={ReceptionistOrderStyle.itemDetailListPlus}
            source={require('./../../assets/next.png')}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text><Text style={{ fontWeight: 'bold' }}>Mã: </Text>{item.id}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Thời gian: </Text>{this.formatLocalDateTimeDatabaseToView(item.time)}</Text>

          <Text><Text style={{ fontWeight: 'bold' }}>Trạng thái: </Text>{item.status}</Text>

        </View>
        <View>
          <Image
            style={ReceptionistOrderStyle.logo}
            source={require('./../../assets/order.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
  OrderWaitHandleView = () => {
    return (
      <View>
        <View style={ReceptionistOrderStyle.topcontainer}>



          <TouchableOpacity
            onPress={() => { this.setState({ modalSearch: true }); }}

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

        <View style={ReceptionistOrderStyle.bottomcontainer}>
          <View style={ReceptionistOrderStyle.itemMenuContainerTouchable}>
            <View style={ReceptionistOrderStyle.itemMenuContainerTouchableContentFoodType}>


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
              <Text style={ReceptionistOrderStyle.title}>Danh sách:</Text>

            </View>

          </View>
          {this.state.flag ?
            <ActivityIndicator size="large" color="#DDDDDD" />
            :
            <FlatList
              data={this.state.dataOrderWaitHandle}
              renderItem={this.renderOrderWaitHandleItem}
              keyExtractor={item => item.id}
            />
          }



        </View>
      </View>
    );
  }
  OrderDoingView = () => {
    return (
      <View>
        <View style={ReceptionistOrderStyle.topcontainer}>


          <TouchableOpacity
            onPress={() => { this.setState({ modalSearch: true }); }}

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

        <View style={ReceptionistOrderStyle.bottomcontainer}>
          <View style={ReceptionistOrderStyle.itemMenuContainerTouchable}>
            <View style={ReceptionistOrderStyle.itemMenuContainerTouchableContentFoodType}>


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
              <Text style={ReceptionistOrderStyle.title}>Danh sách:</Text>

            </View>

          </View>
          {this.state.flag ?
            <ActivityIndicator size="large" color="#DDDDDD" />
            :
            <FlatList
              data={this.state.dataOrderDoing}
              renderItem={this.renderOrderWaitHandleItem}
              keyExtractor={item => item.id}
            />
          }



        </View>
      </View>
    );
  }
  OrderWaitShipView = () => {
    return (
      <View>
        <View style={ReceptionistOrderStyle.topcontainer}>


          <TouchableOpacity
            onPress={() => { this.setState({ modalSearch: true }); }}

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

        <View style={ReceptionistOrderStyle.bottomcontainer}>
          <View style={ReceptionistOrderStyle.itemMenuContainerTouchable}>
            <View style={ReceptionistOrderStyle.itemMenuContainerTouchableContentFoodType}>


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
              <Text style={ReceptionistOrderStyle.title}>Danh sách:</Text>

            </View>

          </View>
          {this.state.flag ?
            <ActivityIndicator size="large" color="#DDDDDD" />
            :
            <FlatList
              data={this.state.dataOrderWaitShip}
              renderItem={this.renderOrderWaitHandleItem}
              keyExtractor={item => item.id}
            />
          }



        </View>
      </View>
    );
  }


  renderScene = SceneMap({
    orderWaitHandle: this.OrderWaitHandleView,
    orderDoing: this.OrderDoingView,
    orderWaitShip: this.OrderWaitShipView
  });
  renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#103667' }}
    />
  );
  BillView = () => {
    return (
      <View style={ReceptionistOrderStyle.container}>
        <SafeAreaProvider>
          <View style={{ width: '100%', height: '100%', padding: '2%', borderWidth: 0.3 }}>

            <View style={ReceptionistOrderStyle.itemDetailOrderListExtraContainer}>
              {this.state.tabIndex == 1 ?
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: this.state.windowWidth / 22 }}> Tạm tính đơn hàng </Text>
                :
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: this.state.windowWidth / 22 }}> Thanh toán đơn hàng </Text>
              }
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
            {this.state.tabIndex == 2 ?
              <View>
                <Text style={{ color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Tiền trả: </Text>{this.formatMoneyDatabasetoView(this.state.inputPriceCustomer)}</Text>
                <Text style={{ color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Tiền dư: </Text>{this.formatMoneyDatabasetoView(this.state.outputPriceResidual)}</Text>
              </View>
              : null
            }
            <Text></Text>
            <View style={ReceptionistOrderStyle.itemDetailOrderListExtraContainer}>
              <TouchableOpacity onPress={() => { this.componentDidMount(); this.setState({ inputPriceCustomer: '', outputPriceResidual: '', statusChef: 'orderview' }) }}>
                <Image
                  style={ReceptionistOrderStyle.itemDetailOrderListnextButton}
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




  render() {
    return (
      <View style={ReceptionistOrderStyle.container}>
        <SafeAreaProvider>
          {this.state.statusChef == 'homeview' ?
            <TabView
              renderTabBar={this.renderTabBar}
              navigationState={{
                index: this.state.tabIndex,
                routes: [
                  { key: 'orderWaitHandle', title: 'Chờ xử lý' },
                  { key: 'orderDoing', title: 'Đang tạm tính' },
                  { key: 'orderWaitShip', title: 'Đang thanh toán' }
                ]
              }}
              renderScene={this.renderScene}
              onIndexChange={(index) => { this.setState({ flag: true, tabIndex: index }); this.componentDidMount(); }}
            />
            : null}
          {this.state.statusChef == 'orderview' ?
            <View style={ReceptionistOrderStyle.container}>
              <TabView
                renderTabBar={this.renderTabBar}
                navigationState={{
                  index: this.state.tabIndexDetail,
                  routes: [
                    { key: 'orderDishDetail', title: 'Món ăn' },
                    { key: 'orderDrinkDetail', title: 'Đồ uống' },
                    { key: 'orderDiningTableDetail', title: 'Bàn ăn' }
                  ]
                }}
                renderScene={this.renderOrderDetail}
                onIndexChange={(index) => { this.setState({ tabIndexDetail: index }); }}
              />
              <View style={{ height: '1%' }}>
                {this.modalPaymentView(this.state.modalPayment)}
              </View>
            </View>
            : null}
          {this.state.statusChef == 'billview' ?
            <this.BillView />
            : null}
        </SafeAreaProvider>
        <View style={{ height: '1%' }}>{this.modalSearchView(this.state.modalSearch)}</View>

      </View>
    );
  }
}


const mapStateToProps = state => {
  return { user: state.users }
};

export default connect(mapStateToProps)(ReceptionistOrderScreen);
