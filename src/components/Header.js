import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../context/AppContext';

const Header = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const { headerMainTitle, headerSubtitle, setHeaderSubtitle, setHeaderMainTitle } = useContext(AppContext);

    const handleGoBack = () => {
        navigation.goBack();
        // Clear Dynamic headers
        setHeaderMainTitle('Choose Year');
        setHeaderSubtitle(' ');
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.headerContentWrap}>
                <View style={{ justifyContent: 'center', position: 'relative' }}>
                    <Text style={styles.headerMainTitle}>{headerMainTitle}</Text>
                    <Text style={headerSubtitle?.length <= 8 ? styles.headerSubtitleShort : styles.headerSubtitle}>
                        {headerSubtitle}
                    </Text>
                </View>
                <Pressable onPress={handleGoBack} style={styles.resetButton}>
                    <FontAwesome5 name='undo' size={18} color='#d97e1e' />
                </Pressable>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerContentWrap: {
        backgroundColor: '#fff',
        paddingVertical: 10,
    },
    headerMainTitle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    headerSubtitleShort: {
        textAlign: 'center',
        fontSize: 14,
        color: '#666',
        textTransform: 'uppercase',
    },
    headerSubtitle: {
        textAlign: 'center',
        fontSize: 14,
        color: '#666',
        textTransform: 'capitalize',
    },
    resetButton: {
        paddingLeft: 20,
        position: 'absolute',
        top: '50%',
    },
});
