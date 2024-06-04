import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import AppContext from '../context/AppContext';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';

const VehicleModal = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const {
        fetchApiData,
        selectedYear,
        selectedMake,
        selectedModel,
        apiVehicle,
        setApiVehicle,
        modalVisible,
        setModalVisible,
    } = useContext(AppContext);

    useEffect(() => {
        const fetchVehicle = async () => {
            setIsLoading(true);

            try {
                const apiVehicle = await fetchApiData(selectedYear, selectedMake, selectedModel);
                setApiVehicle(apiVehicle);
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };
        fetchVehicle(selectedYear, selectedMake, selectedModel);
    }, [selectedYear, selectedMake, selectedModel]);

    if (isLoading) {
        return <ActivityIndicator color='#d97e1e' />;
    }

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 5}}>Selected Vehicle</Text>
                    <FlatList
                        data={apiVehicle}
                        renderItem={({ item }) => (
                            <View style={styles.makeItem}>
                                <Text>{item.VehicleDescription}</Text>
                            </View>
                        )}
                    />
                    <Pressable style={{position: 'absolute', top: 15, right: 15}} onPress={handleCloseModal}>
                        <AntDesign name='closecircleo' size={24} color='#d97e1e' />
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export default VehicleModal;

const styles = StyleSheet.create({
    modalView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
