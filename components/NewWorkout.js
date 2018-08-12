import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, FlatList, StyleSheet, Image, AsyncStorage, TouchableHighlight } from 'react-native'

function isValid(str){
 return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}

export default class NewWorkout extends React.Component {
   state = {
      name: '',
      sets: '',
      reps: '',
      breakTime: '',
      key: '',
      workouts: [],
   };
	componentDidMount(){
		const accessKey = this.props.navigation.state.params.key;
		AsyncStorage.getItem(accessKey)
		.then((value)=>{
			const obj = JSON.parse(value);
			this.setState({
				key: accessKey,
				workouts: obj.workouts,
			});
		});
		alert(this.state.key);
	}
   handleName = (text) => {
      this.setState({ name: text })
   };
   handleSets = (text) => {
      this.setState({ sets: text })
   };
   handleReps = (text) => {
      this.setState({ reps: text })
   };
   handleBreak = (text) => {
      this.setState({ breakTime: text })
   };
   addWorkout = (name, sets, reps, breakTime) => {
   		if(isValid(name)){
   			if(name == '' || reps == '' || sets == '' || breakTime == '' || isNaN(reps) || isNaN(sets) || isNaN(breakTime) ){
	   			alert('Please check the input values');
	   		}
	   		else{
	   			const workouts = this.state.workouts;
	   			workouts.push({
	   				name: name,
	   				sets: sets,
	   				reps: reps,
	   				breakTime: breakTime,
	   			});
	   			AsyncStorage.getItem(this.state.key)
	   			.then((dayObj) => {
	   				const day = JSON.parse(dayObj);
	   				AsyncStorage.setItem(this.state.key, JSON.stringify({
	   					name: day.name,
	   					workouts: workouts,
	   					totalWorkouts: Number(day.totalWorkouts)+1,
	   				}));
	   			});
	   		}
   		}
   		else{
   			alert("Invalid character in name");
   		}
   };
   render(){
   		const {navigation }= this.props;
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Name"
               placeholderTextColor = "#a09f9f"
               autoCapitalize = "none"
               onChangeText = {this.handleName}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Sets"
               placeholderTextColor = "#a09f9f"
               autoCapitalize = "none"
               onChangeText = {this.handleSets}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Reps"
               placeholderTextColor = "#a09f9f"
               autoCapitalize = "none"
               onChangeText = {this.handleReps}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Break Time"
               placeholderTextColor = "#a09f9f"
               autoCapitalize = "none"
               onChangeText = {this.handleBreak}/>

            <Button
			  onPress= {() => {
			  	this.addWorkout(this.state.name, this.state.sets, this.state.reps, this.state.breakTime);
			  	navigation.navigate('Main');
			  }}
			  title="Submit"
			  color="#841584"
			  accessibilityLabel="Submit workout component"
			/>
			<Text> 

			</Text>
			<Text> 

			</Text>
			<Text> 

			</Text>
			<Button
			  onPress= {() => {
			  	AsyncStorage.getItem(this.state.key)
	   			.then((dayObj) => {
	   				const day = JSON.parse(dayObj);
	   				const workouts = day.workouts;
	   				workouts.push({
	   					name: "rest",
	   					sets: 0,
	   					reps: 0,
	   					breakTime: 0,
	   				});
	   				AsyncStorage.setItem(this.state.key, JSON.stringify({
	   					name: day.name,
	   					workouts: workouts,
	   					totalWorkouts: Number(day.totalWorkouts)+1,
	   				}));
	   			});
			  	navigation.navigate('Main');
			  }}
			  title="Rest Day"
			  color="#841584"
			  accessibilityLabel="Submit workout component"
			/>
			<Button
			  onPress= {() => {
			  	navigation.navigate('Main');
			  }}
			  title="Cancel"
			  color="#841584"
			  accessibilityLabel="Submit workout component"
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