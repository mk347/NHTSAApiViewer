import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import ListItem from '../components/ListItem.js';
import useFetch from '../hooks/useFetch.js';

const YearSelectScreen = () => {
    const { loading, error, value } = useFetch(`https://api.nhtsa.gov/SafetyRatings/`, {}, []);

    if (error) {
        return Alert.alert(error.message);
    }

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator color='#d97e1e' />}
            {!loading && (
                <FlatList
                    data={value?.Results}
                    renderItem={({ item }) => (
                        <>
                            {item.ModelYear >= 1995 && item.ModelYear <= 2024 && (
                                <ListItem item={item.ModelYear} curPage='Year' nextPage='Make' />
                            )}
                        </>
                    )}
                />
            )}
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
