import React from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './LoadingScreen';
import { store } from '../configs/ReduxStore';








class LogoutScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }
  
    componentDidMount() {
            var action = {
                type: 'LOADING',
                payload: true
            };
            store.dispatch(action);


        setTimeout(
            () => {
                AsyncStorage.removeItem('token');
                AsyncStorage.removeItem('password');
                AsyncStorage.removeItem('name');
                AsyncStorage.removeItem('phone');
                AsyncStorage.removeItem('birthDay');
                AsyncStorage.removeItem('role');
                // this.setState({ flag: false });
                this.props.navigation.popToTop();
                this.props.navigation.push('loginscreen');

            },
            100
        )


    }

    render() {
        return (
            <LoadingScreen />
        );
    }


}

/////////CSS


export { LogoutScreen };

