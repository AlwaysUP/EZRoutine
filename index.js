import { AppRegistry } from 'react-native';
import Main from './components/Main';
import NewWorkout from './components/NewWorkout';
import NewDay from './components/NewDay';
import Workout from './components/Workout';
import StartWorkout from './components/StartWorkout';
import NewRoutine from './components/NewRoutine';
import AddNewWorkout from './components/AddNewWorkout';
import {  StackNavigator} from 'react-navigation';

AppRegistry.registerComponent('EZRoutine', () => App);

const App = StackNavigator(
{
	'Main': 
	{
		screen: Main,
		navigationOptions: {
            headerTitle: 'Home',
		},
	},
    'NewWorkout':
    {
    	screen: NewWorkout,
    	navigationOptions: {
            headerTitle: 'Edit Day',
		},
    },
    'AddNewWorkout':
    {
    	screen: AddNewWorkout,
    	navigationOptions: {
            headerTitle: 'Edit Workout',
		},
    },
    'NewRoutine':
    {
    	screen: NewRoutine,
    	navigationOptions: {
    		headerTitle: 'Add Routine',
    	},
    },
    'NewDay':
    {
    	screen: NewDay,
    	navigationOptions: {
            headerTitle: 'Edit Routine',
		},
    },
    'StartWorkout':
    {
    	screen: StartWorkout,
    	navigationOptions: {
            headerTitle: 'Start Workout',
		},
    },
    'Workout':
    {
    	screen: Workout,
    	navigationOptions: {
            headerTitle: 'Workout',
		},
    },
});