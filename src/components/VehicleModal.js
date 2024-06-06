import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import AppContext from '../context/AppContext';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import ListItem from './ListItem';
import { useQuery } from '@tanstack/react-query';

const VehicleModal = () => {
    const {
        fetchApiVehicle,
        selectedYear,
        selectedMake,
        selectedModel,
        modalVisible,
        setModalVisible,
    } = useContext(AppContext);

    const { isLoading, error, data } = useQuery({
        queryKey: ['vehicleFromQuery', selectedYear, selectedMake, selectedModel],
        queryFn: fetchApiVehicle,
        // queryFn: () => fetchApiVehicle(selectedYear, selectedMake, selectedModel),
    });

    if (isLoading) {
        return <ActivityIndicator color='#d97e1e' />;
    }

    if (error) {
        return <Text>{error.message}</Text>;
    }

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.selectedVehicleHeader}>Selected Vehicle(s)</Text>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <View style={styles.vehicleListItem}>
                                <Text style={styles.selectedVehicleText}>{item.VehicleDescription}</Text>
                            </View>
                        )}
                    />
                    <Pressable style={{ position: 'absolute', top: 15, right: 15 }} onPress={handleCloseModal}>
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
    selectedVehicleHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    vehicleListItem: {
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 10,
        fontSize: 16,
        // borderBottomColor: '#f0f0f0',
        // borderBottomWidth: 1,
        width: '100%',
    },
});
