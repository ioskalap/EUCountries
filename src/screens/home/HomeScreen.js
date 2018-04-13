import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';


export default class HomeScreen extends Component<{}>
{
    onPress()
    {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Countries' })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    render()
    {
        return (
            <View style={styles.page}>
                <View style={styles.body}>
                    <View style={[styles.mainTitleContainer]}>
                        <Text style={styles.mainTitleText}>EU COUNTRIES</Text>
                    </View>
                    <View style={[styles.startButtonContainer]}>
                        <TouchableHighlight
                            style={styles.startButton}
                            underlayColor={'#6b99e0'}
                            onPress={this.onPress.bind(this)}
                        >
                            <Text style={styles.startButtonText}>START</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#000',
    },
    body: {
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 50,
        backgroundColor: '#000',
    },
    mainTitleContainer: {
        alignItems: 'center',
        paddingBottom: 100,
    },
    mainTitleText: {
        width: 200,
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    startButtonContainer: {
        alignItems: 'center',
        paddingVertical: 50,
    },
    startButton: {
        alignItems: 'center',
        paddingVertical: 10,
        width: '100%',
        backgroundColor: '#4d88e4',
    },
    startButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
