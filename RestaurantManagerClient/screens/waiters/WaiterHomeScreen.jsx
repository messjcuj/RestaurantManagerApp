import React from 'react';
import { Alert, Animated, ActivityIndicator, Dimensions, Button, ScrollView, Text, View, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Badge } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { WaiterHomeStyle } from '../../styles/LayoutStyle';
import { Input } from 'react-native-elements';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';
import { store } from '../../configs/ReduxStore';
import { host, port, notificationAddUrl, userListUrl, orderListUrl, orderUpdateUrl, userAddorderUserUrl } from '../../apis/ManagerApi';
import Modal from "react-native-modal";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DropDownPicker from 'react-native-dropdown-picker';






let userName;
let password;
let phone;
let name;
let role;
let birthDay;
let token;
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

class WaiterHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      tabIndex: 0,
      tabIndexDetail: 0,
      statusWaiter: 'homeview',
      modalSearch: false,
      modalSearchInitial: 0,
      dataOrderWaitHandle: [],
      dataSingleOrder: {},
      dataOrderDoing: [],
      dataOrderWaitShip: [],
      dataOrderDishDetail: [],
      dataOrderDrinkDetail: [],
      dataOrderDiningTableDetail: [],
      outputPriceTotal: '',
      flag: true,
      windowWidth: Dimensions.get('window').width,
      windowHeight: Dimensions.get('window').height,
      fadeAnimUpdate: new Animated.Value(0),
      fadeAnimAdd: new Animated.Value(0),
      fadeAnimHome: new Animated.Value(0),
      fadeAnimShipmentDrink: new Animated.Value(0),
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
              var flagFood = false;
              if(element.type!='???? nh???n'){
              if (element.status == '??ang ch??? bi???n' || element.status == '??ang giao h??ng') {
                for (const element_dish of element.dishs) {
                  if (element_dish.type != '??ang ch??? bi???n') {
                    flagFood = true;
                  }
                }
                for (const element_drink of element.drinks) {
                  if (element_drink.type != '??ang ch??? bi???n') {
                    flagFood = true;
                  }
                }
                if (flagFood) {
                  getWaitHandleOrder.push(element);
                }
              }
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
              if (element.order.status == '??ang giao h??ng' || element.order.status == '??ang ch??? bi???n')
                getDoingOrder.push(element.order);
            }
            this.setState({ flag: false, dataOrderDoing: getDoingOrder });
          },
          100
        )

      })
      .catch(error => {
        console.log(error);
      });


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
              if (dataJson.status == '??ang ch??? bi???n' || dataJson.status == '??ang giao h??ng')
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


  }
  modalSearchView(isVisible) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isVisible}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 20, padding: '5%' }}>
            <View style={WaiterHomeStyle.setupItemCenterContainer}></View>
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
    <View>
      <View style={WaiterHomeStyle.item}>

        <View style={{ flex: 1 }}>
          <Text><Text style={{ fontWeight: 'bold' }}>T??n: </Text>{item.name}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>H??nh th???c: </Text>{item.type}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Khu v???c: </Text>{item.area.name}</Text>


        </View>
        <View>
          <Image
            style={WaiterHomeStyle.logo}
            source={require('./../../assets/diningtable.png')}
          />
        </View>
      </View>
    </View>
  );

  orderFoodrenderItem = ({ item }) => (
    <View>
      <View style={WaiterHomeStyle.item}>

        <View style={{ flex: 1 }}>
          <Text><Text style={{ fontWeight: 'bold' }}>M??: </Text>{item.food.id}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>T??n: </Text>{item.food.name}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Lo???i: </Text>{item.foodType}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>????n v???: </Text>{item.food.unit}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Gi??: </Text>{this.formatMoneyDatabasetoView(item.food.price)}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>S??? l?????ng: </Text>{item.quantity}</Text>
          <Text style={{ fontWeight: 'bold' }}>{item.type}</Text>

        </View>
        <View>
          <Image
            style={WaiterHomeStyle.logo}
            source={{
              uri: item.food.urlImage + '/',
            }}
          />
        </View>
      </View>
    </View>
  );


  orderDrinkDetailView = () => {
    return (
      <SafeAreaProvider>
        <View style={WaiterHomeStyle.addExtraItemContainer}>

          <View style={WaiterHomeStyle.setupItemCenterContainer}>
            <Text style={WaiterHomeStyle.titleResourceDrink}>Th??ng tin ????n h??ng: </Text>

          </View>

          <Text style={{ color: 'white' }}>M??: {this.state.dataSingleOrder.id}</Text>
          <Text style={{ color: 'white' }}>Tr???ng th??i: {this.state.dataSingleOrder.status}</Text>
          <Text style={{ color: 'white' }}>Th???i gian: {this.formatLocalDateTimeDatabaseToView(this.state.dataSingleOrder.time)}</Text>

          <Text></Text>
          <FlatList
            style={{ backgroundColor: 'white', borderRadius: 15 }}
            data={this.state.dataOrderDrinkDetail}
            renderItem={this.orderFoodrenderItem}
            keyExtractor={item => item.id}
          />
          <Text></Text>
          <View style={WaiterHomeStyle.setupItemCenterContainer}>
            {this.state.tabIndex != 2 ?
              <View>
                <TouchableOpacity onPress={() => { this.tranferOrder(); }} >
                  <Image
                    style={WaiterHomeStyle.cancelButton}
                    source={require('./../../assets/complete.png')}
                  />
                </TouchableOpacity>
              </View>
              : null}
            {this.state.tabIndex != 2 ?

              <Text>              </Text>

              : null}
            <TouchableOpacity onPress={() => { this.setState({ statusWaiter: 'homeview' }); }} >
              <Image
                style={WaiterHomeStyle.cancelButton}
                source={require('./../../assets/cancel.png')}
              />
            </TouchableOpacity>

          </View>
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
        <View style={WaiterHomeStyle.addExtraItemContainer}>

          <View style={WaiterHomeStyle.setupItemCenterContainer}>
            <Text style={WaiterHomeStyle.titleResourceDrink}>Th??ng tin ????n h??ng: </Text>

          </View>

          <Text style={{ color: 'white' }}>M??: {this.state.dataSingleOrder.id}</Text>
          <Text style={{ color: 'white' }}>Tr???ng th??i: {this.state.dataSingleOrder.status}</Text>
          <Text style={{ color: 'white' }}>Th???i gian: {this.formatLocalDateTimeDatabaseToView(this.state.dataSingleOrder.time)}</Text>
          <Text></Text>
          <FlatList
            style={{ backgroundColor: 'white', borderRadius: 15 }}
            data={this.state.dataOrderDishDetail}
            renderItem={this.orderFoodrenderItem}
            keyExtractor={item => item.id}
          />
          <Text></Text>
          <View style={WaiterHomeStyle.setupItemCenterContainer}>
            {this.state.tabIndex != 2 ?
              <View>
                <TouchableOpacity onPress={() => { this.tranferOrder(); }} >
                  <Image
                    style={WaiterHomeStyle.cancelButton}
                    source={require('./../../assets/complete.png')}
                  />
                </TouchableOpacity>
              </View>
              : null}
            {this.state.tabIndex != 2 ?

              <Text>              </Text>

              : null}
            <TouchableOpacity onPress={() => { this.setState({ statusWaiter: 'homeview' }); }} >
              <Image
                style={WaiterHomeStyle.cancelButton}
                source={require('./../../assets/cancel.png')}
              />
            </TouchableOpacity>

          </View>
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
        <View style={WaiterHomeStyle.addExtraItemContainer}>

          <View style={WaiterHomeStyle.setupItemCenterContainer}>
            <Text style={WaiterHomeStyle.titleResourceDrink}>Th??ng tin ????n h??ng: </Text>

          </View>

          <Text style={{ color: 'white' }}>M??: {this.state.dataSingleOrder.id}</Text>
          <Text style={{ color: 'white' }}>Tr???ng th??i: {this.state.dataSingleOrder.status}</Text>
          <Text style={{ color: 'white' }}>Th???i gian: {this.formatLocalDateTimeDatabaseToView(this.state.dataSingleOrder.time)}</Text>
          <Text></Text>
          <FlatList
            style={{ backgroundColor: 'white', borderRadius: 15 }}
            data={this.state.dataOrderDiningTableDetail}
            renderItem={this.orderDiningTablerenderItem}
            keyExtractor={item => item.id}
          />
          <Text></Text>
          <View style={WaiterHomeStyle.setupItemCenterContainer}>
            {this.state.tabIndex != 2 ?
              <View>
                <TouchableOpacity onPress={() => { this.tranferOrder(); }} >
                  <Image
                    style={WaiterHomeStyle.cancelButton}
                    source={require('./../../assets/complete.png')}
                  />
                </TouchableOpacity>
              </View>
              : null}
            {this.state.tabIndex != 2 ?

              <Text>              </Text>

              : null}

            <TouchableOpacity onPress={() => { this.setState({ statusWaiter: 'homeview' }); }} >
              <Image
                style={WaiterHomeStyle.cancelButton}
                source={require('./../../assets/cancel.png')}
              />
            </TouchableOpacity>

          </View>
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </View>



      </SafeAreaProvider>

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

    this.setState({ outputPriceTotal: getPriceToTal, dataOrderDishDetail: getDishOrder, dataOrderDrinkDetail: getDrinkOrder, dataSingleDiningTable: getOrderDiningTable, dataDrinkById: item });
    Animated.timing(this.state.fadeAnimShipmentDrink, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  }
  tranferOrder() {
    if (this.state.tabIndex == 0) {

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
                  detail: "Ph??ng ph???c v??? ???? x??c nh???n ????n h??ng",
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


                  Alert.alert(
                    "Th??ng b??o",
                    "Nh???n ????n h??ng th??nh c??ng",
                    [
                      {
                        text: "????ng",
                        onPress: () => { },
                      }
                    ]
                  );



                })
                .catch((error) => {
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

                  type: '???? nh???n',
                  status: this.state.dataSingleOrder.status,
                  vat: this.state.dataSingleOrder.vat,
                  time: this.state.dataSingleOrder.time

                }),
              })
                .then(response => response.text())
                .then(data => {
                  this.componentDidMount();

                 // var getOrder = this.state.dataSingleOrder;
                 // getOrder.status = '??ang v???n chuy???n';
                  //this.setState({ dataSingleOrder: getOrder });
                  Alert.alert(
                    "Th??ng b??o",
                    "???? nh???n ????n h??ng th??nh c??ng",
                    [
                      {
                        text: "????ng",
                        onPress: () => {},
                      }
                    ]
                  );


                })
                .catch((error) => {

                  console.log(error);

                });


            }
          }
        ]
      );
    }
    //}

    if (this.state.tabIndex == 1) {
      if (this.state.dataSingleOrder.status != '??ang giao h??ng') {
        Alert.alert(
          "Th??ng b??o",
          "Vui l??ng ch???n ????n h??ng kh??c v?? v???n ??ang ch??? bi???n",
          [
            {
              text: "????ng",
              onPress: () => { },
            }
          ]
        );
        return;
      }


      Alert.alert(
        "Th??ng b??o",
        "X??c nh???n ho??n t???t giao h??ng?",
        [
          {
            text: "????ng",
            onPress: () => { }
          },
          {
            text: "?????ng ??", onPress: () => {
              //fetch(host + ':' + port + notificationAddUrl, {
              // method: 'POST',
              // headers: {
              // 'Accept': 'application/json',
              // 'Content-Type': 'application/json',
              // 'Authorization': 'Bearer ' + this.props.user.token,
              //},
              // body: JSON.stringify({
              // name: this.state.dataSingleOrder.id,
              // detail: "Ph??ng ph???c v??? ???? nh???n m???t ????n h??ng m???i",
              //status: false,
              //user: {
              //id: 1
              //  }
              //  }),
              //  })
              //  .then(response => response.json())
              //  .then(data => {



              // })
              //  .catch((error) => {

              //   console.log(error);

              // });

              fetch(host + ':' + port + orderUpdateUrl + this.state.dataSingleOrder.id, {
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + this.props.user.token,
                },
                body: JSON.stringify({

                  type: this.state.dataSingleOrder.type,
                  status: '???? giao h??ng',
                  vat: this.state.dataSingleOrder.vat,
                  time: this.state.dataSingleOrder.time

                }),
              })
                .then(response => response.text())
                .then(data => {
                  console.log(data);
                  this.componentDidMount();

                  var getOrder = this.state.dataSingleOrder;
                  getOrder.status = '???? giao h??ng';
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
  renderOrderWaitHandleItem = ({ item }) => (
    <TouchableOpacity>
      <View style={WaiterHomeStyle.item}>
        <TouchableOpacity onPress={() => { this.setState({ dataSingleOrder: item, statusWaiter: 'orderview' }); this.orderDetailItem(item) }}>
          <Image
            style={WaiterHomeStyle.itemDetailListPlus}
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
            style={WaiterHomeStyle.logo}
            source={require('./../../assets/order.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
  OrderWaitHandleView = () => {
    return (
      <View>
        <View style={WaiterHomeStyle.topcontainer}>



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

        <View style={WaiterHomeStyle.bottomcontainer}>
          <View style={WaiterHomeStyle.itemMenuContainerTouchable}>
            <View style={WaiterHomeStyle.itemMenuContainerTouchableContentFoodType}>


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
              <Text style={WaiterHomeStyle.title}>Danh s??ch:</Text>

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
        <View style={WaiterHomeStyle.topcontainer}>


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

        <View style={WaiterHomeStyle.bottomcontainer}>
          <View style={WaiterHomeStyle.itemMenuContainerTouchable}>
            <View style={WaiterHomeStyle.itemMenuContainerTouchableContentFoodType}>


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
              <Text style={WaiterHomeStyle.title}>Danh s??ch:</Text>

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
        <View style={WaiterHomeStyle.topcontainer}>


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

        <View style={WaiterHomeStyle.bottomcontainer}>
          <View style={WaiterHomeStyle.itemMenuContainerTouchable}>
            <View style={WaiterHomeStyle.itemMenuContainerTouchableContentFoodType}>


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
              <Text style={WaiterHomeStyle.title}>Danh s??ch:</Text>

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
    orderDoing: this.OrderDoingView
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
      <View style={WaiterHomeStyle.container}>
        <SafeAreaProvider>
          {this.state.statusWaiter == 'homeview' ?
            <TabView
              renderTabBar={this.renderTabBar}
              navigationState={{
                index: this.state.tabIndex,
                routes: [
                  { key: 'orderWaitHandle', title: 'Ch??? x??? l??' },
                  { key: 'orderDoing', title: '??ang giao h??ng' }
                ]
              }}
              renderScene={this.renderScene}
              onIndexChange={(index) => { this.setState({ flag: true, tabIndex: index }); this.componentDidMount(); }}
            />
            : null}
          {this.state.statusWaiter == 'orderview' ?
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

export default connect(mapStateToProps)(WaiterHomeScreen);
