import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import ListItem from '../components/ListItem';
import { useQuery } from '@tanstack/react-query';

const MakeSelectScreen = () => {
    const { fetchApiMakes, apiMakes, setApiMakes, selectedYear } = useContext(AppContext);

    const { isLoading, error, data } = useQuery({
        queryKey: ['makesFromQuery', selectedYear],
        queryFn: fetchApiMakes,
        // queryFn: () => fetchApiMakes(),
    });

    if (isLoading) {
        return <ActivityIndicator color='#d97e1e' />;
    }

    if (error) {
        return <Text>{error.message}</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <ListItem item={item.Make} curPage='Make' nextPage='Model' />}
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
