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
		super.componentDidMount();
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
		const splitText = event.target.value.split(/d/i); //splits into number of times rolled and max number
		const times =  parseInt(splitText[0]);
		const maxNum = parseInt(splitText[1]);
		
		if(!isNaN(times) && !isNaN(maxNum))
		{		
			this.setState({ textInputValue: event.target.value, 
				timesRolled: times,
				max: maxNum, 
			});
		}
		else
		{
			this.setState({ textInputValue: event.target.value });
		}
				
	};
		

	render() {
		const {
			textInputValue, 
		} = this.state;

		return(
			<div> 
				<div className={styles.dice} id = "dice"> 
					<p>{ this.state.number }</p>
				</div> 
				<div className={styles.centered} id="centered">
					<ButtonGroup align="center">
						<Button align="center" intent="primary" textAlignment="center" onClick={this.generateNumber}>
						Roll {this.state.timesRolled}d{this.state.max}
						</Button>
						<Popover modifiers={{ arrow: false }}>
							<Button icon="caret-down" intent="primary"/>
							<InputGroup 
								placeholder="ex: 2d8" 
								value={textInputValue} 
								pattern="d1" 
								onChange={this.onTextInputChange}
								autoFocus
							/> 
						</Popover>
					</ButtonGroup>
				</div>
			</div>
		);
	}
}