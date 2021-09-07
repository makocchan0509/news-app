import React, { useState, useEffect,useRef } from 'react';
import {StyleSheet, FlatList, SafeAreaView, RefreshControl} from 'react-native';
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
    const pageRef = useRef(1);
    const fetchAllRef = useRef(false);
    const [refreshing,setRefreshing] = useState(false);

    // @ts-ignore
    useEffect(() => {
        setLoading(true);
        fetchArticles(1);
    },[]);

    // @ts-ignore
    const fetchArticles = async (page) => {
        try {
            const response = await axios.get(`${URL}&page=${page}`);
            if (response.data.articles.length > 0) {
                setArticles(articles.concat(response.data.articles));
            }else{
                fetchAllRef.current =true;
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const onEndReached = () => {
        if(!fetchAllRef.current) {
            pageRef.current = pageRef.current + 1
            fetchArticles(pageRef.current)
        }
    }

    const onRefresh = () => {
        setRefreshing(true);
        setArticles([]);
        pageRef.current = 1;
        fetchAllRef.current = false;
        fetchArticles(1);
        setRefreshing(false);
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={articles}
                renderItem={({ item }:{item: Article}) => <ListItem imageUrl={item.urlToImage} author={item.author} title={item.title} onPress={() => navigation.navigate("Article",{article: item})}/>}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={onEndReached}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            {loading && <Loading />}
        </SafeAreaView>
    );
};

export default HomeScreen;
