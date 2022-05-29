import React from 'react';
import { LogBox, Animated, ScrollView, Dimensions, Alert, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity,Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import {  Input } from 'react-native-elements';
import { ManagerDrinkStyle } from '../../styles/LayoutStyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { host, port, shipmentAddUrl, shipmentAddShipmentDrinkUrl, shipmentDeleteShipmentDrinkByShipmentDrinkIdUrl, shipmentDeleteShipmentDrinkByDrinkIdUrl, shipmentUpdateShipmentDrinkUrl, warehouseListUrl, drinkSearchUrl, drinkAddUrl, drinkDeleteUrl, drinkListUrl, drinkUpdateUrl, drinkTypeListUrl } from '../../apis/ManagerApi';
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
import ManagerDrinkTypeScreen from './ManagerDrinkTypeScreen';
const { firebaseConfig } = require('../../configs/Firebase');

class ManagerDrinkScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchModal: false,
            searchModalInitial: 1,
            shipmentDrinkModal: false,
            shipmentDrinkModalInitial: 1,
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
            outputShipmentDrinkPreserveTime: null,
            flagShipmentDrinkPreserve: false,
            inputShipmentDrinkPrice: '',
            optionWarehouse: '',
            optionWarehouseSetup: false,
            optionDrinkType: '',
            optionDrinkTypeSetup: false,
            windowWidth: Dimensions.get('window').width,
            windowHeight: Dimensions.get('window').height,
            status: 'homeview',
            statusShipmentDrink: 'homeview',
            flag: true,
            flagDrink: false,
            flagView:'',
            data: [],
            dataShipment: {},
            dataShipmentDrink: [],
            dataDrinkById: { id: '', name: '' },
            dataShipmentDrinkToUpdate: {},
            dataRole: [],
            timKiem: '',
            error: '',
            resourceDrinkQuantityTotal: 0,
            presentTime: new Date(Date.now())
        };
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

    componentDidMount = () => {
        LogBox.ignoreLogs(['Setting a timer']);
        // Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
        Animated.timing(this.state.fadeAnimHome, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
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
                        this.setState({ optionDrinkType: getDrinkType });
                    },
                    200
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
                        this.setState({ flag: false, data: dataJson, });
                        //console.log(this.state.data[0]);
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
                    <View style={ManagerDrinkStyle.searchContainer}>
                        <Text>Tìm kiếm theo:</Text>
                        <Text></Text>
                        <RadioForm
                            radio_props={
                                [
                                    { label: 'Mã', value: 0 },
                                    { label: 'Tên', value: 1 },
                                    { label: 'Đơn vị', value: 2 },
                                    { label: 'Giá', value: 3 },

                                ]
                            }
                            initial={this.state.searchModalInitial}
                            onPress={(value) => { this.setState({ searchModalInitial: value }) }}
                        />
                        <Button title="Xác nhận" onPress={() => { this.setState({ searchModal: false }); }} />
                    </View>
                </Modal>
            </View>
        );
    }
    searchItem(value) {
        this.setState({ flag: true });
        if (value == '') { this.componentDidMount(); return; }
        if (this.state.searchModalInitial == 0) {
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
                            //console.log(dataJson);
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
        if (this.state.searchModalInitial == 1) {
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

                            this.setState({ flag: false, data: dataJson });
                            //console.log(host + ':' + port + drinkSearchUrl + 'name='+value+'&price=&unit=');
                        },
                        200
                    )

                })
                .catch(error => {
                    this.componentDidMount();
                    console.log(error);
                });
        }
        if (this.state.searchModalInitial == 2) {

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
                            this.setState({ flag: false, data: dataJson });
                            //console.log(host + ':' + port + drinkSearchUrl + 'name=&price=&unit='+ value);
                        },
                        200
                    )

                })
                .catch(error => {
                    this.componentDidMount();
                    console.log(error);
                });
        }
        if (this.state.searchModalInitial == 3) {
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
                            this.setState({ flag: false, data: dataJson });
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



    }
    shipmentDrinkrenderItem = ({ item }) => (
        <View>
            <View style={ManagerDrinkStyle.item}>
                <View>
                    <TouchableOpacity onPress={() => { this.shipmentDrinkdeleteItem(item) }}>
                        <Icon
                            style={ManagerDrinkStyle.icon}
                            name='trash-outline'
                            type='ionicon'
                            color='red'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: '30%' }} onPress={() => { this.shipmentDrinkUpdate(item) }}>
                        <Icon
                            style={ManagerDrinkStyle.icon}
                            name='edit'
                            type='font-awesome'
                            color='#517fa4'
                        />
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 1 }}>
                    <Text>Mã: {item.shipmentDrink_shipment.id}</Text>
                    <Text>Tên: {item.shipmentDrink_shipment.name}</Text>
                    <Text>Thời gian nhập: {this.formatDateControllerToView(item.shipmentDrink_shipment.time)}</Text>
                    <Text>Nhà kho: {item.shipmentDrink_shipment.warehouse.name}</Text>
                    <Text>Số lượng: {item.shipmentDrink_quantity}</Text>
                    <Text>Hạn sử dụng: {this.formatDateControllerToView(item.shipmentDrink_preserveTime)}</Text>
                    <Text>Giá nhập: {this.formatMoneyDatabasetoView(item.shipmentDrink_price)}</Text>
                </View>
                <View>
                    <Image
                        style={ManagerDrinkStyle.logo}
                        source={require('./../../assets/drink.png')}
                    />
                </View>
            </View>
        </View>
    );
    shipmentDrinkItem = (item) => {
        this.setState({ dataDrinkById: item, statusShipmentDrink: 'homeview', status: 'shipmentdrinkview' });
        this.shipmentDrinkGetShipmentDrinkList(item);
        Animated.timing(this.state.fadeAnimShipmentDrink, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    }
    shipmentDrinkView = () => {
        return (
            <Animated.View
                style={[
                    ManagerDrinkStyle.container,
                    {
                        opacity: this.state.fadeAnimShipmentDrink
                    }
                ]}>
                <SafeAreaProvider>
                    {this.state.statusShipmentDrink == 'homeview' ?
                        <View style={ManagerDrinkStyle.addExtraItemContainer}>

                            <View style={ManagerDrinkStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={() => { this.setState({ statusShipmentDrink: 'shipdrinkcreateshipmentview' }); }}>
                                    <Image

                                        style={ManagerDrinkStyle.cancelButton}
                                        source={require('./../../assets/plus.png')}
                                    />
                                </TouchableOpacity>
                                <Text style={ManagerDrinkStyle.titleResourceDish}>Danh sách nhập hàng: </Text>

                            </View>
                            <Text style={{ color: 'white' }}>Mã: {this.state.dataDrinkById.id}</Text>
                            <Text style={{ color: 'white' }}>Tên: {this.state.dataDrinkById.name}</Text>
                            <Text style={{ color: 'white' }}>Tổng số lượng hiện tại: {this.state.resourceDrinkQuantityTotal}</Text>
                            <Text></Text>
                            <FlatList
                                style={{ backgroundColor: 'white', borderRadius: 15 }}
                                data={this.state.dataShipmentDrink}
                                renderItem={this.shipmentDrinkrenderItem}
                                keyExtractor={item => item.id}
                            />
                            <Text></Text>
                            <View style={ManagerDrinkStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={() => { this.setState({ resourceDrinkQuantityTotal: 0 }); this.cancelItem() }} >
                                    <Image
                                        style={ManagerDrinkStyle.cancelButton}
                                        source={require('./../../assets/cancel.png')}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>
                        : null}
                    {this.state.statusShipmentDrink == 'shipdrinkcreateshipmentview' ?
                        <View style={ManagerDrinkStyle.addExtraItemContainer}>
                            <View style={ManagerDrinkStyle.setupItemCenterContainer}>
                                <View>
                                <Text style={ManagerDrinkStyle.titleResourceDish}>Nhập hàng mới: </Text>
                                    <Text style={ManagerDrinkStyle.error}>{this.state.error}</Text>
                                </View>
                            </View>
                            <Text style={{ color: 'white' }}>Mã: {this.state.dataDrinkById.id}</Text>
                            <Text style={{ color: 'white' }}>Tên: {this.state.dataDrinkById.name}</Text>
                            <Text style={{ color: 'white' }}>Tổng số lượng hiện tại: {this.state.resourceDrinkQuantityTotal}</Text>
                            <Text style={{ color: 'white' }}>Thời gian: {this.state.presentTime.getDate() + '/' + (this.state.presentTime.getMonth() + 1) + '/' + this.state.presentTime.getFullYear()}</Text>

                            <Text></Text>
                            <ScrollView style={{ backgroundColor: 'white', borderRadius: 15 }}>
                                <Text></Text>
                                <Input
                                    inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                                    inputContainerStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                                    leftIconContainerStyle={{ paddingLeft: '5%' }}
                                    name='quantity'
                                    placeholder='Số lượng'
                                    placeholderTextColor="#999999"
                                    onChangeText={(quantity) => this.setState({ inputShipmentDrinkQuantity: quantity })}
                                    value={this.state.inputShipmentDrinkQuantity}
                                    leftIcon={{ color: 'grey', type: 'ionicon', name: 'apps-outline' }}
                                    keyboardType='default' />
                                <Input
                                    inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                                    inputContainerStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                                    leftIconContainerStyle={{ paddingLeft: '5%' }}
                                    name='price'
                                    placeholder='Giá nhập về'
                                    placeholderTextColor="#999999"
                                    onChangeText={(price) => this.setState({ inputShipmentDrinkPrice: price })}
                                    value={this.state.inputShipmentDrinkPrice}
                                    leftIcon={{ color: 'grey', type: 'material', name: 'euro' }}
                                    keyboardType='default' />

                                <View style={ManagerDrinkStyle.itemMenuContainerTouchable}>
                                    <View style={ManagerDrinkStyle.itemMenuContainerTouchableContent}>

                                        <TouchableOpacity onPress={() => { this.setState({ flagShipmentDrinkPreserve: true }) }}>
                                            <Icon
                                                name='event'
                                                type='material'
                                                color='black'
                                            />
                                        </TouchableOpacity>

                                        {this.state.flagShipmentDrinkPreserve ?
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                locale="ja"
                                                format="DD/MM/YYYY HH:mm:ss"
                                                value={new Date(Date.now())}
                                                is24Hour={true}
                                                onChange={this.onChangeDatetoInsertDatabase}
                                            /> : <View></View>}
                                        <Text style={{ color: 'black' }}>Hạn sử dụng: {this.state.outputShipmentDrinkPreserveTime}</Text>
                                    </View>

                                </View>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                            </ScrollView>
                            <DropDownPicker
                                style={ManagerDrinkStyle.setupItemCenterContainerRowOption}
                                open={this.state.optionWarehouseSetup}

                                placeholder={'Chọn nhà kho'}
                                value={this.state.inputWarehouse}
                                items={
                                    this.state.optionWarehouseType
                                }
                                onPress={() => { if (this.state.optionWarehouseSetup) { this.setState({ optionWarehouseSetup: false }) } else { this.setState({ optionWarehouseSetup: true }); } }}

                                containerStyle={{ height: 40 }}
                                onSelectItem={(item) => { this.setState({ inputWarehouse: item.value, optionWarehouseSetup: false }) }}
                                dropDownDirection="TOP"
                                bottomOffset={100}
                            />
                            <Text></Text>
                            <View style={ManagerDrinkStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={() => { this.shipmentDrinkSaveShipmentDrink(); }} >
                                    <Image
                                        style={ManagerDrinkStyle.saveButton}
                                        source={require('./../../assets/complete.png')}
                                    />
                                </TouchableOpacity>
                                <Text>                  </Text>
                                <TouchableOpacity onPress={() => { this.setState({ statusShipmentDrink: 'homeview' }); }} >
                                    <Image
                                        style={ManagerDrinkStyle.cancelButton}
                                        source={require('./../../assets/previous.png')}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>
                        : null}
                    {this.state.statusShipmentDrink == 'shipmentdrinkupdateview' ?
                        <View style={ManagerDrinkStyle.addExtraItemContainer}>
                            <View style={ManagerDrinkStyle.setupItemCenterContainer}>
                                <View>
                                    <Text style={ManagerDrinkStyle.titleResourceDrink}>Cập nhật chuyến hàng: </Text>
                                    <Text style={ManagerDrinkStyle.error}>{this.state.error}</Text>
                                </View>
                            </View>
                            <Text style={{ color: 'white' }}>Mã: {this.state.dataDrinkById.id}</Text>
                            <Text style={{ color: 'white' }}>Tên: {this.state.dataDrinkById.name}</Text>
                            <Text style={{ color: 'white' }}>Tổng số lượng hiện tại: {this.state.resourceDrinkQuantityTotal}</Text>
                            <Text style={{ color: 'white' }}>Thời gian: {this.state.presentTime.getDate() + '/' + (this.state.presentTime.getMonth() + 1) + '/' + this.state.presentTime.getFullYear()}</Text>

                            <Text></Text>
                            <ScrollView style={{ backgroundColor: 'white', borderRadius: 15 }}>
                                <Text></Text>
                                <Input
                                    inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                                    inputContainerStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                                    leftIconContainerStyle={{ paddingLeft: '5%' }}
                                    name='quantity'
                                    placeholder='Số lượng'
                                    placeholderTextColor="#999999"
                                    onChangeText={(quantity) => this.setState({ inputShipmentDrinkQuantity: quantity })}
                                    value={this.state.inputShipmentDrinkQuantity}
                                    leftIcon={{ color: 'grey', type: 'ionicon', name: 'apps-outline' }}
                                    keyboardType='default' />
                                <Input
                                    inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                                    inputContainerStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                                    leftIconContainerStyle={{ paddingLeft: '5%' }}
                                    name='price'
                                    placeholder='Giá nhập về'
                                    placeholderTextColor="#999999"
                                    onChangeText={(price) => this.setState({ inputShipmentDrinkPrice: price })}
                                    value={this.state.inputShipmentDrinkPrice}
                                    leftIcon={{ color: 'grey', type: 'material', name: 'euro' }}
                                    keyboardType='default' />

                                <View style={ManagerDrinkStyle.itemMenuContainerTouchable}>
                                    <View style={ManagerDrinkStyle.itemMenuContainerTouchableContent}>

                                        <TouchableOpacity onPress={() => { this.setState({ flagShipmentDrinkPreserve: true }) }}>
                                            <Icon
                                                name='event'
                                                type='material'
                                                color='black'
                                            />
                                        </TouchableOpacity>

                                        {this.state.flagShipmentDrinkPreserve ?
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                locale="ja"
                                                format="DD/MM/YYYY HH:mm:ss"
                                                value={new Date(Date.now())}
                                                is24Hour={true}
                                                onChange={this.onChangeDatetoInsertDatabase}
                                            /> : <View></View>}
                                        <Text style={{ color: 'black' }}>Hạn sử dụng: {this.state.outputShipmentDrinkPreserveTime}</Text>
                                    </View>

                                </View>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                            </ScrollView>

                            <Text></Text>
                            <View style={ManagerDrinkStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={() => { this.shipmentDrinkSaveUpdateShipmentDrink(); }} >
                                    <Image
                                        style={ManagerDrinkStyle.saveButton}
                                        source={require('./../../assets/complete.png')}
                                    />
                                </TouchableOpacity>
                                <Text>                  </Text>
                                <TouchableOpacity onPress={() => { this.setState({ statusShipmentDrink: 'homeview' }); }} >
                                    <Image
                                        style={ManagerDrinkStyle.cancelButton}
                                        source={require('./../../assets/previous.png')}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>
                        : null}
                </SafeAreaProvider>
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
    shipmentDrinkUpdate(item) {
        this.setState({
            dataShipmentDrinkToUpdate: item,
            inputShipmentDrinkName: item.shipmentDrink_shipment.name + '',
            inputShipmentDrinkPrice: item.shipmentDrink_price + '',//this.state.dataDrinkById.shipments.price,
            inputShipmentDrinkQuantity: item.shipmentDrink_quantity + '',//this.state.dataDrinkById.shipments.quantity,
            inputShipmentDrinkpreserveTime: item.shipmentDrink_preserveTime + '',//this.state.dataDrinkById.shipments.preserveTime,
            inputWarehouse: item.shipmentDrink_shipment.warehouse.id,
            outputShipmentDrinkPreserveTime: this.formatDateControllerToView(item.shipmentDrink_preserveTime),
            statusShipmentDrink: 'shipmentdrinkupdateview'
        });
        //this.shipmentDrinkSaveUpdateShipmentDrink(item);
    }


    shipmentDrinkSaveUpdateShipmentDrink = () => {
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
        fetch(host + ':' + port + shipmentUpdateShipmentDrinkUrl + this.state.dataShipmentDrinkToUpdate.shipmentDrink_Id.shipment_id + '/' + this.state.dataShipmentDrinkToUpdate.shipmentDrink_Id.drink_id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            body: JSON.stringify({
                shipment_id: this.state.dataShipmentDrinkToUpdate.shipmentDrink_Id.shipment_id,
                drink_id: this.state.dataShipmentDrinkToUpdate.shipmentDrink_Id.drink_id,
                quantity: this.state.inputShipmentDrinkQuantity,
                preserveTime: this.state.inputShipmentDrinkpreserveTime,
                price: this.state.inputShipmentDrinkPrice
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 500) { this.setState({ error: 'System fail!' }); return; }
                this.setState({ dataShipment: data });


                if (data.status == 500) { this.setState({ error: 'System fail!' }); return; }

                Alert.alert(
                    "Thông báo",
                    "Cập nhật thành công!",
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



                        // fetch(host + ':' + port + shipmentDeleteShipmentDrinkByDrinkIdUrl + id, {
                        //   method: 'DELETE',
                        //   headers: {
                        //// 'Content-type': 'application/json; charset=UTF-8',
                        //       'Authorization': 'Bearer ' + this.props.user.token,
                        //s  },
                        //body: JSON.stringify({}),
                        //})
                        //    .then(response => response.json())
                        //    .then(data => {
                        fetch(host + ':' + port + drinkDeleteUrl + id, {
                            method: 'DELETE',
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                                'Authorization': 'Bearer ' + this.props.user.token,
                            },
                            body: JSON.stringify({}),
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                if (data.error == 'Internal Server Error') {
                                    Alert.alert(
                                        "Thông báo",
                                        "Không thể xóa đồ uống vì lý do bảo toàn dữ liệu",
                                        [
                                            {
                                                text: "Đóng",
                                                onPress: () => { this.setState({}); },
                                                style: "cancel"
                                            }
                                        ]
                                    );
                                }
                                this.setState({
                                    fadeAnimAdd: new Animated.Value(0),
                                    fadeAnimUpdate: new Animated.Value(0),
                                    fadeAnimHome: new Animated.Value(0),
                                    status: 'homeview',
                                });

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

                        // })
                        //   .catch((error) => {

                        //     console.log(error);

                        //  });




                    }
                }
            ]
        );
    }
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            this.setState({ inputUrlImage: result.uri });
        }
    };

    async uploadImageAsync(uri) {
        const app = initializeApp(firebaseConfig);
        const storage = getStorage(app);
        const storageRef = ref(storage, Math.random() + Math.random() + Math.random() + Date.now() + '.png');
        const blob = await new Promise((resolve, reject) => {
            //var storage = getStorage(app);
            //var storageRef = ref(storage, Math.random() + Math.random() + Math.random() + Date.now() + '.png');
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const result = await uploadBytes(storageRef, blob);
        // We're done with the blob, close and release it
        blob.close();
        await getDownloadURL(storageRef).then((snapshot) => {
            this.setState({ inputUrlImage: snapshot });
            //console.log(this.state.inputUrlImage);

        });;
    }

    addItem = () => {
        this.setState({ status: 'addview' })
        Animated.timing(this.state.fadeAnimAdd, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    }
    onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        var extraDate = '';
        var extraMonth = '';
        if ((currentDate.getMonth() + 1) < 10) extraMonth = '0';
        if (currentDate.getDate() < 10) extraDate = '0';

        this.setState({ flagAddBirthDay: false, inputBirthDay: currentDate.getFullYear() + '-' + extraMonth + (currentDate.getMonth() + 1) + '-' + extraDate + currentDate.getDate(), outputBirthDay: extraDate + currentDate.getDate() + '/' + extraMonth + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear() });
        //console.log(this.state.inputBirthDay);S
    };
    addItemView = () => {
        return (
            <Animated.View
                style={[
                    ManagerDrinkStyle.container,
                    {
                        opacity: this.state.fadeAnimAdd
                    }
                ]}>
                <SafeAreaProvider>
                    {this.state.flagDrink ?
                        <View>
                            <Text></Text>
                            <ActivityIndicator size="large" color="#DDDDDD" />
                        </View>

                        :
                        <View style={ManagerDrinkStyle.setupItem}>
                            <Text style={ManagerDrinkStyle.title}>Thêm đồ uống mới: </Text>
                            <View style={ManagerDrinkStyle.setupItemCenterContainer}><Text style={ManagerDrinkStyle.error}>{this.state.error}</Text></View>
                            <ScrollView>
                                <Input
                                    inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                                    inputContainerStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                                    leftIconContainerStyle={{ paddingLeft: '5%' }}
                                    name='name'
                                    placeholder='Tên'
                                    placeholderTextColor="#999999"
                                    onChangeText={(name) => this.setState({ inputName: name })}
                                    value={this.state.inputName}
                                    leftIcon={{ color: 'grey', type: 'material', name: 'rtt' }}
                                    keyboardType='default' />
                                <Input
                                    inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                                    inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
                                    leftIconContainerStyle={{ paddingLeft: '5%' }}
                                    name='unit'
                                    placeholder='Đơn vị'
                                    placeholderTextColor="#999999"
                                    onChangeText={(unit) => this.setState({ inputUnit: unit })}
                                    value={this.state.inputUnit}
                                    leftIcon={{ color: 'grey', type: 'material', name: 'dashboard' }}
                                    keyboardType='default' />
                                <Input
                                    inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                                    inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
                                    leftIconContainerStyle={{ paddingLeft: '5%' }}
                                    name='description'
                                    placeholder='Mô tả'
                                    placeholderTextColor="#999999"
                                    onChangeText={(description) => this.setState({ inputDescription: description })}
                                    value={this.state.inputDescription}
                                    leftIcon={{ color: 'grey', type: 'material', name: 'description' }}
                                    keyboardType='default' />
                                <Input
                                    inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                                    inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
                                    leftIconContainerStyle={{ paddingLeft: '5%' }}
                                    name='price'
                                    placeholder='Giá bán'
                                    placeholderTextColor="#999999"
                                    onChangeText={(price) => this.setState({ inputPrice: price })}
                                    value={this.state.inputPrice}
                                    leftIcon={{ color: 'grey', type: 'material', name: 'euro' }}
                                    keyboardType='default' />
                                <View style={ManagerDrinkStyle.itemMenuContainerTouchable}>
                                    <View style={ManagerDrinkStyle.itemMenuContainerTouchableContent}>


                                        <TouchableOpacity
                                            style={{ marginLeft: '5%' }}
                                            onPress={() => { this.pickImage() }}
                                        >
                                            <Icon
                                                name='folder'
                                                type='ionicon'
                                                color='#517fa4'
                                            />



                                        </TouchableOpacity>
                                        <Text style={{ marginLeft: '5%' }}>Ảnh nền</Text>
                                    </View>

                                </View>

                                <Text></Text>
                                <View style={ManagerDrinkStyle.setupItemCenterContainer}>
                                    <Image
                                        style={ManagerDrinkStyle.setupImageCenterContainer}
                                        source={{
                                            uri: this.state.inputUrlImage + '/',
                                        }}
                                    />
                                </View>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                            </ScrollView>

                            <View style={ManagerDrinkStyle.itemMenuContainerTouchable}>
                                <View style={ManagerDrinkStyle.itemMenuContainerTouchableContent}>


                                    <TouchableOpacity
                                        style={{ marginLeft: '5%' }}
                                        onPress={() => { this.setState({ flagView:'addview',status: 'drinktypeview' }) }}
                                    >
                                        <Icon
                                            name='post-add'
                                            type='material'
                                            color='#517fa4'
                                        />



                                    </TouchableOpacity>
                                    <Text style={{ marginLeft: '5%' }}>Loại đồ uống: </Text>
                                </View>

                            </View>
                            <DropDownPicker
                                style={ManagerDrinkStyle.setupItemCenterContainerRowOption}
                                open={this.state.optionDrinkTypeSetup}

                                placeholder={''}
                                value={this.state.inputDrinkType}
                                items={
                                    this.state.optionDrinkType
                                }
                                onPress={() => { if (this.state.optionDrinkTypeSetup) { this.setState({ optionDrinkTypeSetup: false }) } else { this.setState({ optionDrinkTypeSetup: true }); } }}

                                containerStyle={{ height: 40 }}
                                onSelectItem={(item) => { this.setState({ inputDrinkType: item.value, optionDrinkTypeSetup: false }) }}
                                dropDownDirection="TOP"
                                bottomOffset={100}
                            />


                            <View style={ManagerDrinkStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={this.saveAddItem}>
                                    <Image
                                        style={ManagerDrinkStyle.saveButton}
                                        source={require('./../../assets/save.png')}
                                    />
                                </TouchableOpacity>
                                <Text>                  </Text>
                                <TouchableOpacity onPress={this.cancelItem}>
                                    <Image
                                        style={ManagerDrinkStyle.cancelButton}
                                        source={require('./../../assets/cancel.png')}
                                    />
                                </TouchableOpacity>
                            </View>




                        </View>
                    }
                </SafeAreaProvider>

            </Animated.View>
        )
    }
    saveAddItem = () => {

        var regPrice = /^[0-9]+$/;
        var regName = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
        var regUnit = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
        var regDescription = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
        if (!(regName.test(this.state.inputName))) {
            this.setState({ error: 'Tên không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if (!(regUnit.test(this.state.inputUnit))) {
            this.setState({ error: 'Đơn vị không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }

        if (!(regDescription.test(this.state.inputDescription))) {
            this.setState({ error: 'Mô tả không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if ((!(regPrice.test(this.state.inputPrice))) || this.state.inputPrice <= 0) {
            this.setState({ error: 'Số tiền không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }


        if (this.state.inputUrlImage == null) {
            this.setState({ error: 'Hình ảnh không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if (this.state.inputDrinkType == null) {
            this.setState({ error: 'Vui lòng chọn loại đồ uống!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        this.setState({ flagDrink: true });
        this.uploadImageAsync(this.state.inputUrlImage).then(() => {
            fetch(host + ':' + port + drinkAddUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.user.token,
                },
                body: JSON.stringify({
                    name: this.state.inputName,
                    price: this.state.inputPrice,
                    description: this.state.inputDescription,
                    unit: this.state.inputUnit,
                    urlImage: this.state.inputUrlImage,
                    drinkType: {
                        id: this.state.inputDrinkType
                    }
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == 500) { this.setState({ error: 'System fail!' }); return; }
                    //console.log(data);
                    Alert.alert(
                        "Thông báo",
                        "Thêm thành công!",
                        [
                            {
                                text: "Xác nhận",
                                onPress: () => {
                                    this.setState({
                                        flagDrink: false,
                                        dataDrinkById: data,
                                        inputName: '',
                                        inputPrice: '',
                                        inputDescription: '',
                                        inputUnit: '',
                                        inputUrlImage: null,
                                        inputDrinkType: null,
                                        error: '',
                                        fadeAnimAdd: new Animated.Value(0),
                                        fadeAnimUpdate: new Animated.Value(0),
                                        fadeAnimHome: new Animated.Value(0),
                                        //status: 'shipmentdrinkview',
                                    });
                                    setTimeout(() => {
                                        Animated.timing(this.state.fadeAnimHome, {
                                            toValue: 1,
                                            duration: 50,
                                            useNativeDriver: true
                                        }).start();
                                        this.shipmentDrinkItem(data);
                                    }, 50);
                                },
                            },
                        ]
                    );
                })
                .catch((error) => {

                    console.log(error);

                });
        });
    }
    updateItem = (item) => {
        this.setState({
            id: item.id,
            inputPrice: item.price + '',
            inputName: item.name,
            inputUnit: item.unit,
            inputDescription: item.description,
            inputUrlImage: item.urlImage,
            inputDrinkType: item.drinkType.id,
            status: 'updateview'
        });
        this.setState({});
        console.log(this.state.inputPrice);
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
                    ManagerDrinkStyle.container,
                    {
                        opacity: this.state.fadeAnimUpdate
                    }
                ]}>
                <SafeAreaProvider>
                    {this.state.flagDrink ?
                        <View>
                            <Text></Text>
                            <ActivityIndicator size="large" color="#DDDDDD" />
                        </View>

                        :
                        <View style={ManagerDrinkStyle.setupItem}>
                            <Text style={ManagerDrinkStyle.title}>Cập nhật đồ uống: {this.state.id}</Text>
                            <View style={ManagerDrinkStyle.setupItemCenterContainer}><Text style={ManagerDrinkStyle.error}>{this.state.error}</Text></View>
                            <ScrollView>
                                <Input
                                    inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                                    inputContainerStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                                    leftIconContainerStyle={{ paddingLeft: '5%' }}
                                    name='name'
                                    placeholder='Tên'
                                    placeholderTextColor="#999999"
                                    onChangeText={(name) => this.setState({ inputName: name })}
                                    value={this.state.inputName}
                                    leftIcon={{ color: 'grey', type: 'material', name: 'rtt' }}
                                    keyboardType='default' />
                                <Input
                                    inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                                    inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
                                    leftIconContainerStyle={{ paddingLeft: '5%' }}
                                    name='unit'
                                    placeholder='Đơn vị'
                                    placeholderTextColor="#999999"
                                    onChangeText={(unit) => this.setState({ inputUnit: unit })}
                                    value={this.state.inputUnit}
                                    leftIcon={{ color: 'grey', type: 'material', name: 'dashboard' }}
                                    keyboardType='default' />
                                <Input
                                    inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                                    inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
                                    leftIconContainerStyle={{ paddingLeft: '5%' }}
                                    name='description'
                                    placeholder='Mô tả'
                                    placeholderTextColor="#999999"
                                    onChangeText={(description) => this.setState({ inputDescription: description })}
                                    value={this.state.inputDescription}
                                    leftIcon={{ color: 'grey', type: 'material', name: 'description' }}
                                    keyboardType='default' />
                                <Input
                                    inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                                    inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
                                    leftIconContainerStyle={{ paddingLeft: '5%' }}
                                    name='price'
                                    placeholder='Giá'
                                    placeholderTextColor="#999999"
                                    onChangeText={(price) => this.setState({ inputPrice: price })}
                                    value={this.state.inputPrice}
                                    leftIcon={{ color: 'grey', type: 'material', name: 'euro' }}
                                    keyboardType='default' />
                                <View style={ManagerDrinkStyle.itemMenuContainerTouchable}>
                                    <View style={ManagerDrinkStyle.itemMenuContainerTouchableContent}>


                                        <TouchableOpacity
                                            style={{ marginLeft: '5%' }}
                                            onPress={() => { this.pickImage() }}
                                        >
                                            <Icon
                                                name='folder'
                                                type='ionicon'
                                                color='#517fa4'
                                            />



                                        </TouchableOpacity>
                                        <Text style={{ marginLeft: '5%' }}>Ảnh nền</Text>
                                    </View>

                                </View>

                                <Text></Text>
                                <View style={ManagerDrinkStyle.setupItemCenterContainer}>
                                    <Image
                                        style={ManagerDrinkStyle.setupImageCenterContainer}
                                        source={{
                                            uri: this.state.inputUrlImage + '/',
                                        }}
                                    />
                                </View>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                                <Text></Text>
                            </ScrollView>

                            <View style={ManagerDrinkStyle.itemMenuContainerTouchable}>
                                <View style={ManagerDrinkStyle.itemMenuContainerTouchableContent}>


                                    <TouchableOpacity
                                        style={{ marginLeft: '5%' }}
                                        onPress={() => { this.setState({ flagView:'updateview',status: 'drinktypeview' }) }}
                                    >
                                        <Icon
                                            name='post-add'
                                            type='material'
                                            color='#517fa4'
                                        />



                                    </TouchableOpacity>
                                    <Text style={{ marginLeft: '5%' }}>Loại đồ uống: </Text>
                                </View>

                            </View>
                            <DropDownPicker
                                style={ManagerDrinkStyle.setupItemCenterContainerRowOption}
                                open={this.state.optionDrinkTypeSetup}

                                placeholder={'Chọn loại đồ uống'}
                                value={this.state.inputDrinkType}
                                items={
                                    this.state.optionDrinkType
                                }
                                onPress={() => { if (this.state.optionDrinkTypeSetup) { this.setState({ optionDrinkTypeSetup: false }) } else { this.setState({ optionDrinkTypeSetup: true }); } }}

                                containerStyle={{ height: 40 }}
                                onSelectItem={(item) => { this.setState({ inputDrinkType: item.value, optionDrinkTypeSetup: false }) }}
                                dropDownDirection="TOP"
                                bottomOffset={100}
                            />


                            <View style={ManagerDrinkStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={this.saveUpdateItem}>
                                    <Image
                                        style={ManagerDrinkStyle.saveButton}
                                        source={require('./../../assets/save.png')}
                                    />
                                </TouchableOpacity>
                                <Text>                  </Text>
                                <TouchableOpacity onPress={this.cancelItem}>
                                    <Image
                                        style={ManagerDrinkStyle.cancelButton}
                                        source={require('./../../assets/cancel.png')}
                                    />
                                </TouchableOpacity>
                            </View>




                        </View>
                    }
                </SafeAreaProvider>
            </Animated.View>
        )
    }

    saveUpdateItem = () => {

        var regPrice = /^[0-9]+$/;
        var regName = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
        var regUnit = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
        var regDescription = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
        if (!(regName.test(this.state.inputName))) {
            this.setState({ error: 'Tên không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if (!(regUnit.test(this.state.inputUnit))) {
            this.setState({ error: 'Đơn vị không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }

        if (!(regDescription.test(this.state.inputDescription))) {
            this.setState({ error: 'Mô tả không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if ((!(regPrice.test(this.state.inputPrice))) || this.state.inputPrice <= 0) {
            this.setState({ error: 'Số tiền không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }


        if (this.state.inputUrlImage == null) {
            this.setState({ error: 'Hình ảnh không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if (this.state.inputDrinkType == null) {
            this.setState({ error: 'Vui lòng chọn loại đồ uống!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        this.setState({ flagDrink: true });
        this.uploadImageAsync(this.state.inputUrlImage).then(() => {
            fetch(host + ':' + port + drinkUpdateUrl + this.state.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.user.token,
                },
                body: JSON.stringify({
                    name: this.state.inputName,
                    price: this.state.inputPrice,
                    description: this.state.inputDescription,
                    unit: this.state.inputUnit,
                    urlImage: this.state.inputUrlImage,
                    drinkType: {
                        id: this.state.inputDrinkType
                    }
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == 500) { this.setState({ error: 'System fail!' }); return; }
                    //console.log(data);
                    Alert.alert(
                        "Thông báo",
                        "Cập nhật thành công!",
                        [
                            {
                                text: "Xác nhận",
                                onPress: () => {
                                    this.setState({
                                        flagDrink: false,
                                        inputName: '',
                                        inputPrice: '',
                                        inputDescription: '',
                                        inputUnit: '',
                                        inputUrlImage: null,
                                        inputDrinkType: null,
                                        error: '',
                                        fadeAnimAdd: new Animated.Value(0),
                                        fadeAnimUpdate: new Animated.Value(0),
                                        fadeAnimHome: new Animated.Value(0),
                                        status: 'homeview',
                                    });
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
        });

    }
    cancelItem = () => {
        this.setState({
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
            this.componentDidMount();
        }, 50);
    }
    renderItem = ({ item }) => (
        <View>
            <TouchableOpacity onPress={() => { this.shipmentDrinkItem(item) }}>
                <View style={ManagerDrinkStyle.item}>
                    <View>
                        <TouchableOpacity onPress={() => { this.deleteItem(item.id); }}>
                            <Icon
                                style={ManagerDrinkStyle.icon}
                                name='trash-outline'
                                type='ionicon'
                                color='red'
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: '30%' }} onPress={() => { this.updateItem(item); }}>
                            <Icon
                                style={ManagerDrinkStyle.icon}
                                name='edit'
                                type='font-awesome'
                                color='#517fa4'
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={{ flex: 1 }}>
                        <Text>Mã: {item.id}</Text>
                        <Text>Tên: {item.name}</Text>
                        <Text>Đơn vị: {item.unit}</Text>
                        <Text>Mô tả: {item.description}</Text>
                        <Text>Loại đồ uống: {item.drinkType.name}</Text>
                        <Text>Giá: {this.formatMoneyDatabasetoView(item.price)}</Text>
                    </View>
                    <View>
                        <Image
                            style={ManagerDrinkStyle.logo}
                            source={{
                                uri: item.urlImage + '/',
                            }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
    render() {
        return (
            <View style={ManagerDrinkStyle.container}>
                {this.state.status == 'homeview' ?
                    <View style={ManagerDrinkStyle.container}>
                        <Animated.View
                            style={[
                                ManagerDrinkStyle.container,
                                {
                                    opacity: this.state.fadeAnimHome
                                }
                            ]}>
                            <SafeAreaProvider>
                                <View style={ManagerDrinkStyle.topcontainer}>

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
                                        name='searchWarehouse'
                                        placeholder='Nhập nội dung tìm kiếm...'
                                        placeholderTextColor="#BBBBBB"
                                        onChangeText={(search) => this.searchItem(search)}
                                        //value={this.state.inputSearch}
                                        leftIcon={{ color: 'grey', type: 'material', name: 'search' }}
                                        keyboardType='default' />
                                </View>


                                <View style={ManagerDrinkStyle.centercontainer}>
                                    <Text style={ManagerDrinkStyle.title}>Danh sách đồ uống:</Text>
                                    {this.state.flag ?
                                        <ActivityIndicator size="large" color="#DDDDDD" />
                                        :
                                        <FlatList
                                            data={this.state.data}
                                            renderItem={this.renderItem}
                                            keyExtractor={item => item.id}
                                        />
                                    }
                                </View>


                            </SafeAreaProvider>
                            <View style={ManagerDrinkStyle.plusContainer}>
                                <TouchableOpacity onPress={this.addItem}>

                                    <Image
                                        style={ManagerDrinkStyle.plus}
                                        source={require('./../../assets/plus.png')}
                                    />

                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </View>
                    : null}

                {this.state.status == 'addview' ?
                    <this.addItemView />
                    : null}
                {this.state.status == 'updateview' ?
                    <this.updateItemView />
                    : null}
                {this.state.status == 'shipmentdrinkview' ?
                    <this.shipmentDrinkView />
                    : null}
                {this.state.status == 'drinktypeview' ?
                    <View style={ManagerDrinkStyle.container}>

                        <View style={{ marginTop: '1%', marginRight: '80%' }}>
                            <TouchableOpacity
                                style={{}}
                                onPress={() => { this.componentDidMount(); this.setState({ status: this.state.flagView }); }}
                            >
                                <View style={ManagerDrinkStyle.itemMenuContainerTouchableContent}>

                                    <Text style={{ marginLeft: '1%', color: 'white' }}>Trở về</Text>



                                    <Icon
                                        name='backspace'
                                        type='ionicon'
                                        color='white'
                                    />

                                </View>
                            </TouchableOpacity>
                        </View>


                        <ManagerDrinkTypeScreen />
                    </View>


                    : null}
            </View>

        );
    }
}


const mapStateToProps = state => {
    return { user: state.users }
};

export default connect(mapStateToProps)(ManagerDrinkScreen);