import React from 'react';
import { LogBox, Animated, ScrollView, Dimensions, Alert, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Input } from 'react-native-elements';
import { ManagerDiningTableStyle } from '../../styles/LayoutStyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { host, port, shipmentAddUrl, shipmentAddShipmentDiningTableUrl, shipmentDeleteShipmentDiningTableByShipmentDiningTableIdUrl, shipmentDeleteShipmentDiningTableByDiningTableIdUrl, shipmentUpdateShipmentDiningTableUrl, warehouseListUrl, diningTableSearchUrl, diningTableAddUrl, diningTableDeleteUrl, diningTableListUrl, diningTableUpdateUrl, areaListUrl } from '../../apis/ManagerApi';
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
import ManagerAreaScreen from './ManagerAreaScreen';
const { firebaseConfig } = require('../../configs/Firebase');


class ManagerDiningTableScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchModal: false,
            searchModalInitial: 1,
            shipmentDiningTableModal: false,
            shipmentDiningTableModalInitial: 1,
            fadeAnimUpdate: new Animated.Value(0),
            fadeAnimAdd: new Animated.Value(0),
            fadeAnimHome: new Animated.Value(0),
            fadeAnimShipmentDiningTable: new Animated.Value(0),
            id: '',
            inputName: '',
            inputShipmentName: '',
            inputUnit: '',
            inputDescription: '',
            inputPrice: '',
            inputArea: null,
            inputUrlImage: null,
            inputWarehouse: null,
            inputShipmentDiningTableName: '',
            inputShipmentDiningTableQuantity: '',
            inputShipmentDiningTablepreserveTime: null,
            outputShipmentDiningTablePreserveTime: null,
            flagShipmentDiningTablePreserve: false,
            inputShipmentDiningTablePrice: '',
            optionWarehouse: '',
            optionWarehouseSetup: false,
            optionArea: [],
            optionAreaSetup: false,
            optionDiningTableType: [],
            optionDiningTableTypeSetup: false,
            optionDiningTableTypeValue: '',
            windowWidth: Dimensions.get('window').width,
            windowHeight: Dimensions.get('window').height,
            status: 'homeview',
            statusShipmentDiningTable: 'homeview',
            flag: true,
            flagDiningTable: false,
            flagView: '',
            data: [],
            dataShipment: {},
            dataShipmentDiningTable: [],
            dataDiningTableById: { id: '', name: '' },
            dataShipmentDiningTableToUpdate: {},
            dataRole: [],
            timKiem: '',
            error: '',
            diningTableDiningTableQuantityTotal: 0,
            presentTime: new Date(Date.now())
        };
    }
    onChangeDatetoInsertDatabase = (event, selectedDate) => {
        const currentDate = selectedDate;
        var extraDate = '';
        var extraMonth = '';
        if ((currentDate.getMonth() + 1) < 10) extraMonth = '0';
        if (currentDate.getDate() < 10) extraDate = '0';

        this.setState({ flagShipmentDiningTablePreserve: false, inputShipmentDiningTablepreserveTime: currentDate.getFullYear() + '-' + extraMonth + (currentDate.getMonth() + 1) + '-' + extraDate + currentDate.getDate(), outputShipmentDiningTablePreserveTime: extraDate + currentDate.getDate() + '/' + extraMonth + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear() });
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
                        var getAreaForAdd = [];
                        for (const element of dataJson) {
                            getArea.push({ label: element.name, value: element.id });
                            getAreaForAdd.push({ label: element.name, value: element.id });

                        }

                        this.setState({ optionDiningTableType: getArea, optionArea: getAreaForAdd });

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
                    <View style={{ backgroundColor: 'white', borderRadius: 20, padding: '5%' }}>
                        <View style={ManagerDiningTableStyle.setupItemCenterContainer}></View>
                        <Text style={{ fontWeight: 'bold' }}>Tìm kiếm theo:</Text>
                        <Text></Text>
                        <RadioForm
                            radio_props={
                                [{ label: 'Tên', value: 0 }]
                            }
                            initial={this.state.modalDiningTableSearchInitial}
                            onPress={(value) => { this.setState({ modalDiningTableSearchInitial: value }) }}
                        />
                        <Text></Text>

                        <Text></Text>
                        <Text style={{ fontWeight: 'bold' }}>Lọc bàn theo khu vực:</Text>
                        <Text></Text>


                        <ScrollView nestedScrollEnabled={false}>
                            <DropDownPicker
                                listMode="SCROLLVIEW"
                                style={ManagerDiningTableStyle.setupItemCenterContainerRowOption}
                                open={this.state.optionDiningTableTypeSetup}

                                placeholder={'Tất cả'}
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
                        <Button title="Xác nhận" onPress={() => { this.setState({ searchModal: false }); }} />
                    </View>




                </Modal >
            </View >
        );
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
                            var getDiningTable = [];
                            for (const element of dataJson.diningTables) {
                                console.log();
                                getDiningTable.push({ id: element.id, name: element.name, type: element.type, status: element.status, area: dataJson });
                            }
                            this.setState({ data: getDiningTable });
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
                this.setState({ flag: false, data: dataJson });
            })
            .catch(error => {
                this.componentDidMount();
                console.log(error);
            });


    }
    shipmentDiningTablerenderItem = ({ item }) => (
        <View>
            <View style={ManagerDiningTableStyle.item}>
                <View>
                    <TouchableOpacity onPress={() => { this.shipmentDiningTabledeleteItem(item) }}>
                        <Icon
                            style={ManagerDiningTableStyle.icon}
                            name='trash-outline'
                            type='ionicon'
                            color='red'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: '30%' }} onPress={() => { this.shipmentDiningTableUpdate(item) }}>
                        <Icon
                            style={ManagerDiningTableStyle.icon}
                            name='edit'
                            type='font-awesome'
                            color='#517fa4'
                        />
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 1 }}>
                    <Text>Mã: {item.shipmentDiningTable_shipment.id}</Text>
                    <Text>Tên: {item.shipmentDiningTable_shipment.name}</Text>
                    <Text>Thời gian nhập: {this.formatDateControllerToView(item.shipmentDiningTable_shipment.time)}</Text>
                    <Text>Nhà kho: {item.shipmentDiningTable_shipment.warehouse.name}</Text>
                    <Text>Số lượng: {item.shipmentDiningTable_quantity}</Text>
                    <Text>Hạn sử dụng: {this.formatDateControllerToView(item.shipmentDiningTable_preserveTime)}</Text>
                    <Text>Giá nhập: {this.formatMoneyDatabasetoView(item.shipmentDiningTable_price)}</Text>
                </View>
                <View>
                    <Image
                        style={ManagerDiningTableStyle.logo}
                        source={require('./../../assets/diningtable.png')}
                    />
                </View>
            </View>
        </View>
    );
    shipmentDiningTableItem = (item) => {
        this.setState({ dataDiningTableById: item, statusShipmentDiningTable: 'homeview', status: 'shipmentdiningTableview' });
        this.shipmentDiningTableGetShipmentDiningTableList(item);
        Animated.timing(this.state.fadeAnimShipmentDiningTable, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    }
    shipmentDiningTableView = () => {
        return (
            <Animated.View
                style={[
                    ManagerDiningTableStyle.container,
                    {
                        opacity: this.state.fadeAnimShipmentDiningTable
                    }
                ]}>
                <SafeAreaProvider>
                    {this.state.statusShipmentDiningTable == 'homeview' ?
                        <View style={ManagerDiningTableStyle.addExtraItemContainer}>

                            <View style={ManagerDiningTableStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={() => { this.setState({ statusShipmentDiningTable: 'shipdiningTablecreateshipmentview' }); }}>
                                    <Image

                                        style={ManagerDiningTableStyle.cancelButton}
                                        source={require('./../../assets/plus.png')}
                                    />
                                </TouchableOpacity>
                                <Text style={ManagerDiningTableStyle.titleShipmentDiningTable}>Danh sách nhập hàng: </Text>

                            </View>
                            <Text style={{ color: 'white' }}>Mã: {this.state.dataDiningTableById.id}</Text>
                            <Text style={{ color: 'white' }}>Tên: {this.state.dataDiningTableById.name}</Text>
                            <Text style={{ color: 'white' }}>Tổng số lượng hiện tại: {this.state.diningTableDiningTableQuantityTotal}</Text>
                            <Text></Text>
                            <FlatList
                                style={{ backgroundColor: 'white', borderRadius: 15 }}
                                data={this.state.dataShipmentDiningTable}
                                renderItem={this.shipmentDiningTablerenderItem}
                                keyExtractor={item => item.id}
                            />
                            <Text></Text>
                            <View style={ManagerDiningTableStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={() => { this.setState({ diningTableDiningTableQuantityTotal: 0 }); this.cancelItem() }} >
                                    <Image
                                        style={ManagerDiningTableStyle.cancelButton}
                                        source={require('./../../assets/cancel.png')}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>
                        : null}
                    {this.state.statusShipmentDiningTable == 'shipdiningTablecreateshipmentview' ?
                        <View style={ManagerDiningTableStyle.addExtraItemContainer}>
                            <View style={ManagerDiningTableStyle.setupItemCenterContainer}>
                                <View>
                                    <Text style={ManagerDiningTableStyle.titleShipmentDiningTable}>Nhập hàng mới: </Text>
                                    <Text style={ManagerDiningTableStyle.error}>{this.state.error}</Text>
                                </View>
                            </View>
                            <Text style={{ color: 'white' }}>Mã: {this.state.dataDiningTableById.id}</Text>
                            <Text style={{ color: 'white' }}>Tên: {this.state.dataDiningTableById.name}</Text>
                            <Text style={{ color: 'white' }}>Tổng số lượng hiện tại: {this.state.diningTableDiningTableQuantityTotal}</Text>
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
                                    onChangeText={(quantity) => this.setState({ inputShipmentDiningTableQuantity: quantity })}
                                    value={this.state.inputShipmentDiningTableQuantity}
                                    leftIcon={{ color: 'grey', type: 'ionicon', name: 'apps-outline' }}
                                    keyboardType='default' />
                                <Input
                                    inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                                    inputContainerStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                                    leftIconContainerStyle={{ paddingLeft: '5%' }}
                                    name='price'
                                    placeholder='Giá nhập về'
                                    placeholderTextColor="#999999"
                                    onChangeText={(price) => this.setState({ inputShipmentDiningTablePrice: price })}
                                    value={this.state.inputShipmentDiningTablePrice}
                                    leftIcon={{ color: 'grey', type: 'material', name: 'euro' }}
                                    keyboardType='default' />

                                <View style={ManagerDiningTableStyle.itemMenuContainerTouchable}>
                                    <View style={ManagerDiningTableStyle.itemMenuContainerTouchableContent}>

                                        <TouchableOpacity onPress={() => { this.setState({ flagShipmentDiningTablePreserve: true }) }}>
                                            <Icon
                                                name='event'
                                                type='material'
                                                color='black'
                                            />
                                        </TouchableOpacity>

                                        {this.state.flagShipmentDiningTablePreserve ?
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                locale="ja"
                                                format="DD/MM/YYYY HH:mm:ss"
                                                value={new Date(Date.now())}
                                                is24Hour={true}
                                                onChange={this.onChangeDatetoInsertDatabase}
                                            /> : <View></View>}
                                        <Text style={{ color: 'black' }}>Hạn sử dụng: {this.state.outputShipmentDiningTablePreserveTime}</Text>
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
                                style={ManagerDiningTableStyle.setupItemCenterContainerRowOption}
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
                            <View style={ManagerDiningTableStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={() => { this.shipmentDiningTableSaveShipmentDiningTable(); }} >
                                    <Image
                                        style={ManagerDiningTableStyle.saveButton}
                                        source={require('./../../assets/complete.png')}
                                    />
                                </TouchableOpacity>
                                <Text>                  </Text>
                                <TouchableOpacity onPress={() => { this.setState({ statusShipmentDiningTable: 'homeview' }); }} >
                                    <Image
                                        style={ManagerDiningTableStyle.cancelButton}
                                        source={require('./../../assets/previous.png')}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>
                        : null}
                    {this.state.statusShipmentDiningTable == 'shipmentdiningTableupdateview' ?
                        <View style={ManagerDiningTableStyle.addExtraItemContainer}>
                            <View style={ManagerDiningTableStyle.setupItemCenterContainer}>
                                <View>
                                    <Text style={ManagerDiningTableStyle.titleShipmentDiningTable}>Cập nhật chuyến hàng: </Text>
                                    <Text style={ManagerDiningTableStyle.error}>{this.state.error}</Text>
                                </View>
                            </View>
                            <Text style={{ color: 'white' }}>Mã: {this.state.dataDiningTableById.id}</Text>
                            <Text style={{ color: 'white' }}>Tên: {this.state.dataDiningTableById.name}</Text>
                            <Text style={{ color: 'white' }}>Tổng số lượng hiện tại: {this.state.diningTableDiningTableQuantityTotal}</Text>
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
                                    onChangeText={(quantity) => this.setState({ inputShipmentDiningTableQuantity: quantity })}
                                    value={this.state.inputShipmentDiningTableQuantity}
                                    leftIcon={{ color: 'grey', type: 'ionicon', name: 'apps-outline' }}
                                    keyboardType='default' />
                                <Input
                                    inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                                    inputContainerStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                                    leftIconContainerStyle={{ paddingLeft: '5%' }}
                                    name='price'
                                    placeholder='Giá nhập về'
                                    placeholderTextColor="#999999"
                                    onChangeText={(price) => this.setState({ inputShipmentDiningTablePrice: price })}
                                    value={this.state.inputShipmentDiningTablePrice}
                                    leftIcon={{ color: 'grey', type: 'material', name: 'euro' }}
                                    keyboardType='default' />

                                <View style={ManagerDiningTableStyle.itemMenuContainerTouchable}>
                                    <View style={ManagerDiningTableStyle.itemMenuContainerTouchableContent}>

                                        <TouchableOpacity onPress={() => { this.setState({ flagShipmentDiningTablePreserve: true }) }}>
                                            <Icon
                                                name='event'
                                                type='material'
                                                color='black'
                                            />
                                        </TouchableOpacity>

                                        {this.state.flagShipmentDiningTablePreserve ?
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                locale="ja"
                                                format="DD/MM/YYYY HH:mm:ss"
                                                value={new Date(Date.now())}
                                                is24Hour={true}
                                                onChange={this.onChangeDatetoInsertDatabase}
                                            /> : <View></View>}
                                        <Text style={{ color: 'black' }}>Hạn sử dụng: {this.state.outputShipmentDiningTablePreserveTime}</Text>
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
                            <View style={ManagerDiningTableStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={() => { this.shipmentDiningTableSaveUpdateShipmentDiningTable(); }} >
                                    <Image
                                        style={ManagerDiningTableStyle.saveButton}
                                        source={require('./../../assets/complete.png')}
                                    />
                                </TouchableOpacity>
                                <Text>                  </Text>
                                <TouchableOpacity onPress={() => { this.setState({ statusShipmentDiningTable: 'homeview' }); }} >
                                    <Image
                                        style={ManagerDiningTableStyle.cancelButton}
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
    shipmentDiningTableGetShipmentDiningTableList(item) {
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
                        //console.log(dataJson);
                        var getShipmentDiningTable = [];
                        var shipmentDiningTable_Id = {};
                        var shipmentDiningTable_shipment = {};
                        var shipmentDiningTable_quantity = 0;
                        var shipmentDiningTable_preserveTime = '';
                        var shipmentDiningTable_price = 0;
                        var shipment_key = 0;
                        for (const element of dataJson.shipments) {
                            shipment_key = shipment_key + 1;
                            shipmentDiningTable_Id = element.id;
                            shipmentDiningTable_preserveTime = element.preserveTime;
                            shipmentDiningTable_price = element.price;
                            shipmentDiningTable_quantity = element.quantity;
                            shipmentDiningTable_shipment = element.shipment;
                            this.setState({ diningTableDiningTableQuantityTotal: this.state.diningTableDiningTableQuantityTotal + shipmentDiningTable_quantity });
                            getShipmentDiningTable.push({ id: shipment_key, shipmentDiningTable_Id, shipmentDiningTable_shipment, shipmentDiningTable_quantity, shipmentDiningTable_preserveTime, shipmentDiningTable_price });
                        }
                        this.setState({ dataShipmentDiningTable: getShipmentDiningTable });
                        //console.log(this.state.dataShipmentDiningTable);
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
    shipmentDiningTableSaveShipmentDiningTable = () => {
        var regPrice = /^[0-9]+$/;
        var regQuantity = /^[0-9]+$/;
        if ((!(regQuantity.test(this.state.inputShipmentDiningTableQuantity))) || this.state.inputShipmentDiningTableQuantity <= 0) {
            this.setState({ error: 'Số lượng không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if ((!(regPrice.test(this.state.inputShipmentDiningTablePrice))) || this.state.inputShipmentDiningTablePrice <= 0) {
            this.setState({ error: 'Số tiền không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if (this.state.inputShipmentDiningTablepreserveTime == null) {
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
                name: 'Chuyến hàng lần ' + (this.state.dataShipmentDiningTable.length + 1),
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

                fetch(host + ':' + port + shipmentAddShipmentDiningTableUrl, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.props.user.token,
                    },
                    body: JSON.stringify({
                        shipment_id: this.state.dataShipment.id,
                        diningTable_id: this.state.dataDiningTableById.id,
                        quantity: this.state.inputShipmentDiningTableQuantity,
                        preserveTime: this.state.inputShipmentDiningTablepreserveTime,
                        price: this.state.inputShipmentDiningTablePrice
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
                                            diningTableDiningTableQuantityTotal: 0,
                                            inputShipmentDiningTableName: '',
                                            inputShipmentDiningTablePrice: '',
                                            inputShipmentDiningTableQuantity: '',
                                            inputShipmentDiningTablepreserveTime: '',
                                            inputWarehouse: null,
                                            inputShipmentDiningTablepreserveTime: null,
                                            outputShipmentDiningTablePreserveTime: '',
                                            error: '',
                                            fadeAnimAdd: new Animated.Value(0),
                                            fadeAnimUpdate: new Animated.Value(0),
                                            fadeAnimHome: new Animated.Value(0),
                                            statusShipmentDiningTable: 'homeview',
                                        });
                                        setTimeout(() => {
                                            Animated.timing(this.state.fadeAnimShipmentDiningTable, {
                                                toValue: 1,
                                                duration: 300,
                                                useNativeDriver: true
                                            }).start();
                                            this.shipmentDiningTableGetShipmentDiningTableList(this.state.dataDiningTableById);
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
    shipmentDiningTabledeleteItem = (item) => {

        Alert.alert(
            "Thông báo",
            "Chắc chắn xóa?",
            [
                {
                    text: "Hủy",
                    onPress: () => {
                        this.setState({ statusShipmentDiningTable: 'homeview' });
                    }
                },
                {
                    text: "Đồng ý", onPress: () => {



                        fetch(host + ':' + port + shipmentDeleteShipmentDiningTableByShipmentDiningTableIdUrl, {
                            method: 'DELETE',
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                                'Authorization': 'Bearer ' + this.props.user.token,
                            },
                            body: JSON.stringify({

                                shipment_id: item.shipmentDiningTable_Id.shipment_id,
                                diningTable_id: item.shipmentDiningTable_Id.diningTable_id


                            }),
                        })
                            .then(response => response.json())
                            .then(data => {
                                // console.log(item);
                                this.setState({
                                    fadeAnimAdd: new Animated.Value(0),
                                    fadeAnimUpdate: new Animated.Value(0),
                                    fadeAnimHome: new Animated.Value(0),
                                    fadeAnimShipmentDiningTable: new Animated.Value(0),
                                    statusShipmentDiningTable: 'homeview',
                                });

                                setTimeout(() => {
                                    Animated.timing(this.state.fadeAnimShipmentDiningTable, {
                                        toValue: 1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start();
                                    this.setState({ diningTableDiningTableQuantityTotal: 0 });
                                    this.shipmentDiningTableGetShipmentDiningTableList(this.state.dataDiningTableById);
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
    shipmentDiningTableUpdate(item) {
        this.setState({
            dataShipmentDiningTableToUpdate: item,
            inputShipmentDiningTableName: item.shipmentDiningTable_shipment.name + '',
            inputShipmentDiningTablePrice: item.shipmentDiningTable_price + '',//this.state.dataDiningTableById.shipments.price,
            inputShipmentDiningTableQuantity: item.shipmentDiningTable_quantity + '',//this.state.dataDiningTableById.shipments.quantity,
            inputShipmentDiningTablepreserveTime: item.shipmentDiningTable_preserveTime + '',//this.state.dataDiningTableById.shipments.preserveTime,
            inputWarehouse: item.shipmentDiningTable_shipment.warehouse.id,
            outputShipmentDiningTablePreserveTime: this.formatDateControllerToView(item.shipmentDiningTable_preserveTime),
            statusShipmentDiningTable: 'shipmentdiningTableupdateview'
        });
        //this.shipmentDiningTableSaveUpdateShipmentDiningTable(item);
    }


    shipmentDiningTableSaveUpdateShipmentDiningTable = () => {
        var regPrice = /^[0-9]+$/;
        var regQuantity = /^[0-9]+$/;
        if ((!(regQuantity.test(this.state.inputShipmentDiningTableQuantity))) || this.state.inputShipmentDiningTableQuantity <= 0) {
            this.setState({ error: 'Số lượng không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if ((!(regPrice.test(this.state.inputShipmentDiningTablePrice))) || this.state.inputShipmentDiningTablePrice <= 0) {
            this.setState({ error: 'Số tiền không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if (this.state.inputShipmentDiningTablepreserveTime == null) {
            this.setState({ error: 'Vui lòng chọn hạn sử dụng!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        fetch(host + ':' + port + shipmentUpdateShipmentDiningTableUrl + this.state.dataShipmentDiningTableToUpdate.shipmentDiningTable_Id.shipment_id + '/' + this.state.dataShipmentDiningTableToUpdate.shipmentDiningTable_Id.diningTable_id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            body: JSON.stringify({
                shipment_id: this.state.dataShipmentDiningTableToUpdate.shipmentDiningTable_Id.shipment_id,
                diningTable_id: this.state.dataShipmentDiningTableToUpdate.shipmentDiningTable_Id.diningTable_id,
                quantity: this.state.inputShipmentDiningTableQuantity,
                preserveTime: this.state.inputShipmentDiningTablepreserveTime,
                price: this.state.inputShipmentDiningTablePrice
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
                                    diningTableDiningTableQuantityTotal: 0,
                                    inputShipmentDiningTableName: '',
                                    inputShipmentDiningTablePrice: '',
                                    inputShipmentDiningTableQuantity: '',
                                    inputShipmentDiningTablepreserveTime: '',
                                    inputWarehouse: null,
                                    inputShipmentDiningTablepreserveTime: null,
                                    outputShipmentDiningTablePreserveTime: '',
                                    error: '',
                                    fadeAnimAdd: new Animated.Value(0),
                                    fadeAnimUpdate: new Animated.Value(0),
                                    fadeAnimHome: new Animated.Value(0),
                                    statusShipmentDiningTable: 'homeview',
                                });
                                setTimeout(() => {
                                    Animated.timing(this.state.fadeAnimShipmentDiningTable, {
                                        toValue: 1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start();
                                    this.shipmentDiningTableGetShipmentDiningTableList(this.state.dataDiningTableById);
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



                        //  fetch(host + ':' + port + shipmentDeleteShipmentDiningTableByDiningTableIdUrl + id, {
                        // method: 'DELETE',
                        //  headers: {
                        //    'Content-type': 'application/json; charset=UTF-8',
                        // / //     'Authorization': 'Bearer ' + this.props.user.token,
                        //  },
                        //  body: JSON.stringify({}),
                        //  })
                        //  .then(response => response.json())
                        //  .then(data => {
                        fetch(host + ':' + port + diningTableDeleteUrl + id, {
                            method: 'DELETE',
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                                'Authorization': 'Bearer ' + this.props.user.token,
                            },
                            body: JSON.stringify({}),
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.error == 'Internal Server Error') {
                                    Alert.alert(
                                        "Thông báo",
                                        "Không thể xóa bàn vì lý do bảo toàn dữ liệu",
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

                        //  })
                        //  .catch((error) => {

                        //    console.log(error);

                        //});




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
                    ManagerDiningTableStyle.container,
                    {
                        opacity: this.state.fadeAnimAdd
                    }
                ]}>
                <SafeAreaProvider>
                    {this.state.flagDiningTable ?
                        <View>
                            <Text></Text>
                            <ActivityIndicator size="large" color="#DDDDDD" />
                        </View>

                        :
                        <View style={ManagerDiningTableStyle.setupItem}>
                            <Text style={ManagerDiningTableStyle.title}>Thêm bàn mới: </Text>
                            <View style={ManagerDiningTableStyle.setupItemCenterContainer}><Text style={ManagerDiningTableStyle.error}>{this.state.error}</Text></View>
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

                            <View style={ManagerDiningTableStyle.itemMenuContainerTouchable}>
                                <View style={ManagerDiningTableStyle.itemMenuContainerTouchableContent}>

                                    <Text style={{ marginLeft: '5%' }}>Khu vực: </Text>
                                </View>

                            </View>
                            <DropDownPicker
                                style={ManagerDiningTableStyle.setupItemCenterContainerRowOption}
                                open={this.state.optionAreaSetup}

                                placeholder={''}
                                value={this.state.inputArea}
                                items={
                                    this.state.optionArea
                                }
                                onPress={() => { if (this.state.optionAreaSetup) { this.setState({ optionAreaSetup: false }) } else { this.setState({ optionAreaSetup: true }); } }}

                                containerStyle={{ height: 40 }}
                                onSelectItem={(item) => { this.setState({ inputArea: item.value, optionAreaSetup: false }) }}
                                dropDownDirection="TOP"
                                bottomOffset={100}
                            />


                            <View style={ManagerDiningTableStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={this.saveAddItem}>
                                    <Image
                                        style={ManagerDiningTableStyle.saveButton}
                                        source={require('./../../assets/save.png')}
                                    />
                                </TouchableOpacity>
                                <Text>                  </Text>
                                <TouchableOpacity onPress={this.cancelItem}>
                                    <Image
                                        style={ManagerDiningTableStyle.cancelButton}
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

        var regName = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
        var regUnit = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
        var regDescription = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
        if (!(regName.test(this.state.inputName))) {
            this.setState({ error: 'Tên không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }

        if (this.state.inputArea == null) {
            this.setState({ error: 'Vui lòng chọn khu vực!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        this.setState({ status: 'homeview', flag: true });
        fetch(host + ':' + port + diningTableAddUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            body: JSON.stringify({
                name: this.state.inputName,
                status: 'Trống',
                type: '',
                area: {
                    id: this.state.inputArea
                }
            }),
        })
            .then(response => response.json())
            .then(data => {
                Alert.alert(
                    "Thông báo",
                    "Thêm thành công!",
                    [
                        {
                            text: "Xác nhận",
                            onPress: () => {
                                this.setState({
                                    flag: false,
                                    dataDiningTableById: data,
                                    inputName: '',
                                    inputArea: null,
                                    error: '',
                                    fadeAnimAdd: new Animated.Value(0),
                                    fadeAnimUpdate: new Animated.Value(0),
                                    fadeAnimHome: new Animated.Value(0),
                                    //status: 'shipmentdiningTableview',
                                });
                                this.componentDidMount();
                                setTimeout(() => {
                                    Animated.timing(this.state.fadeAnimHome, {
                                        toValue: 1,
                                        duration: 50,
                                        useNativeDriver: true
                                    }).start();
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
    updateItem = (item) => {
        this.setState({
            id: item.id,
            inputName: item.name,
            inputUnit: item.unit,
            inputDescription: item.description,
            inputUrlImage: item.urlImage,
            inputArea: item.area.id,
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
                    ManagerDiningTableStyle.container,
                    {
                        opacity: this.state.fadeAnimUpdate
                    }
                ]}>
                <SafeAreaProvider>
                    {this.state.flagDiningTable ?
                        <View>
                            <Text></Text>
                            <ActivityIndicator size="large" color="#DDDDDD" />
                        </View>

                        :
                        <View style={ManagerDiningTableStyle.setupItem}>
                            <Text style={ManagerDiningTableStyle.title}>Cập nhật bàn ăn: {this.state.id}</Text>
                            <View style={ManagerDiningTableStyle.setupItemCenterContainer}><Text style={ManagerDiningTableStyle.error}>{this.state.error}</Text></View>
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

                            <View style={ManagerDiningTableStyle.itemMenuContainerTouchable}>
                                <View style={ManagerDiningTableStyle.itemMenuContainerTouchableContent}>

                                    <Text style={{ marginLeft: '5%' }}>Khu vực: </Text>
                                </View>

                            </View>

                            <DropDownPicker
                                style={ManagerDiningTableStyle.setupItemCenterContainerRowOption}
                                open={this.state.optionAreaSetup}

                                placeholder={'Chọn khu vực'}
                                value={this.state.inputArea}
                                items={
                                    this.state.optionArea
                                }
                                onPress={() => { if (this.state.optionAreaSetup) { this.setState({ optionAreaSetup: false }) } else { this.setState({ optionAreaSetup: true }); } }}

                                containerStyle={{ height: 40 }}
                                onSelectItem={(item) => { this.setState({ inputArea: item.value, optionAreaSetup: false }) }}
                                dropDownDirection="TOP"
                                bottomOffset={100}
                            />


                            <View style={ManagerDiningTableStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={this.saveUpdateItem}>
                                    <Image
                                        style={ManagerDiningTableStyle.saveButton}
                                        source={require('./../../assets/save.png')}
                                    />
                                </TouchableOpacity>
                                <Text>                  </Text>
                                <TouchableOpacity onPress={this.cancelItem}>
                                    <Image
                                        style={ManagerDiningTableStyle.cancelButton}
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

        var regName = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
        if (!(regName.test(this.state.inputName))) {
            this.setState({ error: 'Tên không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if (this.state.inputArea == null) {
            this.setState({ error: 'Vui lòng chọn khu vực!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        this.setState({status: 'homeview',flag: true });
        fetch(host + ':' + port + diningTableUpdateUrl + this.state.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            body: JSON.stringify({
                name: this.state.inputName,
                status: 'Trống',
                type: '',
                area: {
                    id: this.state.inputArea
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
                                    flagDiningTable: false,
                                    inputName: '',
                                    inputPrice: '',
                                    inputDescription: '',
                                    inputUnit: '',
                                    inputUrlImage: null,
                                    inputArea: null,
                                    error: '',
                                    fadeAnimAdd: new Animated.Value(0),
                                    fadeAnimUpdate: new Animated.Value(0),
                                    fadeAnimHome: new Animated.Value(0),
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

    }
    cancelItem = () => {
        this.setState({
            inputName: '',
            inputPrice: '',
            inputDescription: '',
            inputUnit: '',
            inputUrlImage: null,
            inputArea: null,
            error: '',
            error: '',
            fadeAnimAdd: new Animated.Value(0),
            fadeAnimUpdate: new Animated.Value(0),
            fadeAnimHome: new Animated.Value(0),
            fadeAnimShipmentDiningTable: new Animated.Value(0),
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
            <TouchableOpacity onPress={() => { }}>
                <View style={ManagerDiningTableStyle.item}>
                    <View>
                        <TouchableOpacity onPress={() => { this.deleteItem(item.id); }}>
                            <Icon
                                style={ManagerDiningTableStyle.icon}
                                name='trash-outline'
                                type='ionicon'
                                color='red'
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: '30%' }} onPress={() => { this.updateItem(item); }}>
                            <Icon
                                style={ManagerDiningTableStyle.icon}
                                name='edit'
                                type='font-awesome'
                                color='#517fa4'
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={{ flex: 1 }}>
                        <Text>Mã: {item.id}</Text>
                        <Text>Tên: {item.name}</Text>
                        <Text>Khu vực: {item.area.name}</Text>
                    </View>
                    <View>
                        <Image
                            style={ManagerDiningTableStyle.logo}
                            source={require('./../../assets/diningtable.png')}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
    render() {
        return (
            <View style={ManagerDiningTableStyle.container}>
                {this.state.status == 'homeview' ?
                    <View style={ManagerDiningTableStyle.container}>
                        <Animated.View
                            style={[
                                ManagerDiningTableStyle.container,
                                {
                                    opacity: this.state.fadeAnimHome
                                }
                            ]}>
                            <SafeAreaProvider>
                                <View style={ManagerDiningTableStyle.topcontainer}>

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


                                <View style={ManagerDiningTableStyle.centercontainer}>
                                    <Text style={ManagerDiningTableStyle.title}>Danh sách:</Text>
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
                            <View style={ManagerDiningTableStyle.plusContainer}>
                                <TouchableOpacity onPress={this.addItem}>

                                    <Image
                                        style={ManagerDiningTableStyle.plus}
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
                {this.state.status == 'shipmentdiningTableview' ?
                    <this.shipmentDiningTableView />
                    : null}
                {this.state.status == 'diningTabletypeview' ?
                    <View style={ManagerDiningTableStyle.container}>

                        <View style={{ marginTop: '1%', marginRight: '80%' }}>
                            <TouchableOpacity
                                style={{}}
                                onPress={() => { this.componentDidMount(); this.setState({ status: this.state.flagView }); }}
                            >
                                <View style={ManagerDiningTableStyle.itemMenuContainerTouchableContent}>

                                    <Text style={{ marginLeft: '1%', color: 'white' }}>Trở về</Text>



                                    <Icon
                                        name='backspace'
                                        type='ionicon'
                                        color='white'
                                    />

                                </View>
                            </TouchableOpacity>
                        </View>


                        <ManagerAreaScreen />
                    </View>
                    : null}
            </View>

        );
    }
}


const mapStateToProps = state => {
    return { user: state.users }
};

export default connect(mapStateToProps)(ManagerDiningTableScreen);