import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { SearchBar } from '../common';
import EUList from './EUList';


export default class CountriesScreen extends Component<{}>
{
    euList: ?object;
    timer: ?Function;

    constructor()
    {
        super();
    }

    searchByText(text: ?string)
    {
        this.euList.getEUCountriesByText(text);
    }

    searchOnChange(text: ?string)
    {
        const thisObj = this;

        clearTimeout(this.timer);
        this.timer = setTimeout(function()
        {
            thisObj.euList.getEUCountriesByText(text);
        }, 500);
    }

    render()
    {
        return (
            <View style={styles.page}>
                <View style={[styles.titleContainer]}>
		            <Text style={styles.titleText}>Europe</Text>
                    <SearchBar onChangeText={this.searchOnChange.bind(this)} onPressButton={this.searchByText.bind(this)} onSubmit={this.searchByText.bind(this)}/>
                </View>
                <View style={[styles.listContainer]}>
                    <EUList ref={ref => (this.euList = ref)}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
        backgroundColor: '#000',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    titleText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    listContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
});