import { useNavigation } from '@react-navigation/native';
import React, { createContext, useState } from 'react';

const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    const [apiYears, setApiYears] = useState([]);
    const [apiMakes, setApiMakes] = useState([]);
    const [apiModel, setApiModel] = useState([]);
    const [apiVehicle, setApiVehicle] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [headerMainTitle, setHeaderMainTitle] = useState('Choose Year');
    const [headerSubtitle, setHeaderSubtitle] = useState(' ');

    const navigation = useNavigation();

    const apiUrl = {
        years: 'https://api.nhtsa.gov/SafetyRatings/?format=json',
        makes: `https://api.nhtsa.gov/SafetyRatings/modelyear/${selectedYear}?format=json`,
        models: `https://api.nhtsa.gov/SafetyRatings/modelyear/${selectedYear}/make/${selectedMake}/?format=json`,
        vehicle: `https://api.nhtsa.gov/SafetyRatings/modelyear/${selectedYear}/make/${selectedMake}/model/${selectedModel}?format=json`,
    };

    const handleSelectListItem = (item, curPage, nextPage) => {
        if (curPage === 'Year') {
            console.log('testing', item);
            navigation.navigate(nextPage);
            setSelectedYear(item);
            updateTextHeader(item);
        } else if (curPage === 'Make') {
            navigation.navigate(nextPage);
            setSelectedMake(item);
            updateTextHeader(selectedYear, item);
        } else if (curPage === 'Model') {
            setSelectedModel(item);
            setModalVisible(true);
        }
    };

    const updateTextHeader = (selectedYear, selectedMake, selectedModel) => {
        if (!selectedYear && !selectedMake && !selectedModel) {
            setHeaderMainTitle('Choose Make');
            setHeaderSubtitle(selectedYear);
        } else if (selectedYear && !selectedMake && !selectedModel) {
            setHeaderMainTitle('Choose Make');
            setHeaderSubtitle(selectedYear);
        } else if (selectedYear && selectedMake && !selectedModel) {
            setHeaderMainTitle('Choose Model');
            setHeaderSubtitle(`${selectedYear} ${selectedMake}`);
        } else if (selectedYear && selectedMake && selectedModel) {
            setHeaderSubtitle('fin');
        }
    };

    const fetchApiData = async (selectedYear, selectedMake, selectedModel) => {
        let url = apiUrl.years;

        if (selectedYear && !selectedMake && !selectedModel) {
            url = apiUrl.makes;
        } else if (selectedYear && selectedMake && !selectedModel) {
            url = apiUrl.models;
        } else if (selectedYear && selectedMake && selectedModel) {
            url = apiUrl.vehicle;
        }

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const json = await res.json();
        return json.Results;
    };

    return (
        <AppContext.Provider
            value={{
                fetchApiData,
                apiYears,
                setApiYears,
                apiMakes,
                setApiMakes,
                apiModel,
                setApiModel,
                apiVehicle,
                setApiVehicle,
                selectedYear,
                setSelectedYear,
                selectedMake,
                setSelectedMake,
                selectedModel,
                setSelectedModel,
                selectedVehicle,
                setSelectedVehicle,
                modalVisible,
                setModalVisible,
                headerMainTitle,
                setHeaderMainTitle,
                headerSubtitle,
                setHeaderSubtitle,
                updateTextHeader,
                handleSelectListItem,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
