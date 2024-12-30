import { Animated, Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { Colors } from '@/constants/Colors';

interface Images {
    images: String[] | undefined,
}

const width = Dimensions.get('window').width

const ImagesSlider: React.FC<Images> = ({ images }) => {

    return (
        <View>
            <FlatList
                data={images}
                keyExtractor={(image, ind) => `${ind}`}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <>
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <Image source={{ uri: `${item}` }} style={styles.image} />
                        </View>
                    </>
                )}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: width * 0.925,
        height: 200,
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: Colors.light.loading,
        marginHorizontal: 5,
    }
})

export default ImagesSlider;