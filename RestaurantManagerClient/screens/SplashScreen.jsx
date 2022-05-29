import React from 'react';
import AnimatedLoader from "react-native-animated-loader";
import { Dimensions, ImageBackground, View, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ManHinhChoStyle } from './../styles/LayoutStyle';
import { AppStyle } from './../styles/LayoutStyle';
import { host, port, loginUrl } from '../apis/ManagerApi';
import { store } from '../configs/ReduxStore';







class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: Dimensions.get('window').width,
      windowHeight: Dimensions.get('window').height,
      flag: true
    };

  }

  tokenPerformTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => {
          AsyncStorage.getItem('token', (err, result) => {
            resolve(result);

          });
        },
        100
      )
    )
  }
  userNamePerformTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => {
          AsyncStorage.getItem('username', (err, result) => {
            resolve(result);
          });
        },
        100
      )
    )
  }
  passwordPerformTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => {
          AsyncStorage.getItem('password', (err, result) => {
            resolve(result);

          });
        },
        100
      )
    )
  }
  phonePerformTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => {
          AsyncStorage.getItem('phone', (err, result) => {
            resolve(result);

          });
        },
        100
      )
    )
  }
  namePerformTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => {
          AsyncStorage.getItem('name', (err, result) => {
            resolve(result);

          });
        },
        100
      )
    )
  }
  birthDayPerformTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => {
          AsyncStorage.getItem('birthDay', (err, result) => {
            resolve(result);

          });
        },
        100
      )
    )
  }
  rolePerformTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => {
          AsyncStorage.getItem('role', (err, result) => {
            resolve(result);

          });
        },
        100
      )
    )
  }
  idPerformTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => {
          AsyncStorage.getItem('id', (err, result) => {
            resolve(result);

          });
        },
        100
      )
    )
  }
  async componentDidMount() {
    //AsyncStorage.clear();

    // Preload data from an external API
    // Preload data using AsyncStorage
    const token = await this.tokenPerformTimeConsumingTask();
    const userName = await this.userNamePerformTimeConsumingTask();
    const password = await this.passwordPerformTimeConsumingTask();
    const phone = await this.phonePerformTimeConsumingTask();
    const name = await this.namePerformTimeConsumingTask();
    const birthDay = await this.birthDayPerformTimeConsumingTask();
    const role = await this.rolePerformTimeConsumingTask();
    const id = await this.idPerformTimeConsumingTask();
    var action = {
      type: 'USER_STATUS',
      payload: { id: id, userName: userName, password: password, phone: phone, name: name, birthDay: birthDay, role: role, token: token }
    };
    store.dispatch(action);
    // console.log(store.getState());

    if (token == null) {
      this.setState({ flag: false });
      this.props.navigation.navigate('loginscreen');
    }
    else {
      this.setState({ flag: false });
      if (role == 'Quản lý')
        this.props.navigation.navigate('managerhomescreen');
      else if (role == 'Đầu bếp')
        this.props.navigation.navigate('chefmanagerscreen');
      else if (role == 'Thu ngân')
        this.props.navigation.navigate('receptionistmanagerscreen');
      else if (role == 'Phục vụ')
        this.props.navigation.navigate('waiterhomescreen');
    }
  }



  render() {
    return (

      // <LinearGradient colors={['#5BBD2B', '#50A625', '#367517']} style={styles.container}>

      <ImageBackground
        source={require('./../assets/background.jpg')}
        style={{
          flex: 1,
          width: this.state.windowWidth,
          height: this.state.windowHeight + this.state.windowHeight / 20,
        }}
      >
        <AnimatedLoader
          visible={this.state.flag}
          source={require("./../loader.json")}
          animationStyle={AppStyle.lottie}
          speed={1}
          style={AppStyle.container}
        >


          <Image
            style={AppStyle.tinyLogo}
            source={require('./../assets/logo.png')}
          />





        </AnimatedLoader>
      </ImageBackground>



      // </LinearGradient>
    );
  }
}

export { SplashScreen };