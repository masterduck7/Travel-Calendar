import React, { Component } from 'react';
import { AsyncStorage, Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import { Formik } from 'formik';

export default class AddTrip extends Component{

    constructor(props){
        super(props);
        this.state = {
            userData : Array()
        }
    }

    componentDidMount = async () => {
        this._retrieveData()
    }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('@Trips');
          if (value !== null) {
            this.setState({
                userData: JSON.parse(value)
            })
          }
        } catch (error) {
          console.log("Error retrieving data")
        }
    };

    _storeData = async (values) => {
        try {
            await AsyncStorage.setItem('@Trips', JSON.stringify(values));
        } catch (error) {
            console.log("Error saving data")
        }
    };

    render(){
    return(
        <View style={styles.container}>
        <ScrollView>
            <Formik
                initialValues={{destination: '', start_date: '', end_date: '', airline: '', reservationCode: '' }}
                onSubmit={values => {
                    if (values.destination === '' || values.start_date === '' || values.end_date === '' || values.airline === '' || values.reservationCode === '') {
                        alert("Favor llenar todos los campos")    
                    } else {
                        let data = this.state.userData
                        let newData = new Array()
                        if (data.length > 0) {
                            Array.from(data, child => {
                                newData.push(child)
                            });
                            newData.push(values)
                        }else{
                            newData.push(values)
                        }
                        {this._storeData(newData)}
                    }
                }}
            >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={{alignItems:'center'}}>
                <Text style={{ paddingTop:10, color: '#888', fontSize: 20}}>Destino:</Text>
                <Input
                    placeholder="Destino"
                    onChangeText={handleChange('destination')}
                    value={values.destination}
                />
                <Text style={{ paddingTop:10, color: '#888', fontSize: 20}}>Fecha inicio:</Text>
                <Input
                    placeholder="Inicio viaje"
                    onChangeText={handleChange('start_date')}
                    value={values.start_date}
                />
                <Text style={{ paddingTop:10, color: '#888', fontSize: 20}}>Fecha Fin:</Text>
                <Input
                    placeholder="Fin viaje"
                    onChangeText={handleChange('end_date')}
                    value={values.end_date}
                />
                <Text style={{ paddingTop:10, color: '#888', fontSize: 20}}>Aerolinea:</Text>
                <Input
                    placeholder="Aerolinea"
                    onChangeText={handleChange('airline')}
                    value={values.airline}
                />
                <Text style={{ paddingTop:10, color: '#888', fontSize: 20}}>Codigo Reserva:</Text>
                <Input
                    placeholder="Reserva"
                    onChangeText={handleChange('reservationCode')}
                    value={values.reservationCode}
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