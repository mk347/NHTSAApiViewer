import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext.js';

const YearSelectScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { fetchApiData, apiYears, setApiYears, selectedYear, setSelectedYear, setHeaderMainTitle, updateTextHeader } = useContext(AppContext);

    const handleSelectYear = (item) => {
        navigation.navigate('Make');
        setSelectedYear(item.ModelYear);
        updateTextHeader(item.ModelYear);
    };

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
                            <TouchableOpacity onPress={() => handleSelectYear(item)}>
                                <View style={styles.yearItem}>
                                    <Text>{item.ModelYear}</Text>
                                </View>
                            </TouchableOpacity>
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
    yearItem: {
        padding: 10,
        fontSize: 16,
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
        width: '100%',
    },
});
