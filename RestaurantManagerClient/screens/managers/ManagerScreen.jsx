import React from 'react';
import { Dimensions, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import ManagerWarehouseScreen from './ManagerWarehouseScreen';
import ManagerUserScreen from './ManagerUserScreen';
import ManagerOrderScreen from './ManagerOrderScreen';
import ManagerAreaScreen from './ManagerAreaScreen';
import ManagerDiningTableScreen from './ManagerDiningTableScreen';
import ManagerShipmentScreen from './ManagerShipmentScreen';
import ManagerResourceTypeScreen from './ManagerResourceTypeScreen';
import ManagerResourceScreen from './ManagerResourceScreen';
import ManagerDrinkTypeScreen from './ManagerDrinkTypeScreen';
import ManagerDrinkScreen from './ManagerDrinkScreen';
import ManagerDishTypeScreen from './ManagerDishTypeScreen';
import ManagerDishScreen from './ManagerDishScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { ManagerStyle } from '../../styles/LayoutStyle';
import { store } from '../../configs/ReduxStore';

let userName;
let password;
let phone;
let name;
let role;
let birthDay;
let token;
const Drawer = createDrawerNavigator();
class ManagerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: Dimensions.get('window').width,
      windowHeight: Dimensions.get('window').height
    };
  }
  componentDidMount() {
    let setDate;
    userName = this.props.user.userName;
    password = this.props.user.password
    token = this.props.user.token;
    role = this.props.user.role;
    name = this.props.user.name;
    phone = this.props.user.phone;
    setDate = new Date(this.props.user.birthDay);
    birthDay = setDate.getDate() + "/" + (setDate.getMonth() + 1) + "/" + setDate.getFullYear();

  }
  CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{
        flex: 1,
        backgroundColor: '#103667'
      }}>
        <LinearGradient colors={['#103667', '#1B4F93', '#426EB4']}>
          <View style={ManagerStyle.drawercontentprofilecontainer}>
            <View style={ManagerStyle.drawerContentProfileContainerLeft}>
              <Image
                style={ManagerStyle.drawerContentProfileContainerLeftLogo}
                source={require('./../../assets/man.png')}
              /></View>
            <View style={ManagerStyle.drawerContentProfileContainerRight}>
              <Text style={ManagerStyle.drawerContentProfileContainerRightTitle}>{name} ({userName})</Text>
              <Text style={ManagerStyle.drawerContentProfileContainerRightText}>??? Ch???c v???: {role}</Text>
              <Text style={ManagerStyle.drawerContentProfileContainerRightText}>??? Ng??y sinh: {birthDay}</Text>
              <Text style={ManagerStyle.drawerContentProfileContainerRightText}>??? Li??n l???c: {phone}</Text>
            </View>
          </View>

        </LinearGradient>

        <View style={ManagerStyle.drawerItemListContainer}>
          <DrawerItemList {...props} />
        </View>
        <View style={ManagerStyle.drawerLogoutContainer}>
          <TouchableOpacity
            onPress={() => {
              var action = {
                type: 'LOADING',
                payload: true
              };
              store.dispatch(action);
              props.navigation.navigate('logoutscreen');
            }}
            style={ManagerStyle.drawerLogoutContainerTouchable}
          >
            <View style={ManagerStyle.drawerLogoutContainerTouchableContent}>
              <Icon
                name='log-out-outline'
                type='ionicon'
                color='#517fa4'
              />
              <Text> ????ng xu???t </Text>
            </View>

          </TouchableOpacity>
        </View>

      </DrawerContentScrollView>
    );
  }
  render() {
    return (
      <Drawer.Navigator useLegacyImplementation drawerContent={(props) => <this.CustomDrawerContent {...props} />}>

        <Drawer.Screen name="H??a ????n" component={ManagerOrderScreen} options={{
          drawerIcon: config =>
            <Icon
              name='list-alt'
              type='material'
              color='#517fa4'
            />
        }} />
        <Drawer.Screen name="M??n ??n" component={ManagerDishScreen} options={{
          drawerIcon: config =>
            <Icon
              name='restaurant'
              type='material'
              color='#517fa4'
            />
        }} />
        <Drawer.Screen name="Nguy??n li???u" component={ManagerResourceScreen} options={{
          drawerIcon: config =>
            <Icon
              name='shop'
              type='material'
              color='#517fa4'
            />
        }} />
        <Drawer.Screen name="????? u???ng" component={ManagerDrinkScreen} options={{
          drawerIcon: config =>
            <Icon
              name='sports-bar'
              type='material'
              color='#517fa4'
            />
        }} />
        <Drawer.Screen name="Nh??n vi??n" component={ManagerUserScreen} options={{
          drawerIcon: config =>
            <Icon
              name='person'
              type='ionicon'
              color='#517fa4'
            />
        }} />

        <Drawer.Screen name="Nh?? kho" component={ManagerWarehouseScreen} options={{
          drawerIcon: config =>
            <Icon
              name='file-tray-stacked'
              type='ionicon'
              color='#517fa4'
            />
        }} />

        <Drawer.Screen name="Khu v???c" component={ManagerAreaScreen} options={{
          drawerIcon: config =>
            <Icon
              name='map'
              type='ionicon'
              color='#517fa4'
            />
        }} />
        <Drawer.Screen name="B??n ??n" component={ManagerDiningTableScreen} options={{
          drawerIcon: config =>
            <Icon
              name='grid-view'
              type='material'
              color='#517fa4'
            />
        }} />


      </Drawer.Navigator>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.users }
};

export default connect(mapStateToProps)(ManagerScreen);