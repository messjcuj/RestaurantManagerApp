import React from 'react';
import { LogBox, Dimensions, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './LoadingScreen';
import { Input } from 'react-native-elements';
import { LoginStyle } from '../styles/LayoutStyle';
import { host, port, loginUrl } from '../apis/ManagerApi';
import { store } from '../configs/ReduxStore';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      flag: false,
      token: '',
      error: ''
    };

  }

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => {
          AsyncStorage.getItem('username', (err, result) => {
            resolve(result);
          });
        },
        0
      )
    )
  }
  async componentDidMount() {
    const data = await this.performTimeConsumingTask();
    this.setState({ userName: data });






  }
  onPress = () => {
    var action = {
      type: 'LOADING',
      payload: true
    };
    store.dispatch(action);

    this.setState({ flag: true });
    fetch(host + ':' + port + loginUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: this.state.userName, password: this.state.password }),
    })
      .then(response => response.json())
      .then(data => {
        setTimeout(
          () => {
            if (data.token !== undefined) {
              AsyncStorage.setItem('id', data.id+'');
              AsyncStorage.setItem('token', data.token);
              AsyncStorage.setItem('username', data.userName);
              AsyncStorage.setItem('password', data.password);
              AsyncStorage.setItem('phone', data.phone);
              AsyncStorage.setItem('name', data.name);
              AsyncStorage.setItem('birthDay', data.birthDay);
              AsyncStorage.setItem('role', data.role);
              var action = {
                type: 'USER_STATUS',
                payload: { id: data.id, userName: data.userName, password: data.password, phone: data.phone, name: data.name, birthDay: data.birthDay, role: data.role, token: data.token }
              };
              store.dispatch(action);
              //console.log(store.getState());

              if (data.role == 'Quản lý')
                this.props.navigation.navigate('managerhomescreen');
              else if (data.role == 'Đầu bếp')
                this.props.navigation.navigate('chefmanagerscreen');
              else if (data.role == 'Thu ngân')
                this.props.navigation.navigate('receptionistmanagerscreen');
              else if (data.role == 'Phục vụ')
                this.props.navigation.navigate('waiterhomescreen');
              //console.log(data.token);

            }
            else {
              this.setState({ flag: false, error: '* Tài khoản hoặc mật khẩu không hợp lệ' });
            }
          },
          500
        )

      })
      .catch((error) => {

        setTimeout(
          () => {
            //console.log(error);
            this.setState({ flag: false, error: '* Kiểm tra kết nối internet' });
          },
          1000
        )


      });

  }
  render() {
    return (

      //<LinearGradient colors={['#5BBD2B', '#50A625', '#367517']} style={styles.container}>
      <View style={LoginStyle.container}>
        <ImageBackground
          source={require('./../assets/background.jpg')}
          style={{
            flex: 1,
            width: windowWidth,
            height: windowHeight + windowHeight / 20,
          }}




        >

          {this.state.flag ? <LoadingScreen /> :
            <View style={LoginStyle.extracontainer}>
              <Image
                style={LoginStyle.tinyLogo}
                source={require('./../assets/logo.png')}
              />
              <Text style={LoginStyle.text}>Restaurant Management</Text>
              <Text style={LoginStyle.error}>{this.state.error}</Text>

              <Input
                style={LoginStyle.input}
                name='taikhoan'
                placeholder='Tài khoản'
                placeholderTextColor="#BBBBBB"
                onChangeText={(username) => this.setState({ userName: username })}
                value={this.state.userName}
                leftIcon={{ color: 'white', type: 'material', name: 'account-circle' }}
                keyboardType='default'
              />
              <Input
                style={LoginStyle.input}
                name='matkhau'
                placeholder="Mật khẩu"
                placeholderTextColor="#BBBBBB"
                secureTextEntry={true}
                onChangeText={(password) => this.setState({ password: password })}
                value={this.state.password}
                leftIcon={{ color: 'white', type: 'material', name: 'lock' }}
                keyboardType='default'

              />
              <TouchableOpacity
                style={LoginStyle.button}
                onPress={this.onPress}
              >
                <Text style={LoginStyle.textbutton}>Đăng nhập</Text>
              </TouchableOpacity>


            </View>

          }
        </ImageBackground>

      </View>
      // </LinearGradient>
    );
  }


}




export { LoginScreen };

