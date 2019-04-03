/*
 * @description This component generates the dice rolling tool
 * @author Ashley Cheah
 */

import React from 'react';
import ToolBase from '../ToolBase';
import styles from './styles.less';


import {
	Button,
	ButtonGroup,
	InputGroup,
	Popover,	
} from '@blueprintjs/core';
 
export default class diceroller extends ToolBase{
	constructor(props){
		super(props);
		this.state = {
			min: 1,
			max: 20,
			number: 1,
			timesRolled: 1,
			textInputValue: '1d20',
		};
	} 

	componentDidMount() { /*setting the generated number each time*/
		this.generateNumber();
	
	}
	
	/*generate the number*/ 
	generateNumber = () => this.setState(
		previousState => {
			let number = 0;
			for(let i = 0; i < previousState.timesRolled; i++)
			{
				number += Math.floor(Math.random()*(previousState.max)+1);
			}
			return{
				number,
			};
		}
	);
	
	onTextInputChange = (event) => 	
	{ 
		const splitText = event.target.value.split('d'); //splits into number of times rolled and max number
		const times =  parseInt(splitText[0]);
		const maxNum = parseInt(splitText[1]);
		if(isNaN(times) == false && isNaN(maxNum) == false)
		{		
			this.setState({ textInputValue: event.target.value, 
				timesRolled: times,
				max: maxNum, 
			});
		}		
	};
		

	render() {
		const {
			textInputValue, 
		} = this.state;

		return(
			<div> 
				<h1 className={styles.h1}> Dice Roller </h1>
				<div className={styles.dice} id = "outputContainer"> 
					<p>{ this.state.number }</p>
				</div> 
				<ButtonGroup alignment="center">
					<Button intent="primary" textAlignment="center" onClick={this.generateNumber}>
						Roll
					</Button>
					
					<Popover modifiers={{ arrow: false }}>
						<Button icon="caret-down" intent="primary"/>
						<InputGroup 
							placeholder="ex: 2d8" 
							value={textInputValue} 
							pattern="d1" 
							onChange={this.onTextInputChange}
							autofocus
						/> 
					</Popover>
				</ButtonGroup>
			</div>
		);
	}
}