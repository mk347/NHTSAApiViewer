import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import ListItem from '../components/ListItem';

const MakeSelectScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { fetchApiData, apiMakes, setApiMakes, selectedYear } = useContext(AppContext);

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
        fetchMakes();
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
                    <ListItem
                        item={item.Make}
                        curPage='Make'
                        nextPage='Model'
                    />
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
});
