import { View, Text, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import VehicleModal from '../components/VehicleModal';
import ListItem from '../components/ListItem';
import useFetch from '../hooks/useFetch';

const ModelSelectScreen = () => {
    const { selectedYear, selectedMake, selectedModel, modalVisible, setModalVisible } = useContext(AppContext);

    const { loading, error, value } = useFetch(
        `https://api.nhtsa.gov/SafetyRatings/modelyear/${selectedYear}/make/${selectedMake}/?format=json`,
        {},
        [selectedYear, selectedMake]
    );

    if (error) {
        return Alert.alert(error.message);
    }

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator color='#d97e1e' />}
            {!loading && (
                <>
                    <FlatList
                        data={value?.Results}
                        renderItem={({ item }) => <ListItem item={item.Model} curPage='Model' nextPage='Modal' />}
                    />
                    {selectedModel && <VehicleModal modalVisible={modalVisible} setModalVisible={setModalVisible} />}
                </>
            )}
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
