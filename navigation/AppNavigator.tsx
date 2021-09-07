import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ArticleScreen from '../screens/ArticleScreen';
import {createBottomTabNavigator,BottomTabNavigationOptions,}from '@react-navigation/bottom-tabs'
import ClipScreen from "../screens/ClipScreen";
import {FontAwesome} from "@expo/vector-icons";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const HomeStack =() =>{
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Article" component={ArticleScreen}/>
        </Stack.Navigator>
    )
}

const ClipStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Clip" component={ClipScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Article" component={ArticleScreen}/>
        </Stack.Navigator>
    )
}

// @ts-ignore
const screenOption = ({route}): BottomTabNavigationOptions => ({
    tabBarIcon: ({color, size}) => {
        let iconName;
        switch (route.name) {
            case "Home":
                iconName = "home";
                break;
            case "Clip":
                iconName = "bookmark";
                break;
        }
        // @ts-ignore
        return <FontAwesome name={iconName} size={size} color={color} />;
    },
});

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={screenOption}>
                <Tab.Screen name="Home" component={HomeStack} />
                <Tab.Screen name="Clip" component={ClipStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;