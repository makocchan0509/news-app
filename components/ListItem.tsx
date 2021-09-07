import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    imageUrl: string,
    author: string,
    title: string,
    onPress: () => void,
}
export const ListItem = ({imageUrl,author,title,onPress} :Props) =>{
    return (
            <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
                <View style={styles.leftContainer}>
                    {!!imageUrl &&(<Image
                        style={{ width: 100, height: 100 }}
                        source={{uri:imageUrl}}
                    />
                    )}
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.text} numberOfLines={3}>
                        {title}
                    </Text>
                    <Text style={styles.subText}>{author}</Text>
                </View>
            </TouchableOpacity>
    );
}