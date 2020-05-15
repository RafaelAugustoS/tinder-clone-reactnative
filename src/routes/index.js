import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Login from '../views/Login'
import Cards from '../views/Cards'

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Home: {
    screen: Cards,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
})

export default createAppContainer(AppNavigator)