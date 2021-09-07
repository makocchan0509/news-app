import React from 'react';
import {SafeAreaView, StyleSheet,Text,TouchableOpacity} from "react-native";
import { WebView } from 'react-native-webview';
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../type/navigation";
import { useDispatch,useSelector} from "react-redux";
import {addClip,deleteClip} from '../store/actions/user';
import {State} from "../type/state";
import {ClipButton} from "../components/ClipButton";
import {Loading} from "../components/Loading";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "Article">;
    route: RouteProp<RootStackParamList, "Article">;
};

const AtricleScreen: React.FC<Props> = ({navigation,route}:Props) => {
    const user = useSelector((state:State) => state.user);
    const {clips} = user;
    const dispatch = useDispatch();
    const {article} = route.params;

    const isClipped = () => {
        return clips.some(clip => clip.url === article.url);
    };
    const toggleClip = () => {
        if(isClipped()){
            dispatch(deleteClip({clip:article}));
        }else{
            dispatch(addClip({clip:article}));
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            <ClipButton onPress={toggleClip} enabled={isClipped()}/>
            <WebView
                source={{ uri: article.url }}
                startInLoadingState={true}
                renderLoading={() => <Loading/>}
            />
        </SafeAreaView>
    )
};

export default AtricleScreen;