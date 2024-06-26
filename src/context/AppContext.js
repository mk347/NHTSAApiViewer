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
    const [apiItem, setApiItem] = useState('Test');

    const navigation = useNavigation();

    const handleSelectListItem = (item, curPage, nextPage) => {
        if (curPage === 'Year') {
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
            setHeaderMainTitle('Choose Year');
            setHeaderSubtitle(' ');
        } else if (selectedYear && !selectedMake && !selectedModel) {
            setHeaderMainTitle('Choose Make');
            setHeaderSubtitle(selectedYear);
        } else if (selectedYear && selectedMake && !selectedModel) {
            setHeaderMainTitle('Choose Model');
            setHeaderSubtitle(`${selectedYear} ${selectedMake}`);
        } else if (selectedYear && selectedMake && selectedModel) {
            setHeaderSubtitle('fin');
        } else {
            setHeaderMainTitle('Choose Year');
            setHeaderSubtitle(' ');
        }
    };

    return (
        <AppContext.Provider
            value={{
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
                apiItem,
                setApiItem,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
