import React from 'react';
import { Dimensions, Text, View, TouchableOpacity, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { store } from '../../configs/ReduxStore';
import { StatisticStyle } from '../../styles/LayoutStyle';
import  StatisticProductScreen  from './StatisticProductScreen';
import  StatisticRevenueScreen from './StatisticRevenueScreen';


let userName;
let password;
let phone;
let name;
let role;
let birthDay;
let token;
const Drawer = createDrawerNavigator();
class StatisticScreen extends React.Component{
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
          <View style={StatisticStyle.drawercontentprofilecontainer}>
            <View style={StatisticStyle.drawerContentProfileContainerLeft}>
              <Image
                style={StatisticStyle.drawerContentProfileContainerLeftLogo}
                source={require('./../../assets/man.png')}
              /></View>
            <View style={StatisticStyle.drawerContentProfileContainerRight}>
              <Text style={StatisticStyle.drawerContentProfileContainerRightTitle}>{name} ({userName})</Text>
              <Text style={StatisticStyle.drawerContentProfileContainerRightText}>● Chức vụ: {role}</Text>
              <Text style={StatisticStyle.drawerContentProfileContainerRightText}>● Ngày sinh: {birthDay}</Text>
              <Text style={StatisticStyle.drawerContentProfileContainerRightText}>● Liên lạc: {phone}</Text>
            </View>
          </View>

        </LinearGradient>

        <View style={StatisticStyle.drawerItemListContainer}>
          <DrawerItemList {...props} />
        </View>
        <View style={StatisticStyle.drawerLogoutContainer}>
          <TouchableOpacity
            onPress={() => {
              var action = {
                type: 'LOADING',
                payload: true
              };
              store.dispatch(action);
              props.navigation.navigate('logoutscreen');
            }}
            style={StatisticStyle.drawerLogoutContainerTouchable}
          >
            <View style={StatisticStyle.drawerLogoutContainerTouchableContent}>
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
  render(){
    return (
        <Drawer.Navigator  useLegacyImplementation initialRouteName="Doanh thu" drawerContent={(props) => <this.CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Doanh thu" component={StatisticRevenueScreen} />
      <Drawer.Screen name="Sản phẩm" component={StatisticProductScreen} />
    </Drawer.Navigator>
      );
    }
  }
  class HienThiThongKe extends React.Component{
    render(){
      return (
          <View style={ThongKeStyle.container}>
         
          </View>
        );
      }
    }
    
    const mapStateToProps = state => {
      return { user: state.users }
    };
    
    export default connect(mapStateToProps)(StatisticScreen);