import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AppContextProvider } from './src/context/AppContext';
import TopTabs from './src/navigation/TopTabs';

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <AppContextProvider>
                    <View style={styles.container}>
                        <TopTabs />
                    </View>
                </AppContextProvider>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
