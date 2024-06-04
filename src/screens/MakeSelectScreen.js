import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';

const MakeSelectScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {
        fetchApiData,
        apiMakes,
        setApiMakes,
        selectedYear,
        selectedMake,
        setSelectedMake,
        setHeaderMainTitle,
        updateTextHeader,
    } = useContext(AppContext);

    const handleSelectMake = (item) => {
        navigation.navigate('Model');
        setSelectedMake(item.Make);
        updateTextHeader(selectedYear, item.Make);
    };

    useEffect(() => {
        const fetchMakes = async () => {
            setIsLoading(true);

            try {
                const apiMakes = await fetchApiData(selectedYear);
                setApiMakes(apiMakes);
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };
        fetchMakes(selectedYear);
    }, [selectedYear]);

    if (isLoading) {
        return <ActivityIndicator color='#d97e1e' />;
    }

    if (error) {
        return <Text>{error.message}</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={apiMakes}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelectMake(item)}>
                        <View style={styles.listItem}>
                            <Text style={ item.Make?.length <= 3 ? styles.listItemShort : styles.listItemText }>{item.Make}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default MakeSelectScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
        flex: 1,
    },
    listItem: {
        padding: 10,
        fontSize: 16,
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
        width: '100%',
    },
    listItemText: {
        textTransform: 'capitalize',
    },
    listItemShort: {
        textTransform: 'uppercase',
    },
});
