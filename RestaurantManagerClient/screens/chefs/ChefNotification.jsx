import React from 'react';
import { Button, ScrollView, Text, View, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Icon, Badge } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { ChefNotificationStyle } from '../../styles/LayoutStyle';
import { AppStyle } from '../../styles/LayoutStyle';
import { LinearGradient } from 'expo-linear-gradient';
import { Input } from 'react-native-elements';
import { host, port, notificationListUrl } from '../../apis/ManagerApi';
import { connect } from 'react-redux';
import { store } from '../../configs/ReduxStore';
import ChefNotificationShowScreen from './ChefNotificationShow';



let userName;
let password;
let phone;
let name;
let role;
let birthDay;
let token;
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
class ChefNotificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      count: 0
    };

  }
  componentDidMount() {
  //  this._interval = setInterval(() => {
    //  fetch(host + ':' + port + notificationListUrl, {
    //    headers: {
     //     'Content-type': 'application/json',
     //     'Authorization': 'Bearer ' + this.props.user.token,
       // }
    //  })
      //  .then(response => response.json())
      //  .then(dataJson => {
      //    setTimeout(
      //      () => {
       //       var getNotification = [];
        //      for (const element of dataJson) {
         //       if (element.detail == 'Nhà bếp nhận được một đơn hàng mới' && element.status == false) {
          //        getNotification.push(element);
           //     }
             // }
            //  this.setState({ count: getNotification.length });
        //    },
         //   1
        //  )

       // })
       // .catch(error => {
       //   console.log(error);
       // });
  //  }, 10000);
    let setDate;
    userName = this.props.user.userName;
    password = this.props.user.password
    token = this.props.user.token;
    role = this.props.user.role;
    name = this.props.user.name;
    phone = this.props.user.phone;
    setDate = new Date(this.props.user.birthDay);
    birthDay = setDate.getDate() + "/" + (setDate.getMonth() + 1) + "/" + setDate.getFullYear();

   // fetch(host + ':' + port + notificationListUrl, {
    //  headers: {
    //    'Content-type': 'application/json',
     //   'Authorization': 'Bearer ' + this.props.user.token,
     /// }
   // })
    //  .then(response => response.json())
    //  .then(dataJson => {
      //  setTimeout(
       //   () => {
          //  var getNotification = [];
          //  for (const element of dataJson) {
            //  if (element.detail == 'Nhà bếp nhận được một đơn hàng mới' && element.status == false) {
              //  getNotification.push(element);
            //  }
          //  }
           // this.setState({ count: getNotification.length });
         // },
         // 1
      //  )

     // })
     // .catch(error => {
      //  console.log(error);
      //});

  }
  render() {
    return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Thông báo mới" component={ChefNotificationShowScreen} />
      </Drawer.Navigator>
    );
  }
}


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{
      flex: 1,
      backgroundColor: '#103667'
    }}>
      <LinearGradient colors={['#103667', '#1B4F93', '#426EB4']}>
        <View style={ChefNotificationStyle.drawercontentprofilecontainer}>
          <View style={ChefNotificationStyle.drawerContentProfileContainerLeft}>
            <Image
              style={ChefNotificationStyle.drawerContentProfileContainerLeftLogo}
              source={require('./../../assets/man.png')}
            /></View>
          <View style={ChefNotificationStyle.drawerContentProfileContainerRight}>
            <Text style={ChefNotificationStyle.drawerContentProfileContainerRightTitle}>{name} ({userName})</Text>
            <Text style={ChefNotificationStyle.drawerContentProfileContainerRightText}>● Chức vụ: {role}</Text>
            <Text style={ChefNotificationStyle.drawerContentProfileContainerRightText}>● Ngày sinh: {birthDay}</Text>
            <Text style={ChefNotificationStyle.drawerContentProfileContainerRightText}>● Liên lạc: {phone}</Text>
          </View>
        </View>

      </LinearGradient>

      <View style={ChefNotificationStyle.drawerItemListContainer}>
        <DrawerItemList {...props} />
      </View>
      <View style={ChefNotificationStyle.drawerLogoutContainer}>
        <TouchableOpacity
          onPress={() => {
            var action = {
              type: 'LOADING',
              payload: true
            };
            store.dispatch(action);
            props.navigation.navigate('logoutscreen');
          }}
          style={ChefNotificationStyle.drawerLogoutContainerTouchable}
        >
          <View style={ChefNotificationStyle.drawerLogoutContainerTouchableContent}>
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



const mapStateToProps = state => {
  return { user: state.users }
};

export default connect(mapStateToProps)(ChefNotificationScreen);