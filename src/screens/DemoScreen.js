import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BASE_URL = "https://restcountries.com/v3.1/";


const FILTERABLE_CAPITALS = [
    "Tallinn",
    "Helsinki",
    "Stockholm"
]

const DemoScreen = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            const res = await fetch(`${BASE_URL}/all`)
            const countries = await res.json();
            setCountries(countries)
        }
        fetchCountries();
    }, [])

    console.log(countries);
    
    return (
        <SafeAreaView>
            <Text></Text>
        </SafeAreaView>
    )

    
};

export default DemoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
});
