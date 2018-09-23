/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Alert, Image} from 'react-native';

class ResultText extends Component {
    render() {
        return (<Text>{this.props.result}</Text>);
    }
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selfResult: '',
            teamResult: ''
        }
    }

    _onPressCancelButton() {
        Alert.alert('You pressed the cancel button!')
    }

    _onPressSubmitButton() {
        Alert.alert('You pressed the submit button!')
    }

    longPressSelfButton = () => {
        this.setState({selfResult: 'Happy'});
    }

    longPressTeamButton = () => {
        this.setState({teamResult: 'Sad'});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.introduction}>
                    <Text style={styles.welcome}>Welcome!</Text>
                    <Text style={styles.note}>Please click the button and say your feeling. You could say one of the feelings as below:
                        very happy, happy, natural, sad, and very sad. We couldn't recognize other words.</Text>
                </View>
                <Text style={styles.welcome}>Yourself feeling:</Text>
                <View style={styles.buttonView}>
                    <TouchableHighlight onLongPress={this.longPressSelfButton} underlayColor="white">
                        <View>
                            <Image style={{width: 100, height: 100}} source={require('../../resource/button.png')}/>
                        </View>
                    </TouchableHighlight>
                    <ResultText result={this.state.selfResult} />
                </View>
                <Text style={styles.welcome}>Your team feeling:</Text>
                <View style={styles.buttonView}>
                    <TouchableHighlight onLongPress={this.longPressTeamButton} underlayColor="white">
                        <View>
                            <Image style={{width: 100, height: 100}} source={require('../../resource/button.png')}/>
                        </View>
                    </TouchableHighlight>
                    <ResultText result={this.state.teamResult} />
                </View>
                <View style={styles.buttonView}>
                    <TouchableHighlight onPress={this._onPressCancelButton} underlayColor="white">
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this._onPressSubmitButton} underlayColor="white">
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    introduction: {
        height: 150,
        paddingTop: 22,
        backgroundColor: '#F8F5D7',
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    note: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        height: 44,
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#2196F3',
    },
    buttonText: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: 'transparent',
        color: 'white'
    },
});
