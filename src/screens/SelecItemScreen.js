import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext.js';
import ListItem from '../components/ListItem.js';
import { useQuery } from '@tanstack/react-query';

const YearSelectScreen = () => {
    const { fetchApiData } = useContext(AppContext);

    const { isLoading, error, data } = useQuery({
        queryKey: ['yearsFromQuery'],
        queryFn: fetchApiData,
      })

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
