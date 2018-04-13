import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Spinner } from '../common';


class EUList extends Component<{}>
{
    rows: Array;

    state: {
        loading: boolean,
    };

    constructor()
    {
        super();

        this.rows = [];

        this.state = {
            loading: false,
        };
    }

    async componentWillMount()
    {
        try
        {
            await this.getEUCountriesFromServer();
        }
        catch (error)
        {
            console.error('componentWillMount :: ' + error);
            return;
        }
    }


    async getEUCountriesFromServer()
    {
        this.setState({loading: true});

        try
        {
            const request = new Request('https://restcountries.eu/rest/v2/regionalbloc/eu?fields=numericCode;name;subregion;capital;languages', {
                method: 'GET'
            });

            let response = await fetch(request);
            let ret = await response.json();

            if(ret.length > 0)
            {
                if (Object.keys(ret).length > 0)
                {
                    this.rows = ret.map(row => (
                        { ...row, key: row.numericCode }
                    ));
                }
            }

            this.setState({loading: false});
        }
        catch (error)
        {
            console.error('Getting EU-Countries List :: ' + error);
            return;
        }
    }

    async getEUCountriesByText(text: string)
    {
        if(text.length > 0)
        {
            this.setState({loading: true});

            try
            {
                const request = new Request('https://restcountries.eu/rest/v2/name/' + text + '?fields=numericCode;name;subregion;capital;languages;regionalBlocs', {
                    method: 'GET'
                });

                let response = await fetch(request);
                let ret = await response.json();

                this.rows = [];
                if(ret.length > 0)
                {
                    if (Object.keys(ret).length > 0)
                    {
                        for(let i = 0; i < ret.length; i++)
                        {
                            let row = ret[i];
                            for(let i = 0; i < row.regionalBlocs.length; i++)
                            {
                                if(row.regionalBlocs[i].acronym === 'EU')
                                {
                                    this.rows.push({ ...row, key: row.numericCode });
                                }
                            }
                        }
                    }
                }

                this.setState({loading: false});
            }
            catch (error)
            {
                console.error('Getting EU-Countries By Text :: ' + error);
                return;
            }
        }
        else
        {
            await this.getEUCountriesFromServer();
        }
    }

    renderItem = ({ item }) =>
    {
        let languages = [];

        if (typeof item.languages !== 'undefined')
        {
            languages = item.languages.map(lang => (lang.name));
        }

        return (
            <View style={styles.listElemContainer}>
                <Text style={[styles.listElemText, styles.nameText]}>
                    {item.name}
                </Text>
                <Text style={styles.listElemText}>
                    {item.subregion}
                </Text>
                <Text style={styles.listElemText}>
                    {item.capital}
                </Text>
                <Text style={styles.listElemText}>
                    Lang: {languages.join(', ')}
                </Text>
            </View>
        );
    }

    render()
    {
        if(this.state.loading)
        {
            return (
                <Spinner size="large" />
            );
        }
        else
        {
            return (
                <FlatList
                    data={this.rows}
                    renderItem={this.renderItem}
                />
            );
        }
    }
}

const styles = StyleSheet.create({
    listElemContainer: {
        alignItems: 'flex-start',
        marginBottom: 20,
        padding: 5,
        backgroundColor: '#fff',
    },
    listElemText: {
        color: '#434d4f',
        fontSize: 16,
    },
});

export default EUList;