import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, AsyncStorage, Button } from 'react-native'

function isValid(str){
 return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}
export default class NewRoutine extends React.Component {
   state = {
      name : '',
   };
   handleName = (text) => {      
      this.setState({name: text});
   }
   render(){
   	const {navigation} = this.props;
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Name"
               placeholderTextColor = "#a09f9f"
               autoCapitalize = "none"
               onChangeText = {this.handleName}/>
	      <Button
			  onPress= { () => {
               if (this.state.name !== '' && isValid(this.state.name)) {
                  AsyncStorage.getItem(this.state.name)
                  .then( (item) => {
                     if(item){
                        alert("Name already exists");
                     }
                     else{
                        alert("Routine "+this.state.name+" has been added!");
                        AsyncStorage.setItem(this.state.name, JSON.stringify({
                           name: this.state.name,
                           totalDays: 0,
                           currDay: 0,
                        }));
                        AsyncStorage.getItem('App@Names')
                        .then((namesObj)=>{
                           const names = JSON.parse(namesObj);
                           if(names === null){
                              AsyncStorage.setItem('App@Names', JSON.stringify(
                                 [this.state.name]
                              ));
                           }
                           else{
                              names.push(this.state.name);
                              AsyncStorage.setItem('App@Names', JSON.stringify(names));
                           }
                        });
                     }
                  });
                  navigation.navigate('NewDay', {
                     workoutName: this.state.name,
                  });
               }
               else{
                  alert("Error with name!");
               }
           }}
			  title="Add Routine"
			  color="#000080"
			  accessibilityLabel="Start adding routine"
			/>
         </View>
      )
   }
}


const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#2b2b2b',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#2b2b2b',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
});