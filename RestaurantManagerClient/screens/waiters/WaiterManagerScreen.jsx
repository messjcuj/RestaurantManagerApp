import React from 'react';
import { Button, ScrollView, Text, View, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Icon, Badge } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { WaiterHomeStyle } from '../../styles/LayoutStyle';
import { AppStyle } from '../../styles/LayoutStyle';
import { LinearGradient } from 'expo-linear-gradient';
import { Input } from 'react-native-elements';
import  WaiterNotificationScreen  from './WaiterNotificationScreen';
import { host, port, notificationListUrl } from '../../apis/ManagerApi';
import { connect } from 'react-redux';
import { store } from '../../configs/ReduxStore';
import WaiterHomeScreen from './WaiterHomeScreen';
import WaiterOrderScreen from './WaiterOrderScreen';







let userName;
let password;
let phone;
let name;
let role;
let birthDay;
let token;
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
class WaiterManagerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      count:0
    };

  }
  componentDidMount() {
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
              var getNotification=[];
              for(const element of dataJson){
                if(element.detail=='Phòng phục vụ đã nhận một đơn hàng mới'&&element.status==false){
                  getNotification.push(element);
                }
              }
              this.setState({count:getNotification.length});
            },
            1
          )
  
        })
        .catch(error => {
          console.log(error);
        });
    }, 10000);
    
    let setDate;
    userName = this.props.user.userName;
    password = this.props.user.password
    token = this.props.user.token;
    role = this.props.user.role;
    name = this.props.user.name;
    phone = this.props.user.phone;
    setDate = new Date(this.props.user.birthDay);
    birthDay = setDate.getDate() + "/" + (setDate.getMonth() + 1) + "/" + setDate.getFullYear();

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
            var getNotification=[];
            for(const element of dataJson){
              if(element.detail=='Phòng phục vụ đã nhận một đơn hàng mới'&&element.status==false){
                getNotification.push(element);
              }
            }
            this.setState({count:getNotification.length});
          },
          1
        )

      })
      .catch(error => {
        console.log(error);
      });

  }
  componentWillUnmount() {
    clearInterval(this._interval);
  }
  render() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon type='ionicon' name="home-outline" color={color} size={size} />
            ),
          }}
          name="Trang chủ"
          component={ShowLeftTab} />
        <Tab.Screen
          name="Thông báo"
          component={WaiterNotificationScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon type='ionicon' name="notifications-outline" color={color} size={size} />
            ), tabBarBadge: this.state.count
          }} />
      </Tab.Navigator>


    );
  }
}

class ShowLeftTab extends React.Component {


  render() {
    return (
      <Drawer.Navigator useLegacyImplementation drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Đơn hàng" component={WaiterOrderScreen} />
        <Drawer.Screen name="Giao hàng" component={WaiterHomeScreen} />
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
        <View style={WaiterHomeStyle.drawercontentprofilecontainer}>
          <View style={WaiterHomeStyle.drawerContentProfileContainerLeft}>
            <Image
              style={WaiterHomeStyle.drawerContentProfileContainerLeftLogo}
              source={require('./../../assets/man.png')}
            /></View>
          <View style={WaiterHomeStyle.drawerContentProfileContainerRight}>
            <Text style={WaiterHomeStyle.drawerContentProfileContainerRightTitle}>{name} ({userName})</Text>
            <Text style={WaiterHomeStyle.drawerContentProfileContainerRightText}>● Chức vụ: {role}</Text>
            <Text style={WaiterHomeStyle.drawerContentProfileContainerRightText}>● Ngày sinh: {birthDay}</Text>
            <Text style={WaiterHomeStyle.drawerContentProfileContainerRightText}>● Liên lạc: {phone}</Text>
          </View>
        </View>

      </LinearGradient>

      <View style={WaiterHomeStyle.drawerItemListContainer}>
        <DrawerItemList {...props} />
      </View>
      <View style={WaiterHomeStyle.drawerLogoutContainer}>
        <TouchableOpacity
          onPress={() => {
            var action = {
              type: 'LOADING',
              payload: true
            };
            store.dispatch(action);
            props.navigation.navigate('logoutscreen');
          }}
          style={WaiterHomeStyle.drawerLogoutContainerTouchable}
        >
          <View style={WaiterHomeStyle.drawerLogoutContainerTouchableContent}>
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

export default connect(mapStateToProps)(WaiterManagerScreen);
