import React, { Component } from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import DatePicker from 'react-native-datepicker'

export default class AddNoWorkDay extends Component{

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
                    if (values.start_date === '') {
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
                        ToastAndroid.show("Día no laboral agregado", ToastAndroid.SHORT);
                        {this.props.navigation.navigate('Home')}
                    }
                }}
            >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={{alignItems:'center'}}>
                <Text style={{ paddingTop:10, color: '#888', fontSize: 20}}>Día no laboral:</Text>
                <DatePicker
                    style={{width: '50%'}}
                    date={values.start_date}
                    placeholder="Día no laboral"
                    onDateChange={handleChange('start_date')}
                    mode="date"
                    format="YYYY-MM-DD"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: -40,
                        marginLeft: 0
                    }
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
        backgroundColor: '#F4EADE',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonSubmit: {
        marginTop:40,
        backgroundColor: '#d1625a',
        padding: 10,
        alignSelf:"center",
        borderRadius: 5
    }
});