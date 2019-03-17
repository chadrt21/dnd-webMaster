/** 
 * You can store that in state

So when your making your dice roller, you need to ask two questions (it helps to pretend to be the component):
1. What do I need to know about myself to render?
2. What do I need to know about my context to render?
So the dice roller would need to know three things in order to render
1. The number of dice rolling
2. The number of sides on said dice
3. The result of the last roll
It doesn't need to know anything about it's context and can store all of that in state
*/

import React from 'react';
import ToolBase from '../ToolBase';
//import Button from '@blueprintjs/core';
import styles from './styles.less';
//<Component className={styles.yourClassName} />


const h1 = () => (
	<div className={styles.h1}>My Header Text</div>
);
 
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
				<div id = "buttonClick">
					<button id="generate" onClick={ () => this.maxChange(4) }>
						Roll a d4
					</button>
					<button id="generate" onClick={ () => this.maxChange(6) }>
						Roll a d6
					</button>
					<button id="generate" onClick={ () => this.maxChange(8) }>
						Roll a d8
					</button>
					<button id="generate" onClick={ () => this.maxChange(10) }>
						Roll a d10
					</button>
					<button id="generate20" onClick={ () => this.maxChange(12) }>
						Roll a d12
					</button>
					<button id="generate20" onClick={ () => this.maxChange(20) }>
						Roll a d20
					</button>
					<button id="generate" onClick={ () => this.maxChange(100) }>
						Roll a d100
					</button>
				</div>
				<div id = "outputContainer"> 
					<p id="rNum">{ this.state.number }</p>
				</div> 
			</div>
		);
	}
}