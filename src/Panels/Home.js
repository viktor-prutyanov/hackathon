import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, ListItem, PanelHeader, Button, Div } from '@vkontakte/vkui';
import Map from '../Components/Map';
import './Home.css';

const Home = (props) => (
	<Panel id={props.id}>
		<PanelHeader>Artists Nearby</PanelHeader>

		<Div className='map'>
            <h2>{ props.user }</h2>
			<Map geodata={props.geodata} photo100="" setSelectedPlace={props.setSelectedPlace}/>
		</Div>

		<Group>
			<ListItem>
				<Button size='l' stretched onClick={props.payFunc} >Pay</Button>
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
    user: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
	}),
	payFunc: PropTypes.func.isRequired,
    setSelectedPlace: PropTypes.func.isRequired,
};

export default Home;
