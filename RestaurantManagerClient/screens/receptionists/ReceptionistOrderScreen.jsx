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
      tableHead: ['M??', 'T??n', '????n v???', 'S??? l?????ng', '????n gi??', 'Th??nh ti???n'],
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
              if (element.status == '??ang ch??? qu???y thu ng??n x??? l??') {
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
              if (element.order.status == '??ang t???m t??nh')
                getDoingOrder.push(element.order);
              if (element.order.status == '??ang thanh to??n')
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
            <Text><Text style={{ fontWeight: 'bold' }}>T???ng ti???n s???n ph???m: </Text>{this.formatMoneyDatabasetoView(this.state.outputPriceTotal)}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Thu??? GTGT: </Text>8%</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>T???ng ti???n c???n thanh to??n: </Text>{this.formatMoneyDatabasetoView(this.state.outputPriceTotal + (this.state.outputPriceTotal * 0.08))}</Text>
            <Text></Text>
            <Input
              inputStyle={{ fontSize: this.state.windowWidth / 28 }}
              inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
              leftIconContainerStyle={{ paddingLeft: '5%' }}
              name='price'
              placeholder='Ti???n tr???'
              placeholderTextColor="#999999"
              onChangeText={(price) => { this.calculatePriceResidual(price); }}
              value={this.state.inputPriceCustomer}
              leftIcon={{ color: 'grey', type: 'material', name: 'euro' }}
              keyboardType='default' />
            <Text><Text style={{ fontWeight: 'bold' }}>Ti???n d??: </Text>{this.formatMoneyDatabasetoView(this.state.outputPriceResidual)}</Text>
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
              if (dataJson.status == '??ang ch??? qu???y thu ng??n x??? l??')
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
      if (item.type == '??ang ch??? bi???n') {
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
            type: '???? ch??? bi???n: ' + item.quantity
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
                  if (element.type == '??ang ch??? bi???n') {
                    flagFood = false;
                  }
                }
                for (const element of dataJson.drinks) {
                  if (element.type == '??ang ch??? bi???n') {
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
                      status: '??ang giao h??ng',
                      vat: this.state.dataSingleOrder.vat,
                      time: this.state.dataSingleOrder.time

                    }),
                  })
                    .then(response => response.text())
                    .then(data => {
                      this.componentDidMount();
                      var getOrder = this.state.dataSingleOrder;
                      getOrder.status = '??ang giao h??ng';
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
                          detail: "Ph??ng ph???c v??? ???? nh???n m???t ????n h??ng m???i",
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
                      status: '??ang ch??? bi???n',
                      vat: this.state.dataSingleOrder.vat,
                      time: this.state.dataSingleOrder.time

                    }),
                  })
                    .then(response => response.text())
                    .then(data => {
                      this.componentDidMount();
                      var getOrder = this.state.dataSingleOrder;
                      getOrder.status = '??ang ch??? bi???n';
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
            type: '??ang ch??? bi???n'
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
                  if (element.type == '??ang ch??? bi???n') {
                    flagFood = false;
                  }
                }
                for (const element of dataJson.drinks) {
                  if (element.type == '??ang ch??? bi???n') {
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
                      status: '??ang giao h??ng',
                      vat: this.state.dataSingleOrder.vat,
                      time: this.state.dataSingleOrder.time

                    }),
                  })
                    .then(response => response.text())
                    .then(data => {
                      this.componentDidMount();
                      var getOrder = this.state.dataSingleOrder;
                      getOrder.status = '??ang giao h??ng';
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
                          detail: "Ph??ng ph???c v??? ???? nh???n m???t ????n h??ng m???i",
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
                      status: '??ang ch??? bi???n',
                      vat: this.state.dataSingleOrder.vat,
                      time: this.state.dataSingleOrder.time

                    }),
                  })
                    .then(response => response.text())
                    .then(data => {
                      this.componentDidMount();
                      var getOrder = this.state.dataSingleOrder;
                      getOrder.status = '??ang ch??? bi???n';
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
      if (item.type == '??ang ch??? bi???n') {
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
            type: '???? ch??? bi???n: ' + item.quantity
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
                  if (element.type == '??ang ch??? bi???n') {
                    flagFood = false;
                  }
                }
                for (const element of dataJson.drinks) {
                  if (element.type == '??ang ch??? bi???n') {
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
                      status: '??ang giao h??ng',
                      vat: this.state.dataSingleOrder.vat,
                      time: this.state.dataSingleOrder.time

                    }),
                  })
                    .then(response => response.text())
                    .then(data => {
                      this.componentDidMount();
                      var getOrder = this.state.dataSingleOrder;
                      getOrder.status = '??ang giao h??ng';
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
                          detail: "Ph??ng ph???c v??? ???? nh???n m???t ????n h??ng m???i",
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
                      status: '??ang ch??? bi???n',
                      vat: this.state.dataSingleOrder.vat,
                      time: this.state.dataSingleOrder.time

                    }),
                  })
                    .then(response => response.text())
                    .then(data => {
                      this.componentDidMount();
                      var getOrder = this.state.dataSingleOrder;
                      getOrder.status = '??ang ch??? bi???n';
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
            type: '??ang ch??? bi???n'
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
                  if (element.type == '??ang ch??? bi???n') {
                    flagFood = false;
                  }
                }
                for (const element of dataJson.drinks) {
                  if (element.type == '??ang ch??? bi???n') {
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
                      status: '??ang giao h??ng',
                      vat: this.state.dataSingleOrder.vat,
                      time: this.state.dataSingleOrder.time

                    }),
                  })
                    .then(response => response.text())
                    .then(data => {
                      this.componentDidMount();
                      var getOrder = this.state.dataSingleOrder;
                      getOrder.status = '??ang giao h??ng';
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
                          detail: "Ph??ng ph???c v??? ???? nh???n m???t ????n h??ng m???i",
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
                      status: '??ang ch??? bi???n',
                      vat: this.state.dataSingleOrder.vat,
                      time: this.state.dataSingleOrder.time

                    }),
                  })
                    .then(response => response.text())
                    .then(data => {
                      this.componentDidMount();
                      var getOrder = this.state.dataSingleOrder;
                      getOrder.status = '??ang ch??? bi???n';
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
            <Text style={{ fontWeight: 'bold' }}>T??m ki???m</Text>
            <Text></Text>
            <RadioForm
              radio_props={
                [
                  { label: 'M??', value: 0 }

                ]
              }
              initial={this.state.modalSearchInitial}
              onPress={(value) => { this.setState({ modalSearchInitial: value }); }}
            />


            <View style={{ height: this.state.windowHeight / 3.5 }}></View>
            <Button title="X??c nh???n" onPress={() => { this.setState({ modalSearch: false }); }} />
          </View>




        </Modal>
      </View>
    );
  }

  orderDiningTablerenderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={ReceptionistOrderStyle.item}>

        <View style={{ flex: 1 }}>
          <Text><Text style={{ fontWeight: 'bold' }}>T??n: </Text>{item.name}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>H??nh th???c: </Text>{item.type}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Khu v???c: </Text>{item.area.name}</Text>


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
          <Text><Text style={{ fontWeight: 'bold' }}>M??: </Text>{item.food.id}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>T??n: </Text>{item.food.name}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Lo???i: </Text>{item.foodType}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>????n v???: </Text>{item.food.unit}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Gi??: </Text>{this.formatMoneyDatabasetoView(item.food.price)}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>S??? l?????ng: </Text>{item.quantity}</Text>
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
            <Text style={ReceptionistOrderStyle.titleResourceDrink}>Th??ng tin ????n h??ng: </Text>

          </View>

          <Text style={{ color: 'white' }}>M??: {this.state.dataSingleOrder.id}</Text>
          <Text style={{ color: 'white' }}>Tr???ng th??i: {this.state.dataSingleOrder.status}</Text>
          <Text style={{ color: 'white' }}>Th???i gian: {this.formatLocalDateTimeDatabaseToView(this.state.dataSingleOrder.time)}</Text>

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
            <Text style={ReceptionistOrderStyle.titleResourceDrink}>Th??ng tin ????n h??ng: </Text>

          </View>

          <Text style={{ color: 'white' }}>M??: {this.state.dataSingleOrder.id}</Text>
          <Text style={{ color: 'white' }}>Tr???ng th??i: {this.state.dataSingleOrder.status}</Text>
          <Text style={{ color: 'white' }}>Th???i gian: {this.formatLocalDateTimeDatabaseToView(this.state.dataSingleOrder.time)}</Text>
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
            <Text style={ReceptionistOrderStyle.titleResourceDrink}>Th??ng tin ????n h??ng: </Text>

          </View>

          <Text style={{ color: 'white' }}>M??: {this.state.dataSingleOrder.id}</Text>
          <Text style={{ color: 'white' }}>Tr???ng th??i: {this.state.dataSingleOrder.status}</Text>
          <Text style={{ color: 'white' }}>Th???i gian: {this.formatLocalDateTimeDatabaseToView(this.state.dataSingleOrder.time)}</Text>
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
      getDishOrder.push({ id: i, foodType: 'M??n ??n', food: element_f.dish, quantity: element_f.quantity, price: element_f.price, unit: element_f.unit, type: element_f.type });
      getPriceToTal = getPriceToTal + (element_f.dish.price * element_f.quantity);
      i = i + 1;
    }
    for (const element_s of item.drinks) {
      getDrinkOrder.push({ id: i, foodType: '????? u???ng', food: element_s.drink, quantity: element_s.quantity, price: element_s.price, unit: element_s.unit, type: element_s.type });
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
      this.setState({ errorPaymentModal: 'S??? ti???n tr??? kh??ng ????? ????? thanh to??n!', outputPriceResidual: 0 });
      return;
    }
    else {
      this.setState({ errorPaymentModal: '' });
      this.setState({ outputPriceResidual: getPriceResidual });
    }


  }


  tranferOrder() {

    if (this.state.tabIndex == 0) {
      if (this.state.dataSingleOrder.status != '??ang ch??? qu???y thu ng??n x??? l??') {

        Alert.alert(
          "Th??ng b??o",
          "Vui l??ng ch???n ????n h??ng kh??c",
          [
            {
              text: "????ng",
              onPress: () => {

              }
            }


          ]
        );


      }
      else {

        Alert.alert(
          "Th??ng b??o",
          "X??c nh???n ????n h??ng?",
          [
            {
              text: "????ng",
              onPress: () => { }
            },
            {
              text: "?????ng ??", onPress: () => {

                fetch(host + ':' + port + notificationAddUrl, {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.user.token,
                  },
                  body: JSON.stringify({
                    name: this.state.dataSingleOrder.id,
                    detail: "Qu???y thu ng??n ???? x??c nh???n ????n h??ng",
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
                    status: '??ang t???m t??nh',
                    vat: this.state.dataSingleOrder.vat,
                    time: this.state.dataSingleOrder.time

                  }),
                })
                  .then(response => response.text())
                  .then(data => {
                    this.componentDidMount();

                    var getOrder = this.state.dataSingleOrder;
                    getOrder.status = '??ang t???m t??nh';
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
      if (this.state.dataSingleOrder.status != '??ang t???m t??nh') {

        Alert.alert(
          "Th??ng b??o",
          "Vui l??ng ch???n ????n h??ng kh??c",
          [
            {
              text: "????ng",
              onPress: () => {

              }
            }


          ]
        );
        return;

      }
      else {

        Alert.alert(
          "Th??ng b??o",
          "X??c nh???n xu???t t???m t??nh cho ????n h??ng?",
          [
            {
              text: "????ng",
              onPress: () => { }
            },
            {
              text: "?????ng ??", onPress: () => {

                /// fetch(host + ':' + port + notificationAddUrl, {
                // method: 'POST',
                // headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + this.props.user.token,
                //  },
                //  body: JSON.stringify({
                //    name: this.state.dataSingleOrder.id,
                ////    detail: "Ph??ng ph???c v??? ???? nh???n m???t ????n h??ng m???i",
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
                    status: '??ang thanh to??n',
                    vat: this.state.dataSingleOrder.vat,
                    time: this.state.dataSingleOrder.time

                  }),
                })
                  .then(response => response.text())
                  .then(data => {

                    var getTable = [];
                    var getSingleDining = this.state.dataSingleOrder;
                    getSingleDining.status = '??ang thanh to??n';
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
      if (this.state.dataSingleOrder.status == '???? thanh to??n') { this.setState({ errorPaymentModal: '????n h??ng ???? ???????c thanh to??n!' }); return; }
      if (this.state.errorPaymentModal != '' || this.state.inputPriceCustomer == '') { this.setState({ errorPaymentModal: 'S??? ti???n tr??? kh??ng h???p l???!' }); return; }

      if (this.state.dataSingleOrder.status == '??ang thanh to??n') {
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
                      status: "Tr???ng",
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
                    status: '???? thanh to??n',
                    vat: this.state.dataSingleOrder.vat,
                    time: this.state.dataSingleOrder.time

                  }),
                })
                  .then(response => response.text())
                  .then(data => {
                    var getTable = [];
                    var getSingleDining = this.state.dataSingleOrder;
                    getSingleDining.status = '???? thanh to??n';
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
        this.setState({ errorPaymentModal: 'Ch??a th??? thanh to??n ????n h??ng n??y' });
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
          <Text><Text style={{ fontWeight: 'bold' }}>M??: </Text>{item.id}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Th???i gian: </Text>{this.formatLocalDateTimeDatabaseToView(item.time)}</Text>

          <Text><Text style={{ fontWeight: 'bold' }}>Tr???ng th??i: </Text>{item.status}</Text>

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
            placeholder='Nh???p n???i dung t??m ki???m...'
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
              <Text style={ReceptionistOrderStyle.title}>Danh s??ch:</Text>

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
            placeholder='Nh???p n???i dung t??m ki???m...'
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
              <Text style={ReceptionistOrderStyle.title}>Danh s??ch:</Text>

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
            placeholder='Nh???p n???i dung t??m ki???m...'
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
              <Text style={ReceptionistOrderStyle.title}>Danh s??ch:</Text>

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
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: this.state.windowWidth / 22 }}> T???m t??nh ????n h??ng </Text>
                :
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: this.state.windowWidth / 22 }}> Thanh to??n ????n h??ng </Text>
              }
            </View>
            <Text></Text>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: this.state.windowWidth / 25 }}> Chi ti???t h??a ????n: </Text>
            <Text></Text>
            <Text style={{ color: 'white' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>M??: </Text>{this.state.dataSingleOrder.id}</Text>
            <Text style={{ color: 'white' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>Th???i gian: </Text>{this.formatLocalDateTimeDatabaseToView(this.state.dataSingleOrder.time)}</Text>
            <Text></Text>
            <ScrollView style={{ backgroundColor: 'white' }}>
              <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Row data={this.state.tableHead} style={{ color: 'black' }} textStyle={{ fontWeight: 'bold', textAlign: 'center' }} />
                <Rows data={this.state.tableData} />
              </Table>
            </ScrollView>
            <Text></Text>
            <Text style={{ color: 'white' }}><Text style={{ fontWeight: 'bold' }}>T???ng ti???n s???n ph???m: </Text>{this.formatMoneyDatabasetoView(this.state.outputPriceTotal)}</Text>
            <Text style={{ color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Thu??? GTGT: </Text>8%</Text>
            <Text style={{ color: 'white' }}><Text style={{ fontWeight: 'bold' }}>T???ng ti???n c???n thanh to??n: </Text>{this.formatMoneyDatabasetoView(this.state.outputPriceTotal + (this.state.outputPriceTotal * 0.08))}</Text>
            {this.state.tabIndex == 2 ?
              <View>
                <Text style={{ color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Ti???n tr???: </Text>{this.formatMoneyDatabasetoView(this.state.inputPriceCustomer)}</Text>
                <Text style={{ color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Ti???n d??: </Text>{this.formatMoneyDatabasetoView(this.state.outputPriceResidual)}</Text>
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
                  { key: 'orderWaitHandle', title: 'Ch??? x??? l??' },
                  { key: 'orderDoing', title: '??ang t???m t??nh' },
                  { key: 'orderWaitShip', title: '??ang thanh to??n' }
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
                    { key: 'orderDishDetail', title: 'M??n ??n' },
                    { key: 'orderDrinkDetail', title: '????? u???ng' },
                    { key: 'orderDiningTableDetail', title: 'B??n ??n' }
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
