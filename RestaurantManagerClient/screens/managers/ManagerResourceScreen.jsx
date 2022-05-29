import React from 'react';
import { LogBox, Animated, ScrollView, Dimensions, Alert, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Input } from 'react-native-elements';
import { ManagerResourceStyle } from '../../styles/LayoutStyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { host, port, shipmentAddUrl, shipmentAddShipmentResourceUrl, shipmentDeleteShipmentResourceByShipmentResourceIdUrl, shipmentDeleteShipmentResourceByResourceIdUrl, shipmentUpdateShipmentResourceUrl, warehouseListUrl, resourceSearchUrl, resourceAddUrl, resourceDeleteUrl, resourceListUrl, resourceUpdateUrl, resourceTypeListUrl } from '../../apis/ManagerApi';
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
import ManagerResourceTypeScreen from './ManagerResourceTypeScreen';
const { firebaseConfig } = require('../../configs/Firebase');


class ManagerResourceScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchModal: false,
            searchModalInitial: 1,
            shipmentResourceModal: false,
            shipmentResourceModalInitial: 1,
            fadeAnimUpdate: new Animated.Value(0),
            fadeAnimAdd: new Animated.Value(0),
            fadeAnimHome: new Animated.Value(0),
            fadeAnimShipmentResource: new Animated.Value(0),
            id: '',
            inputName: '',
            inputShipmentName: '',
            inputUnit: '',
            inputDescription: '',
            inputPrice: '',
            inputResourceType: null,
            inputUrlImage: null,
            inputWarehouse: null,
            inputShipmentResourceName: '',
            inputShipmentResourceQuantity: '',
            inputShipmentResourcepreserveTime: null,
            outputShipmentResourcePreserveTime: null,
            flagShipmentResourcePreserve: false,
            inputShipmentResourcePrice: '',
            optionWarehouse: '',
            optionWarehouseSetup: false,
            optionResourceType: '',
            optionResourceTypeSetup: false,
            windowWidth: Dimensions.get('window').width,
            windowHeight: Dimensions.get('window').height,
            status: 'homeview',
            statusShipmentResource: 'homeview',
            flag: true,
            flagResource: false,
            flagView:'',
            data: [],
            dataShipment: {},
            dataShipmentResource: [],
            dataResourceById: { id: '', name: '' },
            dataShipmentResourceToUpdate: {},
            dataRole: [],
            timKiem: '',
            error: '',
            resourceResourceQuantityTotal: 0,
            presentTime: new Date(Date.now())
        };
    }
    onChangeDatetoInsertDatabase = (event, selectedDate) => {
        const currentDate = selectedDate;
        var extraDate = '';
        var extraMonth = '';
        if ((currentDate.getMonth() + 1) < 10) extraMonth = '0';
        if (currentDate.getDate() < 10) extraDate = '0';

        this.setState({ flagShipmentResourcePreserve: false, inputShipmentResourcepreserveTime: currentDate.getFullYear() + '-' + extraMonth + (currentDate.getMonth() + 1) + '-' + extraDate + currentDate.getDate(), outputShipmentResourcePreserveTime: extraDate + currentDate.getDate() + '/' + extraMonth + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear() });
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
        fetch(host + ':' + port + resourceTypeListUrl, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
            }
        })
            .then(response => response.json())
            .then(dataJson => {
                setTimeout(
                    () => {
                        var getResourceType = [];

                        for (const element of dataJson) {
                            getResourceType.push({ label: element.name, value: element.id });
                        }
                        this.setState({ optionResourceType: getResourceType });
                    },
                    200
                )

            })
            .catch(error => {
                console.log(error);
            });

        fetch(host + ':' + port + resourceListUrl, {
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
                    <View style={ManagerResourceStyle.searchContainer}>
                        <Text>Tìm kiếm theo:</Text>
                        <Text></Text>
                        <RadioForm
                            radio_props={
                                [
                                    { label: 'Mã', value: 0 },
                                    { label: 'Tên', value: 1 },
                                    { label: 'Đơn vị', value: 2 }

                                ]
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
        if (this.state.searchModalInitial == 0) {
            fetch(host + ':' + port + resourceListUrl + value, {
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
            fetch(host + ':' + port + resourceSearchUrl + 'name=' + value + '&unit=', {
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
                            //console.log(host + ':' + port + resourceSearchUrl + 'name='+value+'&price=&unit=');
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

            fetch(host + ':' + port + resourceSearchUrl + 'name=&unit=' + value, {
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
                            //console.log(host + ':' + port + resourceSearchUrl + 'name=&price=&unit='+ value);
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
    shipmentResourcerenderItem = ({ item }) => (
        <View>
            <View style={ManagerResourceStyle.item}>
                <View>
                    <TouchableOpacity onPress={() => { this.shipmentResourcedeleteItem(item) }}>
                        <Icon
                            style={ManagerResourceStyle.icon}
                            name='trash-outline'
                            type='ionicon'
                            color='red'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: '30%' }} onPress={() => { this.shipmentResourceUpdate(item) }}>
                        <Icon
                            style={ManagerResourceStyle.icon}
                            name='edit'
                            type='font-awesome'
                            color='#517fa4'
                        />
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 1 }}>
                    <Text>Mã: {item.shipmentResource_shipment.id}</Text>
                    <Text>Tên: {item.shipmentResource_shipment.name}</Text>
                    <Text>Thời gian nhập: {this.formatDateControllerToView(item.shipmentResource_shipment.time)}</Text>
                    <Text>Nhà kho: {item.shipmentResource_shipment.warehouse.name}</Text>
                    <Text>Số lượng: {item.shipmentResource_quantity}</Text>
                    <Text>Hạn sử dụng: {this.formatDateControllerToView(item.shipmentResource_preserveTime)}</Text>
                    <Text>Giá nhập: {this.formatMoneyDatabasetoView(item.shipmentResource_price)}</Text>
                </View>
                <View>
                    <Image
                        style={ManagerResourceStyle.logo}
                        source={require('./../../assets/resource.png')}
                    />
                </View>
            </View>
        </View>
    );
    shipmentResourceItem = (item) => {
        this.setState({ dataResourceById: item, statusShipmentResource: 'homeview', status: 'shipmentresourceview' });
        this.shipmentResourceGetShipmentResourceList(item);
        Animated.timing(this.state.fadeAnimShipmentResource, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    }
    shipmentResourceView = () => {
        return (
            <Animated.View
                style={[
                    ManagerResourceStyle.container,
                    {
                        opacity: this.state.fadeAnimShipmentResource
                    }
                ]}>
                <SafeAreaProvider>
                    {this.state.statusShipmentResource == 'homeview' ?
                        <View style={ManagerResourceStyle.addExtraItemContainer}>

                            <View style={ManagerResourceStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={() => { this.setState({ statusShipmentResource: 'shipresourcecreateshipmentview' }); }}>
                                    <Image

                                        style={ManagerResourceStyle.cancelButton}
                                        source={require('./../../assets/plus.png')}
                                    />
                                </TouchableOpacity>
                                <Text style={ManagerResourceStyle.titleShipmentResource}>Danh sách nhập hàng: </Text>

                            </View>
                            <Text style={{ color: 'white' }}>Mã: {this.state.dataResourceById.id}</Text>
                            <Text style={{ color: 'white' }}>Tên: {this.state.dataResourceById.name}</Text>
                            <Text style={{ color: 'white' }}>Tổng số lượng hiện tại: {this.state.resourceResourceQuantityTotal}</Text>
                            <Text></Text>
                            <FlatList
                                style={{ backgroundColor: 'white', borderRadius: 15 }}
                                data={this.state.dataShipmentResource}
                                renderItem={this.shipmentResourcerenderItem}
                                keyExtractor={item => item.id}
                            />
                            <Text></Text>
                            <View style={ManagerResourceStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={() => { this.setState({ resourceResourceQuantityTotal: 0 }); this.cancelItem() }} >
                                    <Image
                                        style={ManagerResourceStyle.cancelButton}
                                        source={require('./../../assets/cancel.png')}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>
                        : null}
                    {this.state.statusShipmentResource == 'shipresourcecreateshipmentview' ?
                        <View style={ManagerResourceStyle.addExtraItemContainer}>
                            <View style={ManagerResourceStyle.setupItemCenterContainer}>
                                <View>
                                    <Text style={ManagerResourceStyle.titleShipmentResource}>Nhập hàng mới: </Text>
                                    <Text style={ManagerResourceStyle.error}>{this.state.error}</Text>
                                </View>
                            </View>
                            <Text style={{ color: 'white' }}>Mã: {this.state.dataResourceById.id}</Text>
                            <Text style={{ color: 'white' }}>Tên: {this.state.dataResourceById.name}</Text>
                            <Text style={{ color: 'white' }}>Tổng số lượng hiện tại: {this.state.resourceResourceQuantityTotal}</Text>
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
                                    onChangeText={(quantity) => this.setState({ inputShipmentResourceQuantity: quantity })}
                                    value={this.state.inputShipmentResourceQuantity}
                                    leftIcon={{ color: 'grey', type: 'ionicon', name: 'apps-outline' }}
                                    keyboardType='default' />
                                <Input
                                    inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                                    inputContainerStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                                    leftIconContainerStyle={{ paddingLeft: '5%' }}
                                    name='price'
                                    placeholder='Giá nhập về'
                                    placeholderTextColor="#999999"
                                    onChangeText={(price) => this.setState({ inputShipmentResourcePrice: price })}
                                    value={this.state.inputShipmentResourcePrice}
                                    leftIcon={{ color: 'grey', type: 'material', name: 'euro' }}
                                    keyboardType='default' />

                                <View style={ManagerResourceStyle.itemMenuContainerTouchable}>
                                    <View style={ManagerResourceStyle.itemMenuContainerTouchableContent}>

                                        <TouchableOpacity onPress={() => { this.setState({ flagShipmentResourcePreserve: true }) }}>
                                            <Icon
                                                name='event'
                                                type='material'
                                                color='black'
                                            />
                                        </TouchableOpacity>

                                        {this.state.flagShipmentResourcePreserve ?
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                locale="ja"
                                                format="DD/MM/YYYY HH:mm:ss"
                                                value={new Date(Date.now())}
                                                is24Hour={true}
                                                onChange={this.onChangeDatetoInsertDatabase}
                                            /> : <View></View>}
                                        <Text style={{ color: 'black' }}>Hạn sử dụng: {this.state.outputShipmentResourcePreserveTime}</Text>
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
                                style={ManagerResourceStyle.setupItemCenterContainerRowOption}
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
                            <View style={ManagerResourceStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={() => { this.shipmentResourceSaveShipmentResource(); }} >
                                    <Image
                                        style={ManagerResourceStyle.saveButton}
                                        source={require('./../../assets/complete.png')}
                                    />
                                </TouchableOpacity>
                                <Text>                  </Text>
                                <TouchableOpacity onPress={() => { this.setState({ statusShipmentResource: 'homeview' }); }} >
                                    <Image
                                        style={ManagerResourceStyle.cancelButton}
                                        source={require('./../../assets/previous.png')}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>
                        : null}
                    {this.state.statusShipmentResource == 'shipmentresourceupdateview' ?
                        <View style={ManagerResourceStyle.addExtraItemContainer}>
                            <View style={ManagerResourceStyle.setupItemCenterContainer}>
                                <View>
                                    <Text style={ManagerResourceStyle.titleShipmentResource}>Cập nhật chuyến hàng: </Text>
                                    <Text style={ManagerResourceStyle.error}>{this.state.error}</Text>
                                </View>
                            </View>
                            <Text style={{ color: 'white' }}>Mã: {this.state.dataResourceById.id}</Text>
                            <Text style={{ color: 'white' }}>Tên: {this.state.dataResourceById.name}</Text>
                            <Text style={{ color: 'white' }}>Tổng số lượng hiện tại: {this.state.resourceResourceQuantityTotal}</Text>
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
                                    onChangeText={(quantity) => this.setState({ inputShipmentResourceQuantity: quantity })}
                                    value={this.state.inputShipmentResourceQuantity}
                                    leftIcon={{ color: 'grey', type: 'ionicon', name: 'apps-outline' }}
                                    keyboardType='default' />
                                <Input
                                    inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                                    inputContainerStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                                    leftIconContainerStyle={{ paddingLeft: '5%' }}
                                    name='price'
                                    placeholder='Giá nhập về'
                                    placeholderTextColor="#999999"
                                    onChangeText={(price) => this.setState({ inputShipmentResourcePrice: price })}
                                    value={this.state.inputShipmentResourcePrice}
                                    leftIcon={{ color: 'grey', type: 'material', name: 'euro' }}
                                    keyboardType='default' />

                                <View style={ManagerResourceStyle.itemMenuContainerTouchable}>
                                    <View style={ManagerResourceStyle.itemMenuContainerTouchableContent}>

                                        <TouchableOpacity onPress={() => { this.setState({ flagShipmentResourcePreserve: true }) }}>
                                            <Icon
                                                name='event'
                                                type='material'
                                                color='black'
                                            />
                                        </TouchableOpacity>

                                        {this.state.flagShipmentResourcePreserve ?
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                locale="ja"
                                                format="DD/MM/YYYY HH:mm:ss"
                                                value={new Date(Date.now())}
                                                is24Hour={true}
                                                onChange={this.onChangeDatetoInsertDatabase}
                                            /> : <View></View>}
                                        <Text style={{ color: 'black' }}>Hạn sử dụng: {this.state.outputShipmentResourcePreserveTime}</Text>
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
                            <View style={ManagerResourceStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={() => { this.shipmentResourceSaveUpdateShipmentResource(); }} >
                                    <Image
                                        style={ManagerResourceStyle.saveButton}
                                        source={require('./../../assets/complete.png')}
                                    />
                                </TouchableOpacity>
                                <Text>                  </Text>
                                <TouchableOpacity onPress={() => { this.setState({ statusShipmentResource: 'homeview' }); }} >
                                    <Image
                                        style={ManagerResourceStyle.cancelButton}
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
    shipmentResourceGetShipmentResourceList(item) {
        fetch(host + ':' + port + resourceListUrl + item.id, {
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
                        var getShipmentResource = [];
                        var shipmentResource_Id = {};
                        var shipmentResource_shipment = {};
                        var shipmentResource_quantity = 0;
                        var shipmentResource_preserveTime = '';
                        var shipmentResource_price = 0;
                        var shipment_key = 0;
                        for (const element of dataJson.shipments) {
                            shipment_key = shipment_key + 1;
                            shipmentResource_Id = element.id;
                            shipmentResource_preserveTime = element.preserveTime;
                            shipmentResource_price = element.price;
                            shipmentResource_quantity = element.quantity;
                            shipmentResource_shipment = element.shipment;
                            this.setState({ resourceResourceQuantityTotal: this.state.resourceResourceQuantityTotal + shipmentResource_quantity });
                            getShipmentResource.push({ id: shipment_key, shipmentResource_Id, shipmentResource_shipment, shipmentResource_quantity, shipmentResource_preserveTime, shipmentResource_price });
                        }
                        this.setState({ dataShipmentResource: getShipmentResource });
                        //console.log(this.state.dataShipmentResource);
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
    shipmentResourceSaveShipmentResource = () => {
        var regPrice = /^[0-9]+$/;
        var regQuantity = /^[0-9]+$/;
        if ((!(regQuantity.test(this.state.inputShipmentResourceQuantity))) || this.state.inputShipmentResourceQuantity <= 0) {
            this.setState({ error: 'Số lượng không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if ((!(regPrice.test(this.state.inputShipmentResourcePrice))) || this.state.inputShipmentResourcePrice <= 0) {
            this.setState({ error: 'Số tiền không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if (this.state.inputShipmentResourcepreserveTime == null) {
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
                name: 'Chuyến hàng lần ' + (this.state.dataShipmentResource.length + 1),
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

                fetch(host + ':' + port + shipmentAddShipmentResourceUrl, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.props.user.token,
                    },
                    body: JSON.stringify({
                        shipment_id: this.state.dataShipment.id,
                        resource_id: this.state.dataResourceById.id,
                        quantity: this.state.inputShipmentResourceQuantity,
                        preserveTime: this.state.inputShipmentResourcepreserveTime,
                        price: this.state.inputShipmentResourcePrice
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
                                            resourceResourceQuantityTotal: 0,
                                            inputShipmentResourceName: '',
                                            inputShipmentResourcePrice: '',
                                            inputShipmentResourceQuantity: '',
                                            inputShipmentResourcepreserveTime: '',
                                            inputWarehouse: null,
                                            inputShipmentResourcepreserveTime: null,
                                            outputShipmentResourcePreserveTime: '',
                                            error: '',
                                            fadeAnimAdd: new Animated.Value(0),
                                            fadeAnimUpdate: new Animated.Value(0),
                                            fadeAnimHome: new Animated.Value(0),
                                            statusShipmentResource: 'homeview',
                                        });
                                        setTimeout(() => {
                                            Animated.timing(this.state.fadeAnimShipmentResource, {
                                                toValue: 1,
                                                duration: 300,
                                                useNativeDriver: true
                                            }).start();
                                            this.shipmentResourceGetShipmentResourceList(this.state.dataResourceById);
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
    shipmentResourcedeleteItem = (item) => {

        Alert.alert(
            "Thông báo",
            "Chắc chắn xóa?",
            [
                {
                    text: "Hủy",
                    onPress: () => {
                        this.setState({ statusShipmentResource: 'homeview' });
                    }
                },
                {
                    text: "Đồng ý", onPress: () => {



                        fetch(host + ':' + port + shipmentDeleteShipmentResourceByShipmentResourceIdUrl, {
                            method: 'DELETE',
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                                'Authorization': 'Bearer ' + this.props.user.token,
                            },
                            body: JSON.stringify({

                                shipment_id: item.shipmentResource_Id.shipment_id,
                                resource_id: item.shipmentResource_Id.resource_id


                            }),
                        })
                            .then(response => response.json())
                            .then(data => {
                                // console.log(item);
                                this.setState({
                                    fadeAnimAdd: new Animated.Value(0),
                                    fadeAnimUpdate: new Animated.Value(0),
                                    fadeAnimHome: new Animated.Value(0),
                                    fadeAnimShipmentResource: new Animated.Value(0),
                                    statusShipmentResource: 'homeview',
                                });

                                setTimeout(() => {
                                    Animated.timing(this.state.fadeAnimShipmentResource, {
                                        toValue: 1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start();
                                    this.setState({ resourceResourceQuantityTotal: 0 });
                                    this.shipmentResourceGetShipmentResourceList(this.state.dataResourceById);
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
    shipmentResourceUpdate(item) {
        this.setState({
            dataShipmentResourceToUpdate: item,
            inputShipmentResourceName: item.shipmentResource_shipment.name + '',
            inputShipmentResourcePrice: item.shipmentResource_price + '',//this.state.dataResourceById.shipments.price,
            inputShipmentResourceQuantity: item.shipmentResource_quantity + '',//this.state.dataResourceById.shipments.quantity,
            inputShipmentResourcepreserveTime: item.shipmentResource_preserveTime + '',//this.state.dataResourceById.shipments.preserveTime,
            inputWarehouse: item.shipmentResource_shipment.warehouse.id,
            outputShipmentResourcePreserveTime: this.formatDateControllerToView(item.shipmentResource_preserveTime),
            statusShipmentResource: 'shipmentresourceupdateview'
        });
        //this.shipmentResourceSaveUpdateShipmentResource(item);
    }


    shipmentResourceSaveUpdateShipmentResource = () => {
        var regPrice = /^[0-9]+$/;
        var regQuantity = /^[0-9]+$/;
        if ((!(regQuantity.test(this.state.inputShipmentResourceQuantity))) || this.state.inputShipmentResourceQuantity <= 0) {
            this.setState({ error: 'Số lượng không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if ((!(regPrice.test(this.state.inputShipmentResourcePrice))) || this.state.inputShipmentResourcePrice <= 0) {
            this.setState({ error: 'Số tiền không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if (this.state.inputShipmentResourcepreserveTime == null) {
            this.setState({ error: 'Vui lòng chọn hạn sử dụng!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        fetch(host + ':' + port + shipmentUpdateShipmentResourceUrl + this.state.dataShipmentResourceToUpdate.shipmentResource_Id.shipment_id + '/' + this.state.dataShipmentResourceToUpdate.shipmentResource_Id.resource_id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            body: JSON.stringify({
                shipment_id: this.state.dataShipmentResourceToUpdate.shipmentResource_Id.shipment_id,
                resource_id: this.state.dataShipmentResourceToUpdate.shipmentResource_Id.resource_id,
                quantity: this.state.inputShipmentResourceQuantity,
                preserveTime: this.state.inputShipmentResourcepreserveTime,
                price: this.state.inputShipmentResourcePrice
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
                                    resourceResourceQuantityTotal: 0,
                                    inputShipmentResourceName: '',
                                    inputShipmentResourcePrice: '',
                                    inputShipmentResourceQuantity: '',
                                    inputShipmentResourcepreserveTime: '',
                                    inputWarehouse: null,
                                    inputShipmentResourcepreserveTime: null,
                                    outputShipmentResourcePreserveTime: '',
                                    error: '',
                                    fadeAnimAdd: new Animated.Value(0),
                                    fadeAnimUpdate: new Animated.Value(0),
                                    fadeAnimHome: new Animated.Value(0),
                                    statusShipmentResource: 'homeview',
                                });
                                setTimeout(() => {
                                    Animated.timing(this.state.fadeAnimShipmentResource, {
                                        toValue: 1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start();
                                    this.shipmentResourceGetShipmentResourceList(this.state.dataResourceById);
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



                        //  fetch(host + ':' + port + shipmentDeleteShipmentResourceByResourceIdUrl + id, {
                        // method: 'DELETE',
                        //  headers: {
                        //    'Content-type': 'application/json; charset=UTF-8',
                        // / //     'Authorization': 'Bearer ' + this.props.user.token,
                        //  },
                        //  body: JSON.stringify({}),
                        //  })
                        //  .then(response => response.json())
                        //  .then(data => {
                        fetch(host + ':' + port + resourceDeleteUrl + id, {
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
                                        "Không thể xóa nguyên liệu vì lý do bảo toàn dữ liệu",
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
                    ManagerResourceStyle.container,
                    {
                        opacity: this.state.fadeAnimAdd
                    }
                ]}>
                <SafeAreaProvider>
                    {this.state.flagResource ?
                        <View>
                            <Text></Text>
                            <ActivityIndicator size="large" color="#DDDDDD" />
                        </View>

                        :
                        <View style={ManagerResourceStyle.setupItem}>
                            <Text style={ManagerResourceStyle.title}>Thêm nguyên liệu mới: </Text>
                            <View style={ManagerResourceStyle.setupItemCenterContainer}><Text style={ManagerResourceStyle.error}>{this.state.error}</Text></View>
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
                                <View style={ManagerResourceStyle.itemMenuContainerTouchable}>
                                    <View style={ManagerResourceStyle.itemMenuContainerTouchableContent}>


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
                                <View style={ManagerResourceStyle.setupItemCenterContainer}>
                                    <Image
                                        style={ManagerResourceStyle.setupImageCenterContainer}
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

                            <View style={ManagerResourceStyle.itemMenuContainerTouchable}>
                                <View style={ManagerResourceStyle.itemMenuContainerTouchableContent}>


                                    <TouchableOpacity
                                        style={{ marginLeft: '5%' }}
                                        onPress={() => { this.setState({ flagView:'addview',status: 'resourcetypeview' }) }}
                                    >
                                        <Icon
                                            name='post-add'
                                            type='material'
                                            color='#517fa4'
                                        />



                                    </TouchableOpacity>
                                    <Text style={{ marginLeft: '5%' }}>Loại nguyên liệu: </Text>
                                </View>

                            </View>
                            <DropDownPicker
                                style={ManagerResourceStyle.setupItemCenterContainerRowOption}
                                open={this.state.optionResourceTypeSetup}

                                placeholder={''}
                                value={this.state.inputResourceType}
                                items={
                                    this.state.optionResourceType
                                }
                                onPress={() => { if (this.state.optionResourceTypeSetup) { this.setState({ optionResourceTypeSetup: false }) } else { this.setState({ optionResourceTypeSetup: true }); } }}

                                containerStyle={{ height: 40 }}
                                onSelectItem={(item) => { this.setState({ inputResourceType: item.value, optionResourceTypeSetup: false }) }}
                                dropDownDirection="TOP"
                                bottomOffset={100}
                            />


                            <View style={ManagerResourceStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={this.saveAddItem}>
                                    <Image
                                        style={ManagerResourceStyle.saveButton}
                                        source={require('./../../assets/save.png')}
                                    />
                                </TouchableOpacity>
                                <Text>                  </Text>
                                <TouchableOpacity onPress={this.cancelItem}>
                                    <Image
                                        style={ManagerResourceStyle.cancelButton}
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

        if (this.state.inputUrlImage == null) {
            this.setState({ error: 'Hình ảnh không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if (this.state.inputResourceType == null) {
            this.setState({ error: 'Vui lòng chọn loại nguyên liệu!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        this.setState({ flagResource: true });
        this.uploadImageAsync(this.state.inputUrlImage).then(() => {
            fetch(host + ':' + port + resourceAddUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.user.token,
                },
                body: JSON.stringify({
                    name: this.state.inputName,
                    description: this.state.inputDescription,
                    unit: this.state.inputUnit,
                    urlImage: this.state.inputUrlImage,
                    resourceType: {
                        id: this.state.inputResourceType
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
                                        flagResource: false,
                                        dataResourceById: data,
                                        inputName: '',
                                        inputPrice: '',
                                        inputDescription: '',
                                        inputUnit: '',
                                        inputUrlImage: null,
                                        inputResourceType: null,
                                        error: '',
                                        fadeAnimAdd: new Animated.Value(0),
                                        fadeAnimUpdate: new Animated.Value(0),
                                        fadeAnimHome: new Animated.Value(0),
                                        //status: 'shipmentresourceview',
                                    });
                                    setTimeout(() => {
                                        Animated.timing(this.state.fadeAnimHome, {
                                            toValue: 1,
                                            duration: 50,
                                            useNativeDriver: true
                                        }).start();
                                        this.shipmentResourceItem(data);
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
            inputName: item.name,
            inputUnit: item.unit,
            inputDescription: item.description,
            inputUrlImage: item.urlImage,
            inputResourceType: item.resourceType.id,
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
                    ManagerResourceStyle.container,
                    {
                        opacity: this.state.fadeAnimUpdate
                    }
                ]}>
                <SafeAreaProvider>
                    {this.state.flagResource ?
                        <View>
                            <Text></Text>
                            <ActivityIndicator size="large" color="#DDDDDD" />
                        </View>

                        :
                        <View style={ManagerResourceStyle.setupItem}>
                            <Text style={ManagerResourceStyle.title}>Cập nhật nguyên liệu: {this.state.id}</Text>
                            <View style={ManagerResourceStyle.setupItemCenterContainer}><Text style={ManagerResourceStyle.error}>{this.state.error}</Text></View>
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
                                <View style={ManagerResourceStyle.itemMenuContainerTouchable}>
                                    <View style={ManagerResourceStyle.itemMenuContainerTouchableContent}>


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
                                <View style={ManagerResourceStyle.setupItemCenterContainer}>
                                    <Image
                                        style={ManagerResourceStyle.setupImageCenterContainer}
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
                            <View style={ManagerResourceStyle.itemMenuContainerTouchable}>
                                <View style={ManagerResourceStyle.itemMenuContainerTouchableContent}>


                                    <TouchableOpacity
                                        style={{ marginLeft: '5%' }}
                                        onPress={() => { this.setState({ flagView:'updateview',status: 'resourcetypeview' }) }}
                                    >
                                        <Icon
                                            name='post-add'
                                            type='material'
                                            color='#517fa4'
                                        />



                                    </TouchableOpacity>
                                    <Text style={{ marginLeft: '5%' }}>Loại nguyên liệu: </Text>
                                </View>

                            </View>

                            <DropDownPicker
                                style={ManagerResourceStyle.setupItemCenterContainerRowOption}
                                open={this.state.optionResourceTypeSetup}

                                placeholder={'Chọn loại nguyên liệu'}
                                value={this.state.inputResourceType}
                                items={
                                    this.state.optionResourceType
                                }
                                onPress={() => { if (this.state.optionResourceTypeSetup) { this.setState({ optionResourceTypeSetup: false }) } else { this.setState({ optionResourceTypeSetup: true }); } }}

                                containerStyle={{ height: 40 }}
                                onSelectItem={(item) => { this.setState({ inputResourceType: item.value, optionResourceTypeSetup: false }) }}
                                dropDownDirection="TOP"
                                bottomOffset={100}
                            />


                            <View style={ManagerResourceStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={this.saveUpdateItem}>
                                    <Image
                                        style={ManagerResourceStyle.saveButton}
                                        source={require('./../../assets/save.png')}
                                    />
                                </TouchableOpacity>
                                <Text>                  </Text>
                                <TouchableOpacity onPress={this.cancelItem}>
                                    <Image
                                        style={ManagerResourceStyle.cancelButton}
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


        if (this.state.inputUrlImage == null) {
            this.setState({ error: 'Hình ảnh không hợp lệ!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if (this.state.inputResourceType == null) {
            this.setState({ error: 'Vui lòng chọn loại nguyên liệu!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        this.setState({ flagResource: true });
        this.uploadImageAsync(this.state.inputUrlImage).then(() => {
            fetch(host + ':' + port + resourceUpdateUrl + this.state.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.user.token,
                },
                body: JSON.stringify({
                    name: this.state.inputName,
                    description: this.state.inputDescription,
                    unit: this.state.inputUnit,
                    urlImage: this.state.inputUrlImage,
                    resourceType: {
                        id: this.state.inputResourceType
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
                                        flagResource: false,
                                        inputName: '',
                                        inputPrice: '',
                                        inputDescription: '',
                                        inputUnit: '',
                                        inputUrlImage: null,
                                        inputResourceType: null,
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
            inputResourceType: null,
            error: '',
            error: '',
            fadeAnimAdd: new Animated.Value(0),
            fadeAnimUpdate: new Animated.Value(0),
            fadeAnimHome: new Animated.Value(0),
            fadeAnimShipmentResource: new Animated.Value(0),
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
            <TouchableOpacity onPress={() => { this.shipmentResourceItem(item) }}>
                <View style={ManagerResourceStyle.item}>
                    <View>
                        <TouchableOpacity onPress={() => { this.deleteItem(item.id); }}>
                            <Icon
                                style={ManagerResourceStyle.icon}
                                name='trash-outline'
                                type='ionicon'
                                color='red'
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: '30%' }} onPress={() => { this.updateItem(item); }}>
                            <Icon
                                style={ManagerResourceStyle.icon}
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
                        <Text>Loại nguyên liệu: {item.resourceType.name}</Text>
                    </View>
                    <View>
                        <Image
                            style={ManagerResourceStyle.logo}
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
            <View style={ManagerResourceStyle.container}>
                {this.state.status == 'homeview' ?
                    <View style={ManagerResourceStyle.container}>
                        <Animated.View
                            style={[
                                ManagerResourceStyle.container,
                                {
                                    opacity: this.state.fadeAnimHome
                                }
                            ]}>
                            <SafeAreaProvider>
                                <View style={ManagerResourceStyle.topcontainer}>

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


                                <View style={ManagerResourceStyle.centercontainer}>
                                    <Text style={ManagerResourceStyle.title}>Danh sách nguyên liệu:</Text>
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
                            <View style={ManagerResourceStyle.plusContainer}>
                                <TouchableOpacity onPress={this.addItem}>

                                    <Image
                                        style={ManagerResourceStyle.plus}
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
                {this.state.status == 'shipmentresourceview' ?
                    <this.shipmentResourceView />
                    : null}
                {this.state.status == 'resourcetypeview' ?
                    <View style={ManagerResourceStyle.container}>

                        <View style={{ marginTop: '1%', marginRight: '80%' }}>
                            <TouchableOpacity
                                style={{}}
                                onPress={() => {this.componentDidMount();this.setState({ status: this.state.flagView }); }}
                            >
                                <View style={ManagerResourceStyle.itemMenuContainerTouchableContent}>

                                    <Text style={{ marginLeft: '1%', color: 'white' }}>Trở về</Text>



                                    <Icon
                                        name='backspace'
                                        type='ionicon'
                                        color='white'
                                    />

                                </View>
                            </TouchableOpacity>
                        </View>


                        <ManagerResourceTypeScreen />
                        </View>
                    : null}
                    </View>

        );
    }
}


const mapStateToProps = state => {
    return {user: state.users }
};

                export default connect(mapStateToProps)(ManagerResourceScreen);