import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import YearSelectScreen from '../screens/YearSelectScreen';
import MakeSelectScreen from '../screens/MakeSelectScreen';
import ModelSelectScreen from '../screens/ModelSelectScreen';
import EngineSelectScreen from '../screens/EngineSelectScreen';
import Header from '../components/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useContext } from 'react';
import AppContext from '../context/AppContext';

const Tab = createMaterialTopTabNavigator();

function TopTabs() {
    const insets = useSafeAreaInsets();
    const { selectedYear, selectedModel, selectedMake } = useContext(AppContext);

    return (
        <>
            <Header />
            <Tab.Navigator
                screenOptions={{
                    tabBarIndicatorStyle: { backgroundColor: '#d97e1e' },
                    tabBarStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
                    swipeEnabled: false,
                    tabBarLabelStyle: { textTransform: 'capitalize' },
                }}
            >
                <Tab.Screen
                    name='Year'
                    component={YearSelectScreen}
                    listeners={{
                        tabPress: (e) => {
                            if (!selectedYear) {
                                e.preventDefault();
                            }
                        },
                    }}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Year',
                    }}
                />
                <Tab.Screen
                    name='Make'
                    component={MakeSelectScreen}
                    listeners={{
                        tabPress: (e) => {
                            if (!selectedMake) {
                                e.preventDefault();
                            }
                        },
                    }}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Make',
                    }}
                />
                <Tab.Screen
                    name='Model'
                    component={ModelSelectScreen}
                    listeners={{
                        tabPress: (e) => {
                            if (!selectedModel) {
                                e.preventDefault();
                            }
                        },
                    }}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Model',
                    }}
                />
                <Tab.Screen
                    name='Engine'
                    component={EngineSelectScreen}
                    listeners={{
                        tabPress: (e) => {
                            e.preventDefault();
                        },
                    }}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Engine',
                    }}
                />
            </Tab.Navigator>
        </>
    );
}

export default TopTabs;
