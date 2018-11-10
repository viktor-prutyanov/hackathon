import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, ListItem, PanelHeader, Div, Input, Button } from '@vkontakte/vkui';
import Map from '../Components/Map';
import './Home.css';

const Home = (props) => (
	<Panel id={props.id}>
		<PanelHeader>Artists Nearby</PanelHeader>

		<Div className='map'>
			<Map geodata={props.geodata} setSelectedPlace={props.setSelectedPlace}/>
		</Div>

		<Group>
			<ListItem>
                <Div style={{display: 'flex'}}>
					<Input type="number" stretched onChange={props.payVal}></Input>
					<Button type="button" alignment="right" onClick={props.payFunc}> Pay </Button>
                </Div>
			</ListItem>
		</Group>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	geodata: PropTypes.shape({
		lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}),
	payFunc: PropTypes.func.isRequired,
    payVal: PropTypes.func.isRequired,
    setSelectedPlace: PropTypes.func.isRequired,
};

export default Home;
