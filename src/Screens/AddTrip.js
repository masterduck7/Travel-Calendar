import React, { Component } from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Formik } from 'formik';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
                initialValues={{destination: '', start_date: '', end_date: '', airline: '', reservationCode: '', startTime: '', endTime: '' }}
                onSubmit={values => {
                    if (values.destination === '' || values.start_date === '' || values.end_date === '' || values.airline === '' || values.reservationCode === '' || values.startTime === '' || values.endTime === '') {
                        Alert.alert(
                            "Error",
                            "Favor ingresar todos los datos",
                            [
                              {
                                text: "OK",
                                style: "cancel"
                              }
                            ],
                            { cancelable: false }
                        );                      
                    }
                    else if( moment(values.end_date) < moment(values.start_date) ){
                        Alert.alert(
                            "Error",
                            "Favor ingresa una fecha válida",
                            [
                              {
                                text: "OK",
                                style: "cancel"
                              }
                            ],
                            { cancelable: false }
                        );
                    }
                     else {
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
                        ToastAndroid.show("Viaje agregado", ToastAndroid.SHORT);
                        {this.props.navigation.navigate('Home')}
                    }
                }}
            >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={{alignItems:'center'}}>
                <Text style={styles.textInput}>Destino:</Text>
                <Input
                    placeholder="Destino"
                    onChangeText={handleChange('destination')}
                    value={values.destination}
                />
                <Text style={styles.textInput}>Fecha Ida:</Text>
                <DatePicker
                    style={styles.input}
                    date={values.start_date}
                    placeholder="Inicio viaje"
                    onDateChange={handleChange('start_date')}
                    mode="date"
                    format="YYYY-MM-DD"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: wp("-10%")
                    }
                    }}
                />
                <Text style={styles.textInput}>Horario:</Text>
                <DatePicker
                    mode="time"
                    style={styles.input}
                    date={values.startTime}
                    onDateChange={handleChange('startTime')}
                    placeholder="Vuelo Ida"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: wp("-10%")
                    }
                    }}
                />
                <Text style={styles.textInput}>Fecha Vuelta:</Text>
                <DatePicker
                    style={styles.input}
                    date={values.end_date}
                    placeholder="Fin viaje"
                    onDateChange={handleChange('end_date')}
                    mode="date"
                    format="YYYY-MM-DD"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: wp("-10%")
                    }
                    }}
                />
                <Text style={styles.textInput}>Horario:</Text>
                <DatePicker
                    mode="time"
                    style={styles.input}
                    date={values.endTime}
                    onDateChange={handleChange('endTime')}
                    placeholder="Vuelo regreso"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: wp("-10%")
                    }
                    }}
                />
                <Text style={styles.textInput}>Aerolínea:</Text>
                <Input
                    placeholder="Aerolinea"
                    onChangeText={handleChange('airline')}
                    value={values.airline}
                />
                <Text style={styles.textInput}>Código de Reserva:</Text>
                <Input
                    placeholder="Reserva"
                    onChangeText={handleChange('reservationCode')}
                    value={values.reservationCode}
                    autoCapitalize='characters'
                />
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.buttonSubmit}>
                    <Text style={{ fontSize: wp("5%"), color: '#fff' }}>Agregar</Text>
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
        backgroundColor: '#F4EADE',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonSubmit: {
        marginTop: hp("3%"),
        backgroundColor: '#d1625a',
        padding: hp("1.5%"),
        alignSelf:"center",
        borderRadius: hp("1%")
    },
    textInput:{
        paddingTop: hp("1.5%"),
        color: '#888',
        fontSize: wp("4.5%")
    },
    input:{
        width: wp("50%"),
        paddingTop: hp("1%")
    }
});