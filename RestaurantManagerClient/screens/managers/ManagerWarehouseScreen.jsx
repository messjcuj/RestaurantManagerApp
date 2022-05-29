import React from 'react';
import { Button, Animated, Dimensions, Alert, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { ManagerWarehouseStyle } from '../../styles/LayoutStyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { host, port, warehouseSearchUrl, warehouseListUrl, warehouseAddUrl, warehouseDeleteUrl, warehouseUpdateUrl } from '../../apis/ManagerApi';
import { Icon } from 'react-native-elements';
import AnimatedLoader from "react-native-animated-loader";
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';



class ManagerWarehouseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchModal: false,
      searchModalInitial: 1,
      fadeAnimUpdate: new Animated.Value(0),
      fadeAnimAdd: new Animated.Value(0),
      fadeAnimHome: new Animated.Value(0),
      id: '',
      inputAddName: '',
      inputAddPassword: '',
      inputUpdateName: '',
      inputUpdateDescription: '',
      windowWidth: Dimensions.get('window').width,
      windowHeight: Dimensions.get('window').height,
      status: 'homeview',
      flag: true,
      data: [],
      error: ''
    };
  }



  componentDidMount = () => {
    Animated.timing(this.state.fadeAnimHome, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
    fetch(host + ':' + port + warehouseListUrl, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      }
    })
      .then(response => response.json())
      .then(dataJson => {
        setTimeout(
          () => {
            this.setState({ flag: false, data: dataJson, });
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
          <View style={ManagerWarehouseStyle.searchContainer}>
            <Text>Tìm kiếm theo:</Text>
            <Text></Text>
            <RadioForm
              radio_props={
                [{ label: 'Mã', value: 0 },
                { label: 'Tên', value: 1 }]
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
      fetch(host + ':' + port + warehouseListUrl + value, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        }
      })
        .then(response => response.json())
        .then(dataJson => {
          setTimeout(
            () => {
              this.setState({ flag: false, data: [dataJson] });


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
      fetch(host + ':' + port + warehouseSearchUrl + 'name=' + value, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.token,
        }
      })
        .then(response => response.json())
        .then(dataJson => {
          setTimeout(
            () => {
              this.setState({ flag: false, data: dataJson });
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
            fetch(host + ':' + port + warehouseDeleteUrl + id, {
              method: 'DELETE',
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + this.props.user.token,
              },
              body: JSON.stringify({ ten: this.state.inputAddName, moTa: this.state.inputAddDescription }),
            })
              .then(response => response.json())
              .then(data => {
                if (data.error == 'Internal Server Error') {
                  Alert.alert(
                    "Thông báo",
                    "Không thể xóa nhà kho vì lý do bảo toàn dữ liệu",
                    [
                      {
                        text: "Đóng",
                        onPress: () => { this.setState({}); },
                        style: "cancel"
                      }
                    ]
                  );
                }
                this.setState({ fadeAnimAdd: new Animated.Value(0), fadeAnimUpdate: new Animated.Value(0), fadeAnimHome: new Animated.Value(0), status: 'homeview', });

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
    this.setState({ status: 'addview' });

    Animated.timing(this.state.fadeAnimAdd, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
    //this.fadeOut();
  }
  addItemView = () => {
    return (
      <Animated.View
        style={[
          ManagerWarehouseStyle.container,
          {
            // Bind opacity to animated value
            opacity: this.state.fadeAnimAdd
          }
        ]}
      >

        <SafeAreaProvider>
          <View style={ManagerWarehouseStyle.setupItem}>
            <Text style={ManagerWarehouseStyle.title}>Thêm nhà kho mới: </Text>
            <View style={ManagerWarehouseStyle.setupItemCenterContainer}><Text style={ManagerWarehouseStyle.error}>{this.state.error}</Text></View>
            <Input
              inputStyle={{ fontSize: this.state.windowWidth / 28 }}
              inputContainerStyle={{ borderRadius: 10, marginTop: '2%', backgroundColor: 'white' }}
              leftIconContainerStyle={{ paddingLeft: '5%' }}
              name='name'
              placeholder='Tên'
              placeholderTextColor="#999999"
              onChangeText={(name) => this.setState({ inputAddName: name })}
              value={this.state.inputAddName}
              leftIcon={{ color: 'grey', type: 'material', name: 'rtt' }}
              keyboardType='default' />
            <Input
              inputStyle={{ fontSize: this.state.windowWidth / 28 }}
              inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
              leftIconContainerStyle={{ paddingLeft: '5%' }}
              name='description'
              placeholder='Mô tả'
              placeholderTextColor="#999999"
              onChangeText={(description) => this.setState({ inputAddDescription: description })}
              value={this.state.inputAddDescription}
              underlineColorAndroid="white"
              leftIcon={{ color: 'grey', type: 'material', name: 'description' }}
              keyboardType='default' />
            <View style={ManagerWarehouseStyle.setupItemCenterContainer}>
              <TouchableOpacity onPress={this.saveAddItem}>
                <Image
                  style={ManagerWarehouseStyle.saveButton}
                  source={require('./../../assets/save.png')}
                />
              </TouchableOpacity>
              <Text style={{ margin: '5%' }}></Text>
              <TouchableOpacity onPress={this.cancelItem}>
                <Image
                  style={ManagerWarehouseStyle.cancelButton}
                  source={require('./../../assets/cancel.png')}
                />
              </TouchableOpacity>
            </View>

          </View>

        </SafeAreaProvider>


      </Animated.View>
    )
  }
  updateItem = (item) => {
    this.setState({ id: item.id, inputUpdateName: item.name, inputUpdateDescription: item.description, status: 'updateview' });
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
          ManagerWarehouseStyle.container,
          {
            // Bind opacity to animated value
            opacity: this.state.fadeAnimUpdate
          }
        ]}
      >
        <SafeAreaProvider>
          <View style={ManagerWarehouseStyle.setupItem}>
            <Text style={ManagerWarehouseStyle.title}>Cập nhật nhà kho: {this.state.id}</Text>
            <View style={ManagerWarehouseStyle.setupItemCenterContainer}><Text style={ManagerWarehouseStyle.error}>{this.state.error}</Text></View>
            <Input
              inputStyle={{ fontSize: this.state.windowWidth / 28 }}
              inputContainerStyle={{ borderRadius: 10, marginTop: '2%', backgroundColor: 'white' }}
              leftIconContainerStyle={{ paddingLeft: '5%' }}
              name='name'
              placeholder='Tên'
              placeholderTextColor="#999999"
              onChangeText={(name) => this.setState({ inputUpdateName: name })}
              value={this.state.inputUpdateName}
              leftIcon={{ color: 'grey', type: 'material', name: 'rtt' }}
              keyboardType='default' />
            <Input
              inputStyle={{ fontSize: this.state.windowWidth / 28 }}
              inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
              leftIconContainerStyle={{ paddingLeft: '5%' }}
              name='description'
              placeholder='Mô tả'
              placeholderTextColor="#999999"
              onChangeText={(description) => this.setState({ inputUpdateDescription: description })}
              value={this.state.inputUpdateDescription}
              leftIcon={{ color: 'grey', type: 'material', name: 'description' }}
              keyboardType='default' />
            <View style={ManagerWarehouseStyle.setupItemCenterContainer}>
              <TouchableOpacity onPress={this.saveUpdateItem}>
                <Image
                  style={ManagerWarehouseStyle.saveButton}
                  source={require('./../../assets/save.png')}
                />
              </TouchableOpacity>
              <Text style={{ margin: '5%' }}></Text>
              <TouchableOpacity onPress={this.cancelItem}>
                <Image
                  style={ManagerWarehouseStyle.cancelButton}
                  source={require('./../../assets/cancel.png')}
                />
              </TouchableOpacity>
            </View>

          </View>

        </SafeAreaProvider>

      </Animated.View>
    )
  }

  renderItem = ({ item }) => (
    <View>
      <View style={ManagerWarehouseStyle.item}>
        <View>
          <TouchableOpacity onPress={() => { this.deleteItem(item.id); }}>
            <Icon
              style={ManagerWarehouseStyle.icon}
              name='trash-outline'
              type='ionicon'
              color='red'
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: '30%' }} onPress={() => { this.updateItem(item); }}>
            <Icon
              style={ManagerWarehouseStyle.icon}
              name='edit'
              type='font-awesome'
              color='#517fa4'
            />
          </TouchableOpacity>

        </View>
        <View style={{ flex: 1 }}>
          <Text>Mã: {item.id}</Text>
          <Text>Tên: {item.name}</Text>
          <Text>Mô tả: {item.description}</Text>
        </View>
        <View><Image
          style={ManagerWarehouseStyle.logo}
          source={require('./../../assets/warehouse.png')}
        />
        </View>
      </View>
    </View>
  );
  saveAddItem = () => {
    if (this.state.inputAddName == '' || this.state.inputAddDescription == '') {
      this.setState({ error: 'Tên hoặc mô tả không hợp lệ!' });
      return;
    }
    var regName = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
    var regDescription = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
    if (!(regName.test(this.state.inputAddName))) {
      this.setState({ error: 'Tên không hợp lệ!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    if (!(regDescription.test(this.state.inputAddDescription))) {
      this.setState({ error: 'Mô tả không hợp lệ!' }); return;
    }

    this.setState({ status: 'homeview', flag: true });
    fetch(host + ':' + port + warehouseAddUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      },
      body: JSON.stringify({ name: this.state.inputAddName, description: this.state.inputAddDescription }),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        Alert.alert(
          "Thông báo",
          "Thêm thành công!",
          [
            {
              text: "Xác nhận",
              onPress: () => {
                this.setState({ inputAddDescription: '', inputAddName: '', error: '', fadeAnimAdd: new Animated.Value(0), fadeAnimUpdate: new Animated.Value(0), fadeAnimHome: new Animated.Value(0), flag: false });
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
  saveUpdateItem = () => {
    if (this.state.inputUpdateName == '' || this.state.inputUpdateDescription == '') {
      this.setState({ error: 'Tên hoặc mô tả không hợp lệ!' });
      return;
    }
    var regName = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
    var regDescription = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]+$/;
    if (!(regName.test(this.state.inputUpdateName))) {
      this.setState({ error: 'Tên không hợp lệ!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    if (!(regDescription.test(this.state.inputUpdateDescription))) {
      this.setState({ error: 'Mô tả không hợp lệ!' }); return;
    }
    this.setState({ flag: true, status: 'homeview' });
    fetch(host + ':' + port + warehouseUpdateUrl + this.state.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.token,
      },
      body: JSON.stringify({ name: this.state.inputUpdateName, description: this.state.inputUpdateDescription }),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        Alert.alert(
          "Thông báo",
          "Cập nhật thành công!",
          [
            {
              text: "Xác nhận",
              onPress: () => {
                this.setState({ inputUpdateDescription: '', inputUpdateName: '', error: '', fadeAnimAdd: new Animated.Value(0), fadeAnimUpdate: new Animated.Value(0), fadeAnimHome: new Animated.Value(0) });
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
    this.setState({ fadeAnimAdd: new Animated.Value(0), fadeAnimUpdate: new Animated.Value(0), fadeAnimHome: new Animated.Value(0), status: 'homeview', });

    setTimeout(() => {
      Animated.timing(this.state.fadeAnimHome, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true
      }).start();
      this.componentDidMount();
    }, 50);
  }
  render() {
    return (
      <View style={ManagerWarehouseStyle.container}>
        {this.state.status == 'homeview' ?
          <View style={ManagerWarehouseStyle.container}>
            <Animated.View
              style={[
                ManagerWarehouseStyle.container,
                {
                  opacity: this.state.fadeAnimHome
                }
              ]}>
              <SafeAreaProvider>

                <View style={ManagerWarehouseStyle.topcontainer}>

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
                    name='search'
                    placeholder='Nhập nội dung tìm kiếm...'
                    placeholderTextColor="#BBBBBB"
                    onChangeText={(search) => this.searchItem(search)}
                    //value={this.state.inputSearch}
                    leftIcon={{ color: 'grey', type: 'material', name: 'search' }}
                    keyboardType='default' />
                </View>

                <View style={ManagerWarehouseStyle.centercontainer}>
                  <Text style={ManagerWarehouseStyle.title}>Danh sách:</Text>
                  {this.state.flag ?
                    <View>

                      <Text></Text>
                      <ActivityIndicator size="large" color="#DDDDDD" />
                    </View>

                    :
                    <FlatList
                      data={this.state.data}
                      renderItem={this.renderItem}
                      keyExtractor={item => item.id}
                    />
                  }

                </View>
              </SafeAreaProvider>
              <View style={ManagerWarehouseStyle.plusContainer}>
                <TouchableOpacity onPress={this.addItem}>

                  <Image
                    style={ManagerWarehouseStyle.plus}
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

export default connect(mapStateToProps)(ManagerWarehouseScreen);