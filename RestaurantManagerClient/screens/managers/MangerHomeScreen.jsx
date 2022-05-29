import React from 'react';
import { Text, View, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Icon, Badge } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { ManagerHomeStyle } from '../../styles/LayoutStyle';
import { AppStyle } from '../../styles/LayoutStyle';
import { LinearGradient } from 'expo-linear-gradient';
import { Input } from 'react-native-elements';
import ManagerScreen from './ManagerScreen';
import NotificationScreen from './NotificationScreen';
import StatisticScreen from './StatisticScreen';
import { connect } from 'react-redux';
import { store } from '../../configs/ReduxStore';
import ThemedListItem from 'react-native-elements/dist/list/ListItem';
import { ManagerWarehouseStyle } from '../../styles/LayoutStyle';
import ManagerFoodHomeScreen from './ManagerFoodHomeScreen';
import ManagerOrderHomeScreen from './ManagerOrderHomeScreen';
import { host, port,notificationListUrl } from '../../apis/ManagerApi';




let userName;
let password;
let phone;
let name;
let role;
let birthDay;
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
class ManagerHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      count: 0
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
                if(element.detail=='Nhà bếp đã xác nhận đơn hàng'&&element.status==false){
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
    userName = this.props.user.userName;
    password = this.props.user.password
    role = this.props.user.role;
    name = this.props.user.name;
    phone = this.props.user.phone;
    birthDay = this.props.user.birthDay;

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
              if(element.detail=='Nhà bếp đã xác nhận đơn hàng'&&element.status==false){
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
  ShowLeftTab() {
    return (
      <Drawer.Navigator useLegacyImplementation drawerContent={(props) =>
        <DrawerContentScrollView {...props} contentContainerStyle={{
          flex: 1,
          backgroundColor: '#103667'
        }}>

          <LinearGradient colors={['#103667', '#1B4F93', '#426EB4']}>
            <View style={ManagerHomeStyle.drawercontentprofilecontainer}>
              <View style={ManagerHomeStyle.drawerContentProfileContainerLeft}>
                <Image
                  style={ManagerHomeStyle.drawerContentProfileContainerLeftLogo}
                  source={require('./../../assets/man.png')}
                /></View>
              <View style={ManagerHomeStyle.drawerContentProfileContainerRight}>
                <Text style={ManagerHomeStyle.drawerContentProfileContainerRightTitle}>{name} ({userName})</Text>
                <Text style={ManagerHomeStyle.drawerContentProfileContainerRightText}>● Chức vụ: {role}</Text>
                <Text style={ManagerHomeStyle.drawerContentProfileContainerRightText}>● Ngày sinh: {birthDay}</Text>
                <Text style={ManagerHomeStyle.drawerContentProfileContainerRightText}>● Liên lạc: {phone}</Text>
              </View>
            </View>

          </LinearGradient>
          <View style={{ backgroundColor: 'white', flex: 1 }}>
            <DrawerItemList {...props} />
          </View>
          <View style={ManagerHomeStyle.drawerLogoutContainer}>
            <TouchableOpacity
               onPress={() => {
                var action = {
                  type: 'LOADING',
                  payload: true
                };
                store.dispatch(action);
                props.navigation.navigate('logoutscreen');
              }}
              style={ManagerHomeStyle.drawerLogoutContainerTouchable}
            >
              <View style={ManagerHomeStyle.drawerLogoutContainerTouchableContent}>
                <Icon
                  name='log-out-outline'
                  type='ionicon'
                  color='#517fa4'
                />
                <Text> Đăng xuất </Text>
              </View>

            </TouchableOpacity>
          </View>

        </DrawerContentScrollView>}>
        <Drawer.Screen name="Đơn hàng" component={ManagerFoodHomeScreen} />
      </Drawer.Navigator>
    );
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
          component={this.ShowLeftTab} />
        <Tab.Screen
          name="Thông báo"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon type='ionicon' name="notifications-outline" color={color} size={size} />
            ), tabBarBadge: this.state.count
          }} />
        <Tab.Screen
          name="Quản lý"
          component={ManagerScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon type='ionicon' name="settings-outline" color={color} size={size} />
            ),
          }} />
        <Tab.Screen
          name="Thống kê"
          component={StatisticScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon type='ionicon' name="bar-chart-outline" color={color} size={size} />
            ),
          }} />
      </Tab.Navigator>


    );
  }
}


const mapStateToProps = state => {
  return { user: state.users }
};

export default connect(mapStateToProps)(ManagerHomeScreen);


