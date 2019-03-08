import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const Header = ({profile}) => {
    return(
        <View style={styles.Header}>
            <TouchableOpacity onPress={profile}>
                <Icon name="user-circle" size={25} color="#888" />
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Icon name="comments" size={25} color="#888" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Header: {
        height: 80,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 25,
        paddingRight: 25,
        alignItems: 'center',
        paddingTop: 30
    }
})

export { Header }
