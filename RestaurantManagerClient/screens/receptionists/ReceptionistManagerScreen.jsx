import React from 'react';
import { Button, ScrollView, Text, View, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Icon, Badge } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { ReceptionistHomeStyle } from '../../styles/LayoutStyle';
import { AppStyle } from '../../styles/LayoutStyle';
import { LinearGradient } from 'expo-linear-gradient';
import { Input } from 'react-native-elements';
import  ReceptionistNotitficationScreen  from './ReceptionistNotificationScreen';
import { host, port, notificationListUrl } from '../../apis/ManagerApi';
import { connect } from 'react-redux';
import { store } from '../../configs/ReduxStore';
import ReceptionistHomeScreen from './ReceptionistHomeScreen';
import ReceptionistOrderScreen from './ReceptionistOrderScreen';






let userName;
let password;
let phone;
let name;
let role;
let birthDay;
let token;
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
class ReceptionistManagerScreen extends React.Component {
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
                if (element.detail == 'Quầy thu ngân nhận được một yêu cầu thanh toán mới' && element.status == false) {
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
              if (element.detail == 'Quầy thu ngân nhận được một yêu cầu thanh toán mới' && element.status == false) {
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
          component={ReceptionistNotitficationScreen}
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
        <Drawer.Screen name="Đơn hàng" component={ReceptionistOrderScreen} />
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
        <View style={ReceptionistHomeStyle.drawercontentprofilecontainer}>
          <View style={ReceptionistHomeStyle.drawerContentProfileContainerLeft}>
            <Image
              style={ReceptionistHomeStyle.drawerContentProfileContainerLeftLogo}
              source={require('./../../assets/man.png')}
            /></View>
          <View style={ReceptionistHomeStyle.drawerContentProfileContainerRight}>
            <Text style={ReceptionistHomeStyle.drawerContentProfileContainerRightTitle}>{name} ({userName})</Text>
            <Text style={ReceptionistHomeStyle.drawerContentProfileContainerRightText}>● Chức vụ: {role}</Text>
            <Text style={ReceptionistHomeStyle.drawerContentProfileContainerRightText}>● Ngày sinh: {birthDay}</Text>
            <Text style={ReceptionistHomeStyle.drawerContentProfileContainerRightText}>● Liên lạc: {phone}</Text>
          </View>
        </View>

      </LinearGradient>

      <View style={ReceptionistHomeStyle.drawerItemListContainer}>
        <DrawerItemList {...props} />
      </View>
      <View style={ReceptionistHomeStyle.drawerLogoutContainer}>
        <TouchableOpacity
          onPress={() => {
            var action = {
              type: 'LOADING',
              payload: true
            };
            store.dispatch(action);
            props.navigation.navigate('logoutscreen');
          }}
          style={ReceptionistHomeStyle.drawerLogoutContainerTouchable}
        >
          <View style={ReceptionistHomeStyle.drawerLogoutContainerTouchableContent}>
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

export default connect(mapStateToProps)(ReceptionistManagerScreen);
