import React, { Component } from 'react'
import { View, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { data } from '../../config/api'

class Map extends Component {
    render(){
        return(
            <MapView 
                initialRegion={{
                    latitude: 43.653225,
                    longitude: -79.383186,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                showsUserLocation
                style={{
                    flex: 1
                }}
            >   
                {
                    data.map(item => 
                        <MapView.Marker 
                            style={{ width: 10 }}
                            coordinate={item.location}
                            description={item.name}
                            centerOffset={[0,2]}
                        >
                            <View style={{ width: 40, borderWidth: 1, marginLeft: -15, marginTop: 5, borderColor: item.gender === 1 ? '#ff9ff3' : '#48dbfb', height: 40, borderRadius: 50, overflow: 'hidden' }}>
                                <Image 
                                    source={item.images[0]}
                                    style={{width: '100%', height: '100%' }}
                                />
                            </View>

                        </MapView.Marker>   
                    )
                }
            </MapView>
        )
    }
}

export default Map