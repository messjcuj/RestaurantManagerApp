import React from 'react';
import { Dimensions, Text, View, TouchableOpacity, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { ManagerWarehouseScreen } from './ManagerWarehouseScreen';
import ManagerUserScreen from './ManagerUserScreen';
import { ManagerOrderScreen } from './ManagerOrderScreen';
import { ManagerAreaScreen } from './ManagerAreaScreen';
import { ManagerDiningTableScreen } from './ManagerDiningTableScreen';
import { Icon } from 'react-native-elements';
import { ManagerStyle } from '../../styles/LayoutStyle';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { store } from '../../configs/ReduxStore';
import { NotificationStyle } from '../../styles/LayoutStyle';
import NotificationShowScreen from './NotificationShowScreen';

let userName;
let password;
let phone;
let name;
let role;
let birthDay;
let token;
const Drawer = createDrawerNavigator();
class NotificationScreen extends React.Component {
  componentDidMount() {
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
          <View style={NotificationStyle.drawercontentprofilecontainer}>
            <View style={NotificationStyle.drawerContentProfileContainerLeft}>
              <Image
                style={NotificationStyle.drawerContentProfileContainerLeftLogo}
                source={require('./../../assets/man.png')}
              /></View>
            <View style={NotificationStyle.drawerContentProfileContainerRight}>
              <Text style={NotificationStyle.drawerContentProfileContainerRightTitle}>{name} ({userName})</Text>
              <Text style={NotificationStyle.drawerContentProfileContainerRightText}>● Chức vụ: {role}</Text>
              <Text style={NotificationStyle.drawerContentProfileContainerRightText}>● Ngày sinh: {birthDay}</Text>
              <Text style={NotificationStyle.drawerContentProfileContainerRightText}>● Liên lạc: {phone}</Text>
            </View>
          </View>

        </LinearGradient>

        <View style={NotificationStyle.drawerItemListContainer}>
          <DrawerItemList {...props} />
        </View>
        <View style={NotificationStyle.drawerLogoutContainer}>
          <TouchableOpacity
            onPress={() => {
              var action = {
                type: 'LOADING',
                payload: true
              };
              store.dispatch(action);
              props.navigation.navigate('logoutscreen');
            }}
            style={NotificationStyle.drawerLogoutContainerTouchable}
          >
            <View style={NotificationStyle.drawerLogoutContainerTouchableContent}>
              <Icon
                name='log-out-outline'
                type='ionicon'
                color='#517fa4'
              />
              <Text> Đăng xuất </Text>
            </View>

          </TouchableOpacity>
        </View>

      </DrawerContentScrollView>
    );
  }
  render() {
    return (
    
        <Drawer.Navigator drawerContent={(props) => <this.CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Thông báo mới" component={NotificationShowScreen} />
      </Drawer.Navigator>
    );
  }
}
class ShowNotificationView extends React.Component {
componentDidMount(){
  //var i=0;
 // setInterval(() => {
   //   console.log('Test:'+i);
     // i=i+1;
    //}, 5000);
}
 
  render() {
    return (
      <View style={NotificationStyle.container}>
      </View>
    );
  }
}


const mapStateToProps = state => {
  return { user: state.users }
};

export default connect(mapStateToProps)(NotificationScreen);