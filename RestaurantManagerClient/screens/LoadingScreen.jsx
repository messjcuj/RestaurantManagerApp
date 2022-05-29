import React from 'react';
import AnimatedLoader from "react-native-animated-loader";
import { Dimensions, ImageBackground, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoadingStyle } from '../styles/LayoutStyle';
import { AppStyle } from '../styles/LayoutStyle';
import { connect } from 'react-redux';
import { store } from '../configs/ReduxStore';


class LoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windowWidth: Dimensions.get('window').width,
            windowHeight: Dimensions.get('window').height,
            flag: true
        };

    }

    componentDidMount() {
        if (this.props.loading) {
            setTimeout(function () {
                var action = {
                    type: 'LOADING',
                    payload: false
                };
                store.dispatch(action);
            }.bind(this), 3500);
            return;
        }


    }
    render() {
        return (
            <View style={LoadingStyle.container}>
                <ImageBackground
                    source={require('./../assets/background.jpg')}
                    style={{
                        flex: 1,
                        width: this.state.windowWidth,
                        height: this.state.windowHeight + this.state.windowHeight / 20,
                    }}
                >
                </ImageBackground>
                <AnimatedLoader
                    visible={this.props.loading}
                    source={require("../flag.json")}
                    overlayColor=''
                    animationStyle={LoadingStyle.lottie}
                    speed={1.5}
                    style={LoadingStyle.container}
                >
                 
                </AnimatedLoader>
            </View>

        );

    }

}


const mapStateToProps = state => {
    return { loading: state.loading }
};

export default connect(mapStateToProps)(LoadingScreen);