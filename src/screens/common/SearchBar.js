import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';


class SearchBar extends Component<{}>
{
    textInput: ?object;
    textValue: ?string;

    constructor()
    {
        super();

        this.textValue = '';
    }


    onChangeText(val)
    {
        const { onChangeText } = this.props;

        if(onChangeText)
        {
            onChangeText(val);
        }

        this.textValue = val;
    }
    
    onSubmit(event)
    {
        const { onSubmit } = this.props;

        if(onSubmit)
        {
            onSubmit(event.nativeEvent.text);
        }

        //this.textInput.clear();
        
        Keyboard.dismiss();
    }

    onPressButton()
    {
        const { onPressButton } = this.props;

        if(onPressButton)
        {
            onPressButton(this.textValue);
        }
        
        Keyboard.dismiss();
    }

    render()
    {
        return (
            <View style={styles.searchBar}>
                <TextInput
                    ref={input => { this.textInput = input }}
                    style={styles.searchInput}
                    keyboardType="default"
                    placeholder="Search..."
                    onChangeText={this.onChangeText.bind(this)}
                    onSubmitEditing={this.onSubmit.bind(this)}
                />
                <TouchableHighlight style={styles.searchButton} onPress={this.onPressButton.bind(this)}>
                    <Icon size={30} color={'white'} name="search"></Icon>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchBar:
    {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    searchButton: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    searchInput: {
        height: 30,
        width: 200,
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 30,
    },
});

SearchBar.propTypes = {
    disableButton: PropTypes.bool,
    disableAutoClean: PropTypes.bool,
    onSubmit: PropTypes.func,
};


export { SearchBar };
