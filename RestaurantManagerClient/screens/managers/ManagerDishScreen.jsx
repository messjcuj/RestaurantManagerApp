import React from 'react';
import { Button,LogBox, Animated, ScrollView, Dimensions, Alert, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input, Badge } from 'react-native-elements';
import { ManagerDishStyle } from '../../styles/LayoutStyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { host, port, resourceListUrl, resourceAddUrl, resourceAddResourceDishUrl, resourceDeleteByResourceDishIdUrl, resourceUpdateResourceDishUrl, warehouseListUrl, dishSearchUrl, dishAddUrl, dishDeleteUrl, dishListUrl, dishUpdateUrl, dishTypeListUrl } from '../../apis/ManagerApi';
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
import ManagerDishTypeScreen from './ManagerDishTypeScreen';
const { firebaseConfig } = require('../../configs/Firebase');


class ManagerDishScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceQuantityModal: false,
            resourceQuantityUpdateModal: false,
            searchModal: false,
            searchModalInitial: 1,
            resourceDishModal: false,
            resourceDishModalInitial: 1,
            fadeAnimUpdate: new Animated.Value(0),
            fadeAnimAdd: new Animated.Value(0),
            fadeAnimHome: new Animated.Value(0),
            fadeAnimResourceDish: new Animated.Value(0),
            id: '',
            inputName: '',
            inputResourceName: '',
            inputUnit: '',
            inputDescription: '',
            inputPrice: '',
            inputDishType: null,
            inputUrlImage: null,
            inputWarehouse: null,
            inputResourceDishName: '',
            inputResourceDishQuantity: '',
            inputResourceQuantityModal: 0,
            inputResourceDishpreserveTime: null,
            outputResourceDishPreserveTime: null,
            outputResourceDishMaxPrice: 0,
            flagResourceDishPreserve: false,
            inputResourceDishPrice: '',
            inputResourceQuantity: '',
            optionWarehouse: '',
            optionWarehouseSetup: false,
            optionDishType: '',
            optionDishTypeSetup: false,
            windowWidth: Dimensions.get('window').width,
            windowHeight: Dimensions.get('window').height,
            status: 'homeview',
            statusResourceDish: 'homeview',
            flag: true,
            flagDish: false,
            flagResource: false,
            flagView:'',
            data: [],
            dataResource: {},
            dataResourceList: [],
            dataResourceCartList: [],
            dataResourceDish: [],
            dataDishById: { id: '', name: '' },
            dataResourceDishToUpdate: {},
            dataSingleResource: {},
            dataSingleDish: {},
            dataRole: [],
            timKiem: '',
            error: '',
            errorModal: '',
            errorResource: '',
            resourceDishPriceTotal: 0,
            resourceSaveItem: {},
            resourceCartCount: 0,
            presentTime: new Date(Date.now())
        };
    }
    onChangeDatetoInsertDatabase = (event, selectedDate) => {
        const currentDate = selectedDate;
        var extraDate = '';
        var extraMonth = '';
        if ((currentDate.getMonth() + 1) < 10) extraMonth = '0';
        if (currentDate.getDate() < 10) extraDate = '0';

        this.setState({ flagResourceDishPreserve: false, inputResourceDishpreserveTime: currentDate.getFullYear() + '-' + extraMonth + (currentDate.getMonth() + 1) + '-' + extraDate + currentDate.getDate(), outputResourceDishPreserveTime: extraDate + currentDate.getDate() + '/' + extraMonth + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear() });
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
                        this.setState({ optionDishType: getDishType });
                    },
                    200
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
    resourceQuantityUpdateModalView(isVisible) {
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    isVisible={isVisible}
                >
                    <View style={{ backgroundColor: 'white', borderRadius: 20 }}>
                        <Text></Text>
                        <View style={ManagerDishStyle.setupItemCenterContainer}><Text style={ManagerDishStyle.error}>{this.state.errorResource}</Text></View>
                        <Text></Text>
                        <Input
                            inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                            inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
                            leftIconContainerStyle={{ paddingLeft: '5%' }}
                            name='quantity'
                            placeholder='Nh???p s??? l?????ng'
                            placeholderTextColor="#999999"
                            onChangeText={(quantity) => this.setState({ inputResourceQuantity: quantity })}
                            value={this.state.inputResourceQuantity}
                            leftIcon={{ color: 'grey', type: 'material', name: 'format-list-numbered' }}
                            keyboardType='default' />
                        <Text></Text>
                        <View style={ManagerDishStyle.setupItemCenterContainer}>
                            <TouchableOpacity onPress={() => { this.resourceDishSaveUpdateResourceDish(); }}>
                                <Image
                                    style={ManagerDishStyle.saveButton}
                                    source={require('./../../assets/save.png')}
                                />
                            </TouchableOpacity>
                            <Text>                  </Text>
                            <TouchableOpacity onPress={() => { this.setState({ errorModal: '', resourceQuantityUpdateModal: false }); }}>
                                <Image
                                    style={ManagerDishStyle.cancelButton}
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
    resourceQuantityModalView(isVisible) {
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    isVisible={isVisible}
                >
                    <View style={{ backgroundColor: 'white', borderRadius: 20 }}>
                        <Text></Text>
                        <View style={ManagerDishStyle.setupItemCenterContainer}><Text style={ManagerDishStyle.error}>{this.state.errorModal}</Text></View>
                        <Text></Text>
                        <Input
                            inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                            inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
                            leftIconContainerStyle={{ paddingLeft: '5%' }}
                            name='quantity'
                            placeholder='Nh???p s??? l?????ng'
                            placeholderTextColor="#999999"
                            onChangeText={(quantity) => this.setState({ inputResourceQuantity: quantity })}
                            value={this.state.inputResourceQuantity}
                            leftIcon={{ color: 'grey', type: 'material', name: 'format-list-numbered' }}
                            keyboardType='default' />
                        <Text></Text>
                        <View style={ManagerDishStyle.setupItemCenterContainer}>
                            <TouchableOpacity onPress={() => { this.resourceAddToDish(); }}>
                                <Image
                                    style={ManagerDishStyle.saveButton}
                                    source={require('./../../assets/save.png')}
                                />
                            </TouchableOpacity>
                            <Text>                  </Text>
                            <TouchableOpacity onPress={() => { this.setState({ errorModal: '', resourceQuantityModal: false }); }}>
                                <Image
                                    style={ManagerDishStyle.cancelButton}
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
    searchModalView(isVisible) {
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    isVisible={isVisible}
                >
                    <View style={ManagerDishStyle.searchContainer}>
                        <Text>T??m ki???m theo:</Text>
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
                            initial={this.state.searchModalInitial}
                            onPress={(value) => { this.setState({ searchModalInitial: value }) }}
                        />
                        <Text></Text>
                        <Button title="X??c nh???n" onPress={() => { this.setState({ searchModal: false });this.componentDidMount(); }} />
                    </View>
                </Modal>
            </View>
        );
    }
    searchItem(value) {
        this.setState({ flag: true });
        if (value == '') { this.componentDidMount(); return; }
        if (this.state.searchModalInitial == 0) {
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

                            this.setState({ flag: false, data: dataJson });
                            //console.log(host + ':' + port + dishSearchUrl + 'name='+value+'&price=&unit=');
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
                            this.setState({ flag: false, data: dataJson });
                            //console.log(host + ':' + port + dishSearchUrl + 'name=&price=&unit='+ value);
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

    resourceRenderItem = ({ item }) => (
        <View>
            <View style={ManagerDishStyle.item}>
                <View>
                    <TouchableOpacity onPress={() => { this.setState({ resourceSaveItem: item, resourceQuantityModal: true }); }} >
                        <Image
                            style={ManagerDishStyle.saveButton}
                            source={require('./../../assets/plus.png')}
                        />
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 1 }}>
                    <Text>M??: {item.id}</Text>
                    <Text>T??n: {item.name}</Text>
                    <Text>????n v???: {item.unit}</Text>
                    <Text>M?? t???: {item.description}</Text>
                    <Text>Lo???i nguy??n li???u: {item.resourceType.name}</Text>
                </View>
                <View>
                    <Image
                        style={ManagerDishStyle.logo}
                        source={{
                            uri: item.urlImage + '/',
                        }}
                    />
                </View>
            </View>
        </View>
    );
    resourceDishRenderItem = ({ item }) => (
        <View>
            <View style={ManagerDishStyle.item}>
                <View>
                    <TouchableOpacity onPress={() => { this.resourceDishdeleteItem(item) }}>
                        <Icon
                            style={ManagerDishStyle.icon}
                            name='trash-outline'
                            type='ionicon'
                            color='red'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: '30%' }} onPress={() => { this.setState({ dataSingleResource: item, resourceQuantityUpdateModal: true }) }}>
                        <Icon
                            style={ManagerDishStyle.icon}
                            name='edit'
                            type='font-awesome'
                            color='#517fa4'
                        />
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 1 }}>

                    <Text>M??: {item.resourceDish_Id.resource_id}</Text>
                    <Text>T??n: {item.resourceDish_resource.name}</Text>
                    <Text>Lo???i nguy??n li???u: {item.resourceDish_resource.resourceType.name}</Text>
                    <Text>S??? l?????ng: {item.resourceDish_quantity}</Text>
                    <Text>????n v???: {item.resourceDish_resource.unit}</Text>
                    <Text>M???c gi?? nh???p cao nh???t: {this.formatMoneyDatabasetoView(item.shipmentResourceMax)}</Text>
                </View>
                <View>
                    <Image
                        style={ManagerDishStyle.logo}
                        source={{
                            uri: item.resourceDish_resource.urlImage,
                        }}
                    />
                </View>
            </View>
        </View>
    );


    resourceDishItem = (item) => {
        this.setState({ dataDishById: item, statusResourceDish: 'homeview', status: 'resourcedishview' });
        this.resourceDishGetResourceDishList(item);
        Animated.timing(this.state.fadeAnimResourceDish, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    }
    resourceDishView = () => {
        return (
            <Animated.View
                style={[
                    ManagerDishStyle.container,
                    {
                        opacity: this.state.fadeAnimResourceDish
                    }
                ]}>
                <SafeAreaProvider>

                    {this.state.statusResourceDish == 'homeview' ?
                        <View style={ManagerDishStyle.addExtraItemContainer}>

                            <View style={ManagerDishStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={() => { this.setState({ statusResourceDish: 'resourcedishcreateresourceview' }); }}>
                                    <Image

                                        style={ManagerDishStyle.cancelButton}
                                        source={require('./../../assets/plus.png')}
                                    />
                                </TouchableOpacity>
                                <Text style={ManagerDishStyle.titleResourceDish}>Nguy??n li???u m??n ??n: </Text>

                            </View>
                            <Text style={{ color: 'white' }}>M??: {this.state.dataDishById.id}</Text>
                            <Text style={{ color: 'white' }}>T??n: {this.state.dataDishById.name}</Text>
                            <Text style={{ color: 'white' }}>?????c t??nh chi ph??: {this.formatMoneyDatabasetoView(this.state.resourceDishPriceTotal)}</Text>
                            <Text></Text>
                            {this.state.flagResource ?
                                <View style={{ height: '70%' }}>
                                    <Text></Text>
                                    <ActivityIndicator size="large" color="#DDDDDD" />
                                </View>
                                :
                                <FlatList
                                    style={{ backgroundColor: 'white', borderRadius: 15 }}
                                    data={this.state.dataResourceDish}
                                    renderItem={this.resourceDishRenderItem}
                                    keyExtractor={item => item.id}
                                />
                            }
                            <Text></Text>
                            <View style={ManagerDishStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={() => { this.setState({ resourceDishPriceTotal: 0 }); this.cancelItem() }} >
                                    <Image
                                        style={ManagerDishStyle.cancelButton}
                                        source={require('./../../assets/cancel.png')}
                                    />
                                    {this.resourceQuantityUpdateModalView(this.state.resourceQuantityUpdateModal)}
                                </TouchableOpacity>
                            </View>

                        </View>
                        : null}
                    {this.state.statusResourceDish == 'resourcedishcreateresourceview' ?
                        <View style={ManagerDishStyle.addExtraItemContainer}>

                            <View style={ManagerDishStyle.setupItemCenterContainer}>
                                <Text style={ManagerDishStyle.titleResourceDish}>Th??m nguy??n li???u m??n ??n: </Text>

                            </View>
                            <Text style={{ color: 'white' }}>M??: {this.state.dataDishById.id}</Text>
                            <Text style={{ color: 'white' }}>T??n: {this.state.dataDishById.name}</Text>
                            <Text></Text>

                            <FlatList
                                style={{ backgroundColor: 'white', borderRadius: 15 }}
                                data={this.state.dataResourceList}
                                renderItem={this.resourceRenderItem}
                                keyExtractor={item => item.id}
                            />
                            <Text></Text>
                            <View style={ManagerDishStyle.setupItemCenterContainer}>

                                <TouchableOpacity onPress={() => { this.setState({ statusResourceDish: 'homeview' }); }} >
                                    <Image
                                        style={ManagerDishStyle.cancelButton}
                                        source={require('./../../assets/previous.png')}
                                    />
                                    {this.resourceQuantityModalView(this.state.resourceQuantityModal)}
                                </TouchableOpacity>





                            </View>
                        </View>
                        : null}
                </SafeAreaProvider>
            </Animated.View>
        );
    }

    resourceAddToDish = () => {
        var extraUnit;
        var regQuantity = /^[0-9]+$/;
        if ((!(regQuantity.test(this.state.inputResourceQuantity))) || this.state.inputResourceQuantity <= 0) {
            this.setState({ errorModal: 'S??? l?????ng kh??ng h???p l???!' }); return;
        }
        else {

            for (const element of this.state.dataDishById.resources) {
                if (this.state.resourceSaveItem.id == element.resource.id) {
                    extraUnit = element.resource.unit;
                }
            }
            this.setState({ statusResourceDish: 'homeview', resourceQuantityModal: false, flagResource: true });
            fetch(host + ':' + port + resourceAddResourceDishUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.user.token,
                },
                body: JSON.stringify({
                    resource_id: this.state.resourceSaveItem.id,
                    dish_id: this.state.dataDishById.id,
                    quantity: this.state.inputResourceQuantity,
                    unit: extraUnit
                }),
            })
                .then(response => response.json())
                .then(data => {
                    //console.log(data);
                    Alert.alert(
                        "Th??ng b??o",
                        "Th??m th??nh c??ng!",
                        [
                            {
                                text: "X??c nh???n",
                                onPress: () => {
                                    this.setState({
                                        flagResource: false,
                                        inputResourceQuantity: '',
                                        errorModal: '',
                                        fadeAnimAdd: new Animated.Value(0),
                                        fadeAnimUpdate: new Animated.Value(0),
                                        fadeAnimHome: new Animated.Value(0),
                                        fadeAnimResourceDish: new Animated.Value(0),
                                    });
                                    setTimeout(() => {
                                        Animated.timing(this.state.fadeAnimResourceDish, {
                                            toValue: 1,
                                            duration: 50,
                                            useNativeDriver: true
                                        }).start();
                                        this.resourceDishGetResourceDishList(this.state.dataDishById);
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

    }
    resourceDishGetResourceDishList(item) {
        fetch(host + ':' + port + dishListUrl + item.id, {
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
                        var getResourceDish = [];
                        var resourceDish_Id = {};
                        var resourceDish_resource = {};
                        var resourceDish_quantity = 0;
                        var resourceDish_unit = '';
                        var resource_key = 0;

                        this.setState({ outputResourceDishMaxPrice: shipmentResourceMax });
                        var extraresourceDishPriceTotal = 0;
                        for (const element of dataJson.resources) {
                            var shipmentResourceMax = 0;
                            resource_key = resource_key + 1;
                            resourceDish_Id = element.id;
                            resourceDish_unit = element.unit;
                            resourceDish_quantity = element.quantity;
                            resourceDish_resource = element.resource;
                            for (const extraElement of element.resource.shipments) {
                                if (shipmentResourceMax < extraElement.price) { shipmentResourceMax = extraElement.price; }
                                else shipmentResourceMax = 0;
                            }
                            console.log(shipmentResourceMax);
                            getResourceDish.push({ id: resource_key, resourceDish_Id, resourceDish_resource, resourceDish_quantity, resourceDish_unit, shipmentResourceMax });



                            this.setState({ outputResourceDishMaxPrice: shipmentResourceMax });
                            extraresourceDishPriceTotal = extraresourceDishPriceTotal + shipmentResourceMax * element.quantity;

                        }
                        this.setState({ resourceDishPriceTotal: extraresourceDishPriceTotal, dataResourceDish: getResourceDish });


                    },
                    50
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
                        this.setState({ dataResourceList: [] });
                        var getResource = [];
                        

                        for (const element of dataJson) {
                            var resourceFlag = true;
                            for (const extraElement of this.state.dataResourceDish) {
                                if (element.id == extraElement.resourceDish_Id.resource_id) {
                                    //console.log(element.id);
                                    //console.log(extraElement.resourceDish_Id.resource_id);
                                    resourceFlag = false;
                                }
                                //    else resourceFlag = true;

                            }
                            //  console.log(resourceFlag);

                            if (resourceFlag) {
                                getResource.push({
                                    id: element.id,
                                    name: element.name,
                                    description: element.description,
                                    unit: element.unit,
                                    urlImage: element.urlImage,
                                    resourceType: {
                                        id: element.resourceType.id,
                                        name: element.resourceType.name
                                    }
                                });
                            }

                        }
                        this.setState({ dataResourceList: getResource });

                        //console.log(this.state.dataResourceList);
                    },
                    200
                )

            })
            .catch(error => {
                console.log(error);
            });


    }
    resourceDishSaveResourceDish = () => {
        var regPrice = /^[0-9]+$/;
        var regQuantity = /^[0-9]+$/;
        if ((!(regQuantity.test(this.state.inputResourceDishQuantity))) || this.state.inputResourceDishQuantity <= 0) {
            this.setState({ error: 'S??? l?????ng kh??ng h???p l???!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if ((!(regPrice.test(this.state.inputResourceDishPrice))) || this.state.inputResourceDishPrice <= 0) {
            this.setState({ error: 'S??? ti???n kh??ng h???p l???!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if (this.state.inputResourceDishpreserveTime == null) {
            this.setState({ error: 'Vui l??ng ch???n h???n s??? d???ng!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if (this.state.inputWarehouse == null) {
            this.setState({ error: 'Vui l??ng ch???n nh?? kho!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        fetch(host + ':' + port + resourceAddUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            body: JSON.stringify({
                name: 'Chuy???n h??ng l???n ' + (this.state.dataResourceDish.length + 1),
                time: '',
                warehouse: {
                    id: this.state.inputWarehouse
                }
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 500) { this.setState({ error: 'System fail!' }); return; }
                this.setState({ dataResource: data });

                fetch(host + ':' + port + resourceAddResourceDishUrl, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.props.user.token,
                    },
                    body: JSON.stringify({
                        resource_id: this.state.dataResource.id,
                        dish_id: this.state.dataDishById.id,
                        quantity: this.state.inputResourceDishQuantity,
                        preserveTime: this.state.inputResourceDishpreserveTime,
                        price: this.state.inputResourceDishPrice
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status == 500) { this.setState({ error: 'System fail!' }); return; }

                        Alert.alert(
                            "Th??ng b??o",
                            "Th??m th??nh c??ng!",
                            [
                                {
                                    text: "X??c nh???n",
                                    onPress: () => {
                                        this.setState({
                                            resourceDishPriceTotal: 0,
                                            inputResourceDishName: '',
                                            inputResourceDishPrice: '',
                                            inputResourceDishQuantity: '',
                                            inputResourceDishpreserveTime: '',
                                            inputWarehouse: null,
                                            inputResourceDishpreserveTime: null,
                                            outputResourceDishPreserveTime: '',
                                            error: '',
                                            fadeAnimAdd: new Animated.Value(0),
                                            fadeAnimUpdate: new Animated.Value(0),
                                            fadeAnimHome: new Animated.Value(0),
                                            statusResourceDish: 'homeview',
                                        });
                                        setTimeout(() => {
                                            Animated.timing(this.state.fadeAnimResourceDish, {
                                                toValue: 1,
                                                duration: 300,
                                                useNativeDriver: true
                                            }).start();
                                            this.resourceDishGetResourceDishList(this.state.dataDishById);
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
    resourceDishdeleteItem = (item) => {

        Alert.alert(
            "Th??ng b??o",
            "Ch???c ch???n x??a?",
            [
                {
                    text: "H???y",
                    onPress: () => {
                        this.setState({ statusResourceDish: 'homeview' });
                    }
                },
                {
                    text: "?????ng ??", onPress: () => {



                        fetch(host + ':' + port + resourceDeleteByResourceDishIdUrl, {
                            method: 'DELETE',
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                                'Authorization': 'Bearer ' + this.props.user.token,
                            },
                            body: JSON.stringify({

                                resource_id: item.resourceDish_Id.resource_id,
                                dish_id: item.resourceDish_Id.dish_id


                            }),
                        })
                            .then(response => response.json())
                            .then(data => {
                                // console.log(item);
                                this.setState({
                                    fadeAnimAdd: new Animated.Value(0),
                                    fadeAnimUpdate: new Animated.Value(0),
                                    fadeAnimHome: new Animated.Value(0),
                                    fadeAnimResourceDish: new Animated.Value(0),
                                    statusResourceDish: 'homeview',
                                });

                                setTimeout(() => {
                                    Animated.timing(this.state.fadeAnimResourceDish, {
                                        toValue: 1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start();
                                    this.setState({ resourceDishPriceTotal: 0 });
                                    this.resourceDishGetResourceDishList(this.state.dataDishById);
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
    resourceDishUpdate(item) {
        this.setState({
            dataResourceDishToUpdate: item,
            inputResourceDishName: item.resourceDish_quantity + ''
        });
    }


    resourceDishSaveUpdateResourceDish() {
        //console.log(this.state.dataSingleResource);
        var regPrice = /^[0-9]+$/;
        var regQuantity = /^[0-9]+$/;
        if ((!(regQuantity.test(this.state.inputResourceQuantity))) || this.state.inputResourceQuantity <= 0) {
            this.setState({ errorResource: 'S??? l?????ng kh??ng h???p l???!' }); return;
        }
        else {
            this.setState({ errorResource: '' });
        }
        this.setState({ resourceQuantityUpdateModal: false, flagResource: true });
        fetch(host + ':' + port + resourceUpdateResourceDishUrl + this.state.dataSingleResource.resourceDish_Id.resource_id + '/' + this.state.dataSingleDish.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            body: JSON.stringify({
                resource_id: this.state.dataSingleResource.resourceDish_Id.resource_id,
                dish_id: this.state.dataSingleDish.id,
                quantity: this.state.inputResourceQuantity,
                unit: this.state.dataSingleResource.unit
            }),
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                //this.setState({ dataResource: data });

                Alert.alert(
                    "Th??ng b??o",
                    "C???p nh???t th??nh c??ng!",
                    [
                        {
                            text: "X??c nh???n",
                            onPress: () => {
                                this.setState({
                                    flagResource: false,
                                    inputResourceQuantity: '',
                                    errorResource: '',
                                    fadeAnimAdd: new Animated.Value(0),
                                    fadeAnimUpdate: new Animated.Value(0),
                                    fadeAnimHome: new Animated.Value(0),
                                    statusResourceDish: 'homeview',
                                });
                                setTimeout(() => {
                                    Animated.timing(this.state.fadeAnimResourceDish, {
                                        toValue: 1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start();
                                    this.resourceDishGetResourceDishList(this.state.dataDishById);
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
            "Th??ng b??o",
            "Ch???c ch???n x??a?",
            [
                {
                    text: "H???y",
                    onPress: () => {
                        this.setState({ status: 'homeview' });
                    }
                },
                {
                    text: "?????ng ??", onPress: () => {



                        // fetch(host + ':' + port + resourceDeleteResourceDishByDishIdUrl + id, {
                        ////      method: 'DELETE',
                        //   headers: {
                        ///        'Content-type': 'application/json; charset=UTF-8',
                        //      'Authorization': 'Bearer ' + this.props.user.token,
                        // },
                        // body: JSON.stringify({}),
                        //  })
                        // .then(response => response.json())
                        //  .then(data => {
                        fetch(host + ':' + port + dishDeleteUrl + id, {
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
                                        "Th??ng b??o",
                                        "Kh??ng th??? x??a m??n ??n v?? l?? do b???o to??n d??? li???u",
                                        [
                                            {
                                                text: "????ng",
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
                        // .catch((error) => {

                        //      console.log(error);

                        //   });




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
                    ManagerDishStyle.container,
                    {
                        opacity: this.state.fadeAnimAdd
                    }
                ]}>
                <SafeAreaProvider>
                    {this.state.flagDish ?
                        <View>
                            <Text></Text>
                            <ActivityIndicator size="large" color="#DDDDDD" />
                        </View>
                        :
                        <View style={ManagerDishStyle.setupItem}>
                            <Text style={ManagerDishStyle.title}>Th??m m??n ??n m???i: </Text>
                            <View style={ManagerDishStyle.setupItemCenterContainer}><Text style={ManagerDishStyle.error}>{this.state.error}</Text></View>
                            <ScrollView>
                                <Input
                                    inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                                    inputContainerStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                                    leftIconContainerStyle={{ paddingLeft: '5%' }}
                                    name='name'
                                    placeholder='T??n'
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
                                    placeholder='????n v???'
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
                                    placeholder='M?? t???'
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
                                    placeholder='Gi?? b??n'
                                    placeholderTextColor="#999999"
                                    onChangeText={(price) => this.setState({ inputPrice: price })}
                                    value={this.state.inputPrice}
                                    leftIcon={{ color: 'grey', type: 'material', name: 'euro' }}
                                    keyboardType='default' />
                                <View style={ManagerDishStyle.itemMenuContainerTouchable}>
                                    <View style={ManagerDishStyle.itemMenuContainerTouchableContent}>


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
                                        <Text style={{ marginLeft: '5%' }}>???nh n???n</Text>
                                    </View>

                                </View>

                                <Text></Text>
                                <View style={ManagerDishStyle.setupItemCenterContainer}>
                                    <Image
                                        style={ManagerDishStyle.setupImageCenterContainer}
                                        source={{
                                            uri: this.state.inputUrlImage,
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

                            <View style={ManagerDishStyle.itemMenuContainerTouchable}>
                                <View style={ManagerDishStyle.itemMenuContainerTouchableContent}>


                                    <TouchableOpacity
                                        style={{ marginLeft: '5%' }}
                                        onPress={() => { this.setState({flagView:'addview', status: 'dishtypeview' }) }}
                                    >
                                        <Icon
                                            name='post-add'
                                            type='material'
                                            color='#517fa4'
                                        />



                                    </TouchableOpacity>
                                    <Text style={{ marginLeft: '5%' }}>Lo???i m??n ??n: </Text>
                                </View>

                            </View>
                            <DropDownPicker
                                style={ManagerDishStyle.setupItemCenterContainerRowOption}
                                open={this.state.optionDishTypeSetup}

                                placeholder={''}
                                value={this.state.inputDishType}
                                items={
                                    this.state.optionDishType
                                }
                                onPress={() => { if (this.state.optionDishTypeSetup) { this.setState({ optionDishTypeSetup: false }) } else { this.setState({ optionDishTypeSetup: true }); } }}

                                containerStyle={{ height: 40 }}
                                onSelectItem={(item) => { this.setState({ inputDishType: item.value, optionDishTypeSetup: false }) }}
                                dropDownDirection="TOP"
                                bottomOffset={100}
                            />


                            <View style={ManagerDishStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={this.saveAddItem}>
                                    <Image
                                        style={ManagerDishStyle.saveButton}
                                        source={require('./../../assets/save.png')}
                                    />
                                </TouchableOpacity>
                                <Text>                  </Text>
                                <TouchableOpacity onPress={this.cancelItem}>
                                    <Image
                                        style={ManagerDishStyle.cancelButton}
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
        var regName = /^[aA????????????????????????????????????????????????????????????????????????????????????????????bBcCdD????eE????????????????????????????????????????????????????????????fFgGhHiI????????????????????????jJkKlLmMnNoO????????????????????????????????????????????????????????????????????????????????????????????pPqQrRsStTuU??????????????????????????????????????????????????????????vVwWxXyY????????????????????????????zZ0-9 ]+$/;
        var regUnit = /^[aA????????????????????????????????????????????????????????????????????????????????????????????bBcCdD????eE????????????????????????????????????????????????????????????fFgGhHiI????????????????????????jJkKlLmMnNoO????????????????????????????????????????????????????????????????????????????????????????????pPqQrRsStTuU??????????????????????????????????????????????????????????vVwWxXyY????????????????????????????zZ0-9 ]+$/;
        var regDescription = /^[aA????????????????????????????????????????????????????????????????????????????????????????????bBcCdD????eE????????????????????????????????????????????????????????????fFgGhHiI????????????????????????jJkKlLmMnNoO????????????????????????????????????????????????????????????????????????????????????????????pPqQrRsStTuU??????????????????????????????????????????????????????????vVwWxXyY????????????????????????????zZ0-9 ]+$/;
        if (!(regName.test(this.state.inputName))) {
            this.setState({ error: 'T??n kh??ng h???p l???!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if (!(regUnit.test(this.state.inputUnit))) {
            this.setState({ error: '????n v??? kh??ng h???p l???!' }); return;
        }
        else {
            this.setState({ error: '' });
        }

        if (!(regDescription.test(this.state.inputDescription))) {
            this.setState({ error: 'M?? t??? kh??ng h???p l???!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if ((!(regPrice.test(this.state.inputPrice))) || this.state.inputPrice <= 0) {
            this.setState({ error: 'S??? ti???n kh??ng h???p l???!' }); return;
        }
        else {
            this.setState({ error: '' });
        }


        if (this.state.inputUrlImage == null) {
            this.setState({ error: 'H??nh ???nh kh??ng h???p l???!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if (this.state.inputDishType == null) {
            this.setState({ error: 'Vui l??ng ch???n lo???i m??n ??n!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        this.setState({ flagDish: true });
        this.uploadImageAsync(this.state.inputUrlImage).then(() => {
            fetch(host + ':' + port + dishAddUrl, {
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
                    dishType: {
                        id: this.state.inputDishType
                    }
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == 500) { this.setState({ error: 'System fail!' }); return; }
                    //console.log(data);
                    Alert.alert(
                        "Th??ng b??o",
                        "Th??m th??nh c??ng!",
                        [
                            {
                                text: "X??c nh???n",
                                onPress: () => {
                                    this.setState({
                                        flagDish: false,
                                        dataDishById: data,
                                        inputName: '',
                                        inputPrice: '',
                                        inputDescription: '',
                                        inputUnit: '',
                                        inputUrlImage: null,
                                        inputDishType: null,
                                        error: '',
                                        fadeAnimAdd: new Animated.Value(0),
                                        fadeAnimUpdate: new Animated.Value(0),
                                        fadeAnimHome: new Animated.Value(0),
                                        //status: 'resourcedishview',
                                    });
                                    setTimeout(() => {
                                        Animated.timing(this.state.fadeAnimHome, {
                                            toValue: 1,
                                            duration: 50,
                                            useNativeDriver: true
                                        }).start();
                                        this.resourceDishItem(data);
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
            inputDishType: item.dishType.id,
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
                    ManagerDishStyle.container,
                    {
                        opacity: this.state.fadeAnimUpdate
                    }
                ]}>
                <SafeAreaProvider>
                    {this.state.flagDish ?
                        <View>
                            <Text></Text>
                            <ActivityIndicator size="large" color="#DDDDDD" />
                        </View>
                        :
                        <View style={ManagerDishStyle.setupItem}>
                            <Text style={ManagerDishStyle.title}>C???p nh???t m??n ??n: {this.state.id}</Text>
                            <View style={ManagerDishStyle.setupItemCenterContainer}><Text style={ManagerDishStyle.error}>{this.state.error}</Text></View>
                            <ScrollView>
                                <Input
                                    inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                                    inputContainerStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                                    leftIconContainerStyle={{ paddingLeft: '5%' }}
                                    name='name'
                                    placeholder='T??n'
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
                                    placeholder='????n v???'
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
                                    placeholder='M?? t???'
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
                                    placeholder='Gi??'
                                    placeholderTextColor="#999999"
                                    onChangeText={(price) => this.setState({ inputPrice: price })}
                                    value={this.state.inputPrice}
                                    leftIcon={{ color: 'grey', type: 'material', name: 'euro' }}
                                    keyboardType='default' />
                                <View style={ManagerDishStyle.itemMenuContainerTouchable}>
                                    <View style={ManagerDishStyle.itemMenuContainerTouchableContent}>


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
                                        <Text style={{ marginLeft: '5%' }}>???nh n???n</Text>
                                    </View>

                                </View>

                                <Text></Text>
                                <View style={ManagerDishStyle.setupItemCenterContainer}>
                                    <Image
                                        style={ManagerDishStyle.setupImageCenterContainer}
                                        source={{
                                            uri: this.state.inputUrlImage,
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
                            <View style={ManagerDishStyle.itemMenuContainerTouchable}>
                                <View style={ManagerDishStyle.itemMenuContainerTouchableContent}>


                                    <TouchableOpacity
                                        style={{ marginLeft: '5%' }}
                                        onPress={() => { this.setState({flagView:'updateview', status: 'dishtypeview' }) }}
                                    >
                                        <Icon
                                            name='post-add'
                                            type='material'
                                            color='#517fa4'
                                        />



                                    </TouchableOpacity>
                                    <Text style={{ marginLeft: '5%' }}>Lo???i m??n ??n: </Text>
                                </View>

                            </View>

                            <DropDownPicker
                                style={ManagerDishStyle.setupItemCenterContainerRowOption}
                                open={this.state.optionDishTypeSetup}

                                placeholder={'Ch???n lo???i m??n ??n'}
                                value={this.state.inputDishType}
                                items={
                                    this.state.optionDishType
                                }
                                onPress={() => { if (this.state.optionDishTypeSetup) { this.setState({ optionDishTypeSetup: false }) } else { this.setState({ optionDishTypeSetup: true }); } }}

                                containerStyle={{ height: 40 }}
                                onSelectItem={(item) => { this.setState({ inputDishType: item.value, optionDishTypeSetup: false }) }}
                                dropDownDirection="TOP"
                                bottomOffset={100}
                            />


                            <View style={ManagerDishStyle.setupItemCenterContainer}>
                                <TouchableOpacity onPress={this.saveUpdateItem}>
                                    <Image
                                        style={ManagerDishStyle.saveButton}
                                        source={require('./../../assets/save.png')}
                                    />
                                </TouchableOpacity>
                                <Text>                  </Text>
                                <TouchableOpacity onPress={this.cancelItem}>
                                    <Image
                                        style={ManagerDishStyle.cancelButton}
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
        var regName = /^[aA????????????????????????????????????????????????????????????????????????????????????????????bBcCdD????eE????????????????????????????????????????????????????????????fFgGhHiI????????????????????????jJkKlLmMnNoO????????????????????????????????????????????????????????????????????????????????????????????pPqQrRsStTuU??????????????????????????????????????????????????????????vVwWxXyY????????????????????????????zZ0-9 ]+$/;
        var regUnit = /^[aA????????????????????????????????????????????????????????????????????????????????????????????bBcCdD????eE????????????????????????????????????????????????????????????fFgGhHiI????????????????????????jJkKlLmMnNoO????????????????????????????????????????????????????????????????????????????????????????????pPqQrRsStTuU??????????????????????????????????????????????????????????vVwWxXyY????????????????????????????zZ0-9 ]+$/;
        var regDescription = /^[aA????????????????????????????????????????????????????????????????????????????????????????????bBcCdD????eE????????????????????????????????????????????????????????????fFgGhHiI????????????????????????jJkKlLmMnNoO????????????????????????????????????????????????????????????????????????????????????????????pPqQrRsStTuU??????????????????????????????????????????????????????????vVwWxXyY????????????????????????????zZ0-9 ]+$/;
        if (!(regName.test(this.state.inputName))) {
            this.setState({ error: 'T??n kh??ng h???p l???!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if (!(regUnit.test(this.state.inputUnit))) {
            this.setState({ error: '????n v??? kh??ng h???p l???!' }); return;
        }
        else {
            this.setState({ error: '' });
        }

        if (!(regDescription.test(this.state.inputDescription))) {
            this.setState({ error: 'M?? t??? kh??ng h???p l???!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if ((!(regPrice.test(this.state.inputPrice))) || this.state.inputPrice <= 0) {
            this.setState({ error: 'S??? ti???n kh??ng h???p l???!' }); return;
        }
        else {
            this.setState({ error: '' });
        }


        if (this.state.inputUrlImage == null) {
            this.setState({ error: 'H??nh ???nh kh??ng h???p l???!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        if (this.state.inputDishType == null) {
            this.setState({ error: 'Vui l??ng ch???n lo???i m??n ??n!' }); return;
        }
        else {
            this.setState({ error: '' });
        }
        this.setState({ flagDish: true });
        this.uploadImageAsync(this.state.inputUrlImage).then(() => {
            fetch(host + ':' + port + dishUpdateUrl + this.state.id, {
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
                    dishType: {
                        id: this.state.inputDishType
                    }
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == 500) { this.setState({ error: 'System fail!' }); return; }
                    //console.log(data);
                    Alert.alert(
                        "Th??ng b??o",
                        "C???p nh???t th??nh c??ng!",
                        [
                            {
                                text: "X??c nh???n",
                                onPress: () => {
                                    this.setState({
                                        flagDish: false,
                                        inputName: '',
                                        inputPrice: '',
                                        inputDescription: '',
                                        inputUnit: '',
                                        inputUrlImage: null,
                                        inputDishType: null,
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
            inputDishType: null,
            error: '',
            error: '',
            fadeAnimAdd: new Animated.Value(0),
            fadeAnimUpdate: new Animated.Value(0),
            fadeAnimHome: new Animated.Value(0),
            fadeAnimResourceDish: new Animated.Value(0),
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
            <TouchableOpacity onPress={() => { this.setState({ dataSingleDish: item, resourceDishPriceTotal: 0 }); this.resourceDishItem(item) }}>
                <View style={ManagerDishStyle.item}>
                    <View>
                        <TouchableOpacity onPress={() => { this.deleteItem(item.id); }}>
                            <Icon
                                style={ManagerDishStyle.icon}
                                name='trash-outline'
                                type='ionicon'
                                color='red'
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: '30%' }} onPress={() => { this.updateItem(item); }}>
                            <Icon
                                style={ManagerDishStyle.icon}
                                name='edit'
                                type='font-awesome'
                                color='#517fa4'
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={{ flex: 1 }}>
                        <Text>M??: {item.id}</Text>
                        <Text>T??n: {item.name}</Text>
                        <Text>????n v???: {item.unit}</Text>
                        <Text>M?? t???: {item.description}</Text>
                        <Text>Lo???i m??n ??n: {item.dishType.name}</Text>
                        <Text>Gi??: {this.formatMoneyDatabasetoView(item.price)}</Text>
                    </View>
                    <View>
                        <Image
                            style={ManagerDishStyle.logo}
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
            <View style={ManagerDishStyle.container}>
                {this.state.status == 'homeview' ?
                    <View style={ManagerDishStyle.container}>
                        <Animated.View
                            style={[
                                ManagerDishStyle.container,
                                {
                                    opacity: this.state.fadeAnimHome
                                }
                            ]}>
                            <SafeAreaProvider>
                                <View style={ManagerDishStyle.topcontainer}>
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
                                        placeholder='Nh???p n???i dung t??m ki???m...'
                                        placeholderTextColor="#BBBBBB"
                                        onChangeText={(search) => this.searchItem(search)}
                                        //value={this.state.inputSearch}
                                        leftIcon={{ color: 'grey', type: 'material', name: 'search' }}
                                        keyboardType='default' />
                                </View>


                                <View style={ManagerDishStyle.centercontainer}>
                                    <Text style={ManagerDishStyle.title}>Danh s??ch m??n ??n:</Text>
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
                            <View style={ManagerDishStyle.plusContainer}>
                                <TouchableOpacity onPress={this.addItem}>

                                    <Image
                                        style={ManagerDishStyle.plus}
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
                {this.state.status == 'resourcedishview' ?
                    <this.resourceDishView />
                    : null}
                {this.state.status == 'dishtypeview' ?
                    <View style={ManagerDishStyle.container}>

                        <View style={{ marginTop: '1%', marginRight: '80%' }}>
                            <TouchableOpacity
                                style={{}}
                                onPress={() => { this.componentDidMount(); this.setState({ status: this.state.flagView }); }}
                            >
                                <View style={ManagerDishStyle.itemMenuContainerTouchableContent}>

                                    <Text style={{ marginLeft: '1%', color: 'white' }}>Tr??? v???</Text>



                                    <Icon
                                        name='backspace'
                                        type='ionicon'
                                        color='white'
                                    />

                                </View>
                            </TouchableOpacity>
                        </View>


                        <ManagerDishTypeScreen />
                    </View>

                    : null}
            </View>

        );
    }
}


const mapStateToProps = state => {
    return { user: state.users }
};

export default connect(mapStateToProps)(ManagerDishScreen);