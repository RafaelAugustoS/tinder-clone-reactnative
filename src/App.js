import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Animated, Image, PanResponder, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Header } from './components'
import Profile from './views/Profile'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const Users = [
    { id: 1, uri: 'https://kaysharbor.com/wp-content/uploads/2018/05/all-about-react-native-apps-776x415.png', title: 'Developer React Native', desc: 'I need to developer react native with experience in GraphQL for a project.', price: '100/h' },
    { id: 2, uri: 'https://udemy-images.udemy.com/course/750x422/1286908_1773_4.jpg', title: 'Developer React', desc: 'I need to developer react', price: '65/h' },
    { id: 3, uri: 'https://cdn-images-1.medium.com/max/1200/1*nq9cdMxtdhQ0ZGL8OuSCUQ.jpeg', title: 'Developer Vue', desc: 'I need to developer vue with experience in Vuex and Apollo.', price: '90/h' },
    { id: 4, uri: 'https://christianliebel.com/wp-content/uploads/2016/02/Angular2-825x510.png', title: 'Developer Angular', desc: 'I need to developer angular.', price: '33/h' },
    { id: 5, uri: 'https://www.edsonemiliano.com.br/blog/wp-content/uploads/2015/04/icon.javascript.png', title: 'Developer Javascript', desc: 'I need to developer javascript with experience in React or Vue.', price: '84/h' },
]

class App extends Component {
    constructor(){
        super()

        this.position = new Animated.ValueXY()

        this.state = {
            currentIndex: 0,
            profile: new Animated.Value(-SCREEN_WIDTH),
            matches: new Animated.Value(0)
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

    liked = () => {
        Animated.timing(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: 0 },
            duration: 500
            
        }).start(() => {
            this.setState({ 
                currentIndex: this.state.currentIndex + 1
            }, () => {
                this.position.setValue({ x: 0, y: 0 })    
            })
        })
    }

    disliked = () => {
        Animated.timing(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
            duration: 500
        }).start(() => {
            this.setState({ 
                currentIndex: this.state.currentIndex + 1
            }, () => {
                this.position.setValue({ x: 0, y: 0 })    
            })
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
                                height: SCREEN_HEIGHT - 170,
                                width: SCREEN_WIDTH,
                                paddingLeft: 20,
                                paddingRight: 20,
                                position: 'absolute',
                                shadowColor: "#ccc",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.58,
                                shadowRadius: 10,
                                elevation: 1
                            }
                        ]}
                    >
                        <Animated.View
                            style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}
                        >
                            <Text style={{ borderWidth: 1, borderColor: '#1dd1a1', color: '#1dd1a1', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
                        </Animated.View>

                        <Animated.View
                            style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}
                        >
                            <Text style={{ borderWidth: 1, borderColor: '#ee5253', color: '#ee5253', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
                        </Animated.View>

                        <Image 
                            style={{flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 20}}
                            source={{uri: item.uri}} 
                        />

                        <View style={{ backgroundColor: '#fff', padding: 15, position: 'absolute', bottom: 0, height: 120, width: '100%', left: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                            <Text style={styles.Title}>{ item.title }</Text>
                            <Text style={styles.Sub}>{ item.desc }</Text>
                            <Text style={styles.Value}>$ { item.price }</Text>
                        </View>
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
                                height: SCREEN_HEIGHT - 170,
                                width: SCREEN_WIDTH,
                                padding: 20,
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
    
    changeProfile = () => {
        Animated.parallel([    
            Animated.timing(this.state.profile, {
                toValue: 0
            }),
            Animated.timing(this.state.matches, {
                toValue: SCREEN_WIDTH
            })
        ]).start()
    }

    render(){
        return(
            <View style={styles.container}>
                <Header 
                    profile={this.changeProfile}
                />

                <Profile 
                    position={this.state.profile}
                />

                <Animated.View style={{flex: 1, transform: [
                    { translateX: this.state.matches }
                ]}}>
                    { this.renderUsers() }
                </Animated.View>

                <View 
                    style={{ height: 90, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingLeft: 50, paddingRight: 50}}
                >
                    <TouchableOpacity style={styles.ButtonIcon} onPress={() => this.disliked()}>
                        <Icon name="times" size={20} color="#ee5253" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.ButtonIcon, { marginTop: 10}]}>
                        <Icon name="star" size={20} color="#54a0ff" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ButtonIcon} onPress={() => this.liked()}>
                        <Icon name="heart" size={20} color="#ee5253" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE'
    },
    ButtonIcon: {
        width: 55,
        height: 55,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#8DC7DE",
        borderRadius: 50,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24
    },
    Title: {
        fontWeight: '600',
        fontSize: 22,
        color: '#8dc7de'
    },
    Sub: {
        color: '#555',
        marginTop: 5
    },
    Value: {
        fontWeight: '600',
        fontSize: 18,
        marginTop: 5,
        color: '#555',
        textAlign: 'right'
    }
})

export default App