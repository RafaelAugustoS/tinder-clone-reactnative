import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Animated, Image, PanResponder, Text } from 'react-native'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const Users = [
    { id: 1, uri: 'https://www.hbo.com/content/dam/hbodata/series/game-of-thrones/character/s5/john-snow-1920.jpg/_jcr_content/renditions/cq5dam.web.1200.675.jpeg' },
    { id: 2, uri: 'https://fsmedia.imgix.net/4b/35/06/0e/a183/41c2/ba92/529992321675/will-tyrion-die-or-not.jpeg?rect=0%2C177%2C4327%2C2167&auto=format%2Ccompress&dpr=2&w=650' },
    { id: 3, uri: 'https://cdnb.artstation.com/p/assets/images/images/009/103/941/large/sean-fox-daenerys-targaryen.jpg?1517168055' },
    { id: 4, uri: 'https://vignette.wikia.nocookie.net/gameofthronesfanon/images/1/1f/Sansa_Stark.jpg/revision/latest?cb=20170604070759' },
    { id: 5, uri: 'https://i.pinimg.com/originals/d2/42/26/d242265635b3e188e06656badd3c31c7.jpg' },
]

class App extends Component {
    constructor(){
        super()

        this.position = new Animated.ValueXY()
        
        this.state = {
            currentIndex: 0
        }
        
        this.rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: ['-10deg', '0deg', '10deg'],
            extrapolate: 'clamp'
        })

        this.rotateAndTranslate = {
            transform: [
                {
                    rotate: this.rotate
                },
                ...this.position.getTranslateTransform()
            ]
        }

        this.likeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        })

        this.dislikeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        })

        this.nextCardOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp'
        })

        this.nextCardScale = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0.8, 1],
            extrapolate: 'clamp'
        })
    }

    componentWillMount(){
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
            },
            onPanResponderRelease: (evt, gestureState) => {
                if(gestureState.dx > 120){
                    Animated.spring(this.position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
                    }).start(() => {
                        this.setState({ 
                            currentIndex: this.state.currentIndex + 1
                        }, () => {
                            this.position.setValue({ x: 0, y: 0 })    
                        })
                    })
                }else if(gestureState.dx < -120){
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
                    }).start(() => {
                        this.setState({ 
                            currentIndex: this.state.currentIndex + 1
                        }, () => {
                            this.position.setValue({ x: 0, y: 0 })    
                        })
                    })
                }else{
                    Animated.spring(this.position, {
                        toValue: { x: 0, y: 0 },
                        friction: 4
                    }).start()
                }
            }
        })
    }

    renderUsers = () => {
        return Users.map((item, index) => {
            if(index < this.state.currentIndex){
                return null
            }else if(index === this.state.currentIndex){
                return(
                    <Animated.View
                        {...this.PanResponder.panHandlers}
                        key={item.id}
                        style={[
                            this.rotateAndTranslate,
                            {
                                height: SCREEN_HEIGHT - 230,
                                width: SCREEN_WIDTH,
                                padding: 10,
                                position: 'absolute'
                            }
                        ]}
                    >
                        <Animated.View
                            style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}
                        >
                            <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
                        </Animated.View>

                        <Animated.View
                            style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}
                        >
                            <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
                        </Animated.View>

                        <Image 
                            style={{flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 20}}
                            source={{uri: item.uri}} 
                        />
                    </Animated.View>
                )
            }else{
                return(
                    <Animated.View
                        key={item.id}
                        style={[
                            {
                                opacity: this.nextCardOpacity,
                                transform: [{ scale: this.nextCardScale }],
                                height: SCREEN_HEIGHT - 230,
                                width: SCREEN_WIDTH,
                                padding: 10,
                                position: 'absolute'
                            }
                        ]}
                    >
                        <Animated.View
                            style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}
                        >
                            <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
                        </Animated.View>

                        <Animated.View
                            style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}
                        >
                            <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
                        </Animated.View>

                        <Image 
                            style={{flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 20}}
                            source={{uri: item.uri}} 
                        />
                    </Animated.View>
                )
            }
        }).reverse()
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{height: 80}} />

                <View style={{flex: 1}}>
                    { this.renderUsers() }
                </View>

                <View style={{height: 150}} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})

export default App