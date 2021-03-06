import React from 'react';
import { Button, Animated, Dimensions, Alert, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { ManagerResourceTypeStyle } from '../../styles/LayoutStyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { host, port, resourceTypeSearchUrl, resourceTypeListUrl, resourceTypeAddUrl, resourceTypeDeleteUrl, resourceTypeUpdateUrl } from '../../apis/ManagerApi';
import { Icon } from 'react-native-elements';
import AnimatedLoader from "react-native-animated-loader";
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';



class ManagerResourceTypeScreen extends React.Component {
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
    fetch(host + ':' + port + resourceTypeListUrl, {
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
          <View style={ManagerResourceTypeStyle.searchContainer}>
            <Text>T??m ki???m theo:</Text>
            <Text></Text>
            <RadioForm
              radio_props={
                [{ label: 'M??', value: 0 },
                { label: 'T??n', value: 1 }]
              }
              initial={this.state.searchModalInitial}
              onPress={(value) => { this.setState({ searchModalInitial: value }) }}
            />
            <Text></Text>
            <Button title="X??c nh???n" onPress={() => { this.setState({ searchModal: false }); }} />
          </View>
        </Modal>
      </View>
    );
  }
  searchItem(value) {
    this.setState({ flag: true });
    if (value == '') { this.componentDidMount(); return; }
    if (this.state.searchModalInitial == 0) {
      fetch(host + ':' + port + resourceTypeListUrl + value, {
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
      fetch(host + ':' + port + resourceTypeSearchUrl + 'name=' + value, {
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
      "Th??ng b??o",
      "Ch???c ch???n x??a?",
      [
        {
          text: "H???y",
          onPress: () => {
            this.setState({ status: 'homeview' });
          }
        },
        {
          text: "?????ng ??", onPress: () => {
            fetch(host + ':' + port + resourceTypeDeleteUrl + id, {
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
                    "Th??ng b??o",
                    "Kh??ng th??? x??a lo???i nguy??n li???u v?? l?? do b???o to??n d??? li???u",
                    [
                      {
                        text: "????ng",
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
          ManagerResourceTypeStyle.container,
          {
            // Bind opacity to animated value
            opacity: this.state.fadeAnimAdd
          }
        ]}
      >

        <SafeAreaProvider>
          <View style={ManagerResourceTypeStyle.setupItem}>
            <Text style={ManagerResourceTypeStyle.title}>Th??m nh?? kho m???i: </Text>
            <View style={ManagerResourceTypeStyle.setupItemCenterContainer}><Text style={ManagerResourceTypeStyle.error}>{this.state.error}</Text></View>
            <Input
              inputStyle={{ fontSize: this.state.windowWidth / 28 }}
              inputContainerStyle={{ borderRadius: 10, marginTop: '2%', backgroundColor: 'white' }}
              leftIconContainerStyle={{ paddingLeft: '5%' }}
              name='name'
              placeholder='T??n'
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
              placeholder='M?? t???'
              placeholderTextColor="#999999"
              onChangeText={(description) => this.setState({ inputAddDescription: description })}
              value={this.state.inputAddDescription}
              underlineColorAndroid="white"
              leftIcon={{ color: 'grey', type: 'material', name: 'description' }}
              keyboardType='default' />
            <View style={ManagerResourceTypeStyle.setupItemCenterContainer}>
              <TouchableOpacity onPress={this.saveAddItem}>
                <Image
                  style={ManagerResourceTypeStyle.saveButton}
                  source={require('./../../assets/save.png')}
                />
              </TouchableOpacity>
              <Text style={{ margin: '5%' }}></Text>
              <TouchableOpacity onPress={this.cancelItem}>
                <Image
                  style={ManagerResourceTypeStyle.cancelButton}
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
          ManagerResourceTypeStyle.container,
          {
            // Bind opacity to animated value
            opacity: this.state.fadeAnimUpdate
          }
        ]}
      >
        <SafeAreaProvider>
          <View style={ManagerResourceTypeStyle.setupItem}>
            <Text style={ManagerResourceTypeStyle.title}>C???p nh???t nh?? kho: {this.state.id}</Text>
            <View style={ManagerResourceTypeStyle.setupItemCenterContainer}><Text style={ManagerResourceTypeStyle.error}>{this.state.error}</Text></View>
            <Input
              inputStyle={{ fontSize: this.state.windowWidth / 28 }}
              inputContainerStyle={{ borderRadius: 10, marginTop: '2%', backgroundColor: 'white' }}
              leftIconContainerStyle={{ paddingLeft: '5%' }}
              name='name'
              placeholder='T??n'
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
              placeholder='M?? t???'
              placeholderTextColor="#999999"
              onChangeText={(description) => this.setState({ inputUpdateDescription: description })}
              value={this.state.inputUpdateDescription}
              leftIcon={{ color: 'grey', type: 'material', name: 'description' }}
              keyboardType='default' />
            <View style={ManagerResourceTypeStyle.setupItemCenterContainer}>
              <TouchableOpacity onPress={this.saveUpdateItem}>
                <Image
                  style={ManagerResourceTypeStyle.saveButton}
                  source={require('./../../assets/save.png')}
                />
              </TouchableOpacity>
              <Text style={{ margin: '5%' }}></Text>
              <TouchableOpacity onPress={this.cancelItem}>
                <Image
                  style={ManagerResourceTypeStyle.cancelButton}
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
      <View style={ManagerResourceTypeStyle.item}>
        <View>
          <TouchableOpacity onPress={() => { this.deleteItem(item.id); }}>
            <Icon
              style={ManagerResourceTypeStyle.icon}
              name='trash-outline'
              type='ionicon'
              color='red'
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: '30%' }} onPress={() => { this.updateItem(item); }}>
            <Icon
              style={ManagerResourceTypeStyle.icon}
              name='edit'
              type='font-awesome'
              color='#517fa4'
            />
          </TouchableOpacity>

        </View>
        <View style={{ flex: 1 }}>
          <Text>M??: {item.id}</Text>
          <Text>T??n: {item.name}</Text>
          <Text>M?? t???: {item.description}</Text>
        </View>
        <View><Image
          style={ManagerResourceTypeStyle.logo}
          source={require('./../../assets/resource.png')}
        />
        </View>
      </View>
    </View>
  );
  saveAddItem = () => {
    if (this.state.inputAddName == '' || this.state.inputAddDescription == '') {
      this.setState({ error: 'T??n ho???c m?? t??? kh??ng h???p l???!' });
      return;
    }
    var regName = /^[aA????????????????????????????????????????????????????????????????????????????????????????????bBcCdD????eE????????????????????????????????????????????????????????????fFgGhHiI????????????????????????jJkKlLmMnNoO????????????????????????????????????????????????????????????????????????????????????????????pPqQrRsStTuU??????????????????????????????????????????????????????????vVwWxXyY????????????????????????????zZ0-9 ]+$/;
    var regDescription = /^[aA????????????????????????????????????????????????????????????????????????????????????????????bBcCdD????eE????????????????????????????????????????????????????????????fFgGhHiI????????????????????????jJkKlLmMnNoO????????????????????????????????????????????????????????????????????????????????????????????pPqQrRsStTuU??????????????????????????????????????????????????????????vVwWxXyY????????????????????????????zZ0-9 ]+$/;
    if (!(regName.test(this.state.inputAddName))) {
      this.setState({ error: 'T??n kh??ng h???p l???!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    if (!(regDescription.test(this.state.inputAddDescription))) {
      this.setState({ error: 'M?? t??? kh??ng h???p l???!' }); return;
    }

    this.setState({ status: 'homeview', flag: true });
    fetch(host + ':' + port + resourceTypeAddUrl, {
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
          "Th??ng b??o",
          "Th??m th??nh c??ng!",
          [
            {
              text: "X??c nh???n",
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
      this.setState({ error: 'T??n ho???c m?? t??? kh??ng h???p l???!' });
      return;
    }
    var regName = /^[aA????????????????????????????????????????????????????????????????????????????????????????????bBcCdD????eE????????????????????????????????????????????????????????????fFgGhHiI????????????????????????jJkKlLmMnNoO????????????????????????????????????????????????????????????????????????????????????????????pPqQrRsStTuU??????????????????????????????????????????????????????????vVwWxXyY????????????????????????????zZ0-9 ]+$/;
    var regDescription = /^[aA????????????????????????????????????????????????????????????????????????????????????????????bBcCdD????eE????????????????????????????????????????????????????????????fFgGhHiI????????????????????????jJkKlLmMnNoO????????????????????????????????????????????????????????????????????????????????????????????pPqQrRsStTuU??????????????????????????????????????????????????????????vVwWxXyY????????????????????????????zZ0-9 ]+$/;
    if (!(regName.test(this.state.inputUpdateName))) {
      this.setState({ error: 'T??n kh??ng h???p l???!' }); return;
    }
    else {
      this.setState({ error: '' });
    }
    if (!(regDescription.test(this.state.inputUpdateDescription))) {
      this.setState({ error: 'M?? t??? kh??ng h???p l???!' }); return;
    }
    this.setState({ flag: true, status: 'homeview' });
    fetch(host + ':' + port + resourceTypeUpdateUrl + this.state.id, {
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
          "Th??ng b??o",
          "C???p nh???t th??nh c??ng!",
          [
            {
              text: "X??c nh???n",
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
      <View style={ManagerResourceTypeStyle.container}>
        {this.state.status == 'homeview' ?
          <View style={ManagerResourceTypeStyle.container}>
            <Animated.View
              style={[
                ManagerResourceTypeStyle.container,
                {
                  opacity: this.state.fadeAnimHome
                }
              ]}>
              <SafeAreaProvider>

                <View style={ManagerResourceTypeStyle.topcontainer}>

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
                    placeholder='Nh???p n???i dung t??m ki???m...'
                    placeholderTextColor="#BBBBBB"
                    onChangeText={(search) => this.searchItem(search)}
                    //value={this.state.inputSearch}
                    leftIcon={{ color: 'grey', type: 'material', name: 'search' }}
                    keyboardType='default' />
                </View>

                <View style={ManagerResourceTypeStyle.centercontainer}>
                  <Text style={ManagerResourceTypeStyle.title}>Danh s??ch:</Text>
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
              <View style={ManagerResourceTypeStyle.plusContainer}>
                <TouchableOpacity onPress={this.addItem}>

                  <Image
                    style={ManagerResourceTypeStyle.plus}
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

export default connect(mapStateToProps)(ManagerResourceTypeScreen);