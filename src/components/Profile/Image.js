import React from 'react'
import { Image, View, StyleSheet } from 'react-native'

const ImageProfile = () => {
    return(
        <View style={styles.View}>
            <Image 
                source={{uri: 'https://captainplanetfoundation.org/wp-content/uploads/2017/04/Ian.jpg'}}
                resizeMode="contain"
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    View: {
        width: 125,
        height: 125,
        borderRadius: 62.5,
        overflow: 'hidden'
    }
})

export { ImageProfile } 