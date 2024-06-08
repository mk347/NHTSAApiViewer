import React, { useContext } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import AppContext from '../context/AppContext';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import useFetch from '../hooks/useFetch';

const VehicleModal = () => {
    const { selectedYear, selectedMake, selectedModel, modalVisible, setModalVisible } = useContext(AppContext);

    const { loading, error, value } = useFetch(
        `https://api.nhtsa.gov/SafetyRatings/modelyear/${selectedYear}/make/${selectedMake}/model/${selectedModel}/?format=json`,
        {},
        [selectedYear, selectedMake, selectedModel]
    );

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    if (error) {
        return Alert.alert(error.message);
    }

    return (
        <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
            {loading && <ActivityIndicator color='#d97e1e' />}
            {!loading && (
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.selectedVehicleHeader}>Selected Vehicle(s)</Text>
                        <FlatList
                            data={value?.Results}
                            renderItem={({ item }) => (
                                <View style={styles.vehicleListItem}>
                                    <Text style={styles.selectedVehicleText}>{item?.VehicleDescription}</Text>
                                </View>
                            )}
                        />
                        <Pressable style={{ position: 'absolute', top: 15, right: 15 }} onPress={handleCloseModal}>
                            <AntDesign name='closecircleo' size={24} color='#d97e1e' />
                        </Pressable>
                    </View>
                </View>
            )}
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
        fontSize: 16,
        width: '100%',
    },
});
