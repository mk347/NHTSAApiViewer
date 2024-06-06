import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AppContextProvider } from './src/context/AppContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TopTabs from './src/navigation/TopTabs';

// Create a client
const queryClient = new QueryClient();

export default function App() {
    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    <AppContextProvider>
                        <View style={styles.container}>
                            <TopTabs />
                        </View>
                    </AppContextProvider>
                </NavigationContainer>
            </QueryClientProvider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
