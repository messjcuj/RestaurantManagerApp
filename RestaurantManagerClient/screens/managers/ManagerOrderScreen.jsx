import React from 'react';
import { Button, Animated, Dimensions, Alert, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { ManagerOrderStyle } from '../../styles/LayoutStyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { host, port, orderSearchUrl, orderListUrl, orderAddUrl, orderDeleteUrl, orderUpdateUrl } from '../../apis/ManagerApi';
import { Icon } from 'react-native-elements';
import AnimatedLoader from "react-native-animated-loader";
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';


class ManagerOrderScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchModal: false,
            searchModalInitial: 0,
            fadeAnimUpdate: new Animated.Value(0),
            fadeAnimAdd: new Animated.Value(0),
            fadeAnimHome: new Animated.Value(0),
            id: '',
            inputAddName: '',
            inputAddPassword: '',
            inputUpdateName: '',
            inputUpdateDescription: '',
            windowWidth: Dimensions.get('window').width,
            windowHeight: Dimensions.get('window').height,
            status: 'homeview',
            flag: true,
            data: [],
            dataOrderDishDetail: [],
            dataOrderDrinkDetail: [],
            dataOrderDiningTableDetail: [],
            error: '',
            tabIndexDetail: 0
        };
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
        Animated.timing(this.state.fadeAnimHome, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
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
                            if (element.status == 'Đã thanh toán') {
                                getOrder.push(element);
                            }
                        }
                        this.setState({ flag: false, data: getOrder });
                    },
                    200
                )

            })
            .catch(error => {
                console.log(error);
            });
    }

    searchModalView(isVisible) {
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    isVisible={isVisible}
                >
                    <View style={ManagerOrderStyle.searchContainer}>
                        <Text>Tìm kiếm theo:</Text>
                        <Text></Text>
                        <RadioForm
                            radio_props={
                                [{ label: 'Mã', value: 0 }]
                            }
                            initial={this.state.searchModalInitial}
                            onPress={(value) => { this.setState({ searchModalInitial: value }) }}
                        />
                        <Text></Text>
                        <Button title="Xác nhận" onPress={() => { this.setState({ searchModal: false }); }} />
                    </View>
                </Modal>
            </View>
        );
    }
    searchItem(value) {
        this.setState({ flag: true });
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
                        this.setState({ flag: false, data: [dataJson] });


                        //console.log(this.state.data);
                    },
                    200
                )

            })
            .catch(error => {
                this.componentDidMount();
                console.log(error);
            });




    }

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
    
        this.setState({ flagOrderDiningTableDetail: false, flagOrderDishDetail: false, flagOrderDrinkDetail: false, outputPriceTotal: getPriceToTal, dataOrderDishDetail: getDishOrder, dataOrderDrinkDetail: getDrinkOrder, dataSingleDiningTable: getOrderDiningTable, dataDrinkById: item,status:'detailview' });
      }
    deleteItem = (id) => {

        Alert.alert(
            "Thông báo",
            "Chắc chắn xóa?",
            [
                {
                    text: "Hủy",
                    onPress: () => {
                        this.setState({ status: 'homeview' });
                    }
                },
                {
                    text: "Đồng ý", onPress: () => {
                        fetch(host + ':' + port + orderDeleteUrl + id, {
                            method: 'DELETE',
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                                'Authorization': 'Bearer ' + this.props.user.token,
                            },
                            body: JSON.stringify({ ten: this.state.inputAddName, moTa: this.state.inputAddDescription }),
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.error == 'Internal Server Error') {
                                    Alert.alert(
                                        "Thông báo",
                                        "Không thể xóa nhà kho vì lý do bảo toàn dữ liệu",
                                        [
                                            {
                                                text: "Đóng",
                                                onPress: () => { this.setState({}); },
                                                style: "cancel"
                                            }
                                        ]
                                    );
                                }
                                this.setState({ fadeAnimAdd: new Animated.Value(0), fadeAnimUpdate: new Animated.Value(0), fadeAnimHome: new Animated.Value(0), status: 'homeview', });

                                setTimeout(() => {
                                    Animated.timing(this.state.fadeAnimHome, {
                                        toValue: 1,
                                        duration: 50,
                                        useNativeDriver: true
                                    }).start();
                                    this.componentDidMount();
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
    addItem = () => {
        this.setState({ status: 'addview' });

        Animated.timing(this.state.fadeAnimAdd, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
        //this.fadeOut();
    }
    addItemView = () => {
        return (
            <Animated.View
                style={[
                    ManagerOrderStyle.container,
                    {
                        // Bind opacity to animated value
                        opacity: this.state.fadeAnimAdd
                    }
                ]}
            >

                <SafeAreaProvider>
                    <View style={ManagerOrderStyle.setupItem}>
                        <Text style={ManagerOrderStyle.title}>Thêm nhà kho mới: </Text>
                        <View style={ManagerOrderStyle.setupItemCenterContainer}><Text style={ManagerOrderStyle.error}>{this.state.error}</Text></View>
                        <Input
                            inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                            inputContainerStyle={{ borderRadius: 10, marginTop: '2%', backgroundColor: 'white' }}
                            leftIconContainerStyle={{ paddingLeft: '5%' }}
                            name='name'
                            placeholder='Tên'
                            placeholderTextColor="#999999"
                            onChangeText={(name) => this.setState({ inputAddName: name })}
                            value={this.state.inputAddName}
                            leftIcon={{ color: 'grey', type: 'material', name: 'rtt' }}
                            keyboardType='default' />
                        <Input
                            inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                            inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
                            leftIconContainerStyle={{ paddingLeft: '5%' }}
                            name='description'
                            placeholder='Mô tả'
                            placeholderTextColor="#999999"
                            onChangeText={(description) => this.setState({ inputAddDescription: description })}
                            value={this.state.inputAddDescription}
                            underlineColorAndroid="white"
                            leftIcon={{ color: 'grey', type: 'material', name: 'description' }}
                            keyboardType='default' />
                        <View style={ManagerOrderStyle.setupItemCenterContainer}>
                            <TouchableOpacity onPress={this.saveAddItem}>
                                <Image
                                    style={ManagerOrderStyle.saveButton}
                                    source={require('./../../assets/save.png')}
                                />
                            </TouchableOpacity>
                            <Text style={{ margin: '5%' }}></Text>
                            <TouchableOpacity onPress={this.cancelItem}>
                                <Image
                                    style={ManagerOrderStyle.cancelButton}
                                    source={require('./../../assets/cancel.png')}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>

                </SafeAreaProvider>


            </Animated.View>
        )
    }
    updateItem = (item) => {
        this.setState({ id: item.id, inputUpdateName: item.name, inputUpdateDescription: item.description, status: 'updateview' });
        Animated.timing(this.state.fadeAnimUpdate, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
        //this.fadeOut();
    }
    updateItemView = () => {
        return (
            <Animated.View
                style={[
                    ManagerOrderStyle.container,
                    {
                        // Bind opacity to animated value
                        opacity: this.state.fadeAnimUpdate
                    }
                ]}
            >
                <SafeAreaProvider>
                    <View style={ManagerOrderStyle.setupItem}>
                        <Text style={ManagerOrderStyle.title}>Cập nhật nhà kho: {this.state.id}</Text>
                        <View style={ManagerOrderStyle.setupItemCenterContainer}><Text style={ManagerOrderStyle.error}>{this.state.error}</Text></View>
                        <Input
                            inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                            inputContainerStyle={{ borderRadius: 10, marginTop: '2%', backgroundColor: 'white' }}
                            leftIconContainerStyle={{ paddingLeft: '5%' }}
                            name='name'
                            placeholder='Tên'
                            placeholderTextColor="#999999"
                            onChangeText={(name) => this.setState({ inputUpdateName: name })}
                            value={this.state.inputUpdateName}
                            leftIcon={{ color: 'grey', type: 'material', name: 'rtt' }}
                            keyboardType='default' />
                        <Input
                            inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                            inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
                            leftIconContainerStyle={{ paddingLeft: '5%' }}
                            name='description'
                            placeholder='Mô tả'
                            placeholderTextColor="#999999"
                            onChangeText={(description) => this.setState({ inputUpdateDescription: description })}
                            value={this.state.inputUpdateDescription}
                            leftIcon={{ color: 'grey', type: 'material', name: 'description' }}
                            keyboardType='default' />
                        <View style={ManagerOrderStyle.setupItemCenterContainer}>
                            <TouchableOpacity onPress={this.saveUpdateItem}>
                                <Image
                                    style={ManagerOrderStyle.saveButton}
                                    source={require('./../../assets/save.png')}
                                />
                            </TouchableOpacity>
                            <Text style={{ margin: '5%' }}></Text>
                            <TouchableOpacity onPress={this.cancelItem}>
                                <Image
                                    style={ManagerOrderStyle.cancelButton}
                                    source={require('./../../assets/cancel.png')}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>

                </SafeAreaProvider>

            </Animated.View>
        )
    }

    renderItem = ({ item }) => (
        <View>
            <View style={ManagerOrderStyle.item}>
                <TouchableOpacity onPress={() => { this.setState({dataSingleOrder:item});this.orderDetailItem(item); }}>
                    <Image
                        style={ManagerOrderStyle.itemDetailListPlus}
                        source={require('./../../assets/next.png')}
                    />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text>Mã: {item.id}</Text>
                    <Text>Thời gian: {this.formatLocalDateTimeDatabaseToView(item.time)}</Text>
                    <Text>Mô tả: {item.status}</Text>
                </View>
                <View><Image
                    style={ManagerOrderStyle.logo}
                    source={require('./../../assets/order.png')}
                />
                </View>
            </View>
        </View>
    );
    saveAddItem = () => {
        if (this.state.inputAddName == '' || this.state.inputAddDescription == '') {
            this.setState({ error: 'Tên hoặc mô tả không hợp lệ!' });
            return;
        }
        var regName = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
        var regDescription = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
        if (!(regName.test(this.state.inputAddName))) {
            this.setState({ error: 'Tên không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if (!(regDescription.test(this.state.inputAddDescription))) {
            this.setState({ error: 'Mô tả không hợp lệ!' }); return;
        }

        this.setState({ status: 'homeview', flag: true });
        fetch(host + ':' + port + orderAddUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            body: JSON.stringify({ name: this.state.inputAddName, description: this.state.inputAddDescription }),
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                Alert.alert(
                    "Thông báo",
                    "Thêm thành công!",
                    [
                        {
                            text: "Xác nhận",
                            onPress: () => {
                                this.setState({ inputAddDescription: '', inputAddName: '', error: '', fadeAnimAdd: new Animated.Value(0), fadeAnimUpdate: new Animated.Value(0), fadeAnimHome: new Animated.Value(0), flag: false });
                                setTimeout(() => {
                                    Animated.timing(this.state.fadeAnimHome, {
                                        toValue: 1,
                                        duration: 50,
                                        useNativeDriver: true
                                    }).start();
                                    this.componentDidMount();
                                }, 50);
                            },
                        },
                    ]
                );
            })
            .catch((error) => {

                console.log(error);

            });
    }
    saveUpdateItem = () => {
        if (this.state.inputUpdateName == '' || this.state.inputUpdateDescription == '') {
            this.setState({ error: 'Tên hoặc mô tả không hợp lệ!' });
            return;
        }
        var regName = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
        var regDescription = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
        if (!(regName.test(this.state.inputUpdateName))) {
            this.setState({ error: 'Tên không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if (!(regDescription.test(this.state.inputUpdateDescription))) {
            this.setState({ error: 'Mô tả không hợp lệ!' }); return;
        }
        this.setState({ flag: true, status: 'homeview' });
        fetch(host + ':' + port + orderUpdateUrl + this.state.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            body: JSON.stringify({ name: this.state.inputUpdateName, description: this.state.inputUpdateDescription }),
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                Alert.alert(
                    "Thông báo",
                    "Cập nhật thành công!",
                    [
                        {
                            text: "Xác nhận",
                            onPress: () => {
                                this.setState({ inputUpdateDescription: '', inputUpdateName: '', error: '', fadeAnimAdd: new Animated.Value(0), fadeAnimUpdate: new Animated.Value(0), fadeAnimHome: new Animated.Value(0) });
                                setTimeout(() => {
                                    Animated.timing(this.state.fadeAnimHome, {
                                        toValue: 1,
                                        duration: 50,
                                        useNativeDriver: true
                                    }).start();
                                    this.componentDidMount();
                                }, 50);
                            },
                        },
                    ]
                );
            })
            .catch((error) => {

                console.log(error);

            });

    }
    cancelItem = () => {
        this.setState({ fadeAnimAdd: new Animated.Value(0), fadeAnimUpdate: new Animated.Value(0), fadeAnimHome: new Animated.Value(0), status: 'homeview', });

        setTimeout(() => {
            Animated.timing(this.state.fadeAnimHome, {
                toValue: 1,
                duration: 50,
                useNativeDriver: true
            }).start();
            this.componentDidMount();
        }, 50);
    }


    orderDiningTablerenderItem = ({ item }) => (
        <View>
            <View style={ManagerOrderStyle.item}>

                <View style={{ flex: 1 }}>
                    <Text><Text style={{ fontWeight: 'bold' }}>Tên: </Text>{item.name}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Hình thức: </Text>{item.type}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Khu vực: </Text>{item.area.name}</Text>


                </View>
                <View>
                    <Image
                        style={ManagerOrderStyle.logo}
                        source={require('./../../assets/diningtable.png')}
                    />
                </View>
            </View>
        </View>
    );

    orderFoodrenderItem = ({ item }) => (
        <View>
            <View style={ManagerOrderStyle.item}>

                <View style={{ flex: 1 }}>
                    <Text><Text style={{ fontWeight: 'bold' }}>Mã: </Text>{item.food.id}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Tên: </Text>{item.food.name}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Loại: </Text>{item.foodType}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Đơn vị: </Text>{item.food.unit}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Giá: </Text>{this.formatMoneyDatabasetoView(item.food.price)}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Số lượng: </Text>{item.quantity}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{item.type}</Text>
                </View>
                <View>
                    <Image
                        style={ManagerOrderStyle.logo}
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
                <View style={ManagerOrderStyle.addExtraItemContainer}>

                    <View style={ManagerOrderStyle.setupItemCenterContainer}>
                        <Text style={ManagerOrderStyle.titleResourceDrink}>Thông tin đơn hàng: </Text>

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
                    <View style={ManagerOrderStyle.setupItemCenterContainer}>
                        <TouchableOpacity onPress={() => { this.setState({ status: 'homeview' }); this.componentDidMount(); }} >
                            <Image
                                style={ManagerOrderStyle.cancelButton}
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
                <View style={ManagerOrderStyle.addExtraItemContainer}>

                    <View style={ManagerOrderStyle.setupItemCenterContainer}>
                        <Text style={ManagerOrderStyle.titleResourceDrink}>Thông tin đơn hàng: </Text>

                    </View>

                    <Text style={{ color: 'white' }}>Mã: {this.state.dataSingleOrder.id}</Text>
                    <Text style={{ color: 'white' }}>Trạng thái: {this.state.dataSingleOrder.status}</Text>
                    <Text style={{ color: 'white' }}>Thời gian: {this.formatLocalDateTimeDatabaseToView(this.state.dataSingleOrder.time)}</Text>
                    <Text></Text>
                    {this.state.flag ?
                        <ActivityIndicator size="large" color="#DDDDDD" />
                        :
                        <FlatList
                            style={{ backgroundColor: 'white', borderRadius: 15 }}
                            data={this.state.dataOrderDishDetail}
                            renderItem={this.orderFoodrenderItem}
                            keyExtractor={item => item.id}
                        />
                    }
                    <Text></Text>
                    <View style={ManagerOrderStyle.setupItemCenterContainer}>
                        <TouchableOpacity onPress={() => { this.setState({ status: 'homeview' }); this.componentDidMount(); }} >
                            <Image
                                style={ManagerOrderStyle.cancelButton}
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
                <View style={ManagerOrderStyle.addExtraItemContainer}>

                    <View style={ManagerOrderStyle.setupItemCenterContainer}>
                        <Text style={ManagerOrderStyle.titleResourceDrink}>Thông tin đơn hàng: </Text>

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
                    <View style={ManagerOrderStyle.setupItemCenterContainer}>
                        <TouchableOpacity onPress={() => { this.setState({ status: 'homeview' }); this.componentDidMount(); }} >
                            <Image
                                style={ManagerOrderStyle.cancelButton}
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
    renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: '#103667' }}
        />
    );
    render() {
        return (
            <View style={ManagerOrderStyle.container}>
                {this.state.status == 'homeview' ?
                    <View style={ManagerOrderStyle.container}>
                        <Animated.View
                            style={[
                                ManagerOrderStyle.container,
                                {
                                    opacity: this.state.fadeAnimHome
                                }
                            ]}>
                            <SafeAreaProvider>

                                <View style={ManagerOrderStyle.topcontainer}>

                                    {this.searchModalView(this.state.searchModal)}
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

                                <View style={ManagerOrderStyle.centercontainer}>
                                    <Text style={ManagerOrderStyle.title}>Danh sách:</Text>
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
                        </Animated.View>
                    </View>

                    : null}

                {this.state.status == 'addview' ?
                    <this.addItemView />
                    : null}
                {this.state.status == 'updateview' ?
                    <this.updateItemView />
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
                                        { key: 'orderDishDetail', title: 'Món ăn' },
                                        { key: 'orderDrinkDetail', title: 'Đồ uống' },
                                        { key: 'orderDiningTableDetail', title: 'Bàn ăn' }
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

export default connect(mapStateToProps)(ManagerOrderScreen);