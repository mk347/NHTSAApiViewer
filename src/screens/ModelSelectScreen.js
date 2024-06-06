import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import VehicleModal from '../components/VehicleModal';
import ListItem from '../components/ListItem';

const ModelSelectScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const {
        fetchApiModels,
        selectedYear,
        selectedMake,
        apiModel,
        setApiModel,
        modalVisible,
        setModalVisible,
    } = useContext(AppContext);

    useEffect(() => {
        const fetchModels = async () => {
            setIsLoading(true);

            try {
                const apiModel = await fetchApiModels();
                setApiModel(apiModel);
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };
        fetchModels();
    }, [selectedMake, selectedYear]);

    if (isLoading) {
        return <ActivityIndicator color='#d97e1e' />;
    }

    if (error) {
        return <Text>{error.message}</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={apiModel}
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
