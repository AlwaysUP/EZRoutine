import React, { Component } from 'react'
import { View, Text, Button, FlatList, TouchableHighlight, TouchableOpacity, TextInput, StyleSheet, Image, AsyncStorage } from 'react-native'

export default class Workout extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			names: [],
			data: [],
		}
	}
	componentDidMount(){
		const defaultList = [];
		AsyncStorage.getItem('App@Names')
		.then((namesObj) =>{
			const names = JSON.parse(namesObj);
			for (let i=0; i<names.length; i++){
				defaultList.push({
					title: names[i],
					key: i,
				});
			}
			this.setState({
				data: defaultList,
				names: names,
			});
		});
	}
    render(){
    	const {navigation} = this.props;
      return (
      	<View>
      		<FlatList
      			style={{marginTop: 10, backgroundColor: "white", paddingBottom: 40, marginBottom: 150}}
				data= {this.state.data}
				renderItem={({item, separators}) => (
				<TouchableHighlight
					onPress={() => {
						AsyncStorage.getItem(item.title)
						.then((routineObj)=>{
							const routine = JSON.parse(routineObj);
							if (routine.currDay < (routine.totalDays)){
								AsyncStorage.getItem(routine.name+"@Day"+Number(routine.currDay+1))
								.then((value)=>{
									const day = JSON.parse(value);
									navigation.navigate('StartWorkout', {
										workoutName: routine.name,
										workouts: day.workouts,
										set: 0,
										workoutNum: 0,
									});
								});
							}
							else{
								AsyncStorage.getItem(routine.name+"@Day1")
								.then((value)=>{
									const day = JSON.parse(value);
									navigation.navigate('StartWorkout', {
										workoutName: routine.name,
										workouts: day.workouts,
										set: 0,
										workoutNum: 0,
									});
								});	
							}
						});
					}}
					onShowUnderlay={separators.highlight}
					onHideUnderlay={separators.unhighlight}>
					<View style={{backgroundColor: 'white'}}>
						<Text style={styles.flatlistStyle}>{item.title}</Text>
					</View>
				</TouchableHighlight>
				)}
			/>
      	</View>
      );
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
   flatlistStyle: {
   	  justifyContent: 'center',
   	  padding: 20,
   	  fontSize: 40,
   	  backgroundColor: '#d8d2d2',
   	  borderColor: '#847f7f',
      borderWidth: 1,
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