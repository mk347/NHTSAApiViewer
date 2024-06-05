import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext.js';
import ListItem from '../components/ListItem.js';

const YearSelectScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { fetchApiData, apiYears, setApiYears } = useContext(AppContext);

    useEffect(() => {
        const fetchYears = async () => {
            setIsLoading(true);

            try {
                const apiYears = await fetchApiData();
                setApiYears(apiYears);
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };
        fetchYears();
    }, []);

    if (isLoading) {
        return <ActivityIndicator color='#d97e1e' />;
    }

    if (error) {
        return <Text>{error.message}</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={apiYears}
                renderItem={({ item }) => (
                    <>
                        {item.ModelYear >= 1995 && item.ModelYear <= 2024 && (
                            <ListItem item={item.ModelYear} curPage='Year' nextPage='Make' />
                        )}
                    </>
                )}
            />
        </View>
    );
};

export default YearSelectScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
});
