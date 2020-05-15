import React from 'react'
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const Login = (props) => {
  return(
    <LinearGradient 
      colors={["#FF655B", "#FF5864", "#FD297B"]}
      style={styles.Wraper}
    >
      <Image
        source={require('../images/logo.png')}
        style={styles.Logo}
      />

      <Text style={styles.Term}>
        By creating an account or logging in, you agree to out Terms and Privacy Policy
      </Text>

      <TouchableOpacity
        style={styles.Button}
      >
        <Text style={styles.TextButton}>LOG IN WITH FACEBOOK</Text>
      </TouchableOpacity>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  Wraper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Logo: {
    resizeMode: 'contain',
    width: 250,
    height: 70
  },
  Term: {
    color: '#fff',
    textAlign: 'center',
    width: '80%',
    marginTop: 20
  },  
  Button: {
    width: '80%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 50,
    marginTop: 40
  },
  TextButton: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15
  }
})

export default Login