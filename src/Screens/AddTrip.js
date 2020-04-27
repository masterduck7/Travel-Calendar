import React, { Component } from 'react';
import { AsyncStorage, Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import { Formik } from 'formik';

export default class AddTrip extends Component{

    _storeData = async (values) => {
        try {
            await AsyncStorage.clear()
            await AsyncStorage.setItem('@Trip:key', JSON.stringify(values));
        } catch (error) {
            console.log("Error saving data")
        }
      };

    render(){
    return(
        <View style={styles.container}>
        <ScrollView>
            <Formik
                initialValues={{ origin: '', destination: '', start_date: '', end_date: '', airline: '', reservation: '' }}
                onSubmit={values => {
                    if (values.origin === '' || values.destination === '' || values.start_date === '' || values.end_date === '' || values.airline === '' || values.reservation === '') {
                        alert("Favor llenar todos los campos")    
                    } else {
                        {this._storeData(values)}
                    }
                }}
            >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={{alignItems:'center'}}>
                <Text style={{ paddingTop:10, color: '#888', fontSize: 20}}>Origen:</Text>
                <Input
                    placeholder="Viaje IDA"
                    onChangeText={handleChange('origin')}
                    value={values.origin}
                />
                <Text style={{ paddingTop:10, color: '#888', fontSize: 20}}>Destino:</Text>
                <Input
                    placeholder="Viaje Vuelta"
                    onChangeText={handleChange('destination')}
                    value={values.destination}
                />
                <Text style={{ paddingTop:10, color: '#888', fontSize: 20}}>Fecha inicio:</Text>
                <Input
                    placeholder="F"
                    onChangeText={handleChange('start_date')}
                    value={values.start_date}
                />
                <Text style={{ paddingTop:10, color: '#888', fontSize: 20}}>Fecha Fin:</Text>
                <Input
                    placeholder="FFF"
                    onChangeText={handleChange('end_date')}
                    value={values.end_date}
                />
                <Text style={{ paddingTop:10, color: '#888', fontSize: 20}}>Aerolinea:</Text>
                <Input
                    placeholder="FFF"
                    onChangeText={handleChange('airline')}
                    value={values.airline}
                />
                <Text style={{ paddingTop:10, color: '#888', fontSize: 20}}>Codigo Reserva:</Text>
                <Input
                    placeholder="FFF"
                    onChangeText={handleChange('reservation')}
                    value={values.reservation}
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