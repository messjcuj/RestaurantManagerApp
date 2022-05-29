import React from 'react';
import { Animated, ScrollView, Dimensions, Alert, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Input } from 'react-native-elements';
import { ManagerShipmentStyle } from '../../styles/LayoutStyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { host, port, shipmentAddShipmentDrinkUrl, shipmentAddShipmentResourceUrl, shipmentAddUrl, shipmentDeleteShipmentDrinkByShipmentDrinkIdUrl, shipmentDeleteShipmentDrinkByShipmentIdUrl, shipmentDeleteShipmentResourceByShipmentIdUrl, shipmentDeleteShipmentResourceByShipmentResourceIdUrl, shipmentDeleteUrl, shipmentListUrl, shipmentSearchUrl, shipmentUpdateShipmentDrinkUrl, shipmentUpdateShipmentResourceUrl, shipmentUpdateUrl } from '../../apis/ManagerApi';
import { Icon } from 'react-native-elements';
import AnimatedLoader from "react-native-animated-loader";
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { ManagerStyle } from '../../styles/LayoutStyle';
import ManagerDrinkScreen from './ManagerDrinkScreen';
import ManagerResourceScreen from './ManagerResourceScreen';

const DATA = [
    {
        id: '1',
        name: 'Nhập nguyên liệu',
        url: require('./../../assets/resource.png')
    },
    {
        id: '2',
        name: 'Nhập đồ uống',
        url: require('./../../assets/drink.png')
    }
];
class ManagerShipmentScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'homeview',
            searchModalInitial: 1,
            fadeAnimDrink: new Animated.Value(0),
            fadeAnimResource: new Animated.Value(0),
            fadeAnimHome: new Animated.Value(0),
        };
    }
    componentDidMount = () => {
        Animated.timing(this.state.fadeAnimHome, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }
    ShowAddResourceView() {
        return (
            <View style={ManagerShipmentStyle.container}>
                <Text>Resource</Text>
            </View>
        );
    }
    ShowAddDrinkView() {
        return (
            <View style={ManagerShipmentStyle.container}>
                <Text>Drink</Text>
            </View>
        );
    }
    render() {
        return (
            <View style={ManagerShipmentStyle.container}>
                {this.state.status == 'homeview' ?
                    <Animated.View
                        style={[
                            ManagerShipmentStyle.container,
                            {
                                opacity: this.state.fadeAnimHome
                            }
                        ]}>

                        <View style={ManagerShipmentStyle.itemMenuContainerTouchable}>
                            <View style={ManagerShipmentStyle.itemMenuContainerTouchableContent}>


                                <TouchableOpacity
                                    style={ManagerShipmentStyle.itemMenu}
                                    onPress={() => { this.setState({ status: 'drinkview' }); }}
                                >
                                    <Image
                                        style={{ width: '100%', height: '100%', borderRadius: 100 }}
                                        source={require('./../../assets/drink.png')}
                                    />
                                    <Text style={ManagerShipmentStyle.itemMenuTitle}>Đồ uống</Text>


                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={ManagerShipmentStyle.itemMenu}
                                    onPress={() => { this.setState({ status: 'resourceview' }); }}
                                >
                                    <Image
                                        style={{ width: '100%', height: '100%', borderRadius: 100 }}
                                        source={require('./../../assets/resource.png')}
                                    />
                                    <Text style={ManagerShipmentStyle.itemMenuTitle}>Nguyên liệu</Text>

                                </TouchableOpacity>

                            </View>

                        </View>

                        <View>


                        </View>

                    </Animated.View>
                    : null}
                {this.state.status == 'resourceview' ?
                     <View style={ManagerShipmentStyle.container}>
                        
                     <View style={{ marginTop: '1%',marginRight:'80%' }}>
                     <TouchableOpacity
                     style={{}}
                     onPress={() => { this.setState({ status: 'homeview' }); }}
                 >
                         <View style={ManagerShipmentStyle.itemMenuContainerTouchableContent}>
                             
                             <Text style={{ marginLeft: '1%', color: 'white' }}>Trở về</Text>



                             <Icon
                                 name='backspace'
                                 type='ionicon'
                                 color='white'
                             />
                     
                         </View>
                         </TouchableOpacity>
                     </View>
                



                 <ManagerResourceScreen />
             </View> : null}
                {this.state.status == 'drinkview' ?
                    <View style={ManagerShipmentStyle.container}>
                        
                            <View style={{ marginTop: '1%',marginRight:'80%' }}>
                            <TouchableOpacity
                            style={{}}
                            onPress={() => { this.setState({ status: 'homeview' }); }}
                        >
                                <View style={ManagerShipmentStyle.itemMenuContainerTouchableContent}>
                                    
                                    <Text style={{ marginLeft: '1%', color: 'white' }}>Trở về</Text>



                                    <Icon
                                        name='backspace'
                                        type='ionicon'
                                        color='white'
                                    />
                            
                                </View>
                                </TouchableOpacity>
                            </View>
                       



                        <ManagerDrinkScreen />
                    </View> : null}
            </View>
        );
    }
}






const mapStateToProps = state => {
    return { user: state.users }
};

export default connect(mapStateToProps)(ManagerShipmentScreen);