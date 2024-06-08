import { View, Text, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import ListItem from '../components/ListItem';
import useFetch from '../hooks/useFetch';

const MakeSelectScreen = () => {
    const { selectedYear } = useContext(AppContext);

    const { loading, error, value } = useFetch(
        `https://api.nhtsa.gov/SafetyRatings/modelyear/${selectedYear}/?format=json`,
        {},
        [selectedYear]
    );

    if (error) {
        return Alert.alert(error.message);
    }

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator color='#d97e1e' />}
            {!loading && (
                <FlatList
                    data={value?.Results}
                    renderItem={({ item }) => <ListItem item={item.Make} curPage='Make' nextPage='Model' />}
                />
            )}
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
