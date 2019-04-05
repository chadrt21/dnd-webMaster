import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Title from '../index';

configure({ adapter: new Adapter() });

describe(
	'TitleComponent',
	() => {
		it('should render the component', () => {
			const component = shallow(
				<Title>Here is the title</Title>
			);
			expect(component).toMatchSnapshot();
		})
	}
);
