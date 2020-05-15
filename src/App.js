import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Animated, Image, PanResponder, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Header } from './components'
import Profile from './views/Profile'
import Map from './components/Map/Map'
import { data } from './config/api'

import Routes from './routes'

const App = () => {
    return (
        <Routes />
    )
}

export default App