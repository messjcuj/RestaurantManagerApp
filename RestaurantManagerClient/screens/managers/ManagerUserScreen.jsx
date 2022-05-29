
import React from 'react';
import { Animated, ScrollView, Dimensions, Alert, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Input } from 'react-native-elements';
import { ManagerUserStyle } from '../../styles/LayoutStyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { host, port, userSearchUrl, userAddUrl, userDeleteUrl, userListUrl, userUpdateUrl, roleListUrl } from '../../apis/ManagerApi';
import { Icon } from 'react-native-elements';
import AnimatedLoader from "react-native-animated-loader";
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

class ManagerUserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchModal: false,
      searchModalInitial: 1,
      fadeAnimUpdate: new Animated.Value(0),
      fadeAnimAdd: new Animated.Value(0),
      fadeAnimHome: new Animated.Value(0),
      id: '',
      inputUserName: '',
      inputPassword: '',
      inputName: '',
      inputGender: '',
      inputRole: null,
      inputBirthDay: '',
      inputPhone: '',
      outputBirthDay: '',
      flagAddBirthDay: false,
      inputUpdateName: '',
      inputUpdateDescription: '',
      optionGender: '',
      optionGenderSetup: false,
      optionRole: '',
      optionRoleSetup: false,
      windowWidth: Dimensions.get('window').width,
      windowHeight: Dimensions.get('window').height,
      status: 'homeview',
      flag: true,
      flagUser: false,
      dataUser: [],
      dataRole: [],
      timKiem: '',
      error: ''
    };
  }
  formatDateControllerToView = (input) => {
    var datePart = input.match(/\d+/g),
      year = datePart[0], // get only two digits
      month = datePart[1], day = datePart[2];

    return day + '/' + month + '/' + year;
  }
  formatDateViewToController = (s) => {
    var b = s.split(/\D/);
    return b.reverse().join('-');
  }

  componentDidMount = () => {
    Animated.timing(this.state.fadeAnimHome, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
    fetch(host + ':' + port + roleListUrl, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            var getRole = [];

            for (const element of dataJson) {
              getRole.push({ label: element.name, value: element.name });
            }
            this.setState({ dataRole: getRole });
          },
          200
        )

      })
      .catch(error => {
        console.log(error);
      });

    fetch(host + ':' + port + userListUrl, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            this.setState({ flag: false, dataUser: dataJson, });
            //console.log(this.state.data);
          },
          200
        )

      })
      .catch(error => {
        console.log(error);
      });
  }

  searchModalView(isVisible) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isVisible}
        >
          <View style={ManagerUserStyle.searchContainer}>
            <Text>Tìm kiếm theo:</Text>
            <Text></Text>
            <RadioForm
              radio_props={
                [
                  { label: 'Mã', value: 0 },
                  { label: 'Tên tài khoản', value: 1 },
                  { label: 'Tên', value: 2 },
                  { label: 'Giới tính', value: 3 },
                  { label: 'Ngày sinh', value: 4 },
                  { label: 'Số điện thoại', value: 5 },

                ]
              }
              initial={this.state.searchModalInitial}
              onPress={(value) => { this.setState({ searchModalInitial: value }) }}
            />
            <Text></Text>
            <Button title="Xác nhận" onPress={() => { this.setState({ searchModal: false }); }} />
          </View>
        </Modal>
      </View>
    );
  }
  searchItem(value) {

    this.setState({ flag: true });
    if (value == '') { this.componentDidMount(); return; }
    if (this.state.searchModalInitial == 0) {
      fetch(host + ':' + port + userListUrl + value, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        }
      })
        .then(response => response.json())
        .then(dataJson => {
          setTimeout(
            () => {
              //console.log(dataJson);
              this.setState({ flag: false, dataUser: [dataJson] });


              //console.log(this.state.data);
            },
            200
          )

        })
        .catch(error => {
          this.componentDidMount();
          console.log(error);
        });
    }
    if (this.state.searchModalInitial == 1) {
      fetch(host + ':' + port + userSearchUrl + 'birthDay=&name=&phone=&userName=' + value + '&gender=', {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        }
      })
        .then(response => response.json())
        .then(dataJson => {
          setTimeout(
            () => {
              this.setState({ flag: false, dataUser: dataJson });
              //console.log(host + ':' + port + userSearchUrl + 'userName=' + value);
            },
            200
          )

        })
        .catch(error => {
          this.componentDidMount();
          console.log(error);
        });
    }
    if (this.state.searchModalInitial == 2) {
      fetch(host + ':' + port + userSearchUrl + 'birthDay=&name=' + value + '&phone=&userName=&gender=', {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        }
      })
        .then(response => response.json())
        .then(dataJson => {
          setTimeout(
            () => {
              this.setState({ flag: false, dataUser: dataJson });
              //console.log(this.state.data);
            },
            200
          )

        })
        .catch(error => {
          this.componentDidMount();
          console.log(error);
        });
    }
    if (this.state.searchModalInitial == 3) {
      fetch(host + ':' + port + userSearchUrl + 'birthDay=&name=&phone=&userName=&gender=' + value, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        }
      })
        .then(response => response.json())
        .then(dataJson => {
          setTimeout(
            () => {
              this.setState({ flag: false, dataUser: dataJson });
              //console.log(this.state.data);
            },
            200
          )

        })
        .catch(error => {
          this.componentDidMount();
          console.log(error);
        });
    }
    if (this.state.searchModalInitial == 4) {
      fetch(host + ':' + port + userSearchUrl + 'birthDay=' + this.formatDateViewToController(value) + '&name=&phone=&userName=&gender=', {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        }
      })
        .then(response => response.json())
        .then(dataJson => {
          setTimeout(
            () => {
              this.setState({ flag: false, dataUser: dataJson });
              //console.log(this.state.data);
            },
            200
          )

        })
        .catch(error => {
          this.componentDidMount();
          console.log(error);
        });
    }
    if (this.state.searchModalInitial == 5) {
      fetch(host + ':' + port + userSearchUrl + 'birthDay=&name=&phone=' + value + '&userName=&gender=', {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        }
      })
        .then(response => response.json())
        .then(dataJson => {
          setTimeout(
            () => {
              this.setState({ flag: false, dataUser: dataJson });
              //console.log(this.state.data);
            },
            200
          )

        })
        .catch(error => {
          this.componentDidMount();
          console.log(error);
        });
    }

  }
  deleteItem = (id) => {

    Alert.alert(
      "Thông báo",
      "Chắc chắn xóa?",
      [
        {
          text: "Hủy",
          onPress: () => {
            this.setState({ status: 'homeview' });
          }
        },
        {
          text: "Đồng ý", onPress: () => {
            fetch(host + ':' + port + userDeleteUrl + id, {
              method: 'DELETE',
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + this.props.user.token,
              },
              body: JSON.stringify({}),
            })
              .then(response => response.json())
              .then(data => {
                if (data.error == 'Internal Server Error') {
                  Alert.alert(
                    "Thông báo",
                    "Không thể xóa nhân viên vì lý do bảo toàn dữ liệu",
                    [
                      {
                        text: "Đóng",
                        onPress: () => { this.setState({}); },
                        style: "cancel"
                      }
                    ]
                  );

                }
                this.setState({
                  fadeAnimAdd: new Animated.Value(0),
                  fadeAnimUpdate: new Animated.Value(0),
                  fadeAnimHome: new Animated.Value(0),
                  status: 'homeview',
                });

                setTimeout(() => {
                  Animated.timing(this.state.fadeAnimHome, {
                    toValue: 1,
                    duration: 50,
                    useNativeDriver: true
                  }).start();
                  this.componentDidMount();
                }, 50);
              })
              .catch((error) => {

                console.log(error);

              });




          }
        }
      ]
    );
  }
  addItem = () => {
    this.setState({ status: 'addview' })
    Animated.timing(this.state.fadeAnimAdd, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  }
  onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    var extraDate = '';
    var extraMonth = '';
    if ((currentDate.getMonth() + 1) < 10) extraMonth = '0';
    if (currentDate.getDate() < 10) extraDate = '0';

    this.setState({ flagAddBirthDay: false, inputBirthDay: currentDate.getFullYear() + '-' + extraMonth + (currentDate.getMonth() + 1) + '-' + extraDate + currentDate.getDate(), outputBirthDay: extraDate + currentDate.getDate() + '/' + extraMonth + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear() });
    //console.log(this.state.inputBirthDay);S
  };
  addItemView = () => {
    return (
      <Animated.View
        style={[
          ManagerUserStyle.container,
          {
            opacity: this.state.fadeAnimAdd
          }
        ]}>
        <SafeAreaProvider>
          {this.state.flagUser ?
            <View>
              <Text></Text>
              <ActivityIndicator size="large" color="#DDDDDD" />
            </View>

            :
            <View style={ManagerUserStyle.setupItem}>
              <Text style={ManagerUserStyle.title}>Thêm nhân viên mới: </Text>
              <View style={ManagerUserStyle.setupItemCenterContainer}><Text style={ManagerUserStyle.error}>{this.state.error}</Text></View>
              <ScrollView>
                <Input
                  inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                  inputContainerStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                  leftIconContainerStyle={{ paddingLeft: '5%' }}
                  name='userName'
                  placeholder='Tài khoản'
                  placeholderTextColor="#999999"
                  onChangeText={(userName) => this.setState({ inputUserName: userName })}
                  value={this.state.inputUserName}
                  leftIcon={{ color: 'grey', type: 'material', name: 'person' }}
                  keyboardType='default' />
                <Input
                  inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                  inputContainerStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                  leftIconContainerStyle={{ paddingLeft: '5%' }}
                  name='password'
                  placeholder='Mật khẩu'
                  secureTextEntry={true}
                  placeholderTextColor="#999999"
                  onChangeText={(password) => this.setState({ inputPassword: password })}
                  value={this.state.inputPassword}
                  leftIcon={{ color: 'grey', type: 'material', name: 'lock' }}
                  keyboardType='default' />
                <Input
                  inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                  inputContainerStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                  leftIconContainerStyle={{ paddingLeft: '5%' }}
                  name='name'
                  placeholder='Tên'
                  placeholderTextColor="#999999"
                  onChangeText={(name) => this.setState({ inputName: name })}
                  value={this.state.inputName}
                  leftIcon={{ color: 'grey', type: 'material', name: 'rtt' }}
                  keyboardType='default' />
                <Input
                  inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                  inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
                  leftIconContainerStyle={{ paddingLeft: '5%' }}
                  name='phone'
                  placeholder='Số điện thoại'
                  placeholderTextColor="#999999"
                  onChangeText={(phone) => this.setState({ inputPhone: phone })}
                  value={this.state.inputPhone}
                  leftIcon={{ color: 'grey', type: 'material', name: 'call' }}
                  keyboardType='default' />
                <View style={ManagerUserStyle.setupItemCenterContainerRow}>

                  <TouchableOpacity onPress={() => { this.setState({ flagAddBirthDay: true }) }}>
                    <Icon
                      name='event'
                      type='material'
                      color='#517fa4'
                    />
                  </TouchableOpacity>

                  {this.state.flagAddBirthDay ?
                    <DateTimePicker
                      testID="dateTimePicker"
                      locale="ja"
                      format="DD/MM/YYYY HH:mm:ss"
                      value={new Date(Date.now())}
                      is24Hour={true}
                      onChange={this.onChangeDate}
                    /> : <View></View>}
                  <Text style={ManagerUserStyle.setupItemCenterContainerRowText}>Ngày sinh: {this.state.outputBirthDay}</Text>
                </View>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
              </ScrollView>
              <DropDownPicker
                style={ManagerUserStyle.setupItemCenterContainerRowOption}
                dropDownDirection="TOP"
                open={this.state.optionGenderSetup}
                onOpen={() => { this.setState({ optionRoleSetup: false }); }}
                placeholder={'Giới tính'}
                value={this.state.inputGender}
                items={[
                  { label: 'Nam', value: 'Nam' },
                  { label: 'Nữ', value: 'Nữ' }
                ]}
                onPress={() => { if (this.state.optionGenderSetup) { this.setState({ optionGenderSetup: false }) } else { this.setState({ optionGenderSetup: true }); } }}
                defaultIndex={2}
                containerStyle={{ height: 40 }}
                onSelectItem={(item) => { this.setState({ inputGender: item.value, optionGenderSetup: false }) }}
              />


              <DropDownPicker
                style={ManagerUserStyle.setupItemCenterContainerRowOption}
                open={this.state.optionRoleSetup}
                onOpen={() => { this.setState({ optionGenderSetup: false }); }}
                placeholder={'Chức vụ'}
                value={this.state.inputRole}
                items={
                  [
                    { label: 'Phục vụ', value: 2 },
                    { label: 'Thu ngân', value: 3 },
                    { label: 'Đầu bếp', value: 4 },
                  ]
                }
                onPress={() => { if (this.state.optionRoleSetup) { this.setState({ optionRoleSetup: false }) } else { this.setState({ optionRoleSetup: true }); } }}

                containerStyle={{ height: 40 }}
                onSelectItem={(item) => { this.setState({ inputRole: item.value, optionRoleSetup: false }) }}
                dropDownDirection="TOP"
                bottomOffset={100}
              />
              <View style={ManagerUserStyle.setupItemCenterContainer}>
                <TouchableOpacity onPress={this.saveAddItem}>
                  <Image
                    style={ManagerUserStyle.saveButton}
                    source={require('./../../assets/save.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.cancelItem}>
                  <Image
                    style={ManagerUserStyle.cancelButton}
                    source={require('./../../assets/cancel.png')}
                  />
                </TouchableOpacity>
              </View>




            </View>

          }
        </SafeAreaProvider>

      </Animated.View>
    )
  }
  saveAddItem = () => {

    var regUserName = /^[A-Za-z0-9]+$/;
    var regPassword = /^[A-Za-z0-9]{6,12}$/;
    var regName = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
    var regPhone = /^(09|01|08|03|02|07|05|04|06)[0-9]{8,16}$/;
    if (!(regUserName.test(this.state.inputUserName))) {
      this.setState({ error: 'Tài khoản không hợp lệ!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    if (!(regPassword.test(this.state.inputPassword))) {
      this.setState({ error: 'Mật khẩu không hợp lệ. Từ 6 đến 12 ký tự bao gồm số và chữ cái!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    if (!(regName.test(this.state.inputName))) {
      this.setState({ error: 'Tên không hợp lệ!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    if (!(regPhone.test(this.state.inputPhone))) {
      this.setState({ error: 'Số điện thoại không hợp lệ!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    if (this.state.inputBirthDay == '') {
      this.setState({ error: 'Ngày sinh không hợp lệ!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    if (this.state.inputGender == '') {
      this.setState({ error: 'Giới tính không hợp lệ!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    if (this.state.inputRole == null) {
      this.setState({ error: 'Chức vụ không hợp lệ!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    this.setState({flagUser:true});
    fetch(host + ':' + port + userAddUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      },
      body: JSON.stringify({
        userName: this.state.inputUserName,
        password: this.state.inputPassword,
        name: this.state.inputName,
        birthDay: this.state.inputBirthDay,
        phone: this.state.inputPhone,
        token: null,
        gender: this.state.inputGender,
        userRole: {
          id: this.state.inputRole
        }
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 500) { this.setState({ error: 'Tài khoản đã tồn tại!' }); return; }
        //console.log(data);
        Alert.alert(
          "Thông báo",
          "Thêm thành công!",
          [
            {
              text: "Xác nhận",
              onPress: () => {
                this.setState({
                  flagUser:false,
                  inputUserName: '',
                  inputPassword: '',
                  inputName: '',
                  inputGender: '',
                  inputRole: null,
                  inputBirthDay: '',
                  inputPhone: '',
                  outputBirthDay: '',
                  error: '',
                  fadeAnimAdd: new Animated.Value(0),
                  fadeAnimUpdate: new Animated.Value(0),
                  fadeAnimHome: new Animated.Value(0),
                  status: 'homeview',
                });
                setTimeout(() => {
                  Animated.timing(this.state.fadeAnimHome, {
                    toValue: 1,
                    duration: 50,
                    useNativeDriver: true
                  }).start();
                  this.componentDidMount();
                }, 50);
              },
            },
          ]
        );
      })
      .catch((error) => {

        console.log(error);

      });
  }
  updateItem = (item) => {
    this.setState({
      id: item.id,
      inputUserName: item.userName,
      inputPassword: '',
      inputName: item.name,
      inputGender: item.gender,
      inputRole: item.userRole.id,
      inputBirthDay: item.birthDay,
      inputPhone: item.phone,
      outputBirthDay: this.formatDateControllerToView(item.birthDay),

      status: 'updateview'
    });
    Animated.timing(this.state.fadeAnimUpdate, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
    //this.fadeOut();
  }
  updateItemView = () => {
    return (
      <Animated.View
        style={[
          ManagerUserStyle.container,
          {
            opacity: this.state.fadeAnimUpdate
          }
        ]}>
        <SafeAreaProvider>
          {this.state.flagUser ?
            <View>
              <Text></Text>
              <ActivityIndicator size="large" color="#DDDDDD" />
            </View>

            :
            <View style={ManagerUserStyle.setupItem}>
              <Text style={ManagerUserStyle.title}>Cập nhật nhân viên: {this.state.id}</Text>
              <View style={ManagerUserStyle.setupItemCenterContainer}><Text style={ManagerUserStyle.error}>{this.state.error}</Text></View>
              <ScrollView>
                <Input
                  inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                  inputContainerStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                  leftIconContainerStyle={{ paddingLeft: '5%' }}
                  editable={false}
                  name='userName'
                  placeholder='Tài khoản'
                  placeholderTextColor="#999999"
                  onChangeText={(userName) => this.setState({ inputUserName: userName })}
                  value={this.state.inputUserName}
                  leftIcon={{ color: 'grey', type: 'material', name: 'person' }}
                  keyboardType='default' />
                <Input
                  inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                  inputContainerStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                  leftIconContainerStyle={{ paddingLeft: '5%' }}
                  name='password'
                  placeholder='Mật khẩu'
                  secureTextEntry={true}
                  placeholderTextColor="#999999"
                  onChangeText={(password) => this.setState({ inputPassword: password })}
                  value={this.state.inputPassword}
                  leftIcon={{ color: 'grey', type: 'material', name: 'lock' }}
                  keyboardType='default' />
                <Input
                  inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                  inputContainerStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                  leftIconContainerStyle={{ paddingLeft: '5%' }}
                  name='name'
                  placeholder='Tên'
                  placeholderTextColor="#999999"
                  onChangeText={(name) => this.setState({ inputName: name })}
                  value={this.state.inputName}
                  leftIcon={{ color: 'grey', type: 'material', name: 'rtt' }}
                  keyboardType='default' />
                <Input
                  inputStyle={{ fontSize: this.state.windowWidth / 28 }}
                  inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
                  leftIconContainerStyle={{ paddingLeft: '5%' }}
                  name='phone'
                  placeholder='Số điện thoại'
                  placeholderTextColor="#999999"
                  onChangeText={(phone) => this.setState({ inputPhone: phone })}
                  value={this.state.inputPhone}
                  leftIcon={{ color: 'grey', type: 'material', name: 'call' }}
                  keyboardType='default' />
                <View style={ManagerUserStyle.setupItemCenterContainerRow}>

                  <TouchableOpacity onPress={() => { this.setState({ flagAddBirthDay: true }) }}>
                    <Icon
                      name='event'
                      type='material'
                      color='#517fa4'
                    />
                  </TouchableOpacity>

                  {this.state.flagAddBirthDay ?
                    <DateTimePicker
                      testID="dateTimePicker"
                      locale="ja"
                      format="DD/MM/YYYY HH:mm:ss"
                      value={new Date(Date.now())}
                      is24Hour={true}
                      onChange={this.onChangeDate}
                    /> : <View></View>}
                  <Text style={ManagerUserStyle.setupItemCenterContainerRowText}>Ngày sinh: {this.state.outputBirthDay}</Text>
                </View>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
              </ScrollView>
              <DropDownPicker
                style={ManagerUserStyle.setupItemCenterContainerRowOption}
                dropDownDirection="TOP"
                open={this.state.optionGenderSetup}
                onOpen={() => { this.setState({ optionRoleSetup: false }); }}
                placeholder={'Giới tính'}
                value={this.state.inputGender}
                items={[
                  { label: 'Nam', value: 'Nam' },
                  { label: 'Nữ', value: 'Nữ' }
                ]}
                onPress={() => { if (this.state.optionGenderSetup) { this.setState({ optionGenderSetup: false }) } else { this.setState({ optionGenderSetup: true }); } }}
                defaultIndex={2}
                containerStyle={{ height: 40 }}
                onSelectItem={(item) => { this.setState({ inputGender: item.value, optionGenderSetup: false }) }}
              />


              <DropDownPicker
                style={ManagerUserStyle.setupItemCenterContainerRowOption}
                open={this.state.optionRoleSetup}
                onOpen={() => { this.setState({ optionGenderSetup: false }); }}
                placeholder={'Chức vụ'}
                value={this.state.inputRole}
                items={
                  [
                    { label: 'Phục vụ', value: 2 },
                    { label: 'Lễ tân thu ngân', value: 3 },
                    { label: 'Đầu bếp', value: 4 },
                  ]
                }
                onPress={() => { if (this.state.optionRoleSetup) { this.setState({ optionRoleSetup: false }) } else { this.setState({ optionRoleSetup: true }); } }}

                containerStyle={{ height: 40 }}
                onSelectItem={(item) => { this.setState({ inputRole: item.value, optionRoleSetup: false }) }}
                dropDownDirection="TOP"
                bottomOffset={100}
              />
              <View style={ManagerUserStyle.setupItemCenterContainer}>
                <TouchableOpacity onPress={this.saveUpdateItem}>
                  <Image
                    style={ManagerUserStyle.saveButton}
                    source={require('./../../assets/save.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.cancelItem}>
                  <Image
                    style={ManagerUserStyle.cancelButton}
                    source={require('./../../assets/cancel.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          }
        </SafeAreaProvider>
      </Animated.View>
    )
  }

  saveUpdateItem = () => {

    var regUserName = /^[A-Za-z0-9]+$/;
    var regPassword = /^[A-Za-z0-9]{6,12}$/;
    var regName = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
    var regPhone = /^(09|01|08|03|02|07|05|04|06)[0-9]{8,16}$/;
    if (!(regUserName.test(this.state.inputUserName))) {
      this.setState({ error: 'Tài khoản không hợp lệ!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    if (!(regPassword.test(this.state.inputPassword))) {
      this.setState({ error: 'Mật khẩu không hợp lệ. Từ 6 đến 12 ký tự bao gồm số và chữ cái!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    if (!(regName.test(this.state.inputName))) {
      this.setState({ error: 'Tên không hợp lệ!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    if (!(regPhone.test(this.state.inputPhone))) {
      this.setState({ error: 'Số điện thoại không hợp lệ!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    if (this.state.inputBirthDay == '') {
      this.setState({ error: 'Ngày sinh không hợp lệ!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    if (this.state.inputGender == '') {
      this.setState({ error: 'Giới tính không hợp lệ!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    if (this.state.inputRole == null) {
      this.setState({ error: 'Chức vụ không hợp lệ!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    this.setState({flagUser:true});
    fetch(host + ':' + port + userUpdateUrl + this.state.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      },
      body: JSON.stringify({
        userName: this.state.inputUserName,
        password: this.state.inputPassword,
        name: this.state.inputName,
        birthDay: this.state.inputBirthDay,
        phone: this.state.inputPhone,
        token: null,
        gender: this.state.inputGender,
        userRole: {
          id: this.state.inputRole
        }
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 500) { this.setState({ error: 'Tài khoản đã tồn tại!' }); return; }
        //console.log(data);
        Alert.alert(
          "Thông báo",
          "Cập nhật thành công!",
          [
            {
              text: "Xác nhận",
              onPress: () => {
                this.setState({
                  flagUser:false,
                  inputUserName: '',
                  inputPassword: '',
                  inputName: '',
                  inputGender: '',
                  inputRole: null,
                  inputBirthDay: '',
                  inputPhone: '',
                  outputBirthDay: '',
                  error: '',
                  fadeAnimAdd: new Animated.Value(0),
                  fadeAnimUpdate: new Animated.Value(0),
                  fadeAnimHome: new Animated.Value(0),
                  status: 'homeview',
                });
                setTimeout(() => {
                  Animated.timing(this.state.fadeAnimHome, {
                    toValue: 1,
                    duration: 50,
                    useNativeDriver: true
                  }).start();
                  this.componentDidMount();
                }, 50);
              },
            },
          ]
        );
      })
      .catch((error) => {

        console.log(error);

      });

  }
  cancelItem = () => {
    this.setState({
      id: '',
      inputUserName: '',
      inputPassword: '',
      inputName: '',
      inputGender: '',
      inputRole: '',
      inputBirthDay: '',
      inputPhone: '',
      outputBirthDay: '',
      error: '',
      fadeAnimAdd: new Animated.Value(0),
      fadeAnimUpdate: new Animated.Value(0),
      fadeAnimHome: new Animated.Value(0),
      status: 'homeview',
    });
    setTimeout(() => {
      Animated.timing(this.state.fadeAnimHome, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true
      }).start();
      this.componentDidMount();
    }, 50);
  }
  renderItem = ({ item }) => (
    <View>
      <View style={ManagerUserStyle.item}>
        <View>
          <TouchableOpacity onPress={() => { this.deleteItem(item.id); }}>
            <Icon
              style={ManagerUserStyle.icon}
              name='trash-outline'
              type='ionicon'
              color='red'
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: '30%' }} onPress={() => { this.updateItem(item); }}>
            <Icon
              style={ManagerUserStyle.icon}
              name='edit'
              type='font-awesome'
              color='#517fa4'
            />
          </TouchableOpacity>

        </View>
        <View style={{ flex: 1 }}>
          <Text>Mã: {item.id}</Text>
          <Text>Tài khoản: {item.userName}</Text>
          <Text>Tên: {item.name}</Text>
          <Text>Giới tính: {item.gender}</Text>
          <Text>Chức vụ: {item.userRole.name}</Text>
          <Text>Ngày sinh: {this.formatDateControllerToView(item.birthDay)}</Text>
          <Text>Liên hệ: {item.phone}</Text>
        </View>
        <View><Image
          style={ManagerUserStyle.logo}
          source={require('./../../assets/role.png')}
        />
        </View>
      </View>
    </View>
  );
  render() {
    return (
      <View style={ManagerUserStyle.container}>
        {this.state.status == 'homeview' ?
          <View style={ManagerUserStyle.container}>
            <Animated.View
              style={[
                ManagerUserStyle.container,
                {
                  opacity: this.state.fadeAnimHome
                }
              ]}>
              <SafeAreaProvider>
                <View style={ManagerUserStyle.topcontainer}>

                  {this.searchModalView(this.state.searchModal)}
                  <TouchableOpacity
                    onPress={() => { this.setState({ searchModal: true }); }}

                  >
                    <Icon
                      style={{ marginTop: '40%', marginRight: '3%' }}
                      name='caret-down-outline'
                      type='ionicon'
                      color='white'
                    />
                  </TouchableOpacity>
                  <Input
                    inputStyle={{ fontSize: 14 }}
                    inputContainerStyle={{ marginRight: '-2%', marginLeft: '10%', marginTop: '3%', backgroundColor: 'white', borderRadius: 20 }}
                    leftIconContainerStyle={{ paddingLeft: '2%' }}
                    name='searchWarehouse'
                    placeholder='Nhập nội dung tìm kiếm...'
                    placeholderTextColor="#BBBBBB"
                    onChangeText={(search) => this.searchItem(search)}
                    //value={this.state.inputSearch}
                    leftIcon={{ color: 'grey', type: 'material', name: 'search' }}
                    keyboardType='default' />
                </View>


                <View style={ManagerUserStyle.centercontainer}>
                  <Text style={ManagerUserStyle.title}>Danh sách:</Text>
                  {this.state.flag ?
                    <ActivityIndicator size="large" color="#DDDDDD" />
                    :
                    <FlatList
                      data={this.state.dataUser}
                      renderItem={this.renderItem}
                      keyExtractor={item => item.id}
                    />
                  }
                </View>


              </SafeAreaProvider>
              <View style={ManagerUserStyle.plusContainer}>
                <TouchableOpacity onPress={this.addItem}>

                  <Image
                    style={ManagerUserStyle.plus}
                    source={require('./../../assets/plus.png')}
                  />

                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
          : null}

        {this.state.status == 'addview' ?
          <this.addItemView />
          : null}
        {this.state.status == 'updateview' ?
          <this.updateItemView />
          : null}
      </View>

    );
  }
}


const mapStateToProps = state => {
  return { user: state.users }
};

export default connect(mapStateToProps)(ManagerUserScreen);