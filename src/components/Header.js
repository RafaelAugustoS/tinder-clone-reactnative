import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Header = ({profile, map, tab}) => {
    return(
        <View style={styles.Header}>
            <TouchableOpacity onPress={profile}>
                <Icon name="user-circle" size={25} color="#888" />
            </TouchableOpacity>

            <View style={{flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 50, backgroundColor: '#f5f5f5', width: 80, height: 33}}>
                <TouchableOpacity onPress={() => map(false)} style={[{ left: 0 }, styles.Button, tab ? null : styles.Active]}>
                    <Icon name="fire" size={20} color={tab ? '#ccc' : '#FE3C72'} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => map(true)} style={[{ right: 0 }, styles.Button, tab ? styles.Active : null]}>
                    <Icon name="map-marker" size={20} color={tab ? '#FE3C72' : '#ccc'} />
                </TouchableOpacity>
            </View>
            
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
    },
    Button: {
        position: 'absolute',
        height: 30,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    Active: {
        shadowColor: "#666",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.58,
        shadowRadius: 5,
        elevation: 1,
        backgroundColor: '#fff'
    }
})

export { Header }
