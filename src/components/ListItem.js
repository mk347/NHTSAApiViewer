import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppContext from '../context/AppContext';

const ListItem = ({ item, index, curPage, nextPage }) => {
    const { handleSelectListItem } = useContext(AppContext);

    return (
        <View>
            <TouchableOpacity onPress={() => handleSelectListItem(item, curPage, nextPage)}>
                <View style={styles.listItem }>
                    <Text style={item?.length <= 3 ? styles.listItemShort : styles.listItemText}>{item}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ListItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
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
    },
    listItemShort: {
        textTransform: 'uppercase',
    },
});
