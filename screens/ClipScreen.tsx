import React from 'react';
import {useSelector} from "react-redux";
import {StyleSheet,SafeAreaView,Text, FlatList} from "react-native";
import {State} from '../type/state';
import {Article} from "../type/article";
import {ListItem} from "../components/ListItem";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../type/navigation";
import {RouteProp} from "@react-navigation/native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

type Props = {
    navigation: StackNavigationProp<RootStackParamList,"Clip">;
    route: RouteProp<RootStackParamList, "Clip">;
}

const ClipScreen: React.FC<Props> = ({navigation,route}:Props) => {
    const user = useSelector((state:State) => state.user);
    const {clips} = user
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
            data={clips}
            renderItem={({ item }:{item: Article}) => <ListItem imageUrl={item.urlToImage} author={item.author} title={item.title} onPress={() => navigation.navigate("Article",{article: item})}/>}
            keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    );
};

export default ClipScreen;