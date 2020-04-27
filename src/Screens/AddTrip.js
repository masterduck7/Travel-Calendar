import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import { Formik } from 'formik';

export default class AddTrip extends Component{
    constructor(props){
      super(props)
      this.state = {
        originTrip : "",
        destinationTrip: "",
        start_date: "",
        end_date: "",
        airline: "",
        reservationCode: ""
      }
    }    
    render(){
    return(
        <View style={styles.container}>
        <ScrollView>
            <Formik
                onSubmit={()=> console.log("s")}
            >
            {({ handleSubmit}) => (
                <View style={{alignItems:'center'}}>
                <Text style={{ paddingTop:10, color: '#888', fontSize: 20}}>Origen:</Text>
                <Input
                    placeholder="Viaje IDA"
                    onChange = {value => {
                        this.setState({
                            originTrip : value.nativeEvent.text
                        })
                    }}
                />
                <Text style={{ paddingTop:10, color: '#888', fontSize: 20}}>Destino:</Text>
                <Input
                    placeholder="Viaje Vuelta"
                    onChange = {value => {
                        this.setState({
                            destinationTrip : value.nativeEvent.text
                        })
                    }}
                />
                <Text style={{ paddingTop:10, color: '#888', fontSize: 20}}>Fecha inicio:</Text>
                <Input
                    placeholder="F"
                    onChange = {value => {
                        this.setState({
                            start_date : value.nativeEvent.text
                        })
                    }}
                />
                <Text style={{ paddingTop:10, color: '#888', fontSize: 20}}>Fecha Fin:</Text>
                <Input
                    placeholder="FFF"
                    onChange = {value => {
                        this.setState({
                            end_date : value.nativeEvent.text
                        })
                    }}
                />
                <Text style={{ paddingTop:10, color: '#888', fontSize: 20}}>Aerolinea:</Text>
                <Input
                    placeholder="FFF"
                    onChange = {value => {
                        this.setState({
                            airline : value.nativeEvent.text
                        })
                    }}
                />
                <Text style={{ paddingTop:10, color: '#888', fontSize: 20}}>Codigo Reserva:</Text>
                <Input
                    placeholder="FFF"
                    onChange = {value => {
                        this.setState({
                            reservationCode : value.nativeEvent.text
                        })
                    }}
                />
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.buttonSubmit}>
                    <Text style={{ fontSize: 20, color: '#fff' }}>Agregar</Text>
                </TouchableOpacity>
                </View>
            )}
            </Formik>
        </ScrollView>
        </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonUsers:{
        marginTop:10,
        marginHorizontal:5,
        backgroundColor: '#506280',
        padding: 10,
        alignSelf:"center",
        borderRadius: 5
    },
    buttonSubmit: {
        marginTop:40,
        backgroundColor: '#d1625a',
        padding: 10,
        alignSelf:"center",
        borderRadius: 5
    }
});