import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, Image, AsyncStorage, TouchableHighlight } from 'react-native'

export default class NewDay extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
		}
	}
	componentDidMount(){
		const days = [];
		const workoutName = this.props.navigation.state.params.workoutName;
		AsyncStorage.getItem(workoutName)
		.then((value)=>{
			const obj = JSON.parse(value);
			let total = Number(obj.totalDays);
			for(let i = 0; i<total; i++){
				days.push({
					title: "Day "+String(i + 1),
					key: workoutName+"@Day"+String(i + 1),
					value: (i+1),
				});
			}
			this.setState({data: days});
		});
	}
	render(){
	const {navigation} = this.props;
	const workoutName = this.props.navigation.state.params.workoutName;
	return (
		<View style = {styles.container}>
			<Text style={styles.container}>Routine: {workoutName}</Text>
			<TouchableHighlight onPress = { () => {
				AsyncStorage.getItem(workoutName)
				.then((routineObj) => {
					const routine = JSON.parse(routineObj);
					if(Number(routine.totalDays)>9){
						alert("Maximum limit of days (10) has been reached");
					}
					else{
						AsyncStorage.setItem(workoutName+"@Day"+String(Number(routine.totalDays)+1), JSON.stringify({
							name:  "Day "+String(routine.totalDays + 1),
							workouts: [],
							totalWorkouts: 0,
						}));
						AsyncStorage.setItem(workoutName,JSON.stringify({
							name: workoutName,
							totalDays: Number(routine.totalDays)+1,
							currDay: routine.currDay,
						}));
						navigation.navigate('AddNewWorkout', {
							key: workoutName+"@Day"+String(Number(routine.totalDays) + 1),
							dayNum: Number(routine.totalDays) + 1,
						});
					}
				});
			}}>
			<Image style = {{ height: 100, width: 100}} source = {require('./../assets/images/add.png')} />
			</TouchableHighlight>
			<FlatList
				style={{marginTop: 10, backgroundColor: "white", paddingBottom: 40, marginBottom: 150}}
				data= {this.state.data}
				renderItem={({item, separators}) => (
				<TouchableHighlight
					onPress={() => {
						navigation.navigate('AddNewWorkout', {
							key: item.key,
							dayNum: item.value,
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
   flatlistStyle: {
   	  justifyContent: 'center',
   	  padding: 20,
   	  fontSize: 40,
   	  backgroundColor: '#d8d2d2',
   	  borderColor: '#847f7f',
      borderWidth: 1,
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#2b2b2b',
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