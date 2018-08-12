import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, Image, AsyncStorage, TouchableHighlight } from 'react-native'

export default class AddNewWorkout extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
			accessKey: '',
			dayNumber: 0,
		}
	}
	componentDidMount(){
		const workouts = [];
		const dayNum = this.props.navigation.state.params.dayNum;
		const key = this.props.navigation.state.params.key;
		AsyncStorage.getItem(key)
		.then((value)=>{
			const obj = JSON.parse(value);
			if (Number(obj.totalWorkouts) !== 0){
				for(let i =0; i<Number(obj.totalWorkouts); i++){
					workouts.push({
						title: obj.workouts[i].name,
						key: key,
						value: (i+1),
					});
				}
			}
			this.setState({
				accessKey: key,
				data: workouts,
				dayNumber: obj.name,
			});
		});
	}
	render(){
	const {navigation} = this.props;
	return (
		<View style = {styles.container}>
			<Text style={styles.container}>Day: {this.state.dayNumber}</Text>
			<TouchableHighlight onPress = { () => {
				AsyncStorage.getItem(this.state.accessKey)
				.then((dayObj) => {
					const day = JSON.parse(dayObj);
					if(Number(day.totalWorkouts)>49){
						alert("Maximum limit of days (50) has been reached");
					}
					else{
						alert("New Workout is going to be added");
						navigation.navigate('NewWorkout', {
							key: this.state.accessKey,
							workoutNum: Number(day.totalWorkouts) + 1,
						});
					}
				});
			}}>
			<Image style = {{ height: 100, width: 100, }} source = {require('./../assets/images/add.png')} />
			</TouchableHighlight>
			<FlatList
				style={{marginTop: 10, backgroundColor: "white", paddingBottom: 40, marginBottom: 150}}
				data= {this.state.data}
				renderItem={({item, separators}) => (
				<TouchableHighlight
					onPress={() => {
						navigation.navigate('NewWorkout', {
							key: item.key,
							workoutNum: item.value,
						});
					}}
					onShowUnderlay={separators.highlight}
					onHideUnderlay={separators.unhighlight}>
					<View style={{backgroundColor: 'white'}}>
						<Text style = {styles.flatlistStyle}>{item.title}</Text>
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
      borderWidth: 1,
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