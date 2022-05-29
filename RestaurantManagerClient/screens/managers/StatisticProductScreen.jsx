import React from 'react';
import { Alert, Animated, ActivityIndicator, Dimensions, Button, ScrollView, Text, View, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Badge } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { StatisticProductStyle } from '../../styles/LayoutStyle';
import { Input } from 'react-native-elements';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';
import { store } from '../../configs/ReduxStore';
import { host, port, dishListUrl, drinkListUrl, dishUpdateorderDishUrl, drinkUpdateorderDrinkUrl, notificationAddUrl, userListUrl, orderListUrl, orderUpdateUrl, userAddorderUserUrl } from '../../apis/ManagerApi';
import Modal from "react-native-modal";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DropDownPicker from 'react-native-dropdown-picker';
import Checkbox from 'expo-checkbox';






let userName;
let password;
let phone;
let name;
let role;
let birthDay;
let token;
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

class StatisticProductScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            tabIndex: 0,
            tabIndexDetail: 0,
            statusChef: 'homeview',
            modalSearch: false,
            modalSearchInitial: 0,
            data: [],
            dataOrderWaitHandle: [],
            dataSingleOrder: {},
            dataOrderDoing: [],
            dataOrderWaitShip: [],
            dataOrderDishDetail: [],
            dataOrderDrinkDetail: [],
            dataOrderDiningTableDetail: [],
            outputPriceTotal: '',
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

        if (this.state.tabIndex == 0) {
            var getAllFood_0 = [];
            var mainId = 0;
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
                            var getMaxDish = [];
                            var getDish = this.state.data;
                            var i = 0;
                            for (const element of dataJson) {
                                getMaxDish.push({ id: element.id, value: element.orders.length });
                            }
                            getMaxDish.sort(function (a, b) {
                                a = new Date(a.value);
                                b = new Date(b.value);
                                return a > b ? -1 : a < b ? 1 : 0;
                            });
                            for (const element_f of getMaxDish) {
                                for (const element_s of dataJson) {
                                    if (element_s.id == element_f.id) {

                                        i = i + 1;
                                        if (i <= 2) {
                                            getAllFood_0.push({ id: mainId, food: element_s });
                                            mainId = mainId + 1;
                                        }
                                    }


                                }
                            }

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
                                            var getMaxDrink = [];
                                            var getDrink = this.state.data;
                                            var i = 0;
                                            for (const element of dataJson) {
                                                getMaxDrink.push({ id: element.id, value: element.orders.length });
                                            }
                                            getMaxDrink.sort(function (a, b) {
                                                a = new Date(a.value);
                                                b = new Date(b.value);
                                                return a > b ? -1 : a < b ? 1 : 0;
                                            });
                                            for (const element_f of getMaxDrink) {
                                                for (const element_s of dataJson) {
                                                    if (element_s.id == element_f.id) {
                                                        i = i + 1;
                                                        if (i <= 2) {
                                                            getAllFood_0.push({ id: mainId, food: element_s });
                                                            mainId = mainId + 1;
                                                        }
                                                    }
                                                }
                                            }
                                            this.setState({ flag: false, data: getAllFood_0 });
                                        },
                                        1
                                    )

                                })
                                .catch(error => {
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


        if (this.state.tabIndex == 1) {
            var getAllFood_1 = [];
            var mainId_1 = 0;
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
                            var getMaxDish = [];
                            var getDish = this.state.data;
                            var i = 0;
                            for (const element of dataJson) {
                                getMaxDish.push({ id: element.id, value: element.orders.length });
                            }
                            getMaxDish.sort(function (a, b) {
                                a = new Date(a.value);
                                b = new Date(b.value);
                                return a > b ? 1 : a < b ? -1 : 0;
                            });
                            for (const element_f of getMaxDish) {
                                for (const element_s of dataJson) {
                                    if (element_s.id == element_f.id) {

                                        i = i + 1;
                                        if (i <= 2) {
                                            getAllFood_1.push({ id: mainId_1, food: element_s });
                                            mainId_1 = mainId_1 + 1;
                                        }
                                    }


                                }
                            }

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
                                            var getMaxDrink = [];
                                            var getDrink = this.state.data;
                                            var i = 0;
                                            for (const element of dataJson) {
                                                getMaxDrink.push({ id: element.id, value: element.orders.length });
                                            }
                                            getMaxDrink.sort(function (a, b) {
                                                a = new Date(a.value);
                                                b = new Date(b.value);
                                                return a > b ? 1 : a < b ? -1 : 0;
                                            });
                                            for (const element_f of getMaxDrink) {
                                                for (const element_s of dataJson) {
                                                    if (element_s.id == element_f.id) {
                                                        i = i + 1;
                                                        if (i <= 2) {
                                                            getAllFood_1.push({ id: mainId_1, food: element_s });
                                                            mainId_1 = mainId_1 + 1;
                                                        }
                                                    }
                                                }
                                            }
                                            this.setState({ flag: false, data: getAllFood_1 });
                                        },
                                        1
                                    )

                                })
                                .catch(error => {
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


        if (this.state.tabIndex == 2) {
            var getAllFood_2 = [];
            var mainId_2 = 0;
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
                            var getDish = [];
                            var getDishActual = this.state.data;
                            for (const element of getExtraDishOver) {
                                if (element.statusFood == 'Tạm hết') {
                                    for (const element_s of dataJson) {
                                        if (element.id == element_s.id) {
                                            getAllFood_2.push({ id: mainId_2, food: element_s });
                                            mainId_2=mainId_2+1;
                                        }
                                    }
                                }
                            }

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
                
                                            var getDrink = [];
                                            var getDrinkActual = this.state.data;
                                            for (const element of getExtraDrink) {
                                                if (element.statusFood == 'Tạm hết') {
                                                    getDrink.push({ id: element.id });
                                                }
                                            }
                                            for (const element_f of getDrink) {
                                                for (const element_s of dataJson) {
                                                    if (element_f.id == element_s.id) {
                                                        getAllFood_2.push({ id:mainId_2, food: element_s });
                                                        mainId_2=mainId_2+1;
                                                    }
                                                }
                                            }
                
                                            this.setState({ flag: false, data: getAllFood_2 });
                                        },
                                        1
                                    )
                
                                })
                                .catch(error => {
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
    }


    getStatisticProduct(index) {
        if (index == 0) {
            var getAllFood_0 = [];
            var mainId = 0;
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
                            var getMaxDish = [];
                            var getDish = this.state.data;
                            var i = 0;
                            for (const element of dataJson) {
                                getMaxDish.push({ id: element.id, value: element.orders.length });
                            }
                            getMaxDish.sort(function (a, b) {
                                a = new Date(a.value);
                                b = new Date(b.value);
                                return a > b ? -1 : a < b ? 1 : 0;
                            });
                            for (const element_f of getMaxDish) {
                                for (const element_s of dataJson) {
                                    if (element_s.id == element_f.id) {

                                        i = i + 1;
                                        if (i <= 2) {
                                            getAllFood_0.push({ id: mainId, food: element_s });
                                            mainId = mainId + 1;
                                        }
                                    }


                                }
                            }

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
                                            var getMaxDrink = [];
                                            var getDrink = this.state.data;
                                            var i = 0;
                                            for (const element of dataJson) {
                                                getMaxDrink.push({ id: element.id, value: element.orders.length });
                                            }
                                            getMaxDrink.sort(function (a, b) {
                                                a = new Date(a.value);
                                                b = new Date(b.value);
                                                return a > b ? -1 : a < b ? 1 : 0;
                                            });
                                            for (const element_f of getMaxDrink) {
                                                for (const element_s of dataJson) {
                                                    if (element_s.id == element_f.id) {
                                                        i = i + 1;
                                                        if (i <= 2) {
                                                            getAllFood_0.push({ id: mainId, food: element_s });
                                                            mainId = mainId + 1;
                                                        }
                                                    }
                                                }
                                            }
                                            this.setState({ flag: false, data: getAllFood_0 });
                                        },
                                        1
                                    )

                                })
                                .catch(error => {
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


        if (index == 1) {
            var getAllFood_1 = [];
            var mainId_1 = 0;
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
                            var getMaxDish = [];
                            var getDish = this.state.data;
                            var i = 0;
                            for (const element of dataJson) {
                                getMaxDish.push({ id: element.id, value: element.orders.length });
                            }
                            getMaxDish.sort(function (a, b) {
                                a = new Date(a.value);
                                b = new Date(b.value);
                                return a > b ? 1 : a < b ? -1 : 0;
                            });
                            for (const element_f of getMaxDish) {
                                for (const element_s of dataJson) {
                                    if (element_s.id == element_f.id) {

                                        i = i + 1;
                                        if (i <= 2) {
                                            getAllFood_1.push({ id: mainId_1, food: element_s });
                                            mainId_1 = mainId_1 + 1;
                                        }
                                    }


                                }
                            }

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
                                            var getMaxDrink = [];
                                            var getDrink = this.state.data;
                                            var i = 0;
                                            for (const element of dataJson) {
                                                getMaxDrink.push({ id: element.id, value: element.orders.length });
                                            }
                                            getMaxDrink.sort(function (a, b) {
                                                a = new Date(a.value);
                                                b = new Date(b.value);
                                                return a > b ? 1 : a < b ? -1 : 0;
                                            });
                                            for (const element_f of getMaxDrink) {
                                                for (const element_s of dataJson) {
                                                    if (element_s.id == element_f.id) {
                                                        i = i + 1;
                                                        if (i <= 2) {
                                                            getAllFood_1.push({ id: mainId_1, food: element_s });
                                                            mainId_1 = mainId_1 + 1;
                                                        }
                                                    }
                                                }
                                            }
                                            this.setState({ flag: false, data: getAllFood_1 });
                                        },
                                        1
                                    )

                                })
                                .catch(error => {
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


        if (index == 2) {
            var getAllFood_2 = [];
            var mainId_2 = 0;
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
                            var getDish = [];
                            var getDishActual = this.state.data;
                            for (const element of getExtraDishOver) {
                                if (element.statusFood == 'Tạm hết') {
                                    for (const element_s of dataJson) {
                                        if (element.id == element_s.id) {
                                            getAllFood_2.push({ id: mainId_2, food: element_s });
                                            mainId_2=mainId_2+1;
                                        }
                                    }
                                }
                            }

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
                
                                            var getDrink = [];
                                            var getDrinkActual = this.state.data;
                                            for (const element of getExtraDrink) {
                                                if (element.statusFood == 'Tạm hết') {
                                                    getDrink.push({ id: element.id });
                                                }
                                            }
                                            for (const element_f of getDrink) {
                                                for (const element_s of dataJson) {
                                                    if (element_f.id == element_s.id) {
                                                        getAllFood_2.push({ id:mainId_2, food: element_s });
                                                        mainId_2=mainId_2+1;
                                                    }
                                                }
                                            }
                
                                            this.setState({ flag: false, data: getAllFood_2 });
                                        },
                                        1
                                    )
                
                                })
                                .catch(error => {
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
                            if (dataJson.status == 'Đang chờ nhà bếp xử lý')
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
                        <View style={StatisticProductStyle.setupItemCenterContainer}></View>
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
            <View style={StatisticProductStyle.item}>

                <View style={{ flex: 1 }}>
                    <Text><Text style={{ fontWeight: 'bold' }}>Tên: </Text>{item.name}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Hình thức: </Text>{item.type}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Khu vực: </Text>{item.area.name}</Text>


                </View>
                <View>
                    <Image
                        style={StatisticProductStyle.logo}
                        source={require('./../../assets/diningtable.png')}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );

    orderFoodrenderItem = ({ item }) => (
        <TouchableOpacity onPress={() => { this.updateOrderFoodType(item); }}>
            <View style={StatisticProductStyle.item}>

                {this.state.tabIndex == 1 ?
                    <View>
                        {item.type == 'Đang chế biến' ?
                            <Checkbox
                                disabled={false}
                                value={false}
                                onValueChange={(value) => { }}
                            />
                            :
                            <Checkbox
                                disabled={false}
                                value={true}
                                onValueChange={(value) => { }}
                            />
                        }
                    </View>
                    : null}
                <View style={{ flex: 1 }}>
                    <Text><Text style={{ fontWeight: 'bold' }}>Mã: </Text>{item.food.id}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Tên: </Text>{item.food.name}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Loại: </Text>{item.foodType}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Đơn vị: </Text>{item.food.unit}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Giá: </Text>{this.formatMoneyDatabasetoView(item.food.price)}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Số lượng: </Text>{item.quantity}</Text>
                    {this.state.tabIndex != 0 ?
                        <Text style={{ fontWeight: 'bold' }}>{item.type}</Text>
                        : null}
                </View>
                <View>
                    <Image
                        style={StatisticProductStyle.logo}
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
                <View style={StatisticProductStyle.addExtraItemContainer}>

                    <View style={StatisticProductStyle.setupItemCenterContainer}>
                        <Text style={StatisticProductStyle.titleResourceDrink}>Thông tin đơn hàng: </Text>

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
                        <View style={StatisticProductStyle.setupItemCenterContainer}>
                            <TouchableOpacity onPress={() => { this.setState({ statusChef: 'homeview' }); }} >
                                <Image
                                    style={StatisticProductStyle.cancelButton}
                                    source={require('./../../assets/cancel.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={StatisticProductStyle.setupItemCenterContainer}>
                            <TouchableOpacity onPress={() => { this.tranferOrder(); }} >
                                <Image
                                    style={StatisticProductStyle.cancelButton}
                                    source={require('./../../assets/complete.png')}
                                />
                            </TouchableOpacity>
                            <Text>            </Text>
                            <TouchableOpacity onPress={() => { this.setState({ statusChef: 'homeview' }); }} >
                                <Image
                                    style={StatisticProductStyle.cancelButton}
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
                <View style={StatisticProductStyle.addExtraItemContainer}>

                    <View style={StatisticProductStyle.setupItemCenterContainer}>
                        <Text style={StatisticProductStyle.titleResourceDrink}>Thông tin đơn hàng: </Text>

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
                        <View style={StatisticProductStyle.setupItemCenterContainer}>
                            <TouchableOpacity onPress={() => { this.setState({ statusChef: 'homeview' }); }} >
                                <Image
                                    style={StatisticProductStyle.cancelButton}
                                    source={require('./../../assets/cancel.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={StatisticProductStyle.setupItemCenterContainer}>
                            <TouchableOpacity onPress={() => { this.tranferOrder(); }} >
                                <Image
                                    style={StatisticProductStyle.cancelButton}
                                    source={require('./../../assets/complete.png')}
                                />
                            </TouchableOpacity>
                            <Text>            </Text>
                            <TouchableOpacity onPress={() => { this.setState({ statusChef: 'homeview' }); }} >
                                <Image
                                    style={StatisticProductStyle.cancelButton}
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
                <View style={StatisticProductStyle.addExtraItemContainer}>

                    <View style={StatisticProductStyle.setupItemCenterContainer}>
                        <Text style={StatisticProductStyle.titleResourceDrink}>Thông tin đơn hàng: </Text>

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
                        <View style={StatisticProductStyle.setupItemCenterContainer}>
                            <TouchableOpacity onPress={() => { this.setState({ statusChef: 'homeview' }); }} >
                                <Image
                                    style={StatisticProductStyle.cancelButton}
                                    source={require('./../../assets/cancel.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={StatisticProductStyle.setupItemCenterContainer}>
                            <TouchableOpacity onPress={() => { this.tranferOrder(); }} >
                                <Image
                                    style={StatisticProductStyle.cancelButton}
                                    source={require('./../../assets/complete.png')}
                                />
                            </TouchableOpacity>
                            <Text>            </Text>
                            <TouchableOpacity onPress={() => { this.setState({ statusChef: 'homeview' }); }} >
                                <Image
                                    style={StatisticProductStyle.cancelButton}
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
    tranferOrder() {

        if (this.state.tabIndex == 0) {
            if (this.state.dataSingleOrder.status != 'Đang chờ nhà bếp xử lý') {

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
                                        detail: "Nhà bếp đã xác nhận đơn hàng",
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
            if (this.state.dataSingleOrder.status != 'Đang chế biến') {

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
                    "Xác nhận gọi phục vụ giao hàng?",
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

                                fetch(host + ':' + port + orderUpdateUrl + this.state.dataSingleOrder.id, {
                                    method: 'PUT',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + this.props.user.token,
                                    },
                                    body: JSON.stringify({

                                        type: this.state.dataSingleOrder.type,
                                        status: 'Đang chờ phòng phục vụ xử lý',
                                        vat: this.state.dataSingleOrder.vat,
                                        time: this.state.dataSingleOrder.time

                                    }),
                                })
                                    .then(response => response.text())
                                    .then(data => {
                                        console.log(data);
                                        this.componentDidMount();

                                        var getOrder = this.state.dataSingleOrder;
                                        getOrder.status = 'Đang chờ phòng phục vụ xử lý';
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

    }
    renderOrderWaitHandleItem = ({ item }) => (
        <TouchableOpacity >
            <View style={StatisticProductStyle.item}>
                <View style={{ flex: 1 }}>
                    <Text>Mã: {item.food.id}</Text>
                    <Text>Tên: {item.food.name}</Text>
                    <Text>Đơn vị: {item.food.unit}</Text>
                    <Text>Mô tả: {item.food.description}</Text>
                    <Text>Giá: {this.formatMoneyDatabasetoView(item.food.price)}</Text>
                </View>
                <View>
                    <Image
                        style={StatisticProductStyle.logo}
                        source={{
                            uri: item.food.urlImage + '/',
                        }}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
    OrderWaitHandleView = () => {
        return (
            <View>

                <View style={StatisticProductStyle.bottomcontainer}>
                    <View style={StatisticProductStyle.itemMenuContainerTouchable}>
                        <View style={StatisticProductStyle.itemMenuContainerTouchableContentFoodType}>


                            <TouchableOpacity
                                style={{ marginLeft: '1%' }}
                                onPress={() => {
                                    this.setState({ flag: true });
                                    this.getStatisticProduct(this.state.tabIndex);
                                }}
                            >
                                <Icon

                                    name='cached'
                                    type='material'
                                    color='white'
                                />



                            </TouchableOpacity>
                            <Text style={StatisticProductStyle.title}>Danh sách:</Text>

                        </View>

                    </View>
                    {this.state.flag ?
                        <ActivityIndicator size="large" color="#DDDDDD" />
                        :
                        <FlatList
                            data={this.state.data}
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


                <View style={StatisticProductStyle.bottomcontainer}>
                    <View style={StatisticProductStyle.itemMenuContainerTouchable}>
                        <View style={StatisticProductStyle.itemMenuContainerTouchableContentFoodType}>


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
                            <Text style={StatisticProductStyle.title}>Danh sách:</Text>

                        </View>

                    </View>
                    {this.state.flag ?
                        <ActivityIndicator size="large" color="#DDDDDD" />
                        :
                        <FlatList
                            data={this.state.data}
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

                <View style={StatisticProductStyle.bottomcontainer}>
                    <View style={StatisticProductStyle.itemMenuContainerTouchable}>
                        <View style={StatisticProductStyle.itemMenuContainerTouchableContentFoodType}>


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
                            <Text style={StatisticProductStyle.title}>Danh sách:</Text>

                        </View>

                    </View>
                    {this.state.flag ?
                        <ActivityIndicator size="large" color="#DDDDDD" />
                        :
                        <FlatList
                            data={this.state.data}
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
    render() {
        return (
            <View style={StatisticProductStyle.container}>
                <SafeAreaProvider>
                    {this.state.statusChef == 'homeview' ?
                        <TabView
                            renderTabBar={this.renderTabBar}
                            navigationState={{
                                index: this.state.tabIndex,
                                routes: [
                                    { key: 'orderWaitHandle', title: 'Bán nhiều' },
                                    { key: 'orderDoing', title: 'Bán ít' },
                                    { key: 'orderWaitShip', title: 'Hết hàng' }
                                ]
                            }}
                            renderScene={this.renderScene}
                            onIndexChange={(index) => { this.setState({ flag: true, tabIndex: index }); this.getStatisticProduct(index); }}
                        />
                        : null}
                    {this.state.statusChef == 'orderview' ?
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

export default connect(mapStateToProps)(StatisticProductScreen);
