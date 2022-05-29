
import React from 'react';
import { LogBox, Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import { LoginScreen } from './screens/LoginScreen';
import { LogoutScreen } from './screens/LogoutScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SplashScreen } from './screens/SplashScreen';
import LoadingScreen from './screens/LoadingScreen';
import ManagerHomeScreen from './screens/managers/MangerHomeScreen';
import ManagerAreaScreen from './screens/managers/ManagerAreaScreen';
import ManagerDrinkScreen from './screens/managers/ManagerDrinkScreen';
import ChefManagerScreen from './screens/chefs/ChefManagerScreen';
import WaiterManagerScreen from './screens/waiters/WaiterManagerScreen';
import ReceptionistManagerScreen from './screens/receptionists/ReceptionistManagerScreen';
import { Provider } from 'react-redux';
import { store } from './configs/ReduxStore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





//const Stack = createStackNavigator();
LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="splashscreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="splashscreen" component={SplashScreen} />
          <Stack.Screen name="loadingscreen" component={LoadingScreen} />
          <Stack.Screen name="logoutscreen" component={LogoutScreen} />
          <Stack.Screen name="loginscreen" component={LoginScreen} />
          <Stack.Screen name="managerhomescreen" component={ManagerHomeScreen} />
          <Stack.Screen name="managerareascreen" component={ManagerAreaScreen} />
          <Stack.Screen name="managerdrinkscreen" component={ManagerDrinkScreen} />
          <Stack.Screen name="chefmanagerscreen" component={ChefManagerScreen} />
          <Stack.Screen name="waiterhomescreen" component={WaiterManagerScreen} />
          <Stack.Screen name="receptionistmanagerscreen" component={ReceptionistManagerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

//const App = createSwitchNavigator({
// splashscreen: { screen: SplashScreen },
// loginscreen: { screen: loginscreen },
// trangchuscreen: { screen: TrangChuScreen },
//},
//{
// initialRouteName: 'splashscreen',
//}
//);




export default App;

