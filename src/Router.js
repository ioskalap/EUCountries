import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/home/HomeScreen';
import CountriesScreen from './screens/countries/CountriesScreen';


export default Router = StackNavigator(
{
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    },
    Countries: {
        screen: CountriesScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#f1c143',
            },
            headerTitle: () => (
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Countries</Text>
                </View>
            ),
        }
    },
},
{
    initialRouteName: 'Home',
});


const styles = StyleSheet.create({
    headerTextContainer: {
        flex: 1,
    },
    headerText: {
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
    },
});