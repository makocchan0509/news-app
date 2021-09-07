import React, { useState, useEffect } from 'react';
import { StyleSheet,FlatList, SafeAreaView } from 'react-native';
import { ListItem } from '../components/ListItem';
import Constants from 'expo-constants';
import axios from 'axios';
import {RootStackParamList} from "../type/navigation";
import {StackNavigationProp} from "@react-navigation/stack";
import {Article} from "../type/article";
import {RouteProp} from "@react-navigation/native";
import {Loading} from "../components/Loading";

// @ts-ignore
const URL = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${Constants.manifest.extra.newsApiKey}`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemContainer: {
        height: 100,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        flexDirection: 'row',
    },
    leftContainer: {
        width: 100,
    },
    rightContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 16,
    },
    subText: {
        fontSize: 12,
        color: 'gray',
    },
});

type Props = {
    navigation: StackNavigationProp<RootStackParamList,"Home">;
    route: RouteProp<RootStackParamList, "Home">;
}

const HomeScreen: React.FC<Props> = ({ navigation,route }:Props) => {
    const [articles, setArticles] = useState([]);
    const [loading,setLoading] = useState(false);
    // @ts-ignore
    useEffect(() => {
        //alert(URL);
        fetchArticles();
    },[]);

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const response = await axios.get(URL);
            setArticles(response.data.articles);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={articles}
                renderItem={({ item }:{item: Article}) => <ListItem imageUrl={item.urlToImage} author={item.author} title={item.title} onPress={() => navigation.navigate("Article",{article: item})}/>}
                keyExtractor={(item, index) => index.toString()}
            />
            {loading && <Loading />}
        </SafeAreaView>
    );
};

export default HomeScreen;
