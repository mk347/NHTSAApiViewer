import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import VehicleModal from '../components/VehicleModal';

const ModelSelectScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { fetchApiData, selectedYear, selectedMake, setSelectedModel, apiModel, setApiModel, modalVisible, setModalVisible } =
        useContext(AppContext);

    const handleSelectModel = (item) => {
        // navigation.navigate('Engine');
        setSelectedModel(item.Model);
        setModalVisible(true);
    };

    useEffect(() => {
        const fetchModels = async () => {
            setIsLoading(true);

            try {
                const apiModel = await fetchApiData(selectedYear, selectedMake);
                setApiModel(apiModel);
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };
        fetchModels(selectedYear, selectedMake);
    }, [selectedMake, selectedYear]);

    if (isLoading) {
        return <ActivityIndicator color='#d97e1e' />;
    }

    if (error) {
        return <Text>{error.message}</Text>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={apiModel}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelectModel(item)}>
                        <View style={styles.listItem}>
                            <Text style={ item.Model?.length <= 3 ? styles.listItemShort : styles.listItemText }>{item.Model}</Text>
                        </View>
                    </TouchableOpacity>
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
    listItem: {
        padding: 10,
        fontSize: 16,
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
        width: '100%',
    },
    listItemText: {
        textTransform: 'capitalize',
    }
});