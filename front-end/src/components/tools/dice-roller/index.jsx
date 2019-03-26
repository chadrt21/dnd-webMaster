/*
 * @description This component generates the dice rolling tool
 * @author Ashley Cheah
 */

import React from 'react';
import ToolBase from '../ToolBase';
import styles from './styles.less';
//<Component className={styles.yourClassName} />

import {
	Alignment,
	Button,
	ButtonGroup,	
} from '@blueprintjs/core';


 
export default class diceroller extends ToolBase{
	constructor(props){
		super(props);
		this.state = {
			min: 1,
			max: 20,
			number: 1,
		};
	} 

	componentDidMount() { /*setting the generated number each time*/
		this.generateNumber();
	}
	/* max Change */
	maxChange = (n) => { 
		this.setState({ 
			max: n,
		},
		this.generateNumber(), 
		);
		
	}

	/*generate the number*/ 
	generateNumber = () => this.setState(previousState => ({ number: Math.floor(Math.random()*(previousState.max)+1) }));

	render() {
		return(
			<div className = "diceRoller"> 
				<h1 className={styles.h1}> Dice Roller </h1>
				<div className="dice-button-group">
					<button type="button" className="rollButton" onClick={ () => this.maxChange(4) }>
						Roll
					</button>
					<button type="button" className="icon-caret-down"  onClick={ () => this.maxChange(6) }>
						caret here
					</button>
				</div>
				<div className={styles.dice} id = "outputContainer"> 
					<p id="rNum">{ this.state.number }</p>
				</div> 
			</div>
		);
	}
}