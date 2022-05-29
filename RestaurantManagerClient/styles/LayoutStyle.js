import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//////////
const AppStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: windowWidth / 6,
    height: windowWidth / 6,

  },
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  lottie: {
    width: windowWidth / 5,
    height: windowWidth / 5
  }
});
//////////
const DangXuatStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});


//////////
const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  extracontainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 254, 254, 0.13)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginTop: '45%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '40%',
    paddingTop: '5%',
    position: 'absolute',
    left: '7%',
    right: '7%'


  },
  tinyLogo: {
    width: windowWidth / 6,
    height: windowWidth / 6,

  },
  input: {
    color: 'white',


  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4%',
    borderRadius: 10,
    backgroundColor: '#205AA7',
    marginBottom: '-35%',
    marginTop: '2%',
    paddingLeft: '30%',
    paddingRight: '30%',
  },
  textbutton: {
    fontSize: windowWidth / 29,
    color: 'white'
  },
  text: {
    fontSize: windowHeight / 40,
    color: 'white'
  },
  error: {
    fontSize: windowHeight / 60,
    color: '#FF6633'
  }
});

//////////
const LoadingStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  lottie: {
    width: windowWidth / 2,
    height: windowWidth / 2
  }
});


/////////
const ManagerHomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
  },
  topcontainer: {
  },
  bottomcontainer: {
    paddingTop: '5%',
    marginBottom: '50%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 15,
    backgroundColor: '#103667'
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    marginRight: '20%'
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cart: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
    marginLeft: '80%'
  },

  itemMenu: {
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    height: windowWidth / 3,
    width: windowWidth / 3,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemDetailList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailListPlus: {
    width: windowWidth / 10,
    height: windowWidth / 10
  },
  itemDetailListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    marginLeft: '5%'
  },
  drawercontentprofilecontainer: {
    marginBottom: '5%'
  },
  drawerContentProfileContainerLeft: {
    flex: 1, marginLeft: '6%'
  },
  drawerContentProfileContainerLeftLogo: {
    height: windowWidth / 8,
    width: windowWidth / 8,
    borderColor: 'white',
    marginTop: '5%'
  },
  drawerContentProfileContainerRight: {
    marginLeft: '30%'
  },
  drawerContentProfileContainerRightTitle: {
    color: 'white',
    fontSize: windowWidth / 30,
    fontWeight: 'bold'
  },
  drawerContentProfileContainerRightText: {
    color: 'white',
    fontSize: windowWidth / 33,
    color: '#DDDDDD'
  },
  drawerItemListContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  drawerLogoutContainer: {
    borderTopWidth: 1,
    borderColor: '#B7B7B7'
  },
  drawerLogoutContainerTouchable: {
    backgroundColor: 'white',
    padding: 20
  },
  drawerLogoutContainerTouchableContent: {
    flexDirection: 'row-reverse'
  }

});
/////////

const ManagerWarehouseStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
    height: '10%'
  },
  topcontainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row-reverse'
  },
  centercontainer: {
    backgroundColor: 'white',
    padding: '2%',
    marginTop: '20%',
    borderRadius: 20,
    left: '2%',
    right: '2%',
    position: 'absolute',
    marginBottom: '20%',
    height: windowHeight / 1.5

  },
  searchContainer: {
    padding: '3%',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: windowWidth / 25,
    margin: '2%'
  },
  plus: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
  },
  plusContainer: {
    flexDirection: 'row-reverse',
    padding: '3%',
    margin: '2%'

  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  icon: {
    width: windowWidth / 15,
    height: windowWidth / 15,
    marginLeft: '2%',
  },
  lottie: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633',
    fontStyle: 'italic',
  },
  setupItem: {
    marginTop: '5%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  }
});
//////////
const ManagerOrderHomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
    height: '10%'
  },
  topcontainer: {
    width: '100%',
    flexDirection: 'row-reverse'
  },
  centercontainer: {
    backgroundColor: 'white',
    padding: '2%',
    marginTop: '13%',
    borderRadius: 20,
    left: '2%',
    right: '2%',
    position: 'absolute',
    height: windowHeight / 1.5

  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  setupImageCenterContainer: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    margin: '2%'
  },
  searchContainer: {
    padding: '3%',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20
  },
  addExtraItemContainer: {
    position: 'absolute',
    padding: '3%',
    backgroundColor: '#184785',
    borderRadius: 20,
    width: '100%',
    height: windowHeight / 1.2
  },
  title: {
    color: 'black',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  titleResourceDrink: {
    color: 'white',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  Input: {

  },
  plus: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
  },
  plusContainer: {
    flexDirection: 'row-reverse',
    padding: '3%',
    margin: '2%'

  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  icon: {
    width: windowWidth / 15,
    height: windowWidth / 15,
    marginLeft: '2%',
  },
  lottie: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  },
  setupItem: {
    marginTop: '5%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20,
    height: windowHeight / 1.5
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  setupItemCenterContainerRow: {
    left: '5%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  setupItemCenterContainerRowText: {
    fontSize: windowWidth / 28,
    marginRight: '5%'
  },
  setupItemCenterContainerRowOption: {
    flex: 1,
    marginBottom: '2%'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemMenuContainerTouchable: {
    padding: '2%'
  },
  itemMenuContainerTouchableContent: {
    justifyContent: 'center',
    flexDirection: 'row-reverse'
  },
  itemMenuContainerTouchableContentFoodType: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse'
  },
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  bottomcontainer: {
    paddingTop: '5%',
    height: '95%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 15,
    backgroundColor: '#103667',
    marginTop: '18%',
  },
  cart: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
    marginLeft: '80%'
  },

  itemMenu: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '5%',
    margin: '2%',
    height: windowWidth / 3.5,
    width: windowWidth / 3.5,
    justifyContent: 'center',
    alignItems: 'center'

  },

  itemMenuContainerTouchable: {
    padding: '2%'
  },
  itemMenuContainerTouchableContent: {
    justifyContent: 'center',
    flexDirection: 'row-reverse'
  },
  itemMenuContainerTouchableContentFoodType: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemDetailList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailListPlus: {
    width: windowWidth / 10,
    height: windowWidth / 10
  },
  itemDetailListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    marginLeft: '5%'
  },
  itemDetailOrderListContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  itemDetailOrderListExtraContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignContent: 'center'

  },
  itemDetailOrderList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderCartList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 2.4,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderListPlus: {
    width: windowWidth / 13,
    height: windowWidth / 13
  },
  itemDetailOrderListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailOrderListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  itemDetailOrderListnextButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  itemDetailOrderListpreviousButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
    marginLeft: '15%',
  },
  completeContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  completeLogo: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  completeTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 25,
    color: 'white'
  },
  completeText: {
    color: 'white',
    fontSize: windowWidth / 30
  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  },
});
/////////
const NotificationStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {

  },
  drawercontentprofilecontainer: {
    marginBottom: '5%'
  },
  drawerContentProfileContainerLeft: {
    flex: 1, marginLeft: '6%'
  },
  drawerContentProfileContainerLeftLogo: {
    height: windowWidth / 8,
    width: windowWidth / 8,
    borderColor: 'white',
    marginTop: '5%'
  },
  drawerContentProfileContainerRight: {
    marginLeft: '30%'
  },
  drawerContentProfileContainerRightTitle: {
    color: 'white',
    fontSize: windowWidth / 30,
    fontWeight: 'bold'
  },
  drawerContentProfileContainerRightText: {
    color: 'white',
    fontSize: windowWidth / 33,
    color: '#DDDDDD'
  },
  drawerItemListContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  drawerLogoutContainer: {
    borderTopWidth: 1,
    borderColor: '#B7B7B7'
  },
  drawerLogoutContainerTouchable: {
    backgroundColor: 'white',
    padding: 20
  },
  drawerLogoutContainerTouchableContent: {
    flexDirection: 'row-reverse'
  }

});
/////////
const NotificationShowStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
  },
  topcontainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row-reverse',
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  bottomcontainer: {
    paddingTop: '5%',
    height: '86%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 15,
    backgroundColor: '#103667',
    marginTop: '18%',
  },
  cart: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
    marginLeft: '80%'
  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  itemMenu: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '5%',
    margin: '2%',
    height: windowWidth / 3.5,
    width: windowWidth / 3.5,
    justifyContent: 'center',
    alignItems: 'center'

  },

  itemMenuContainerTouchable: {
    padding: '2%'
  },
  itemMenuContainerTouchableContent: {
    justifyContent: 'center',
    flexDirection: 'row-reverse'
  },
  itemMenuContainerTouchableContentFoodType: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemDetailList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailListPlus: {
    width: windowWidth / 10,
    height: windowWidth / 10
  },
  itemDetailListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    marginLeft: '5%'
  },
  itemDetailOrderListContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  itemDetailOrderListExtraContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignContent: 'center'

  },
  itemDetailOrderList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderCartList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 2.4,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderListPlus: {
    width: windowWidth / 13,
    height: windowWidth / 13
  },
  itemDetailOrderListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailOrderListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  itemDetailOrderListnextButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  itemDetailOrderListpreviousButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
    marginLeft: '15%',
  },
  completeContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  completeLogo: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  completeTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 25,
    color: 'white'
  },
  completeText: {
    color: 'white',
    fontSize: windowWidth / 30
  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  },
  drawercontentprofilecontainer: {
    marginBottom: '5%'
  },
  drawerContentProfileContainerLeft: {
    flex: 1, marginLeft: '6%'
  },
  drawerContentProfileContainerLeftLogo: {
    height: windowWidth / 8,
    width: windowWidth / 8,
    borderColor: 'white',
    marginTop: '5%'
  },
  drawerContentProfileContainerRight: {
    marginLeft: '30%'
  },
  drawerContentProfileContainerRightTitle: {
    color: 'white',
    fontSize: windowWidth / 30,
    fontWeight: 'bold'
  },
  drawerContentProfileContainerRightText: {
    color: 'white',
    fontSize: windowWidth / 33,
    color: '#DDDDDD'
  },
  drawerItemListContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  drawerLogoutContainer: {
    borderTopWidth: 1,
    borderColor: '#B7B7B7'
  },
  drawerLogoutContainerTouchable: {
    backgroundColor: 'white',
    padding: 20
  },
  drawerLogoutContainerTouchableContent: {
    flexDirection: 'row-reverse'
  },
  titleResourceDrink: {
    color: 'white',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  addExtraItemContainer: {
    position: 'absolute',
    padding: '3%',
    backgroundColor: '#184785',
    borderRadius: 20,
    width: '100%',
    height: windowHeight / 1.2
  },
});
/////////
const StatisticStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {

  },
  drawercontentprofilecontainer: {
    marginBottom: '5%'
  },
  drawerContentProfileContainerLeft: {
    flex: 1, marginLeft: '6%'
  },
  drawerContentProfileContainerLeftLogo: {
    height: windowWidth / 8,
    width: windowWidth / 8,
    borderColor: 'white',
    marginTop: '5%'
  },
  drawerContentProfileContainerRight: {
    marginLeft: '30%'
  },
  drawerContentProfileContainerRightTitle: {
    color: 'white',
    fontSize: windowWidth / 30,
    fontWeight: 'bold'
  },
  drawerContentProfileContainerRightText: {
    color: 'white',
    fontSize: windowWidth / 33,
    color: '#DDDDDD'
  },
  drawerItemListContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  drawerLogoutContainer: {
    borderTopWidth: 1,
    borderColor: '#B7B7B7'
  },
  drawerLogoutContainerTouchable: {
    backgroundColor: 'white',
    padding: 20
  },
  drawerLogoutContainerTouchableContent: {
    flexDirection: 'row-reverse'
  }

});
/////////

const StatisticRevenueStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawercontentprofilecontainer: {
    marginBottom: '5%'
  },
  drawerContentProfileContainerLeft: {
    flex: 1, marginLeft: '6%'
  },
  drawerContentProfileContainerLeftLogo: {
    height: windowWidth / 8,
    width: windowWidth / 8,
    borderColor: 'white',
    marginTop: '5%'
  },
  drawerContentProfileContainerRight: {
    marginLeft: '30%'
  },
  drawerContentProfileContainerRightTitle: {
    color: 'white',
    fontSize: windowWidth / 30,
    fontWeight: 'bold'
  },
  drawerContentProfileContainerRightText: {
    color: 'white',
    fontSize: windowWidth / 33,
    color: '#DDDDDD'
  },
  drawerItemListContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  drawerLogoutContainer: {
    borderTopWidth: 1,
    borderColor: '#B7B7B7'
  },
  drawerLogoutContainerTouchable: {
    backgroundColor: 'white',
    padding: 20
  },
  drawerLogoutContainerTouchableContent: {
    flexDirection: 'row-reverse'
  },
  topcontainer: {
    justifyContent: 'flex-end',
    padding: '2%'
  },
  bottomcontainer: {
    padding: '2%'
  },
  setupItemCenterContainerRow: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  setupItemCenterContainerRowText: {
    fontSize: windowWidth / 28,
    marginRight: '5%'
  },
});
/////////
const StatisticProductStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
  },
  topcontainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row-reverse',
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  bottomcontainer: {
    paddingTop: '5%',
    height: '90%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 15,
    backgroundColor: '#103667',
    marginTop: '5%',
  },
  cart: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
    marginLeft: '80%'
  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  itemMenu: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '5%',
    margin: '2%',
    height: windowWidth / 3.5,
    width: windowWidth / 3.5,
    justifyContent: 'center',
    alignItems: 'center'

  },

  itemMenuContainerTouchable: {
    padding: '2%'
  },
  itemMenuContainerTouchableContent: {
    justifyContent: 'center',
    flexDirection: 'row-reverse'
  },
  itemMenuContainerTouchableContentFoodType: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemDetailList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailListPlus: {
    width: windowWidth / 10,
    height: windowWidth / 10
  },
  itemDetailListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    marginLeft: '5%'
  },
  itemDetailOrderListContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  itemDetailOrderListExtraContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignContent: 'center'

  },
  itemDetailOrderList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderCartList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 2.4,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderListPlus: {
    width: windowWidth / 13,
    height: windowWidth / 13
  },
  itemDetailOrderListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailOrderListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  itemDetailOrderListnextButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  itemDetailOrderListpreviousButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
    marginLeft: '15%',
  },
  completeContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  completeLogo: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  completeTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 25,
    color: 'white'
  },
  completeText: {
    color: 'white',
    fontSize: windowWidth / 30
  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  },
  drawercontentprofilecontainer: {
    marginBottom: '5%'
  },
  drawerContentProfileContainerLeft: {
    flex: 1, marginLeft: '6%'
  },
  drawerContentProfileContainerLeftLogo: {
    height: windowWidth / 8,
    width: windowWidth / 8,
    borderColor: 'white',
    marginTop: '5%'
  },
  drawerContentProfileContainerRight: {
    marginLeft: '30%'
  },
  drawerContentProfileContainerRightTitle: {
    color: 'white',
    fontSize: windowWidth / 30,
    fontWeight: 'bold'
  },
  drawerContentProfileContainerRightText: {
    color: 'white',
    fontSize: windowWidth / 33,
    color: '#DDDDDD'
  },
  drawerItemListContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  drawerLogoutContainer: {
    borderTopWidth: 1,
    borderColor: '#B7B7B7'
  },
  drawerLogoutContainerTouchable: {
    backgroundColor: 'white',
    padding: 20
  },
  drawerLogoutContainerTouchableContent: {
    flexDirection: 'row-reverse'
  },
  titleResourceDrink: {
    color: 'white',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  addExtraItemContainer: {
    position: 'absolute',
    padding: '3%',
    backgroundColor: '#184785',
    borderRadius: 20,
    width: '100%',
    height: windowHeight / 1.2
  }
});

/////////
const ManagerStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {

  },
  drawercontentprofilecontainer: {
    marginBottom: '5%'
  },
  drawerContentProfileContainerLeft: {
    flex: 1, marginLeft: '6%'
  },
  drawerContentProfileContainerLeftLogo: {
    height: windowWidth / 8,
    width: windowWidth / 8,
    borderColor: 'white',
    marginTop: '5%'
  },
  drawerContentProfileContainerRight: {
    marginLeft: '30%'
  },
  drawerContentProfileContainerRightTitle: {
    color: 'white',
    fontSize: windowWidth / 30,
    fontWeight: 'bold'
  },
  drawerContentProfileContainerRightText: {
    color: 'white',
    fontSize: windowWidth / 33,
    color: '#DDDDDD'
  },
  drawerItemListContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  drawerLogoutContainer: {
    borderTopWidth: 1,
    borderColor: '#B7B7B7'
  },
  drawerLogoutContainerTouchable: {
    backgroundColor: 'white',
    padding: 20
  },
  drawerLogoutContainerTouchableContent: {
    flexDirection: 'row-reverse'
  }

});
////////
const ManagerUserStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
    height: '10%'
  },
  topcontainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row-reverse'
  },
  centercontainer: {
    backgroundColor: 'white',
    padding: '2%',
    marginTop: '20%',
    borderRadius: 20,
    left: '2%',
    right: '2%',
    position: 'absolute',
    marginBottom: '20%',
    height: windowHeight / 1.5

  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  searchContainer: {
    padding: '3%',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20
  },
  title: {
    color: 'black',
    fontSize: windowWidth / 25,
    margin: '2%'
  },
  Input: {

  },
  plus: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
  },
  plusContainer: {
    flexDirection: 'row-reverse',
    padding: '3%',
    margin: '2%'

  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  icon: {
    width: windowWidth / 15,
    height: windowWidth / 15,
    marginLeft: '2%',
  },
  lottie: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  },
  setupItem: {
    marginTop: '5%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20,
    height: windowHeight / 1.5
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
    marginLeft: '15%',
  },
  setupItemCenterContainerRow: {
    left: '5%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  setupItemCenterContainerRowText: {
    fontSize: windowWidth / 28,
    marginRight: '5%'
  },
  setupItemCenterContainerRowOption: {
    flex: 1,
    marginBottom: '2%'
  }
});
////////
const ManagerFoodHomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
  },
  topcontainer: {
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  bottomcontainer: {
    paddingTop: '5%',
    height: '95%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 15,
    backgroundColor: '#103667',
    marginTop: '18%',
  },
  bottomofadddiningtablecontainer: {
    paddingTop: '5%',
    height: '85%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 15,
    backgroundColor: '#103667',
    marginTop: '18%',
  },
  cart: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
    marginLeft: '80%'
  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  itemMenu: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '5%',
    margin: '2%',
    height: windowWidth / 3.5,
    width: windowWidth / 3.5,
    justifyContent: 'center',
    alignItems: 'center'

  },

  itemMenuContainerTouchable: {
    padding: '2%'
  },
  itemMenuContainerTouchableContent: {
    justifyContent: 'center',
    flexDirection: 'row-reverse'
  },
  itemMenuContainerTouchableContentFoodType: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemDetailList: {
    backgroundColor: '#EEEEEE',
    padding: '2%',
    margin: '2%',
    height: windowWidth / 3.8,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDiningTableDetailList: {
    backgroundColor: '#EEEEEE',
    padding: '2%',
    margin: '2%',
    height: windowWidth / 4.5,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailListPlus: {
    width: windowWidth / 10,
    height: windowWidth / 10
  },
  itemDetailListLogo: {
    width: windowWidth / 5,
    height: windowWidth / 5,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDiningTableDetailListLogo: {
    width: windowWidth / 5.5,
    height: windowWidth / 5.5,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    marginLeft: '5%'
  },
  itemDetailOrderListContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  itemDetailOrderListExtraContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignContent: 'center'

  },
  itemDetailOrderList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderCartList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 2.4,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderListPlus: {
    width: windowWidth / 13,
    height: windowWidth / 13
  },
  itemDetailOrderListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailOrderListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  itemDetailOrderListnextButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  itemDetailOrderListpreviousButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
    marginLeft: '15%',
  },
  completeContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  completeLogo: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  completeTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 25,
    color: 'white'
  },
  completeText: {
    color: 'white',
    fontSize: windowWidth / 30
  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  }
});

/////////
const ManagerDishStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
    height: '10%'
  },
  topcontainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row-reverse'
  },
  centercontainer: {
    backgroundColor: 'white',
    padding: '2%',
    marginTop: '20%',
    borderRadius: 20,
    left: '2%',
    right: '2%',
    position: 'absolute',
    marginBottom: '20%',
    height: windowHeight / 1.5

  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  setupImageCenterContainer: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    margin: '2%'
  },
  searchContainer: {
    padding: '3%',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20
  },
  addExtraItemContainer: {
    position: 'absolute',
    padding: '3%',
    backgroundColor: '#184785',
    borderRadius: 20,
    width: '100%',
    height: windowHeight / 1.2
  },
  title: {
    color: 'black',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  titleResourceDish: {
    color: 'white',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  Input: {

  },
  plus: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
  },
  plusContainer: {
    flexDirection: 'row-reverse',
    padding: '3%',
    margin: '2%',

  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  icon: {
    width: windowWidth / 15,
    height: windowWidth / 15,
    marginLeft: '2%',
  },
  lottie: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  },
  setupItem: {
    marginTop: '5%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20,
    height: windowHeight / 1.5
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  setupItemCenterContainerRow: {
    left: '5%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  setupItemCenterContainerRowText: {
    fontSize: windowWidth / 28,
    marginRight: '5%'
  },
  setupItemCenterContainerRowOption: {
    flex: 1,
    marginBottom: '2%'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemMenuContainerTouchable: {
    padding: '5%',
    alignItems: 'flex-start',
  },
  itemMenuContainerTouchableContent: {
    flexDirection: 'row-reverse'
  }
});
/////////
const ManagerDishTypeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
    height: '10%'
  },
  topcontainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row-reverse'
  },
  centercontainer: {
    backgroundColor: 'white',
    padding: '2%',
    marginTop: '20%',
    borderRadius: 20,
    left: '2%',
    right: '2%',
    position: 'absolute',
    marginBottom: '20%',
    height: windowHeight / 1.5

  },
  searchContainer: {
    padding: '3%',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: windowWidth / 25,
    margin: '2%'
  },
  plus: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
  },
  plusContainer: {
    flexDirection: 'row-reverse',
    padding: '3%',
    margin: '2%'

  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  icon: {
    width: windowWidth / 15,
    height: windowWidth / 15,
    marginLeft: '2%',
  },
  lottie: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633',
    fontStyle: 'italic',
  },
  setupItem: {
    marginTop: '5%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  }
});
/////////
const ManagerDrinkStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
    height: '10%'
  },
  topcontainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row-reverse'
  },
  centercontainer: {
    backgroundColor: 'white',
    padding: '2%',
    marginTop: '20%',
    borderRadius: 20,
    left: '2%',
    right: '2%',
    position: 'absolute',
    marginBottom: '20%',
    height: windowHeight / 1.5

  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  setupImageCenterContainer: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    margin: '2%'
  },
  searchContainer: {
    padding: '3%',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20
  },
  addExtraItemContainer: {
    position: 'absolute',
    padding: '3%',
    backgroundColor: '#184785',
    borderRadius: 20,
    width: '100%',
    height: windowHeight / 1.2
  },
  title: {
    color: 'black',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  titleResourceDish: {
    color: 'white',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  Input: {

  },
  plus: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
  },
  plusContainer: {
    flexDirection: 'row-reverse',
    padding: '3%',
    margin: '2%',

  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  icon: {
    width: windowWidth / 15,
    height: windowWidth / 15,
    marginLeft: '2%',
  },
  lottie: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  },
  setupItem: {
    marginTop: '5%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20,
    height: windowHeight / 1.5
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  setupItemCenterContainerRow: {
    left: '5%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  setupItemCenterContainerRowText: {
    fontSize: windowWidth / 28,
    marginRight: '5%'
  },
  setupItemCenterContainerRowOption: {
    flex: 1,
    marginBottom: '2%'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemMenuContainerTouchable: {
    padding: '5%',
    alignItems: 'flex-start',
  },
  itemMenuContainerTouchableContent: {
    flexDirection: 'row-reverse'
  }
});
/////////
const ManagerDrinkTypeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
    height: '10%'
  },
  topcontainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row-reverse'
  },
  centercontainer: {
    backgroundColor: 'white',
    padding: '2%',
    marginTop: '20%',
    borderRadius: 20,
    left: '2%',
    right: '2%',
    position: 'absolute',
    marginBottom: '20%',
    height: windowHeight / 1.5

  },
  searchContainer: {
    padding: '3%',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: windowWidth / 25,
    margin: '2%'
  },
  plus: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
  },
  plusContainer: {
    flexDirection: 'row-reverse',
    padding: '3%',
    margin: '2%'

  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  icon: {
    width: windowWidth / 15,
    height: windowWidth / 15,
    marginLeft: '2%',
  },
  lottie: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633',
    fontStyle: 'italic',
  },
  setupItem: {
    marginTop: '5%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  }
});
/////////
const ManagerResourceStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
    height: '10%'
  },
  topcontainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row-reverse'
  },
  centercontainer: {
    backgroundColor: 'white',
    padding: '2%',
    marginTop: '20%',
    borderRadius: 20,
    left: '2%',
    right: '2%',
    position: 'absolute',
    marginBottom: '20%',
    height: windowHeight / 1.5

  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  setupImageCenterContainer: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    margin: '2%'
  },
  searchContainer: {
    padding: '3%',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20
  },
  addExtraItemContainer: {
    position: 'absolute',
    padding: '3%',
    backgroundColor: '#184785',
    borderRadius: 20,
    width: '100%',
    height: windowHeight / 1.2
  },
  title: {
    color: 'black',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  titleShipmentResource: {
    color: 'white',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  Input: {

  },
  plus: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
  },
  plusContainer: {
    flexDirection: 'row-reverse',
    padding: '3%',
    margin: '2%'

  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  icon: {
    width: windowWidth / 15,
    height: windowWidth / 15,
    marginLeft: '2%',
  },
  lottie: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  },
  setupItem: {
    marginTop: '5%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20,
    height: windowHeight / 1.5
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  setupItemCenterContainerRow: {
    left: '5%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  setupItemCenterContainerRowText: {
    fontSize: windowWidth / 28,
    marginRight: '5%'
  },
  setupItemCenterContainerRowOption: {
    flex: 1,
    marginBottom: '2%'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemMenuContainerTouchable: {
    padding: '5%',
    alignItems: 'flex-start',
  },
  itemMenuContainerTouchableContent: {
    flexDirection: 'row-reverse'
  }
});
/////////
const ManagerResourceTypeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
    height: '10%'
  },
  topcontainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row-reverse'
  },
  centercontainer: {
    backgroundColor: 'white',
    padding: '2%',
    marginTop: '20%',
    borderRadius: 20,
    left: '2%',
    right: '2%',
    position: 'absolute',
    marginBottom: '20%',
    height: windowHeight / 1.5

  },
  searchContainer: {
    padding: '3%',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: windowWidth / 25,
    margin: '2%'
  },
  plus: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
  },
  plusContainer: {
    flexDirection: 'row-reverse',
    padding: '3%',
    margin: '2%'

  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  icon: {
    width: windowWidth / 15,
    height: windowWidth / 15,
    marginLeft: '2%',
  },
  lottie: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633',
    fontStyle: 'italic',
  },
  setupItem: {
    marginTop: '5%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  }
});
//////////
const ManagerShipmentStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
    height: '100%'
  },
  itemMenu: {
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    height: windowWidth / 2.5,
    width: windowWidth / 2.5,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemMenuContainerTouchable: {
    padding: '5%'
  },
  itemMenuContainerTouchableContent: {
    flexDirection: 'row-reverse'
  }
});
/////////
const ChefHomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
  },
  topcontainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row-reverse',
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  bottomcontainer: {
    paddingTop: '5%',
    height: '86%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 15,
    backgroundColor: '#103667',
    marginTop: '18%',
  },
  cart: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
    marginLeft: '80%'
  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  itemMenu: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '5%',
    margin: '2%',
    height: windowWidth / 3.5,
    width: windowWidth / 3.5,
    justifyContent: 'center',
    alignItems: 'center'

  },

  itemMenuContainerTouchable: {
    padding: '2%'
  },
  itemMenuContainerTouchableContent: {
    justifyContent: 'center',
    flexDirection: 'row-reverse'
  },
  itemMenuContainerTouchableContentFoodType: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemDetailList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailListPlus: {
    width: windowWidth / 10,
    height: windowWidth / 10
  },
  itemDetailListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    marginLeft: '5%'
  },
  itemDetailOrderListContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  itemDetailOrderListExtraContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignContent: 'center'

  },
  itemDetailOrderList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderCartList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 2.4,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderListPlus: {
    width: windowWidth / 13,
    height: windowWidth / 13
  },
  itemDetailOrderListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailOrderListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  itemDetailOrderListnextButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  itemDetailOrderListpreviousButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
    marginLeft: '15%',
  },
  completeContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  completeLogo: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  completeTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 25,
    color: 'white'
  },
  completeText: {
    color: 'white',
    fontSize: windowWidth / 30
  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  },
  drawercontentprofilecontainer: {
    marginBottom: '5%'
  },
  drawerContentProfileContainerLeft: {
    flex: 1, marginLeft: '6%'
  },
  drawerContentProfileContainerLeftLogo: {
    height: windowWidth / 8,
    width: windowWidth / 8,
    borderColor: 'white',
    marginTop: '5%'
  },
  drawerContentProfileContainerRight: {
    marginLeft: '30%'
  },
  drawerContentProfileContainerRightTitle: {
    color: 'white',
    fontSize: windowWidth / 30,
    fontWeight: 'bold'
  },
  drawerContentProfileContainerRightText: {
    color: 'white',
    fontSize: windowWidth / 33,
    color: '#DDDDDD'
  },
  drawerItemListContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  drawerLogoutContainer: {
    borderTopWidth: 1,
    borderColor: '#B7B7B7'
  },
  drawerLogoutContainerTouchable: {
    backgroundColor: 'white',
    padding: 20
  },
  drawerLogoutContainerTouchableContent: {
    flexDirection: 'row-reverse'
  },
  titleResourceDrink: {
    color: 'white',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  addExtraItemContainer: {
    position: 'absolute',
    padding: '3%',
    backgroundColor: '#184785',
    borderRadius: 20,
    width: '100%',
    height: windowHeight / 1.2
  },
});
////////
const ChefNotificationStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
  },
  topcontainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row-reverse',
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  bottomcontainer: {
    paddingTop: '5%',
    height: '86%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 15,
    backgroundColor: '#103667',
    marginTop: '18%',
  },
  cart: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
    marginLeft: '80%'
  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  itemMenu: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '5%',
    margin: '2%',
    height: windowWidth / 3.5,
    width: windowWidth / 3.5,
    justifyContent: 'center',
    alignItems: 'center'

  },

  itemMenuContainerTouchable: {
    padding: '2%'
  },
  itemMenuContainerTouchableContent: {
    justifyContent: 'center',
    flexDirection: 'row-reverse'
  },
  itemMenuContainerTouchableContentFoodType: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemDetailList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailListPlus: {
    width: windowWidth / 10,
    height: windowWidth / 10
  },
  itemDetailListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    marginLeft: '5%'
  },
  itemDetailOrderListContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  itemDetailOrderListExtraContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignContent: 'center'

  },
  itemDetailOrderList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderCartList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 2.4,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderListPlus: {
    width: windowWidth / 13,
    height: windowWidth / 13
  },
  itemDetailOrderListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailOrderListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  itemDetailOrderListnextButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  itemDetailOrderListpreviousButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
    marginLeft: '15%',
  },
  completeContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  completeLogo: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  completeTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 25,
    color: 'white'
  },
  completeText: {
    color: 'white',
    fontSize: windowWidth / 30
  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  },
  drawercontentprofilecontainer: {
    marginBottom: '5%'
  },
  drawerContentProfileContainerLeft: {
    flex: 1, marginLeft: '6%'
  },
  drawerContentProfileContainerLeftLogo: {
    height: windowWidth / 8,
    width: windowWidth / 8,
    borderColor: 'white',
    marginTop: '5%'
  },
  drawerContentProfileContainerRight: {
    marginLeft: '30%'
  },
  drawerContentProfileContainerRightTitle: {
    color: 'white',
    fontSize: windowWidth / 30,
    fontWeight: 'bold'
  },
  drawerContentProfileContainerRightText: {
    color: 'white',
    fontSize: windowWidth / 33,
    color: '#DDDDDD'
  },
  drawerItemListContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  drawerLogoutContainer: {
    borderTopWidth: 1,
    borderColor: '#B7B7B7'
  },
  drawerLogoutContainerTouchable: {
    backgroundColor: 'white',
    padding: 20
  },
  drawerLogoutContainerTouchableContent: {
    flexDirection: 'row-reverse'
  },
  titleResourceDrink: {
    color: 'white',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  addExtraItemContainer: {
    position: 'absolute',
    padding: '3%',
    backgroundColor: '#184785',
    borderRadius: 20,
    width: '100%',
    height: windowHeight / 1.2
  },
});
////////
const WaiterHomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
  },
  topcontainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row-reverse',
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  bottomcontainer: {
    paddingTop: '5%',
    height: '86%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 15,
    backgroundColor: '#103667',
    marginTop: '18%',
  },
  cart: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
    marginLeft: '80%'
  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  itemMenu: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '5%',
    margin: '2%',
    height: windowWidth / 3.5,
    width: windowWidth / 3.5,
    justifyContent: 'center',
    alignItems: 'center'

  },

  itemMenuContainerTouchable: {
    padding: '2%'
  },
  itemMenuContainerTouchableContent: {
    justifyContent: 'center',
    flexDirection: 'row-reverse'
  },
  itemMenuContainerTouchableContentFoodType: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemDetailList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailListPlus: {
    width: windowWidth / 10,
    height: windowWidth / 10
  },
  itemDetailListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    marginLeft: '5%'
  },
  itemDetailOrderListContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  itemDetailOrderListExtraContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignContent: 'center'

  },
  itemDetailOrderList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderCartList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 2.4,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderListPlus: {
    width: windowWidth / 13,
    height: windowWidth / 13
  },
  itemDetailOrderListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailOrderListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  itemDetailOrderListnextButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  itemDetailOrderListpreviousButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
    marginLeft: '15%',
  },
  completeContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  completeLogo: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  completeTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 25,
    color: 'white'
  },
  completeText: {
    color: 'white',
    fontSize: windowWidth / 30
  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  },
  drawercontentprofilecontainer: {
    marginBottom: '5%'
  },
  drawerContentProfileContainerLeft: {
    flex: 1, marginLeft: '6%'
  },
  drawerContentProfileContainerLeftLogo: {
    height: windowWidth / 8,
    width: windowWidth / 8,
    borderColor: 'white',
    marginTop: '5%'
  },
  drawerContentProfileContainerRight: {
    marginLeft: '30%'
  },
  drawerContentProfileContainerRightTitle: {
    color: 'white',
    fontSize: windowWidth / 30,
    fontWeight: 'bold'
  },
  drawerContentProfileContainerRightText: {
    color: 'white',
    fontSize: windowWidth / 33,
    color: '#DDDDDD'
  },
  drawerItemListContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  drawerLogoutContainer: {
    borderTopWidth: 1,
    borderColor: '#B7B7B7'
  },
  drawerLogoutContainerTouchable: {
    backgroundColor: 'white',
    padding: 20
  },
  drawerLogoutContainerTouchableContent: {
    flexDirection: 'row-reverse'
  },
  titleResourceDrink: {
    color: 'white',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  addExtraItemContainer: {
    position: 'absolute',
    padding: '3%',
    backgroundColor: '#184785',
    borderRadius: 20,
    width: '100%',
    height: windowHeight / 1.2
  },
});
////////
const WaiterNotificationStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
  },
  topcontainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row-reverse',
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  bottomcontainer: {
    paddingTop: '5%',
    height: '86%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 15,
    backgroundColor: '#103667',
    marginTop: '18%',
  },
  cart: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
    marginLeft: '80%'
  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  itemMenu: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '5%',
    margin: '2%',
    height: windowWidth / 3.5,
    width: windowWidth / 3.5,
    justifyContent: 'center',
    alignItems: 'center'

  },

  itemMenuContainerTouchable: {
    padding: '2%'
  },
  itemMenuContainerTouchableContent: {
    justifyContent: 'center',
    flexDirection: 'row-reverse'
  },
  itemMenuContainerTouchableContentFoodType: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemDetailList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailListPlus: {
    width: windowWidth / 10,
    height: windowWidth / 10
  },
  itemDetailListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    marginLeft: '5%'
  },
  itemDetailOrderListContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  itemDetailOrderListExtraContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignContent: 'center'

  },
  itemDetailOrderList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderCartList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 2.4,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderListPlus: {
    width: windowWidth / 13,
    height: windowWidth / 13
  },
  itemDetailOrderListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailOrderListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  itemDetailOrderListnextButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  itemDetailOrderListpreviousButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
    marginLeft: '15%',
  },
  completeContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  completeLogo: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  completeTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 25,
    color: 'white'
  },
  completeText: {
    color: 'white',
    fontSize: windowWidth / 30
  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  },
  drawercontentprofilecontainer: {
    marginBottom: '5%'
  },
  drawerContentProfileContainerLeft: {
    flex: 1, marginLeft: '6%'
  },
  drawerContentProfileContainerLeftLogo: {
    height: windowWidth / 8,
    width: windowWidth / 8,
    borderColor: 'white',
    marginTop: '5%'
  },
  drawerContentProfileContainerRight: {
    marginLeft: '30%'
  },
  drawerContentProfileContainerRightTitle: {
    color: 'white',
    fontSize: windowWidth / 30,
    fontWeight: 'bold'
  },
  drawerContentProfileContainerRightText: {
    color: 'white',
    fontSize: windowWidth / 33,
    color: '#DDDDDD'
  },
  drawerItemListContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  drawerLogoutContainer: {
    borderTopWidth: 1,
    borderColor: '#B7B7B7'
  },
  drawerLogoutContainerTouchable: {
    backgroundColor: 'white',
    padding: 20
  },
  drawerLogoutContainerTouchableContent: {
    flexDirection: 'row-reverse'
  },
  titleResourceDrink: {
    color: 'white',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  addExtraItemContainer: {
    position: 'absolute',
    padding: '3%',
    backgroundColor: '#184785',
    borderRadius: 20,
    width: '100%',
    height: windowHeight / 1.2
  },
});
////////
const WaiterPaymentStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
    height: '10%'
  },
  topcontainer: {
    width: '100%',
    flexDirection: 'row-reverse'
  },
  centercontainer: {
    backgroundColor: 'white',
    padding: '2%',
    marginTop: '13%',
    borderRadius: 20,
    left: '2%',
    right: '2%',
    position: 'absolute',
    height: windowHeight / 1.5

  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  setupImageCenterContainer: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    margin: '2%'
  },
  searchContainer: {
    padding: '3%',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20
  },
  addExtraItemContainer: {
    position: 'absolute',
    padding: '3%',
    backgroundColor: '#184785',
    borderRadius: 20,
    width: '100%',
    height: windowHeight / 1.2
  },
  title: {
    color: 'black',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  titleResourceDrink: {
    color: 'white',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  Input: {

  },
  plus: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
  },
  plusContainer: {
    flexDirection: 'row-reverse',
    padding: '3%',
    margin: '2%'

  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  icon: {
    width: windowWidth / 15,
    height: windowWidth / 15,
    marginLeft: '2%',
  },
  lottie: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  },
  setupItem: {
    marginTop: '5%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20,
    height: windowHeight / 1.5
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  setupItemCenterContainerRow: {
    left: '5%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  setupItemCenterContainerRowText: {
    fontSize: windowWidth / 28,
    marginRight: '5%'
  },
  setupItemCenterContainerRowOption: {
    flex: 1,
    marginBottom: '2%'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemMenuContainerTouchable: {
    padding: '2%'
  },
  itemMenuContainerTouchableContent: {
    justifyContent: 'center',
    flexDirection: 'row-reverse'
  },
  itemMenuContainerTouchableContentFoodType: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse'
  },
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  bottomcontainer: {
    paddingTop: '5%',
    height: '95%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 15,
    backgroundColor: '#103667',
    marginTop: '18%',
  },
  cart: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
    marginLeft: '80%'
  },

  itemMenu: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '5%',
    margin: '2%',
    height: windowWidth / 3.5,
    width: windowWidth / 3.5,
    justifyContent: 'center',
    alignItems: 'center'

  },

  itemMenuContainerTouchable: {
    padding: '2%'
  },
  itemMenuContainerTouchableContent: {
    justifyContent: 'center',
    flexDirection: 'row-reverse'
  },
  itemMenuContainerTouchableContentFoodType: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemDetailList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailListPlus: {
    width: windowWidth / 10,
    height: windowWidth / 10
  },
  itemDetailListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    marginLeft: '5%'
  },
  itemDetailOrderListContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  itemDetailOrderListExtraContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignContent: 'center'

  },
  itemDetailOrderList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderCartList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 2.4,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderListPlus: {
    width: windowWidth / 13,
    height: windowWidth / 13
  },
  itemDetailOrderListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailOrderListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  itemDetailOrderListnextButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  itemDetailOrderListpreviousButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
    marginLeft: '15%',
  },
  completeContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  completeLogo: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  completeTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 25,
    color: 'white'
  },
  completeText: {
    color: 'white',
    fontSize: windowWidth / 30
  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  },
});
////////
const ReceptionistHomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
  },
  topcontainer: {
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  bottomcontainer: {
    paddingTop: '5%',
    height: '95%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 15,
    backgroundColor: '#103667',
    marginTop: '18%',
  },
  bottomofadddiningtablecontainer: {
    paddingTop: '5%',
    height: '85%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 15,
    backgroundColor: '#103667',
    marginTop: '18%',
  },
  cart: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
    marginLeft: '80%'
  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  itemMenu: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '5%',
    margin: '2%',
    height: windowWidth / 3.5,
    width: windowWidth / 3.5,
    justifyContent: 'center',
    alignItems: 'center'

  },

  itemMenuContainerTouchable: {
    padding: '2%'
  },
  itemMenuContainerTouchableContent: {
    justifyContent: 'center',
    flexDirection: 'row-reverse'
  },
  itemMenuContainerTouchableContentFoodType: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemDetailList: {
    backgroundColor: '#EEEEEE',
    padding: '2%',
    margin: '2%',
    height: windowWidth / 3.8,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDiningTableDetailList: {
    backgroundColor: '#EEEEEE',
    padding: '2%',
    margin: '2%',
    height: windowWidth / 4.5,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailListPlus: {
    width: windowWidth / 10,
    height: windowWidth / 10
  },
  itemDetailListLogo: {
    width: windowWidth / 5,
    height: windowWidth / 5,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDiningTableDetailListLogo: {
    width: windowWidth / 5.5,
    height: windowWidth / 5.5,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    marginLeft: '5%'
  },
  itemDetailOrderListContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  itemDetailOrderListExtraContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignContent: 'center'

  },
  itemDetailOrderList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderCartList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 2.4,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderListPlus: {
    width: windowWidth / 13,
    height: windowWidth / 13
  },
  itemDetailOrderListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailOrderListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  itemDetailOrderListnextButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  itemDetailOrderListpreviousButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
    marginLeft: '15%',
  },
  completeContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  completeLogo: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  completeTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 25,
    color: 'white'
  },
  completeText: {
    color: 'white',
    fontSize: windowWidth / 30
  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  },
  drawercontentprofilecontainer: {
    marginBottom: '5%'
  },
  drawerContentProfileContainerLeft: {
    flex: 1, marginLeft: '6%'
  },
  drawerContentProfileContainerLeftLogo: {
    height: windowWidth / 8,
    width: windowWidth / 8,
    borderColor: 'white',
    marginTop: '5%'
  },
  drawerContentProfileContainerRight: {
    marginLeft: '30%'
  },
  drawerContentProfileContainerRightTitle: {
    color: 'white',
    fontSize: windowWidth / 30,
    fontWeight: 'bold'
  },
  drawerContentProfileContainerRightText: {
    color: 'white',
    fontSize: windowWidth / 33,
    color: '#DDDDDD'
  },
  drawerItemListContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  drawerLogoutContainer: {
    borderTopWidth: 1,
    borderColor: '#B7B7B7'
  },
  drawerLogoutContainerTouchable: {
    backgroundColor: 'white',
    padding: 20
  },
  drawerLogoutContainerTouchableContent: {
    flexDirection: 'row-reverse'
  }
});
////////
const ReceptionistNotificationStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
  },
  topcontainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row-reverse',
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  bottomcontainer: {
    paddingTop: '5%',
    height: '86%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 15,
    backgroundColor: '#103667',
    marginTop: '18%',
  },
  cart: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
    marginLeft: '80%'
  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  itemMenu: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '5%',
    margin: '2%',
    height: windowWidth / 3.5,
    width: windowWidth / 3.5,
    justifyContent: 'center',
    alignItems: 'center'

  },

  itemMenuContainerTouchable: {
    padding: '2%'
  },
  itemMenuContainerTouchableContent: {
    justifyContent: 'center',
    flexDirection: 'row-reverse'
  },
  itemMenuContainerTouchableContentFoodType: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemDetailList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailListPlus: {
    width: windowWidth / 10,
    height: windowWidth / 10
  },
  itemDetailListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    marginLeft: '5%'
  },
  itemDetailOrderListContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  itemDetailOrderListExtraContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignContent: 'center'

  },
  itemDetailOrderList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderCartList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 2.4,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderListPlus: {
    width: windowWidth / 13,
    height: windowWidth / 13
  },
  itemDetailOrderListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailOrderListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  itemDetailOrderListnextButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  itemDetailOrderListpreviousButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
    marginLeft: '15%',
  },
  completeContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  completeLogo: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  completeTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 25,
    color: 'white'
  },
  completeText: {
    color: 'white',
    fontSize: windowWidth / 30
  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  },
  drawercontentprofilecontainer: {
    marginBottom: '5%'
  },
  drawerContentProfileContainerLeft: {
    flex: 1, marginLeft: '6%'
  },
  drawerContentProfileContainerLeftLogo: {
    height: windowWidth / 8,
    width: windowWidth / 8,
    borderColor: 'white',
    marginTop: '5%'
  },
  drawerContentProfileContainerRight: {
    marginLeft: '30%'
  },
  drawerContentProfileContainerRightTitle: {
    color: 'white',
    fontSize: windowWidth / 30,
    fontWeight: 'bold'
  },
  drawerContentProfileContainerRightText: {
    color: 'white',
    fontSize: windowWidth / 33,
    color: '#DDDDDD'
  },
  drawerItemListContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  drawerLogoutContainer: {
    borderTopWidth: 1,
    borderColor: '#B7B7B7'
  },
  drawerLogoutContainerTouchable: {
    backgroundColor: 'white',
    padding: 20
  },
  drawerLogoutContainerTouchableContent: {
    flexDirection: 'row-reverse'
  },
  titleResourceDrink: {
    color: 'white',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  addExtraItemContainer: {
    position: 'absolute',
    padding: '3%',
    backgroundColor: '#184785',
    borderRadius: 20,
    width: '100%',
    height: windowHeight / 1.2
  },
});
////////
const ReceptionistOrderStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
    height: '10%'
  },
  topcontainer: {
    width: '100%',
    flexDirection: 'row-reverse'
  },
  centercontainer: {
    backgroundColor: 'white',
    padding: '2%',
    marginTop: '13%',
    borderRadius: 20,
    left: '2%',
    right: '2%',
    position: 'absolute',
    height: windowHeight / 1.5

  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  setupImageCenterContainer: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    margin: '2%'
  },
  searchContainer: {
    padding: '3%',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20
  },
  addExtraItemContainer: {
    position: 'absolute',
    padding: '3%',
    backgroundColor: '#184785',
    borderRadius: 20,
    width: '100%',
    height: windowHeight / 1.2
  },
  title: {
    color: 'black',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  titleResourceDrink: {
    color: 'white',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  Input: {

  },
  plus: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
  },
  plusContainer: {
    flexDirection: 'row-reverse',
    padding: '3%',
    margin: '2%'

  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  icon: {
    width: windowWidth / 15,
    height: windowWidth / 15,
    marginLeft: '2%',
  },
  lottie: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  },
  setupItem: {
    marginTop: '5%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20,
    height: windowHeight / 1.5
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  setupItemCenterContainerRow: {
    left: '5%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  setupItemCenterContainerRowText: {
    fontSize: windowWidth / 28,
    marginRight: '5%'
  },
  setupItemCenterContainerRowOption: {
    flex: 1,
    marginBottom: '2%'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemMenuContainerTouchable: {
    padding: '2%'
  },
  itemMenuContainerTouchableContent: {
    justifyContent: 'center',
    flexDirection: 'row-reverse'
  },
  itemMenuContainerTouchableContentFoodType: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse'
  },
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  bottomcontainer: {
    paddingTop: '5%',
    height: '95%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 15,
    backgroundColor: '#103667',
    marginTop: '18%',
  },
  cart: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
    marginLeft: '80%'
  },

  itemMenu: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '5%',
    margin: '2%',
    height: windowWidth / 3.5,
    width: windowWidth / 3.5,
    justifyContent: 'center',
    alignItems: 'center'

  },

  itemMenuContainerTouchable: {
    padding: '2%'
  },
  itemMenuContainerTouchableContent: {
    justifyContent: 'center',
    flexDirection: 'row-reverse'
  },
  itemMenuContainerTouchableContentFoodType: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemDetailList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailListPlus: {
    width: windowWidth / 10,
    height: windowWidth / 10
  },
  itemDetailListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    marginLeft: '5%'
  },
  itemDetailOrderListContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  itemDetailOrderListExtraContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignContent: 'center'

  },
  itemDetailOrderList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 3,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderCartList: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    margin: 10,
    height: windowWidth / 2.4,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailOrderListPlus: {
    width: windowWidth / 13,
    height: windowWidth / 13
  },
  itemDetailOrderListLogo: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailOrderListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  itemDetailOrderListnextButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  itemDetailOrderListpreviousButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
    marginLeft: '15%',
  },
  completeContainer: {
    marginTop: '10%',
    height: '90%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: '#103667',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  completeLogo: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  completeTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 25,
    color: 'white'
  },
  completeText: {
    color: 'white',
    fontSize: windowWidth / 30
  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  },
});

////////
const ManagerAreaStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
    height: '10%'
  },
  topcontainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row-reverse'
  },
  centercontainer: {
    backgroundColor: 'white',
    padding: '2%',
    marginTop: '20%',
    borderRadius: 20,
    left: '2%',
    right: '2%',
    position: 'absolute',
    marginBottom: '20%',
    height: windowHeight / 1.5

  },
  searchContainer: {
    padding: '3%',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: windowWidth / 25,
    margin: '2%'
  },
  plus: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
  },
  plusContainer: {
    flexDirection: 'row-reverse',
    padding: '3%',
    margin: '2%'

  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  icon: {
    width: windowWidth / 15,
    height: windowWidth / 15,
    marginLeft: '2%',
  },
  lottie: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633',
    fontStyle: 'italic',
  },
  setupItem: {
    marginTop: '5%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  }
});
//////////
const ManagerDiningTableStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
    height: '10%'
  },
  topcontainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row-reverse'
  },
  centercontainer: {
    backgroundColor: 'white',
    padding: '2%',
    marginTop: '20%',
    borderRadius: 20,
    left: '2%',
    right: '2%',
    position: 'absolute',
    marginBottom: '20%',
    height: windowHeight / 1.5

  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  setupImageCenterContainer: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    margin: '2%'
  },
  searchContainer: {
    padding: '3%',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20
  },
  addExtraItemContainer: {
    position: 'absolute',
    padding: '3%',
    backgroundColor: '#184785',
    borderRadius: 20,
    width: '100%',
    height: windowHeight / 1.2
  },
  title: {
    color: 'black',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  titleShipmentResource: {
    color: 'white',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  Input: {

  },
  plus: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
  },
  plusContainer: {
    flexDirection: 'row-reverse',
    padding: '3%',
    margin: '2%'

  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  icon: {
    width: windowWidth / 15,
    height: windowWidth / 15,
    marginLeft: '2%',
  },
  lottie: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633'
  },
  setupItem: {
    marginTop: '5%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20,
    height: windowHeight / 2
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  setupItemCenterContainerRow: {
    left: '5%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  setupItemCenterContainerRowText: {
    fontSize: windowWidth / 28,
    marginRight: '5%'
  },
  setupItemCenterContainerRowOption: {
    flex: 1,
    marginBottom: '2%'
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
    color: 'black'
  },
  itemMenuContainerTouchable: {
    padding: '5%',
    alignItems: 'flex-start',
  },
  itemMenuContainerTouchableContent: {
    flexDirection: 'row-reverse'
  }
});
/////////
const ManagerOrderStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184785',
    justifyContent: 'center',
    height: '10%'
  },
  topcontainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row-reverse'
  },
  centercontainer: {
    backgroundColor: 'white',
    padding: '2%',
    marginTop: '20%',
    borderRadius: 20,
    left: '2%',
    right: '2%',
    position: 'absolute',
    marginBottom: '20%',
    height: windowHeight / 1.5

  },
  searchContainer: {
    padding: '3%',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: windowWidth / 25,
    margin: '2%'
  },
  plus: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    marginBottom: '2%',
  },
  plusContainer: {
    flexDirection: 'row-reverse',
    padding: '3%',
    margin: '2%'

  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    padding: '3%',
    margin: '2%',
    borderColor: 'white',
    borderRadius: 10

  },
  logo: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    margin: '2%'
  },
  icon: {
    width: windowWidth / 15,
    height: windowWidth / 15,
    marginLeft: '2%',
  },
  lottie: {
    width: windowWidth / 5,
    height: windowWidth / 5
  },
  error: {
    fontSize: windowWidth / 28,
    color: '#FF6633',
    fontStyle: 'italic',
  },
  setupItem: {
    marginTop: '5%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingRight: '2%',
    paddingLeft: '2%',
    borderRadius: 20
  },
  setupItemCenterContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',

  },
  saveButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  cancelButton: {
    width: windowWidth / 10,
    height: windowWidth / 10,
  },
  itemDiningTableDetailList: {
    backgroundColor: '#EEEEEE',
    padding: '2%',
    margin: '2%',
    height: windowWidth / 4.5,
    width: '95%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  itemDetailListPlus: {
    width: windowWidth / 10,
    height: windowWidth / 10
  },
  itemDetailListLogo: {
    width: windowWidth / 5,
    height: windowWidth / 5,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDiningTableDetailListLogo: {
    width: windowWidth / 5.5,
    height: windowWidth / 5.5,
    borderRadius: 10,
    marginLeft: '5%'
  },
  itemDetailListTitle: {
    fontWeight: 'bold',
    fontSize: windowWidth / 28,
  },
  titleResourceDrink: {
    color: 'white',
    fontSize: windowWidth / 25,
    margin: '2%',
  },
  addExtraItemContainer: {
    position: 'absolute',
    padding: '3%',
    backgroundColor: '#184785',
    borderRadius: 20,
    width: '100%',
    height: windowHeight / 1.2
  }
});
export {
  AppStyle,
  DangXuatStyle,
  LoginStyle,
  LoadingStyle,
  ManagerHomeStyle,
  ManagerWarehouseStyle,
  ManagerUserStyle,
  NotificationStyle,
  NotificationShowStyle,
  StatisticStyle,
  StatisticRevenueStyle,
  StatisticProductStyle,
  ManagerStyle,
  ManagerFoodHomeStyle,
  ManagerAreaStyle,
  ManagerDiningTableStyle,
  ManagerDishStyle,
  ManagerDishTypeStyle,
  ManagerDrinkStyle,
  ManagerDrinkTypeStyle,
  ManagerResourceStyle,
  ManagerResourceTypeStyle,
  ManagerShipmentStyle,
  ManagerOrderStyle,
  ManagerOrderHomeStyle,
  ChefHomeStyle,
  ChefNotificationStyle,
  WaiterHomeStyle,
  WaiterNotificationStyle,
  WaiterPaymentStyle,
  ReceptionistHomeStyle,
  ReceptionistNotificationStyle,
  ReceptionistOrderStyle
};