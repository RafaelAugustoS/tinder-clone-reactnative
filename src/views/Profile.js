import React, { Component } from 'react'
import { View, Text, StyleSheet , Dimensions, Animated } from 'react-native'
import { ImageProfile } from '../components/Profile'


class Profile extends Component {
    render(){
        return (
            <Animated.View style={[styles.Container, {
                transform: [
                    { translateX: this.props.position }
                ]
            }]}>
                <ImageProfile />
                <Text style={styles.Name}>Rafael, 23</Text>
                <Text style={styles.Sub}>Senior Developer at iORDER</Text>
                <Text style={styles.Sub}>FIAP</Text>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'absolute',
        width: '100%',
        height: '100%',
        paddingTop: 50
    },  
    Name: {
        fontSize: 25,
        fontWeight: '600',
        color: '#222',
        marginTop: 5
    },
    Sub: {
        fontSize: 16,
        color: '#111',
        marginTop: 2.5
    }
})

export default Profile