import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import VehicleModal from '../components/VehicleModal';
import ListItem from '../components/ListItem';
import { useQuery } from '@tanstack/react-query';

const ModelSelectScreen = () => {
    const {
        fetchApiModels,
        selectedYear,
        selectedMake,
        modalVisible,
        setModalVisible,
    } = useContext(AppContext);

    const { isLoading, error, data } = useQuery({
        queryKey: ['modelsFromQuery', selectedYear, selectedMake],
        queryFn: fetchApiModels,
        // queryFn: () => fetchApiModels(selectedYear, selectedMake),
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
                    <ListItem
                        item={item.Model}
                        curPage='Model'
                        nextPage='Modal'
                    />
                )}
            />

            <VehicleModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </View>
    );
};

export default ModelSelectScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
        flex: 1,
    },
});
