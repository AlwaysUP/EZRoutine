import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, FlatList, StyleSheet, Image, AsyncStorage, TouchableHighlight } from 'react-native'

export default class StartWorkout extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			workouts: [],
			workoutName: '',
			data: [],
			sets: [],
		}
	}
	componentDidMount(){
		const workouts = this.props.navigation.state.params.workouts;
		const workoutName = this.props.navigation.state.params.workoutName;
		const tempData = [];
		const setList = [];
		for(let i=0;i<workouts.length; i++){
			tempData.push({
				title: workouts[i].name,
				key: i,
				reps: workouts[i].reps,
				breakTime: workouts[i].breakTime,
			});
			setList.push(Number(workouts[i].sets));
		}
		this.setState({
			workouts:workouts,
			workoutName: workoutName,
			data: tempData,
			sets: setList,
		});		
	}
    render(){
    	const {navigation} = this.props;
    	return (
      	<View>
      		<Text style = {styles.flatlistStyle}>{this.state.workoutName}</Text>
      		<Button
				onPress= { () => {
					AsyncStorage.getItem(this.state.workoutName)
			  		.then((valueObj)=>{
			  			const value = JSON.parse(valueObj);
			  			const val = (Number(value.currDay) < Number(value.totalDays-1)) ? Number(value.currDay)+1 : 0;
			  			AsyncStorage.setItem(this.state.workoutName, JSON.stringify({
				  			name: value.name,
				  			totalDays: value.totalDays,
				  			currDay: val,
				  		}));
			  		});
					navigation.navigate('Main');
				}}
				title="Done"
				color="#000080"
				accessibilityLabel="Finish Workout"
			/>
      		<FlatList
      			style={{marginTop: 10, backgroundColor: "white", paddingBottom: 40, marginBottom: 150}}
				data= {this.state.data}
				renderItem={({item, separators}) => (
				<TouchableHighlight
					onPress={() => {
						const tempSets = this.state.sets;
						tempSets[item.key] = tempSets[item.key] -1;
						this.setState({
							sets: tempSets,
						});
					}}
					onShowUnderlay={separators.highlight}
					onHideUnderlay={separators.unhighlight}>
					<View style={{backgroundColor: 'white', }}>
						<Text style={styles.flatlistStyle}>{item.title}{"\n"}Sets: {this.state.sets[item.key]}{"\t"}Reps: {item.reps}</Text>
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
   	  fontSize: 30,
   	  backgroundColor: '#d8d2d2',
   	  borderColor: '#847f7f',
      borderWidth: 1,
   },
   submitButton: {
      paddingTop: 50,
      paddingBottom: 50,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
});