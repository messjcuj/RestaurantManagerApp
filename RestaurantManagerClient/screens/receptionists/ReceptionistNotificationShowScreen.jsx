import React from 'react';
import { ActivityIndicator, Animated, Button, ScrollView, Text, View, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Icon, Badge } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { ReceptionistNotificationStyle } from '../../styles/LayoutStyle';
import { AppStyle } from '../../styles/LayoutStyle';
import { LinearGradient } from 'expo-linear-gradient';
import { Input } from 'react-native-elements';
import { host, port, notificationListUrl, orderListUrl, notificationUpdateUrl } from '../../apis/ManagerApi';
import { connect } from 'react-redux';
import { store } from '../../configs/ReduxStore';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';







class ReceptionistReceptionistNotificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: true,
            dataNotification: [],
            tabIndexDetail: 0,
            dataSingleOrder: { id: '', status: '', time: '' },
            status: 'homeview',
            dataOrderDishDetail: [],
            dataOrderDrinkDetail: [],
            dataOrderDiningTableDetail: []
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

        fetch(host + ':' + port + notificationListUrl, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
            }
        })
            .then(response => response.json())
            .then(dataJson => {
                setTimeout(
                    () => {
                        var getNotification = [];
                        for (const element of dataJson) {
                            if (element.detail == 'Qu???y thu ng??n nh???n ???????c m???t y??u c???u thanh to??n m???i' && element.status == false) {
                                getNotification.push(element);
                            }
                            getNotification.sort(function (a, b) {
                                a = new Date(a.id);
                                b = new Date(b.id);
                                return a > b ? -1 : a < b ? 1 : 0;
                            })

                        }
                        this.setState({ flag: false, dataNotification: getNotification });
                    },
                    1
                )

            })
            .catch(error => {
                console.log(error);
            });



        this._interval = setInterval(() => {
            fetch(host + ':' + port + notificationListUrl, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.user.token,
                }
            })
                .then(response => response.json())
                .then(dataJson => {
                    setTimeout(
                        () => {
                            var getNotification = [];
                            for (const element of dataJson) {
                                if (element.detail == 'Qu???y thu ng??n nh???n ???????c m???t y??u c???u thanh to??n m???i' && element.status == false) {
                                    getNotification.push(element);
                                }
                                getNotification.sort(function (a, b) {
                                    a = new Date(a.id);
                                    b = new Date(b.id);
                                    return a > b ? -1 : a < b ? 1 : 0;
                                })

                            }
                            this.setState({ flag: false, dataNotification: getNotification });
                        },
                        1
                    )

                })
                .catch(error => {
                    console.log(error);
                });
        }, 10000);






    }
    componentWillUnmount() {
        clearInterval(this._interval);
    }
    setNotification(item) {
        fetch(host + ':' + port + notificationUpdateUrl + item.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            body: JSON.stringify({
                name: item.name,
                detail: item.detail,
                status: true,
                user: {
                    id: item.user.id
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
    getOrderDetail(id) {
        fetch(host + ':' + port + orderListUrl + id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
            }
        })
            .then(response => response.json())
            .then(dataJson => {
                setTimeout(
                    () => {
                        var getDishOrder = [];
                        var getDrinkOrder = [];
                        var getPriceToTal = 0;
                        var i = 0;
                        var getOrderDiningTable = [];
                        for (const element_f of dataJson.dishs) {
                            getDishOrder.push({ id: i, foodType: 'M??n ??n', food: element_f.dish, quantity: element_f.quantity, price: element_f.price, unit: element_f.unit, type: element_f.type });
                            getPriceToTal = getPriceToTal + (element_f.dish.price * element_f.quantity);
                            i = i + 1;
                        }
                        for (const element_s of dataJson.drinks) {
                            getDrinkOrder.push({ id: i, foodType: '????? u???ng', food: element_s.drink, quantity: element_s.quantity, price: element_s.price, unit: element_s.unit, type: element_s.type });
                            getPriceToTal = getPriceToTal + (element_s.drink.price * element_s.quantity);
                            i = i + 1;
                        }

                        for (const element of dataJson.diningTables) {
                            getOrderDiningTable.push(element.diningTable);
                        }
                        this.setState({ dataOrderDiningTableDetail: getOrderDiningTable });

                        this.setState({ flag: false, dataSingleOrder: dataJson, outputPriceTotal: getPriceToTal, dataOrderDishDetail: getDishOrder, dataOrderDrinkDetail: getDrinkOrder, dataSingleDiningTable: getOrderDiningTable });

                    },
                    1
                )

            })
            .catch(error => {
                console.log(error);
            });

    }
    orderDiningTablerenderItem = ({ item }) => (
        <View>
            <View style={ReceptionistNotificationStyle.item}>

                <View style={{ flex: 1 }}>
                    <Text><Text style={{ fontWeight: 'bold' }}>M??: </Text>{item.id}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>T??n: </Text>{item.name}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Khu v???c: </Text>{item.area.name}</Text>


                </View>
                <View>
                    <Image
                        style={ReceptionistNotificationStyle.logo}
                        source={require('./../../assets/diningtable.png')}
                    />
                </View>
            </View>
        </View>
    );

    orderFoodrenderItem = ({ item }) => (
        <View>
            <View style={ReceptionistNotificationStyle.item}>

                <View style={{ flex: 1 }}>
                    <Text><Text style={{ fontWeight: 'bold' }}>M??: </Text>{item.food.id}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>T??n: </Text>{item.food.name}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Lo???i: </Text>{item.foodType}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>????n v???: </Text>{item.food.unit}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>H??nh th???c: </Text>{item.type}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Gi??: </Text>{this.formatMoneyDatabasetoView(item.food.price)}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>S??? l?????ng: </Text>{item.quantity}</Text>

                </View>
                <View>
                    <Image
                        style={ReceptionistNotificationStyle.logo}
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
                <View style={ReceptionistNotificationStyle.addExtraItemContainer}>

                    <View style={ReceptionistNotificationStyle.setupItemCenterContainer}>
                        <Text style={ReceptionistNotificationStyle.titleResourceDrink}>Th??ng tin ????n h??ng: </Text>

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
                    <View style={ReceptionistNotificationStyle.setupItemCenterContainer}>
                        <TouchableOpacity onPress={() => { this.setState({ status: 'homeview' }); this.componentDidMount(); }} >
                            <Image
                                style={ReceptionistNotificationStyle.cancelButton}
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
                <View style={ReceptionistNotificationStyle.addExtraItemContainer}>

                    <View style={ReceptionistNotificationStyle.setupItemCenterContainer}>
                        <Text style={ReceptionistNotificationStyle.titleResourceDrink}>Th??ng tin ????n h??ng: </Text>

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
                    <View style={ReceptionistNotificationStyle.setupItemCenterContainer}>
                        <TouchableOpacity onPress={() => { this.setState({ status: 'homeview' }); this.componentDidMount(); }} >
                            <Image
                                style={ReceptionistNotificationStyle.cancelButton}
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
                <View style={ReceptionistNotificationStyle.addExtraItemContainer}>

                    <View style={ReceptionistNotificationStyle.setupItemCenterContainer}>
                        <Text style={ReceptionistNotificationStyle.titleResourceDrink}>Th??ng tin ????n h??ng: </Text>

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
                    <View style={ReceptionistNotificationStyle.setupItemCenterContainer}>
                        <TouchableOpacity onPress={() => { this.setState({ status: 'homeview' }); this.componentDidMount(); }} >
                            <Image
                                style={ReceptionistNotificationStyle.cancelButton}
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
    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => { this.setNotification(item); this.getOrderDetail(item.name); this.setState({ flag: true, status: 'detailview' }); }}>
            <View style={ReceptionistNotificationStyle.item}>
                <View style={{ flex: 1 }}>
                    <Text>Th??ng b??o</Text>
                    <Text>{this.formatLocalDateTimeDatabaseToView(item.time)}</Text>
                    <Text>{item.detail}</Text>
                </View>
                <View><Image
                    style={ReceptionistNotificationStyle.logo}
                    source={require('./../../assets/message.png')}
                />
                </View>
            </View>
        </TouchableOpacity>
    );
    renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: '#103667' }}
        />
    );
    render() {
        return (

            <View style={ReceptionistNotificationStyle.container}>
                {this.state.status == 'homeview' ?
                    <SafeAreaProvider>

                        {this.state.flag ?
                            <View>
                                <Text></Text>
                                <ActivityIndicator size="large" color="#DDDDDD" />
                            </View>

                            :
                            <FlatList
                                style={{ marginBottom: '5%' }}
                                data={this.state.dataNotification}
                                renderItem={this.renderItem}
                                keyExtractor={item => item.id}
                            />
                        }

                    </SafeAreaProvider>
                    : null}
                {this.state.status == 'detailview' ?
                    <SafeAreaProvider>
                         {this.state.flag ?
                            <View>
                                <Text></Text>
                                <ActivityIndicator size="large" color="#DDDDDD" />
                            </View>

                            :
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
    }
                    </SafeAreaProvider>
                    : null}

            </View>
        );
    }
}

const mapStateToProps = state => {
    return { user: state.users }
};

export default connect(mapStateToProps)(ReceptionistReceptionistNotificationScreen);