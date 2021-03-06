import React from 'react';
import AnimatedLoader from "react-native-animated-loader";
import { ImageBackground, LogBox, ScrollView, ActivityIndicator, Button, Dimensions, Animated, Text, View, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import Modal from "react-native-modal";
import { Icon, Badge } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { WaiterOrderStyle } from '../../styles/LayoutStyle';
import { AppStyle } from '../../styles/LayoutStyle';
import { LinearGradient } from 'expo-linear-gradient';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { store } from '../../configs/ReduxStore';
import ThemedListItem from 'react-native-elements/dist/list/ListItem';
import { ManagerWarehouseStyle } from '../../styles/LayoutStyle';
import { host, port, orderUpdateUrl, orderListUrl, drinkDeleteByOrderDrinkIdUrl, dishDeleteByOrderDishIdUrl, diningTableDeleteByOrderDiningTableIdUrl, diningTableSearchUrl, notificationAddUrl, shipmentUpdateShipmentResourceUrl, shipmentUpdateShipmentDrinkUrl, resourceListUrl, userAddorderUserUrl, dishSearchUrl, drinkSearchUrl, areaListUrl, dishTypeListUrl, drinkTypeListUrl, dishListUrl, diningTableAddorderDiningTableUrl, diningTableListUrl, orderAddUrl, dishAddorderDishUrl, drinkListUrl, drinkAddorderDrinkUrl, diningTableUpdateUrl } from '../../apis/ManagerApi';
import 'intl';
import 'intl/locale-data/jsonp/en';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Checkbox from 'expo-checkbox';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Table, Row, Rows } from 'react-native-table-component';



class WaiterOrderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishQuantityModal: false,
      fadeAnimComplete: new Animated.Value(0),
      fadeAnimDiningTable: new Animated.Value(0),
      fadeAnimAddCart: new Animated.Value(0),
      fadeAnimHome: new Animated.Value(0),
      inputDishQuantity: '',
      status: 'homeview',
      statusUseDiningTable: true,
      statusBlankDiningTable: false,
      colorBackgroundUseDiningTable: 'white',
      colorBackgroundBlankDiningTable: '#426EB4',
      outputDiningTableType: '???? ?????t',
      statusDish: true,
      statusDrink: false,
      statusUseDiningTableAdd: false,
      colorBackgroundDish: 'white',
      colorBackgroundDrink: '#426EB4',
      outputCategory: 'm??n ??n',
      outputPriceTotal: 0,
      outputDiningTableTotal: 0,
      outputFoodQuantity: 0,
      outputPriceTotalCart: 0,
      outputPriceResidual: 0,
      datasingleDish: {},
      datasingleDiningTable: {},
      dataSingleOrder: {},
      dataFood: [],
      dataDishType: [],
      dataDrinkType: [],
      dataDiningTable: [],
      dataDishCart: [],
      dataFoodCart: [],
      dataDiningTableType: [],
      dataDiningTableCart: [],
      dataOrderDishDetail: [],
      dataOrderDrinkDetail: [],
      dataOrderDiningTableDetail: [],
      modalSearch: false,
      modalSearchInitial: 1,
      modalDiningTableSearchInitial: 0,
      modalFoodType: false,
      modalDiningTableType: false,
      modalPayment: false,
      optionType: [],
      optionTypeSetup: false,
      optionTypeValue: '',
      optionFoodType: '??ang ch??? bi???n',
      optionFoodTypeValue: 1,
      optionDiningTableType: [],
      optionDiningTableTypeSetup: false,
      optionDiningTableTypeValue: '',
      errorModal: '',
      windowWidth: Dimensions.get('window').width,
      windowHeight: Dimensions.get('window').height,
      flag: true,
      flagDiningTable: true,
      flagDiningTableDetail: true,
      flagDiningTableAdd: true,
      flagDishDetail: true,
      flagDishAdd: true,
      flagDrinkDetail: true,
      flagDrinkAdd: true,
      tabIndex: 0,
      tabOrderDetail: 0,
      tableHead: ['M??', 'T??n', '????n v???', 'S??? l?????ng', '????n gi??', 'Th??nh ti???n'],
      tableData: []

    };

  }

  modalPaymentView(isVisible) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isVisible}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 20, padding: '5%' }}>
            <View style={WaiterOrderStyle.setupItemCenterContainer}></View>
            <View style={WaiterOrderStyle.setupItemCenterContainer}><Text style={WaiterOrderStyle.error}>{this.state.errorPaymentModal}</Text></View>
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
            <View style={WaiterOrderStyle.setupItemCenterContainer}>
              <TouchableOpacity onPress={() => { this.paymentOrder(); }} >
                <Image
                  style={WaiterOrderStyle.cancelButton}
                  source={require('./../../assets/complete.png')}
                />
              </TouchableOpacity>
              <Text>             </Text>
              <TouchableOpacity onPress={() => { this.setState({ inputPriceCustomer: '', errorPaymentModal: '', modalPayment: false }); }} >
                <Image
                  style={WaiterOrderStyle.cancelButton}
                  source={require('./../../assets/cancel.png')}
                />
              </TouchableOpacity>

            </View>
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
            <View style={WaiterOrderStyle.setupItemCenterContainer}></View>
            <Text style={{ fontWeight: 'bold' }}>T??m ki???m theo:</Text>
            <Text></Text>
            <RadioForm
              radio_props={
                [{ label: 'T??n', value: 0 }]
              }
              initial={this.state.modalDiningTableSearchInitial}
              onPress={(value) => { this.setState({ modalDiningTableSearchInitial: value }) }}
            />
            <Text></Text>

            <Text></Text>
            <Text style={{ fontWeight: 'bold' }}>L???c b??n theo khu v???c:</Text>
            <Text></Text>


            <ScrollView nestedScrollEnabled={false}>
              <DropDownPicker
                listMode="SCROLLVIEW"
                style={WaiterOrderStyle.setupItemCenterContainerRowOption}
                open={this.state.optionDiningTableTypeSetup}

                placeholder={'T???t c???'}
                value={this.state.optionDiningTableTypeValue}
                items={
                  this.state.optionDiningTableType
                }
                onPress={() => { if (this.state.optionDiningTableTypeSetup) { this.setState({ optionDiningTableTypeSetup: false }) } else { this.setState({ optionDiningTableTypeSetup: true }); } }}

                containerStyle={{ height: 40 }}
                onSelectItem={(item) => { this.optionGetDiningTableFromAreaType(item.value); this.setState({ optionDiningTableTypeValue: item.value, optionDiningTableTypeSetup: false }); }}
                dropDownDirection="BOTTOM"
              />
              <View style={{ height: this.state.windowHeight / 3.5 }}></View>
            </ScrollView>
            <Button title="X??c nh???n" onPress={() => { this.setState({ modalDiningTableType: false }); }} />
          </View>




        </Modal >
      </View >
    );
  }

  modalSearchView(isVisible) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isVisible}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 20, padding: '5%' }}>
            <View style={WaiterOrderStyle.setupItemCenterContainer}></View>
            <Text></Text>
            <Text style={{ fontWeight: 'bold' }}>T??m ki???m {this.state.outputCategory}:</Text>
            <Text></Text>
            <RadioForm
              radio_props={
                [
                  { label: 'M??', value: 0 },
                  { label: 'T??n', value: 1 },
                  { label: '????n v???', value: 2 },
                  { label: 'Gi??', value: 3 },

                ]
              }
              initial={this.state.modalSearchInitial}
              onPress={(value) => { this.setState({ modalSearchInitial: value }); }}
            />
            <Text></Text>
            <Text style={{ fontWeight: 'bold' }}>L???c theo nh??m {this.state.outputCategory}:</Text>
            <Text></Text>

            <ScrollView nestedScrollEnabled={true}>
              <DropDownPicker
                listMode="SCROLLVIEW"
                style={WaiterOrderStyle.setupItemCenterContainerRowOption}
                open={this.state.optionTypeSetup}

                placeholder={'T???t c???'}
                value={this.state.optionTypeValue}
                items={
                  this.state.optionType
                }
                onPress={() => { if (this.state.optionTypeSetup) { this.setState({ optionTypeSetup: false }) } else { this.setState({ optionTypeSetup: true }); } }}

                containerStyle={{ height: 40 }}
                onSelectItem={(item) => { this.optionGetFoodFromFoodType(item.value); this.setState({ flag: true, optionTypeValue: item.value, optionTypeSetup: false }); }}
                dropDownDirection="BOTTOM"
                bottomOffset={100}
              />
              <View style={{ height: this.state.windowHeight / 3.5 }}></View>
            </ScrollView>
            <Button title="X??c nh???n" onPress={() => { this.setState({ modalSearch: false }); }} />
          </View>




        </Modal>
      </View>
    );
  }

  dishQuantityModalView(isVisible) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isVisible}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 20 }}>
            <Text></Text>
            <Text style={{ marginLeft: '5%', fontWeight: 'bold', fontSize: this.state.windowWidth / 25 }}>S??? l?????ng t???i ??a: {Math.floor(this.state.outputFoodQuantity)}</Text>
            <View style={WaiterOrderStyle.setupItemCenterContainer}><Text style={WaiterOrderStyle.error}>{this.state.errorModal}</Text></View>
            <Text></Text>
            <Input
              inputStyle={{ fontSize: this.state.windowWidth / 28 }}
              inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
              leftIconContainerStyle={{ paddingLeft: '5%' }}
              name='quantity'
              placeholder='Nh???p s??? l?????ng'
              placeholderTextColor="#999999"
              onChangeText={(quantity) => this.setState({ inputDishQuantity: quantity })}
              value={this.state.inputDishQuantity}
              leftIcon={{ color: 'grey', type: 'material', name: 'format-list-numbered' }}
              keyboardType='default' />
            <Text></Text>
            <View style={WaiterOrderStyle.setupItemCenterContainer}>
              <TouchableOpacity onPress={() => { this.addToCart(); }}>
                <Image
                  style={WaiterOrderStyle.saveButton}
                  source={require('./../../assets/save.png')}
                />
              </TouchableOpacity>
              <Text>                  </Text>
              <TouchableOpacity onPress={() => { this.setState({ inputDishQuantity: '', errorModal: '', dishQuantityModal: false }); }}>
                <Image
                  style={WaiterOrderStyle.cancelButton}
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
  formatMoneyDatabasetoView = (input) => {
    const formatter = new Intl.NumberFormat('vi-VN',
      {
        style: 'currency', currency: 'VND'
      })
    return formatter.format(input);
  }
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
  formatLocalDateTimeDatabaseToView(date) {
    var formatDate = new Date(date);
    return formatDate.getUTCHours() + ' : ' + formatDate.getMinutes() + ' : ' + formatDate.getSeconds() + '   ' + formatDate.getDate() + '/' + (formatDate.getMonth() + 1) + '/' + formatDate.getFullYear();
  }
  componentDidMount = () => {
    //this.minusResourceQuantityIntoWareHouse(3, 10);
    //this.minusDrinkQuantityIntoWareHouse(10, 10);
    //this.countAvailableFoodById(2);
    Animated.timing(this.state.fadeAnimHome, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();


    if (this.state.statusDish) {
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

              for (const element of dataJson) {
                getDishType.push({ label: element.name, value: element.id });
              }
              this.setState({ dataDishType: dataJson, optionType: getDishType });
            },
            1
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
                    statusDishOver = 'C??n h??ng';
                  }
                  else {
                    statusDishOver = 'T???m h???t';
                  }
                }
                else statusDishOver = 'T???m h???t';
                this.setState({ outputFoodQuantity: minDishQuantity });
                getExtraDishOver.push({ id: element_f.id, food: element_f, statusFood: statusDishOver });
              }

              this.setState({ dataFood: getExtraDishOver });
            },
            1
          )

        })
        .catch(error => {
          console.log(error);
        });
    }
    if (this.state.statusDrink) {
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

              for (const element of dataJson) {
                getDrinkType.push({ label: element.name, value: element.id });
              }
              this.setState({ dataDrinkType: dataJson, optionType: getDrinkType });
            },
            1
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
                if (element_f.shipments.length == 0) { statusDrink = 'T???m h???t'; }
                for (const element_s of element_f.shipments) {
                  element_s
                  //console.log(element_f.shipments);
                  if (this.isDateAfterToday(element_s.preserveTime)) {
                    getShipmentDrinkTotal = getShipmentDrinkTotal + element_s.quantity;
                  }
                }
                if (getShipmentDrinkTotal < 1) { statusDrink = 'T???m h???t' }
                else { statusDrink = 'C??n h??ng' }
                getExtraDrink.push({ id: element_f.id, food: element_f, statusFood: statusDrink });
              }


              this.setState({ dataFood: getExtraDrink });
            },
            1
          )

        })
        .catch(error => {
          console.log(error);
        });


    }
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
            var getArea = [{ label: 'T???t c???', value: 0 }];
            for (const element of dataJson) {
              getArea.push({ label: element.name, value: element.id });

            }

            this.setState({ optionDiningTableType: getArea });

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
            var getDiningTable = [];
            for (const element of dataJson) {
              if (element.status == 'Tr???ng') {
                getDiningTable.push({ id: element.id, diningTable: element, checkBoxDiningTale: false });
              }
            }

            this.setState({ flag: false, dataDiningTable: getDiningTable });
            //console.log(this.state.dataDiningTable);
          },
          1
        )

      })
      .catch(error => {
        console.log(error);
      });

    ///edit
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
            var getBlankDiningTable = [];
            var getUseDiningTable = [];
            for (const element of dataJson) {
              if (element.status == 'Tr???ng') {
                getBlankDiningTable.push(element);
              }
              if (element.status != 'Tr???ng' && element.type == 'B??n ch??nh') {
                getUseDiningTable.push(element);
              }
            }




            var getDiningTable = [];
            let getdiningTableForm = '';
            var getUseDiningTableUpdate = [];
            if (getUseDiningTable.length == 0) {
              this.setState({ flagDiningTable: false, dataDiningTableType: [] });
            }
            for (const element of getUseDiningTable) {
              var i = 0;
              var getNewOrder = [];
              for (const element_or of element.orders) {
   
                  getNewOrder.push(element_or);
                
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

                  if (this.state.statusUseDiningTable) {
                    this.setState({ flagDiningTable: false, dataDiningTableType: getUseDiningTableUpdate });
                  }

                })
                .catch(error => {
                  console.log(error);
                });
            }








            if (this.state.statusBlankDiningTable) {
              this.setState({ flagDiningTable: false, dataDiningTableType: getBlankDiningTable });
            }

            //console.log(this.state.dataDiningTable);
          },
          1
        )

      })
      .catch(error => {
        console.log(error);
      });




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




  temporaryOrder(){
    if(this.state.dataSingleOrder.status!='???? giao h??ng'){
      Alert.alert(
        "Th??ng b??o",
        "Vui l??ng ch???n ????n h??ng kh??c v?? ????n h??ng v???n ??ang ???????c x??? l??",
        [
          {
            text: "????ng",
            onPress: () => {},
          }
        ]
      );
    return;
    }
    
    
      Alert.alert(
        "Th??ng b??o",
        "X??c nh???n g???i ????n h??ng ?????n qu???y thu ng??n?",
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
                  detail: "Qu???y thu ng??n nh???n ???????c m???t y??u c???u thanh to??n m???i",
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

              fetch(host + ':' + port + orderUpdateUrl + this.state.dataSingleOrder.id, {
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + this.props.user.token,
                },
                body: JSON.stringify({
    
                  type: this.state.dataSingleOrder.type,
                  status: '??ang ch??? qu???y thu ng??n x??? l??',
                  vat: this.state.dataSingleOrder.vat,
                  time: this.state.dataSingleOrder.time
    
                }),
              })
                .then(response => response.text())
                .then(data => {
                  console.log(data);
                  this.componentDidMount();
    
                  var getOrder = this.state.dataSingleOrder;
                  getOrder.status = '??ang ch??? qu???y thu ng??n x??? l??';
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

  paymentOrder() {

    if (this.state.dataSingleOrder.status == '???? thanh to??n') { this.setState({ errorPaymentModal: '????n h??ng ???? ???????c thanh to??n!' }); return; }
    if (this.state.errorPaymentModal != '' || this.state.inputPriceCustomer == '') { this.setState({ errorPaymentModal: 'S??? ti???n tr??? kh??ng h???p l???!' }); return; }

    if (this.state.dataSingleOrder.status == '??ang t???m t??nh') {
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
    else {
      this.setState({ errorPaymentModal: 'Ch??a th??? thanh to??n ????n h??ng n??y' });
    }

  }







  checkBoxAddDiningTable(item) {
    var getDiningTableCartFromState = this.state.dataDiningTableCart;
    var getDiningTableFromState = this.state.dataDiningTable;
    var setCheckBoxDiningTable = item.checkBoxDiningTale;
    if (setCheckBoxDiningTable == true) {
      setCheckBoxDiningTable = false;
      var objIndex_f = getDiningTableFromState.findIndex((obj => obj.id == item.id));
      getDiningTableFromState[objIndex_f].checkBoxDiningTale = setCheckBoxDiningTable;
      var objIndex_s = getDiningTableCartFromState.findIndex((obj => obj.id == item.id));
      getDiningTableCartFromState.splice(objIndex_s, 1);
      //this.setState({ dataDiningTable: getDiningTableFromState, dataDiningTableCart: getDiningTableCartFromState, outputDiningTableTotal: this.state.dataDiningTableCart.length });

    }
    else {
      setCheckBoxDiningTable = true;
      var objIndex = getDiningTableFromState.findIndex((obj => obj.id == item.id));
      getDiningTableFromState[objIndex].checkBoxDiningTale = setCheckBoxDiningTable;
      getDiningTableCartFromState.push(item);
    }
    //console.log(this.state.dataDiningTableCart);  
    setTimeout(function () {
      this.setState({ dataDiningTable: getDiningTableFromState, dataDiningTableCart: getDiningTableCartFromState, outputDiningTableTotal: this.state.dataDiningTableCart.length });

    }.bind(this), 10);
    //console.log(this.state.dataDiningTableCart);

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
              var getBlankDiningTable = [];
              for (const element of dataJson.diningTables) {
                if (element.status == 'Tr???ng') {
                  getBlankDiningTable.push({ id: element.id, name: element.name, area: dataJson, orders: element.orders });
                }
                if (element.status != 'Tr???ng' && element.type == 'B??n ch??nh') {
                  getUseDiningTable.push({ id: element.id, name: element.name, area: dataJson, orders: element.orders });
                }
              }

              var getDiningTable = [];
              let getdiningTableForm = '';
              var getUseDiningTableUpdate = [];
              if (this.state.statusUseDiningTable && getUseDiningTable.length == 0) {
                this.setState({ flagDiningTable: false, dataDiningTableType: getUseDiningTableUpdate });
              }
              for (const element of getUseDiningTable) {
                var i = 0;
                var getNewOrder = [];
                for (const element_or of element.orders) {
                    getNewOrder.push(element_or);
                  
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

                    if (this.state.statusUseDiningTable) {
                      this.setState({ flagDiningTable: false, dataDiningTableType: getUseDiningTableUpdate });
                    }

                  })
                  .catch(error => {
                    console.log(error);
                  });
              }

              if (this.state.statusBlankDiningTable) {
                this.setState({ dataDiningTableType: getBlankDiningTable });
              }
              ///////
              var getExtraDiningTable = [];
              for (const element of dataJson.diningTables) {
                if (element.status == 'Tr???ng') {
                  getExtraDiningTable.push({ id: element.id, diningTable: { id: element.id, name: element.name, status: element.status, area: dataJson }, checkBoxDiningTale: false });
                }
              }
              for (const element_f of this.state.dataDiningTableCart) {
                var objIndex = getExtraDiningTable.findIndex((obj => obj.id == element_f.id));
                if (objIndex != -1) {
                  getExtraDiningTable[objIndex].checkBoxDiningTale = true;
                }
              }
              this.setState({ dataDiningTable: getExtraDiningTable });
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
  optionGetFoodFromFoodType(id) {
    if (this.state.statusDish == true) {
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
                    statusDishOver = 'C??n h??ng';
                  }
                  else {
                    statusDishOver = 'H???t h??ng';
                  }
                }
                else statusDishOver = 'T???m h???t';
                this.setState({ outputFoodQuantity: minDishQuantity });
                getExtraDishOver.push({ id: element_f.id, food: element_f, statusFood: statusDishOver });
              }

              this.setState({ flag: false, dataFood: getExtraDishOver });
            },
            10
          )
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (this.state.statusDrink == true) {
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
                if (element_f.shipments.length == 0) { statusDrink = 'T???m h???t'; }
                for (const element_s of element_f.shipments) {
                  if (this.isDateAfterToday(element_s.preserveTime)) {
                    getShipmentDrinkTotal = getShipmentDrinkTotal + element_s.quantity;
                  }
                  if (getShipmentDrinkTotal < 1) { statusDrink = 'T???m h???t' }
                  else { statusDrink = 'C??n h??ng' }

                }

                getExtraDrink.push({ id: element_f.id, food: element_f, statusFood: statusDrink });
              }


              this.setState({ flag: false, dataFood: getExtraDrink });
            },
            10
          )

        })
        .catch(error => {
          console.log(error);
        });
    }

  }
  optionSetUpUseDiningTable() {
    this.setState({ flagDiningTable: true, statusUseDiningTable: true, statusBlankDiningTable: false, outputDiningTableType: '???? ?????t', colorBackgroundBlankDiningTable: '#426EB4', colorBackgroundUseDiningTable: 'white' });
    setTimeout(this.componentDidMount, 50);

  }
  optionSetUpBlankDiningTable() {
    this.setState({ flagDiningTable: true, statusBlankDiningTable: true, statusUseDiningTable: false, outputDiningTableType: 'tr???ng', colorBackgroundBlankDiningTable: 'white', colorBackgroundUseDiningTable: '#426EB4' });
    setTimeout(this.componentDidMount, 50);
  }

  optionSetUpDishType() {
    this.setState({ flag: true, statusDish: true, statusDrink: false, outputCategory: 'm??n ??n', colorBackgroundDrink: '#426EB4', colorBackgroundDish: 'white' });
    setTimeout(this.componentDidMount, 50);

  }
  optionSetUpDrinkType() {
    this.setState({ flag: true, statusDrink: true, statusDish: false, outputCategory: '????? u???ng', colorBackgroundDrink: 'white', colorBackgroundDish: '#426EB4' });
    setTimeout(this.componentDidMount, 50);
  }

  totalPiceCart() {
    var getTotalPrice = 0;
    for (const element of this.state.dataFoodCart) {
      getTotalPrice = Number(getTotalPrice) + (Number(element.quantity) * Number(element.dish.food.price));
    }
    this.setState({ outputPriceTotal: getTotalPrice });
  }
  addToCart() {
    if (this.state.datasingleDish.statusFood == 'T???m h???t') {
      Alert.alert(
        "Th??ng b??o",
        "Vui l??ng ch???n " + this.state.outputCategory + " kh??c v?? t???m th???i h???t h??ng",
        [
          {
            text: "????ng",
            onPress: () => { this.setState({ inputDishQuantity: '', errorModal: '', dishQuantityModal: false }); },
            style: "cancel"
          }
        ]
      );
      return;
    }
    var regQuantity = /^[0-9]+$/;
    if (!(regQuantity.test(this.state.inputDishQuantity) && this.state.inputDishQuantity <= this.state.outputFoodQuantity)) {
      this.setState({ errorModal: 'S??? l?????ng kh??ng h???p l???!' });
      return;
    }
    else {
      this.setState({ errorModal: '' });
    }
    var getOrderDish = {
      id: this.state.datasingleDish.id,
      dish: this.state.datasingleDish,
      quantity: this.state.inputDishQuantity
    };
    var getOrderDishFoodList = this.state.dataFoodCart;
    var setCategoryType = null;
    if (this.state.statusDish || this.state.tabIndex == 0) { setCategoryType = true }
    else setCategoryType = false;

    if (getOrderDishFoodList.length == 0) {
      getOrderDishFoodList.push({ id: getOrderDish.id, dish: getOrderDish.dish, quantity: getOrderDish.quantity, type: { label: '??ang ch??? bi???n', value: 1 }, CategoryType: setCategoryType, optionShow: false });
      this.setState({ dataFoodCart: getOrderDishFoodList, inputDishQuantity: '', dishQuantityModal: false });
      this.totalPiceCart();
      return;
    }
    for (const element of getOrderDishFoodList) {
      if (element.id == getOrderDish.id && getOrderDish.dish.food.name==element.dish.food.name) {
        Alert.alert(
          "Th??ng b??o",
          "Vui l??ng ch???n m??n ??n kh??c v?? ???? c?? s???n trong gi??? h??ng",
          [
            {
              text: "????ng",
              onPress: () => { this.setState({ inputDishQuantity: '', errorModal: '', dishQuantityModal: false }); },
              style: "cancel"
            }
          ]
        );
        return;
      }

    }
    getOrderDishFoodList.push({ id: getOrderDish.id, dish: getOrderDish.dish, quantity: getOrderDish.quantity, type: { label: '??ang ch??? bi???n', value: 1 }, CategoryType: setCategoryType, optionShow: false });
    if ((!(regQuantity.test(this.state.inputDishQuantity))) || this.state.inputDishQuantity <= 0) {
      this.setState({ errorModal: 'S??? l?????ng kh??ng h???p l???!' }); return;
    }
    this.setState({ dataFoodCart: getOrderDishFoodList, inputDishQuantity: '', dishQuantityModal: false });
    this.totalPiceCart();
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
        type: '????n h??ng b??? sung',
        status: '??ang ch??? nh?? b???p x??? l??',
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
            detail: "Nh?? b???p nh???n ???????c m???t ????n h??ng m???i",
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

        fetch(host + ':' + port + diningTableAddorderDiningTableUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.user.token,
          },
          body: JSON.stringify({
            order_id: data.id,
            diningTable_id: this.state.datasingleDiningTable.id,
            type: ''
          }),
        })
          .then(response => response.json())
          .then(data => {


          })
          .catch((error) => {

            console.log(error);

          });

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
  saveOrderItem = () => {

    if (this.state.statusUseDiningTable) {
      if (this.state.dataSingleOrder.status == '???? giao h??ng' || this.state.dataSingleOrder.status == '??ang giao h??ng') {
        //this.saveExtraOrderItem();
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
            console.log(data);
            this.componentDidMount();

            var getOrder = this.state.dataSingleOrder;
            getOrder.status = '??ang ch??? bi???n';
            this.setState({ dataSingleOrder: getOrder });


          })
          .catch((error) => {

            console.log(error);

          });


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
      for (const element of this.state.dataFoodCart) {
        if (element.CategoryType) {

          for (const element_s of element.dish.food.resources) {
            this.minusResourceQuantityIntoWareHouse(element_s.id.resource_id, element_s.quantity);
          }
        }
        else {
          this.minusDrinkQuantityIntoWareHouse(element.id, element.quantity);

        }

      }
      for (const element of getDataFoodCart) {
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
        "Th??ng b??o",
        "???? th??m th??nh c??ng",
        [
          {
            text: "????ng",
            onPress: () => {
              this.updateDataSingleDiningTable(this.state.datasingleDiningTable);
              this.setState({
                dataFoodCart: [],
                outputPriceTotalCart: 0,
                modalFoodCartAdd: false
              });
              this.setState({ flagDishDetail: true, flagDrinkDetail: true, status: 'orderdetails' });
            }
          }
        ]
      );


    }

    if (this.state.statusBlankDiningTable) {
      fetch(host + ':' + port + orderAddUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        },
        body: JSON.stringify({
          type: '????n h??ng m???i',
          status: '??ang ch??? nh?? b???p x??? l??',
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
              detail: "Nh?? b???p nh???n ???????c m???t ????n h??ng m???i",
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


          fetch(host + ':' + port + diningTableAddorderDiningTableUrl, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.props.user.token,
            },
            body: JSON.stringify({
              order_id: data.id,
              diningTable_id: this.state.datasingleDiningTable.id,
              type: ''
            }),
          })
            .then(response => response.json())
            .then(data => {


            })
            .catch((error) => {

              console.log(error);

            });
          fetch(host + ':' + port + diningTableUpdateUrl + this.state.datasingleDiningTable.id, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.props.user.token,
            },
            body: JSON.stringify({
              name: this.state.datasingleDiningTable.name,
              status: '??ang s??? d???ng',
              type: 'B??n ch??nh',
              area: {
                id: this.state.datasingleDiningTable.area.id
              }
            }),
          })
            .then(response => response.json())
            .then(data => {
              //console.log(element);

            })
            .catch((error) => {

              console.log(error);

            });

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

          this.setState({
            dataDiningTable: [],
            dataDiningTableCart: [],
            dataFood: [],
            dataFoodCart: [],
            outputDiningTableTotal: 0,
            outputPriceTotal: 0,
            flag: true
          });
          setTimeout(this.componentDidMount, 50);

        })
        .catch((error) => {

          console.log(error);

        });

    }
  }



  deleteExtraDiningTable(item) {
    Alert.alert(
      "Th??ng b??o",
      "Ch???c ch???n t??ch b??n?",
      [
        {
          text: "H???y",
          onPress: () => { },
        },
        {
          text: "?????ng ??", onPress: () => {
            this.setState({ flagDiningTableDetail: true })
            fetch(host + ':' + port + diningTableDeleteByOrderDiningTableIdUrl, {
              method: 'DELETE',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
              },
              body: JSON.stringify({
                order_id: this.state.dataSingleOrder.id,
                diningTable_id: item.id,
                type: ''
              }),
            })
              .then(response => response.json())
              .then(data => {
                fetch(host + ':' + port + diningTableUpdateUrl + item.id, {
                  method: 'PUT',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.user.token,
                  },
                  body: JSON.stringify({
                    name: item.name,
                    status: 'Tr???ng',
                    type: '',
                    area: {
                      id: item.area.id
                    }
                  }),
                })
                  .then(response => response.json())
                  .then(data => {
                    //console.log(element);
                    this.updateDataSingleDiningTable(this.state.datasingleDiningTable);

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
      ]
    );





  }

  updateDataSingleDiningTable(item) {

    //if (this.state.tabOrderDetail == 2) {
    fetch(host + ':' + port + diningTableListUrl + item.id, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            this.orderDetailItem(dataJson);
            this.componentDidMount();
          },
          1
        )

      })
      .catch(error => {
        console.log(error);
      });
    // }
    //if (this.state.tabOrderDetail = 2) {
    //  fetch(host + ':' + port + orderListUrl + item.id, {
    //  headers: {
    //   'Content-type': 'application/json',
    //   'Authorization': 'Bearer ' + this.props.user.token,
    //  }
    //})
    //  .then(response => response.json())
    //  .then(dataJson => {
    //   setTimeout(
    //    () => {
    //      this.orderBringHomeDetailItem(dataJson);
    //   },
    //    1
    //  )

    // })
    // .catch(error => {
    //   console.log(error);
    // });

    // }
  }

  addMoreDiningTableToOrder(item) {
    Alert.alert(
      "Th??ng b??o",
      "Ch???c ch???n th??m b??n v??o ????n h??ng?",
      [
        {
          text: "????ng",
          onPress: () => { },
        },
        {
          text: "?????ng ??", onPress: () => {
            this.setState({ flagDiningTable: true, flagDiningTableDetail: true });
            fetch(host + ':' + port + diningTableAddorderDiningTableUrl, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
              },
              body: JSON.stringify({
                order_id: this.state.dataSingleOrder.id,
                diningTable_id: item.id,
                type: ''
              }),
            })
              .then(response => response.json())
              .then(data => {
                this.updateDataSingleDiningTable(this.state.datasingleDiningTable);
                this.componentDidMount();
              })
              .catch((error) => {

                console.log(error);

              });
            fetch(host + ':' + port + diningTableUpdateUrl + item.id, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
              },
              body: JSON.stringify({
                name: item.name,
                status: '??ang s??? d???ng',
                type: 'B??n ph???',
                area: {
                  id: item.area.id
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
        }
      ]
    );
  }
  searchDiningTableItem(value) {
    this.setState({ flagDiningTable: true });
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
          if (element.status == 'Tr???ng') {
            getBlankDiningTable.push(element);
          }
          if (element.status != 'Tr???ng' && element.type == 'B??n ch??nh') {
            getUseDiningTable.push(element);
          }
        }


        var getDiningTable = [];
        let getdiningTableForm = '';
        var getUseDiningTableUpdate = [];
        for (const element of getUseDiningTable) {
          var i = 0;
          var getNewOrder = [];
          for (const element_or of element.orders) {
           
              getNewOrder.push(element_or);
            
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

              if (this.state.statusUseDiningTable) {
                this.setState({ flagDiningTable: false, dataDiningTableType: getUseDiningTableUpdate });
              }


            })
            .catch(error => {
              console.log(error);
            });
        }

        if (this.state.statusBlankDiningTable) {
          this.setState({ flagDiningTable: false, dataDiningTableType: getBlankDiningTable });
        }
      })
      .catch(error => {
        this.componentDidMount();
        console.log(error);
      });



  }



  searchItem(value) {
    this.setState({ flag: true });
    if (value == '') { this.componentDidMount(); return; }
    if (this.state.statusDish) {

      if (this.state.modalSearchInitial == 0) {
        fetch(host + ':' + port + dishListUrl + value, {
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + this.props.user.token,
          }
        })
          .then(response => response.json())
          .then(dataJson => {
            setTimeout(
              () => {
                var statusDish = '';
                var getExtraDish = [];

                for (const element_s of dataJson.resources) {
                  var getShipmentResourceTotal = 0;
                  if (element_s.resource.shipments.length == 0) statusDish = 'T???m h???t';
                  for (const element_t of element_s.resource.shipments) {
                    if (this.isDateAfterToday(element_t.preserveTime)) {
                      getShipmentResourceTotal = getShipmentResourceTotal + element_t.quantity;
                    }
                  }
                  if (element_s.quantity > getShipmentResourceTotal) { statusDish = 'T???m h???t' }
                  else { statusDish = 'C??n h??ng' }
                }
                getExtraDish.push({ id: dataJson.id, food: dataJson, statusFood: statusDish });


                this.setState({ flag: false, dataFood: getExtraDish });
              },
              10
            )

          })
          .catch(error => {
            this.componentDidMount();
            console.log(error);
          });
      }
      if (this.state.modalSearchInitial == 1) {
        fetch(host + ':' + port + dishSearchUrl + 'name=' + value + '&price=&unit=', {
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + this.props.user.token,
          }
        })
          .then(response => response.json())
          .then(dataJson => {
            setTimeout(
              () => {
                var statusDish = '';
                var getExtraDish = [];
                for (const element_f of dataJson) {
                  if (element_f.resources.length == 0) statusDish = 'T???m h???t';
                  for (const element_s of element_f.resources) {
                    var getShipmentResourceTotal = 0;
                    if (element_s.resource.shipments.length == 0) statusDish = 'T???m h???t';
                    for (const element_t of element_s.resource.shipments) {
                      if (this.isDateAfterToday(element_t.preserveTime)) {
                        getShipmentResourceTotal = getShipmentResourceTotal + element_t.quantity;
                      }
                    }
                    if (element_s.quantity > getShipmentResourceTotal) { statusDish = 'T???m h???t' }
                    else { statusDish = 'C??n h??ng' }
                  }
                  getExtraDish.push({ id: element_f.id, food: element_f, statusFood: statusDish });
                }

                this.setState({ flag: false, dataFood: getExtraDish });
              },
              100
            )

          })
          .catch(error => {
            this.componentDidMount();
            console.log(error);
          });
      }
      if (this.state.modalSearchInitial == 2) {

        fetch(host + ':' + port + dishSearchUrl + 'name=&price=&unit=' + value, {
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + this.props.user.token,
          }
        })
          .then(response => response.json())
          .then(dataJson => {
            setTimeout(
              () => {
                var statusDish = '';
                var getExtraDish = [];
                for (const element_f of dataJson) {
                  if (element_f.resources.length == 0) statusDish = 'T???m h???t';
                  for (const element_s of element_f.resources) {
                    var getShipmentResourceTotal = 0;
                    if (element_s.resource.shipments.length == 0) statusDish = 'T???m h???t';
                    for (const element_t of element_s.resource.shipments) {
                      if (this.isDateAfterToday(element_t.preserveTime)) {
                        getShipmentResourceTotal = getShipmentResourceTotal + element_t.quantity;
                      }
                    }
                    if (element_s.quantity > getShipmentResourceTotal) { statusDish = 'T???m h???t' }
                    else { statusDish = 'C??n h??ng' }
                  }
                  getExtraDish.push({ id: element_f.id, food: element_f, statusFood: statusDish });
                }

                this.setState({ flag: false, dataFood: getExtraDish });
              },
              100
            )

          })
          .catch(error => {
            this.componentDidMount();
            console.log(error);
          });
      }
      if (this.state.modalSearchInitial == 3) {
        fetch(host + ':' + port + dishSearchUrl + 'name=&price=' + value + '&unit=', {
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + this.props.user.token,
          }
        })
          .then(response => response.json())
          .then(dataJson => {
            setTimeout(
              () => {
                var statusDish = '';
                var getExtraDish = [];
                for (const element_f of dataJson) {
                  if (element_f.resources.length == 0) statusDish = 'T???m h???t';
                  for (const element_s of element_f.resources) {
                    var getShipmentResourceTotal = 0;
                    if (element_s.resource.shipments.length == 0) statusDish = 'T???m h???t';
                    for (const element_t of element_s.resource.shipments) {
                      if (this.isDateAfterToday(element_t.preserveTime)) {
                        getShipmentResourceTotal = getShipmentResourceTotal + element_t.quantity;
                      }
                    }
                    if (element_s.quantity > getShipmentResourceTotal) { statusDish = 'T???m h???t' }
                    else { statusDish = 'C??n h??ng' }
                  }
                  getExtraDish.push({ id: element_f.id, food: element_f, statusFood: statusDish });
                }

                this.setState({ flag: false, dataFood: getExtraDish });
              },
              100
            )

          })
          .catch(error => {
            this.componentDidMount();
            console.log(error);
          });
      }
    }
    else {
      if (this.state.modalSearchInitial == 0) {
        fetch(host + ':' + port + drinkListUrl + value, {
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
                //console.log('Testttttttt'+element_f.shipments);
                if (dataJson.shipments.length == 0) { statusDrink = 'T???m h???t'; }
                for (const element_s of dataJson.shipments) {
                  //console.log(element_f.shipments);
                  if (this.isDateAfterToday(element_s.preserveTime)) {
                    getShipmentDrinkTotal = getShipmentDrinkTotal + element_s.quantity;
                  }
                }
                if (getShipmentDrinkTotal < 1) { statusDrink = 'T???m h???t' }
                else { statusDrink = 'C??n h??ng' }
                getExtraDrink.push({ id: dataJson.id, food: dataJson, statusFood: statusDrink });



                this.setState({ flag: false, dataFood: getExtraDrink });
              },
              100
            )

          })
          .catch(error => {
            this.componentDidMount();
            console.log(error);
          });
      }
      if (this.state.modalSearchInitial == 1) {
        fetch(host + ':' + port + drinkSearchUrl + 'name=' + value + '&price=&unit=', {
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
                  if (element_f.shipments.length == 0) { statusDrink = 'T???m h???t'; }
                  for (const element_s of element_f.shipments) {
                    element_s
                    //console.log(element_f.shipments);
                    if (this.isDateAfterToday(element_s.preserveTime)) {
                      getShipmentDrinkTotal = getShipmentDrinkTotal + element_s.quantity;
                    }
                  }
                  if (getShipmentDrinkTotal < 1) { statusDrink = 'T???m h???t' }
                  else { statusDrink = 'C??n h??ng' }
                  getExtraDrink.push({ id: element_f.id, food: element_f, statusFood: statusDrink });
                }


                this.setState({ flag: false, dataFood: getExtraDrink });
              },
              100
            )

          })
          .catch(error => {
            this.componentDidMount();
            console.log(error);
          });
      }
      if (this.state.modalSearchInitial == 2) {

        fetch(host + ':' + port + drinkSearchUrl + 'name=&price=&unit=' + value, {
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
                  if (element_f.shipments.length == 0) { statusDrink = 'T???m h???t'; }
                  for (const element_s of element_f.shipments) {
                    element_s
                    //console.log(element_f.shipments);
                    if (this.isDateAfterToday(element_s.preserveTime)) {
                      getShipmentDrinkTotal = getShipmentDrinkTotal + element_s.quantity;
                    }
                  }
                  if (getShipmentDrinkTotal < 1) { statusDrink = 'T???m h???t' }
                  else { statusDrink = 'C??n h??ng' }
                  getExtraDrink.push({ id: element_f.id, food: element_f, statusFood: statusDrink });
                }


                this.setState({ flag: false, dataFood: getExtraDrink });
              },
              100
            )

          })
          .catch(error => {
            this.componentDidMount();
            console.log(error);
          });
      }
      if (this.state.modalSearchInitial == 3) {
        fetch(host + ':' + port + drinkSearchUrl + 'name=&price=' + value + '&unit=', {
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
                  if (element_f.shipments.length == 0) { statusDrink = 'T???m h???t'; }
                  for (const element_s of element_f.shipments) {
                    element_s
                    //console.log(element_f.shipments);
                    if (this.isDateAfterToday(element_s.preserveTime)) {
                      getShipmentDrinkTotal = getShipmentDrinkTotal + element_s.quantity;
                    }
                  }
                  if (getShipmentDrinkTotal < 1) { statusDrink = 'T???m h???t' }
                  else { statusDrink = 'C??n h??ng' }
                  getExtraDrink.push({ id: element_f.id, food: element_f, statusFood: statusDrink });
                }


                this.setState({ flag: false, dataFood: getExtraDrink });
              },
              100
            )

          })
          .catch(error => {
            this.componentDidMount();
            console.log(error);
          });
      }
    }


  }
  countAvailableFoodById(id) {
    if (this.state.statusDish) {
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
                this.setState({ outputFoodQuantity: statusDish });
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
              this.setState({ outputFoodQuantity: minDishQuantity });
            },
            100
          )


        })
        .catch(error => {
          console.log(error);
        });

    }
    if (this.state.statusDrink) {
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

              this.setState({ outputFoodQuantity: getShipmentDrinkTotal });
            },
            100
          )

        })
        .catch(error => {
          console.log(error);
        });


    }
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
  renderDiningTableTypeItem = ({ item }) => (
    <TouchableOpacity onPress={() => { }}>
      <View style={WaiterOrderStyle.itemDiningTableDetailList}>
        <View>
          {this.state.statusBlankDiningTable ?
            <TouchableOpacity onPress={() => { if (this.state.statusUseDiningTableAdd == false) this.setState({ datasingleDiningTable: item, status: 'foodview' }); else { this.addMoreDiningTableToOrder(item); } }}>
              <Image
                style={WaiterOrderStyle.itemDetailListPlus}
                source={require('./../../assets/plus.png')}
              />
            </TouchableOpacity>
            : null}
          {this.state.statusUseDiningTable ?
            <TouchableOpacity onPress={() => { this.setState({ datasingleDiningTable: item }); this.orderDetailItem(item) }}>
              <Image
                style={WaiterOrderStyle.itemDetailListPlus}
                source={require('./../../assets/next.png')}
              />
            </TouchableOpacity>
            : null}

        </View>
        {this.state.statusUseDiningTable ?
          <View style={{ flex: 1 }}>
            <Text><Text style={{ fontWeight: 'bold' }}>T??n: </Text>{item.name}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Khu v???c: </Text>{item.area.name}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>S??? l?????ng b??n ph???: </Text>{item.quantity}</Text>
          </View>
          : null}
        {this.state.statusBlankDiningTable ?
          <View style={{ flex: 1 }}>
            <Text></Text>
            <Text><Text style={{ fontWeight: 'bold' }}>T??n: </Text>{item.name}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Khu v???c: </Text>{item.area.name}</Text>
          </View>
          : null}
        <View>
          {this.state.statusUseDiningTable ?
            <Image
              style={WaiterOrderStyle.itemDiningTableDetailListLogo}
              source={require('./../../assets/useDiningTable.png')}

            />
            : null}
          {this.state.statusBlankDiningTable ?
            <Image
              style={WaiterOrderStyle.itemDiningTableDetailListLogo}
              source={require('./../../assets/blankDiningTable.png')}

            />
            : null}
        </View>
      </View>
    </TouchableOpacity>

  );


  renderItemDetailList = ({ item }) => (
    <TouchableOpacity onPress={() => { }}>
      <View style={WaiterOrderStyle.itemDetailList}>
        <View>
          <TouchableOpacity onPress={() => { this.countAvailableFoodById(item.food.id); this.setState({ datasingleDish: item, dishQuantityModal: true }); }}>
            <Image
              style={WaiterOrderStyle.itemDetailListPlus}
              source={require('./../../assets/plus.png')}
            />
          </TouchableOpacity>

        </View>
        <View style={{ flex: 1 }}>
          <Text><Text style={{ fontWeight: 'bold' }}>M??: </Text>{item.food.id}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>T??n: </Text>{item.food.name}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Gi??: </Text>{this.formatMoneyDatabasetoView(item.food.price)}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>????n v???: </Text>{item.food.unit}</Text>
          <Text style={{ fontWeight: 'bold' }}>{item.statusFood}</Text>
        </View>
        <View>
          <Image
            style={WaiterOrderStyle.itemDetailListLogo}
            source={{
              uri: item.food.urlImage + '/'
            }}
          />
        </View>
      </View>
    </TouchableOpacity>

  );
  renderItemDetailOrderFoodList = ({ item }) => (
    <TouchableOpacity onPress={() => { }}>
      <View style={WaiterOrderStyle.itemDetailOrderCartList}>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.orderDishCartPlusItem(item);
              // console.log(item);
            }}>
            <Image
              style={WaiterOrderStyle.itemDetailOrderListPlus}
              source={require('./../../assets/plus.png')}
            />
          </TouchableOpacity>
          <Text></Text>
          <TouchableOpacity onPress={() => {
            this.orderDishCartMinusItem(item);
            // console.log(item);
          }}>
            <Image
              style={WaiterOrderStyle.itemDetailOrderListPlus}
              source={require('./../../assets/minus.png')}
            />
          </TouchableOpacity>

        </View>
        <View style={{ flex: 1 }}>
          <Text><Text style={{ fontWeight: 'bold' }}>M??: </Text>{item.dish.food.id}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>T??n: </Text>{item.dish.food.name}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Gi??: </Text>{this.formatMoneyDatabasetoView(item.dish.food.price)}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>????n v???: </Text>{item.dish.food.unit}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>S??? l?????ng: </Text> {item.quantity}</Text>
        </View>
        <View>
          <Image
            style={WaiterOrderStyle.itemDetailOrderListLogo}
            source={{
              uri: item.dish.food.urlImage + '/',
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
  renderItemDetailOrderDiningTableList = ({ item }) => (
    <TouchableOpacity onPress={() => { this.checkBoxAddDiningTable(item) }}>
      <View style={WaiterOrderStyle.itemDetailOrderList}>
        <Checkbox
          value={item.checkBoxDiningTale}
          onValueChange={(itemCheckBox) => { this.checkBoxAddDiningTable(item); }}
          color={'#4630EB'}
        />
        <View style={{ flex: 1 }}>
          <Text></Text>
          <Text><Text style={{ fontWeight: 'bold' }}>M??: </Text>{item.diningTable.id}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>T??n: </Text>{item.diningTable.name}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Khu v???c: </Text>{item.diningTable.area.name}</Text>
        </View>
        <View>
          <Image
            style={WaiterOrderStyle.itemDetailOrderListLogo}
            source={require('./../../assets/diningtable.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

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
  openItemOrderFoodList = () => {
    this.setState({ status: 'orderfoodview' });
  }
  previousItemOrderFoodList = () => {
    if (this.state.statusBlankDiningTable) {
      this.setState({ status: 'foodview' });
    }
    if (this.state.statusUseDiningTable) {
      this.setState({ status: 'foodview' });
    }
  }
  previousItemOrderDiningTableList = () => {
    this.setState({ status: 'orderfoodview' });
  }
  nextItemOrderFoodList = () => {
    this.setState({ status: 'orderdiningtableview' });
  }
  confirmOrder = (item) => {
    //    //this.setState({ datasingleDiningTable: item });
    Alert.alert(
      "Th??ng b??o",
      "Ch???c ch???n t???o ????n h??ng?",
      [
        {
          text: "H???y",
          onPress: () => {

          },
        },
        {
          text: "?????ng ??", onPress: () => {
            if (this.state.dataFoodCart.length == 0) {

              Alert.alert(
                "Th??ng b??o",
                "Vui l??ng th??m m??n ??n ho???c ????? u???ng v??o gi??? h??ng",
                [
                  {
                    text: "????ng",
                    onPress: () => { }
                  }
                ]
              );
              return;
            }



            if (this.state.statusBlankDiningTable) {
              this.setState({ status: 'loading' });
              setTimeout(function () {
                this.setState({ status: 'ordercompleteview' });
              }.bind(this), 1000);
            }
            this.saveOrderItem();
          }
        }
      ]
    );
  }






  orderDiningTablerenderItem = ({ item }) => (
    <View>
      <View style={WaiterOrderStyle.item}>
        <View>
          <TouchableOpacity onPress={() => { this.deleteExtraDiningTable(item); }}>
            <Icon
              style={ManagerWarehouseStyle.icon}
              name='trash-outline'
              type='ionicon'
              color='red'
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Text></Text>
          <Text><Text style={{ fontWeight: 'bold' }}>T??n: </Text>{item.name}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Khu v???c: </Text>{item.area.name}</Text>


        </View>
        <View>
          <Image
            style={WaiterOrderStyle.itemDetailListLogo}
            source={require('./../../assets/diningtable.png')}
          />
        </View>
      </View>
    </View>
  );

  orderFoodrenderItem = ({ item }) => (
    <View>






      <View style={WaiterOrderStyle.item}>

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
            style={WaiterOrderStyle.itemDetailListLogo}
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
        <View style={{ padding: '2%' }}>

          <View style={WaiterOrderStyle.setupItemCenterContainer}>
            <TouchableOpacity onPress={() => { this.setState({ status: 'foodview' }); }}>
              <Image

                style={WaiterOrderStyle.cancelButton}
                source={require('./../../assets/plus.png')}
              />
            </TouchableOpacity>
            <Text>  </Text>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: this.state.windowWidth / 25, marginTop: '2%' }}>Th??ng tin ????n h??ng: </Text>

          </View>

          <Text style={{ color: 'white' }}>M??: {this.state.dataSingleOrder.id}</Text>
          <Text style={{ color: 'white' }}>Tr???ng th??i: {this.state.dataSingleOrder.status}</Text>
          <Text style={{ color: 'white' }}>Th???i gian: {this.formatLocalDateTimeDatabaseToView(this.state.dataSingleOrder.time)}</Text>
          <Text></Text>
          {this.state.flagDrinkDetail ?
            <View style={{ height: '65%' }}>
              <ActivityIndicator size="large" color="#DDDDDD" />
            </View> :
            <FlatList
              style={{ backgroundColor: 'white', borderRadius: 15, height: '70%' }}
              data={this.state.dataOrderDrinkDetail}
              renderItem={this.orderFoodrenderItem}
              keyExtractor={item => item.id}
            />
          }
          <Text></Text>

          <View style={WaiterOrderStyle.setupItemCenterContainer}>

            <TouchableOpacity onPress={() => { this.temporaryOrder(); }} >
              <Image
                style={WaiterOrderStyle.cancelButton}
                source={require('./../../assets/dollar.png')}
              />
            </TouchableOpacity>
            <Text>             </Text>
            <TouchableOpacity onPress={() => { this.setState({ status: 'homeview' }); }} >
              <Image
                style={WaiterOrderStyle.cancelButton}
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
        <View style={{ padding: '2%' }}>

          <View style={WaiterOrderStyle.setupItemCenterContainer}>
            <TouchableOpacity onPress={() => { this.setState({ status: 'foodview' }); }}>
              <Image

                style={WaiterOrderStyle.cancelButton}
                source={require('./../../assets/plus.png')}
              />
            </TouchableOpacity>
            <Text>  </Text>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: this.state.windowWidth / 25, marginTop: '2%' }}>Th??ng tin ????n h??ng: </Text>

          </View>

          <Text style={{ color: 'white' }}>M??: {this.state.dataSingleOrder.id}</Text>
          <Text style={{ color: 'white' }}>Tr???ng th??i: {this.state.dataSingleOrder.status}</Text>
          <Text style={{ color: 'white' }}>Th???i gian: {this.formatLocalDateTimeDatabaseToView(this.state.dataSingleOrder.time)}</Text>
          <Text></Text>
          {this.state.flagDishDetail ?
            <View style={{ height: '65%' }}>
              <ActivityIndicator size="large" color="#DDDDDD" />
            </View> :
            <FlatList
              style={{ backgroundColor: 'white', borderRadius: 15, height: '70%' }}
              data={this.state.dataOrderDishDetail}
              renderItem={this.orderFoodrenderItem}
              keyExtractor={item => item.id}
            />
          }
          <Text></Text>
          <View style={WaiterOrderStyle.setupItemCenterContainer}>

            <TouchableOpacity onPress={() => { this.temporaryOrder(); }} >
              <Image
                style={WaiterOrderStyle.cancelButton}
                source={require('./../../assets/dollar.png')}
              />
            </TouchableOpacity>
            <Text>             </Text>
            <TouchableOpacity onPress={() => { this.setState({ status: 'homeview' }); }} >
              <Image
                style={WaiterOrderStyle.cancelButton}
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
        <View style={{ padding: '2%' }}>

          <View style={WaiterOrderStyle.setupItemCenterContainer}>
            <TouchableOpacity onPress={() => { this.setState({ statusUseDiningTableAdd: true, statusBlankDiningTable: true, statusUseDiningTable: false, status: 'orderdiningtableview' }); this.componentDidMount(); }}>
              <Image

                style={WaiterOrderStyle.cancelButton}
                source={require('./../../assets/plus.png')}
              />
            </TouchableOpacity>
            <Text>  </Text>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: this.state.windowWidth / 25, marginTop: '2%' }}>Th??ng tin ????n h??ng: </Text>

          </View>

          <Text style={{ color: 'white' }}>M??: {this.state.dataSingleOrder.id}</Text>
          <Text style={{ color: 'white' }}>Tr???ng th??i: {this.state.dataSingleOrder.status}</Text>
          <Text style={{ color: 'white' }}>Th???i gian: {this.formatLocalDateTimeDatabaseToView(this.state.dataSingleOrder.time)}</Text>
          <Text></Text>
          {this.state.flagDiningTableDetail ?
            <View style={{ height: '65%' }}>
              <ActivityIndicator size="large" color="#DDDDDD" />
            </View> :
            <FlatList
              style={{ backgroundColor: 'white', borderRadius: 15, height: '70%' }}
              data={this.state.dataOrderDiningTableDetail}
              renderItem={this.orderDiningTablerenderItem}
              keyExtractor={item => item.id}
            />
          }
          <Text></Text>
          <View style={WaiterOrderStyle.setupItemCenterContainer}>

            <TouchableOpacity onPress={() => { this.temporaryOrder(); }} >
              <Image
                style={WaiterOrderStyle.cancelButton}
                source={require('./../../assets/dollar.png')}
              />
            </TouchableOpacity>
            <Text>             </Text>
            <TouchableOpacity onPress={() => { this.setState({ status: 'homeview' }); }} >
              <Image
                style={WaiterOrderStyle.cancelButton}
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
    var getSingleOrder = {};
    var getDishOrder = [];
    var getDrinkOrder = [];
    var getPriceToTal = 0;
    var i = 0;
    for (const element of item.orders) {

        getOrderOfDiningTable.push(element);
      
    }
    getOrderOfDiningTable.sort(function (a, b) {
      a = new Date(a.order.time);
      b = new Date(b.order.time);
      return a > b ? -1 : a < b ? 1 : 0;
    });
    for (const element_f of getOrderOfDiningTable[0].order.dishs) {
      getDishOrder.push({ id: i, foodType: 'M??n ??n', food: element_f.dish, quantity: element_f.quantity, price: element_f.price, unit: element_f.unit, type: element_f.type });
      getPriceToTal = getPriceToTal + (element_f.dish.price * element_f.quantity);
      i = i + 1;
    }
    for (const element_s of getOrderOfDiningTable[0].order.drinks) {
      getDrinkOrder.push({ id: i, foodType: '????? u???ng', food: element_s.drink, quantity: element_s.quantity, price: element_s.price, unit: element_s.unit, type: element_s.type });
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


  }

  OrderDishView = () => {
    return (
      <Animated.View
        style={[
          WaiterOrderStyle.container,
          {
            opacity: this.state.fadeAnimHome
          }
        ]}>
        <View>

          <Text style={{ paddingTop: '1%', paddingLeft: '3%', margin: '1%', color: 'white', fontWeight: 'bold', fontSize: this.state.windowWidth / 29 }}>T??n: {this.state.datasingleDiningTable.name}</Text>
          <Text style={{ paddingLeft: '3%', margin: '1%', color: 'white', fontWeight: 'bold', fontSize: this.state.windowWidth / 29 }}>Khu v???c: {this.state.datasingleDiningTable.area.name}</Text>
        </View>
        <SafeAreaProvider>
          <View style={ManagerWarehouseStyle.topcontainer}>

            {this.modalSearchView(this.state.modalSearch)}

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
          <View style={WaiterOrderStyle.bottomcontainer}>








            <View style={WaiterOrderStyle.itemMenuContainerTouchable}>
              <View style={WaiterOrderStyle.itemMenuContainerTouchableContentFoodType}>


                <TouchableOpacity
                  style={{ marginLeft: '1%' }}
                  onPress={() => {
                    this.setState({
                      dataDiningTable: [],
                      dataDiningTableCart: [],
                      dataFood: [],
                      dataFoodCart: [],
                      outputDiningTableTotal: 0,
                      outputPriceTotal: 0,
                      flag: true
                    });
                    setTimeout(this.componentDidMount, 50);
                  }}
                >
                  <Icon

                    name='cached'
                    type='material'
                    color='white'
                  />



                </TouchableOpacity>
                <Text style={WaiterOrderStyle.title}>Danh s??ch:</Text>

              </View>

            </View>
            {this.state.flag ?
              <ActivityIndicator size="large" color="#DDDDDD" />
              :
              <FlatList

                data={this.state.dataFood}
                renderItem={this.renderItemDetailList}
                keyExtractor={item => item.id}

              />

            }


          </View>
        </SafeAreaProvider>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <View style={WaiterOrderStyle.setupItemCenterContainer}>

          <TouchableOpacity
            onPress={() => { this.setState({ status: 'orderfoodview' }); }}
            style={{ width: '20%', marginLeft: '1%', paddingRight: '15%' }}
          >
            <Image
              style={WaiterOrderStyle.cart}
              source={require('./../../assets/cart.png')}
            />

            <Badge
              status="error"
              value={this.state.dataFoodCart.length}
              containerStyle={{ position: 'absolute', left: '80%' }}
            />
          </TouchableOpacity>
          {this.state.statusBlankDiningTable ?
            <TouchableOpacity
              style={{ marginRight: '20%', marginLeft: '47%' }}
              onPress={() => { this.setState({ status: 'homeview' }); }} >
              <Image
                style={WaiterOrderStyle.cancelButton}
                source={require('./../../assets/previous.png')}
              />
            </TouchableOpacity>
            :
            <TouchableOpacity
              style={{ marginRight: '20%', marginLeft: '47%' }}
              onPress={() => { this.setState({ status: 'orderdetails' }); }} >
              <Image
                style={WaiterOrderStyle.cancelButton}
                source={require('./../../assets/previous.png')}
              />
            </TouchableOpacity>
          }
        </View>
        <View style={{ height: '1%' }}>{this.dishQuantityModalView(this.state.dishQuantityModal)}</View>
      </Animated.View>
    );
  }
  OrderDrinkView = () => {
    return (
      <Animated.View
        style={[
          WaiterOrderStyle.container,
          {
            opacity: this.state.fadeAnimHome
          }
        ]}>
        <View>

          <Text style={{ paddingTop: '1%', paddingLeft: '3%', margin: '1%', color: 'white', fontWeight: 'bold', fontSize: this.state.windowWidth / 29 }}>T??n: {this.state.datasingleDiningTable.name}</Text>
          <Text style={{ paddingLeft: '3%', margin: '1%', color: 'white', fontWeight: 'bold', fontSize: this.state.windowWidth / 29 }}>Khu v???c: {this.state.datasingleDiningTable.area.name}</Text>
        </View>
        <SafeAreaProvider>
          <View style={ManagerWarehouseStyle.topcontainer}>

            {this.modalSearchView(this.state.modalSearch)}

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
          <View style={WaiterOrderStyle.bottomcontainer}>

            <View style={WaiterOrderStyle.itemMenuContainerTouchable}>
              <View style={WaiterOrderStyle.itemMenuContainerTouchableContentFoodType}>


                <TouchableOpacity
                  style={{ marginLeft: '1%' }}
                  onPress={() => {
                    this.setState({
                      dataDiningTable: [],
                      dataDiningTableCart: [],
                      dataFood: [],
                      dataFoodCart: [],
                      outputDiningTableTotal: 0,
                      outputPriceTotal: 0,
                      flag: true
                    });
                    setTimeout(this.componentDidMount, 50);
                  }}
                >
                  <Icon

                    name='cached'
                    type='material'
                    color='white'
                  />



                </TouchableOpacity>
                <Text style={WaiterOrderStyle.title}>Danh s??ch:</Text>

              </View>

            </View>
            {this.state.flag ?
              <ActivityIndicator size="large" color="#DDDDDD" />
              :
              <FlatList

                data={this.state.dataFood}
                renderItem={this.renderItemDetailList}
                keyExtractor={item => item.id}

              />

            }


          </View>
        </SafeAreaProvider>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <View style={WaiterOrderStyle.setupItemCenterContainer}>

          <TouchableOpacity
            onPress={() => { this.setState({ status: 'orderfoodview' }); }}
            style={{ width: '20%', marginLeft: '1%', paddingRight: '15%' }}
          >
            <Image
              style={WaiterOrderStyle.cart}
              source={require('./../../assets/cart.png')}
            />

            <Badge
              status="error"
              value={this.state.dataFoodCart.length}
              containerStyle={{ position: 'absolute', left: '80%' }}
            />
          </TouchableOpacity>
          {this.state.statusBlankDiningTable ?
            <TouchableOpacity
              style={{ marginRight: '20%', marginLeft: '47%' }}
              onPress={() => { this.setState({ status: 'homeview' }); }} >
              <Image
                style={WaiterOrderStyle.cancelButton}
                source={require('./../../assets/previous.png')}
              />
            </TouchableOpacity>
            :
            <TouchableOpacity
              style={{ marginRight: '20%', marginLeft: '47%' }}
              onPress={() => { this.setState({ status: 'orderdetails' }); }} >
              <Image
                style={WaiterOrderStyle.cancelButton}
                source={require('./../../assets/previous.png')}
              />
            </TouchableOpacity>
          }
        </View>
        <View style={{ height: '1%' }}>{this.dishQuantityModalView(this.state.dishQuantityModal)}</View>
      </Animated.View>
    );
  }

  renderScene = SceneMap({
    orderDishHome: this.OrderDishView,
    orderDrinkHome: this.OrderDrinkView
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
      <View style={WaiterOrderStyle.container}>
        <SafeAreaProvider>
          <View style={{ width: '100%', height: '100%', padding: '2%', borderWidth: 0.3 }}>

            <View style={WaiterOrderStyle.itemDetailOrderListExtraContainer}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: this.state.windowWidth / 22 }}> Thanh to??n th??nh c??ng </Text>
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
            <Text style={{ color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Ti???n tr???: </Text>{this.formatMoneyDatabasetoView(this.state.inputPriceCustomer)}</Text>
            <Text style={{ color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Ti???n d??: </Text>{this.formatMoneyDatabasetoView(this.state.outputPriceResidual)}</Text>
            <Text></Text>
            <View style={WaiterOrderStyle.itemDetailOrderListExtraContainer}>
              <TouchableOpacity onPress={() => { this.componentDidMount(); this.setState({ inputPriceCustomer: '', outputPriceResidual: '', status: 'orderdetails' }) }}>
                <Image
                  style={WaiterOrderStyle.itemDetailOrderListnextButton}
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
      <View style={WaiterOrderStyle.container}>
        {this.state.status == 'homeview' ?
          <View style={WaiterOrderStyle.container}>

            <Animated.View
              style={[
                WaiterOrderStyle.container,
                {
                  opacity: this.state.fadeAnimHome
                }
              ]}>
              <SafeAreaProvider>
                <View style={ManagerWarehouseStyle.topcontainer}>
                  {this.modalDiningTableTypeView(this.state.modalDiningTableType)}

                  <TouchableOpacity
                    onPress={() => { this.setState({ modalDiningTableType: true }); }}

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
                    onChangeText={(search) => this.searchDiningTableItem(search)}
                    //value={this.state.inputSearch}
                    leftIcon={{ color: 'grey', type: 'material', name: 'search' }}
                    keyboardType='default' />
                </View>
                <View style={WaiterOrderStyle.bottomcontainer}>

                  <View>


                    <View style={WaiterOrderStyle.itemMenuContainerTouchable}>
                      <View style={WaiterOrderStyle.itemMenuContainerTouchableContent}>

                        <TouchableOpacity
                          style={{
                            backgroundColor: this.state.colorBackgroundBlankDiningTable,
                            borderRadius: 10,
                            padding: 15,
                            margin: 10,
                            height: this.state.windowWidth / 4.2,
                            width: this.state.windowWidth / 4.2,
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                          onPress={() => { this.optionSetUpBlankDiningTable(); }}
                        >
                          <Image
                            style={{ width: '100%', height: '100%', borderRadius: 100 }}
                            source={require('./../../assets/blankDiningTable.png')}
                          />
                          <Text style={WaiterOrderStyle.itemMenuTitle}>Tr???ng</Text>


                        </TouchableOpacity>
                        <Text>          </Text>
                        <TouchableOpacity
                          style={{
                            backgroundColor: this.state.colorBackgroundUseDiningTable,
                            borderRadius: 10,
                            padding: 15,
                            margin: 10,
                            height: this.state.windowWidth / 4.2,
                            width: this.state.windowWidth / 4.2,
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                          onPress={() => { this.optionSetUpUseDiningTable(); }}
                        >
                          <Image
                            style={{ width: '100%', height: '100%', borderRadius: 100 }}
                            source={require('./../../assets/useDiningTable.png')}
                          />
                          <Text style={WaiterOrderStyle.itemMenuTitle}>???? ?????t</Text>

                        </TouchableOpacity>





                      </View>

                    </View>


                  </View>



                  <View style={WaiterOrderStyle.itemMenuContainerTouchable}>
                    <View style={WaiterOrderStyle.itemMenuContainerTouchableContentFoodType}>


                      <TouchableOpacity
                        style={{ marginLeft: '1%' }}
                        onPress={() => {
                          this.setState({
                            dataDiningTable: [],
                            dataDiningTableCart: [],
                            dataFood: [],
                            dataFoodCart: [],
                            outputDiningTableTotal: 0,
                            outputPriceTotal: 0,
                            flagDiningTable: true
                          });
                          setTimeout(this.componentDidMount, 50);
                        }}
                      >
                        <Icon

                          name='cached'
                          type='material'
                          color='white'
                        />



                      </TouchableOpacity>
                      <Text style={WaiterOrderStyle.title}>Danh s??ch b??n {this.state.outputDiningTableType}:</Text>

                    </View>

                  </View>
                  {this.state.flagDiningTable ?
                    <ActivityIndicator size="large" color="#DDDDDD" />
                    :
                    <FlatList

                      data={this.state.dataDiningTableType}
                      renderItem={this.renderDiningTableTypeItem}
                      keyExtractor={item => item.id}

                    />

                  }


                </View>
              </SafeAreaProvider>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
            </Animated.View>
          </View>
          : null}

        {this.state.status == 'orderdetails' ?
          <Animated.View
            style={[
              WaiterOrderStyle.container,
              {
                opacity: this.state.fadeAnimShipmentDrink
              }
            ]}>
            <TabView
              renderTabBar={this.renderTabBar}
              navigationState={{
                index: this.state.tabOrderDetail,
                routes: [
                  { key: 'orderDishDetail', title: 'M??n ??n' },
                  { key: 'orderDrinkDetail', title: '????? u???ng' },
                  { key: 'orderDiningTableDetail', title: 'B??n ph???' }
                ]
              }}
              renderScene={this.renderOrderDetail}
              onIndexChange={(index) => { this.setState({ tabOrderDetail: index }); }}
            />
            <View style={{ height: '1%' }}>
              <Text>
                {this.modalPaymentView(this.state.modalPayment)}
              </Text>
            </View>

          </Animated.View>
          : null}

        {this.state.status == 'foodview' ?
          <View style={WaiterOrderStyle.container}>

            <TabView
              renderTabBar={this.renderTabBar}
              navigationState={{
                index: this.state.tabIndex,
                routes: [
                  { key: 'orderDishHome', title: 'M??n ??n' },
                  { key: 'orderDrinkHome', title: '????? u???ng' },
                ]
              }}
              renderScene={this.renderScene}
              onIndexChange={(index) => { this.setState({ tabIndex: index }); if (index == 0) { this.optionSetUpDishType(); this.setState({ statusDish: true, statusDrink: false }); } else { this.optionSetUpDrinkType(); this.setState({ statusDish: false, statusDrink: true }); } }}
            />
          </View>
          : null}
        {this.state.status == 'orderfoodview' ?
          <SafeAreaProvider>
            <View style={WaiterOrderStyle.itemDetailOrderListContainer}>
              <Text></Text>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: this.state.windowWidth / 25 }}> Danh s??ch: </Text>
              <Text></Text>
              <FlatList
                style={{ borderWidth: 0.3, borderRadius: 10, borderColor: 'white' }}
                data={this.state.dataFoodCart}
                renderItem={this.renderItemDetailOrderFoodList}
                keyExtractor={item => item.id}
              />
              <Text></Text>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: this.state.windowWidth / 25 }}> Thu??? GTGT: 8%</Text>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: this.state.windowWidth / 25 }}> T???ng th??nh ti???n: {this.formatMoneyDatabasetoView(Number(this.state.outputPriceTotal) + (Number(this.state.outputPriceTotal) * 0.08))}</Text>
              <Text></Text>
              <View style={WaiterOrderStyle.itemDetailOrderListExtraContainer}>
                <TouchableOpacity onPress={() => { this.confirmOrder(); }}>
                  <Image
                    style={WaiterOrderStyle.itemDetailOrderListnextButton}
                    source={require('./../../assets/complete.png')}
                  />
                </TouchableOpacity>
                <Text>    </Text>
                <TouchableOpacity onPress={this.previousItemOrderFoodList}>
                  <Image
                    style={WaiterOrderStyle.itemDetailOrderListpreviousButton}
                    source={require('./../../assets/previous.png')}
                  />
                </TouchableOpacity>
              </View>

            </View>

          </SafeAreaProvider>

          : null}
        {this.state.status == 'orderdiningtableview' ?
          <View style={WaiterOrderStyle.container}>

            <Animated.View
              style={[
                WaiterOrderStyle.container,
                {
                  opacity: this.state.fadeAnimHome
                }
              ]}>
              <View>

                <Text style={{ paddingTop: '1%', paddingLeft: '3%', margin: '1%', color: 'white', fontWeight: 'bold', fontSize: this.state.windowWidth / 29 }}>T??n: {this.state.datasingleDiningTable.name}</Text>
                <Text style={{ paddingLeft: '3%', margin: '1%', color: 'white', fontWeight: 'bold', fontSize: this.state.windowWidth / 29 }}>Khu v???c: {this.state.datasingleDiningTable.area.name}</Text>
              </View>
              <SafeAreaProvider>

                <View style={ManagerWarehouseStyle.topcontainer}>
                  {this.modalDiningTableTypeView(this.state.modalDiningTableType)}

                  <TouchableOpacity
                    onPress={() => { this.setState({ modalDiningTableType: true }); }}

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
                    onChangeText={(search) => this.searchDiningTableItem(search)}
                    //value={this.state.inputSearch}
                    leftIcon={{ color: 'grey', type: 'material', name: 'search' }}
                    keyboardType='default' />
                </View>
                <View style={WaiterOrderStyle.bottomofadddiningtablecontainer}>

                  <View>




                  </View>



                  <View style={WaiterOrderStyle.itemMenuContainerTouchable}>
                    <View style={WaiterOrderStyle.itemMenuContainerTouchableContentFoodType}>


                      <TouchableOpacity
                        style={{ marginLeft: '1%' }}
                        onPress={() => {
                          this.setState({
                            dataDiningTable: [],
                            dataDiningTableCart: [],
                            dataFood: [],
                            dataFoodCart: [],
                            outputDiningTableTotal: 0,
                            outputPriceTotal: 0,
                            flagDiningTable: true
                          });
                          setTimeout(this.componentDidMount, 50);
                        }}
                      >
                        <Icon

                          name='cached'
                          type='material'
                          color='white'
                        />



                      </TouchableOpacity>
                      <Text style={WaiterOrderStyle.title}>Danh s??ch b??n tr???ng:</Text>

                    </View>

                  </View>
                  {this.state.flagDiningTable ?
                    <ActivityIndicator size="large" color="#DDDDDD" />
                    :
                    <FlatList
                      data={this.state.dataDiningTableType}
                      renderItem={this.renderDiningTableTypeItem}
                      keyExtractor={item => item.id}

                    />

                  }


                </View>
                <Text></Text>





              </SafeAreaProvider>
              <Text></Text>
              <View style={WaiterOrderStyle.setupItemCenterContainer}>

                <TouchableOpacity onPress={() => { this.setState({ statusUseDiningTableAdd: false, statusBlankDiningTable: false, statusUseDiningTable: true, status: 'orderdetails' });this.componentDidMount(); }} >
                  <Image
                    style={WaiterOrderStyle.cancelButton}
                    source={require('./../../assets/previous.png')}
                  />
                </TouchableOpacity>
              </View>
              <Text></Text>

            </Animated.View>
          </View>
          : null}
        {this.state.status == 'ordercompleteview' ?
          <SafeAreaProvider>
            <View style={WaiterOrderStyle.completeContainer}>
              <Text style={WaiterOrderStyle.completeTitle}>????n h??ng t???o th??nh c??ng</Text>
              <Text style={WaiterOrderStyle.completeText}>Vui l??ng ch??? x??? l??...</Text>
              <Text></Text>
              <TouchableOpacity onPress={() => {
                this.setState({ status: 'loading' })
                setTimeout(function () {
                  this.setState({ status: 'homeview' });
                }.bind(this), 1000);
                this.componentDidMount();
              }}>
                <Image
                  style={WaiterOrderStyle.completeLogo}
                  source={require('./../../assets/complete.png')}
                />
              </TouchableOpacity>


            </View>

          </SafeAreaProvider>

          : null}
        {this.state.status == 'billview' ?
          <this.BillView />
          : null}
        {this.state.status == 'loading' ?
          <SafeAreaProvider>
            <ImageBackground
              source={require('./../../assets/background.jpg')}
              style={{
                flex: 1,
                width: this.state.windowWidth,
                height: this.state.windowHeight + this.state.windowHeight / 20,
              }}
            >
            </ImageBackground>
            <AnimatedLoader
              visible={true}
              source={require("../../flag.json")}
              overlayColor=''
              animationStyle={WaiterOrderStyle.lottie}
              speed={1.5}
              style={WaiterOrderStyle.container}
            >

            </AnimatedLoader>
          </SafeAreaProvider>

          : null}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.users,
    count: state.countOrder,
    orderFoods: state.orderFoods,
    orderDiningTables: state.orderDiningTables,
    loading: state.loading

  }
};

export default connect(mapStateToProps)(WaiterOrderScreen);