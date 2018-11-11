import React from 'react';
import PropTypes from 'prop-types';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
//import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';
import './Map.css';

const mapStyles = {
	width: '100%',
	height: '480px'
};

const defaultPlace = {
	lat: 59.8978149,
	lng: 30.4054358
}

export class MapContainer extends React.Component {
	state = {
		activeMarker: {},
		selectedPlace: {},
		showingInfoWindow: false,
		places: [],
	};
	
	onMarkerClick = (props, marker) => {
		this.setState({
			activeMarker: marker,
			selectedPlace: props,
			showingInfoWindow: true
		});
        this.props.setSelectedPlace(Number(marker.title));
	}
	
	onInfoWindowClose = () =>
		this.setState({
			activeMarker: null,
			showingInfoWindow: false
		});

	update = () => {
		var xhr = new XMLHttpRequest();
		var url = "http://172.20.36.209/load";
		//var url = "https://615230d9.ngrok.io/load";
		xhr.open("GET", url, true);
		xhr.onreadystatechange = this.f1;
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				console.log(JSON.parse(xhr.responseText)[0]);
				console.log(this)
				this.setState({ places: JSON.parse(xhr.responseText)});
				this.render()
			}
		};
		xhr.send();
	}

	onMapClicked = () => {
		if (this.state.showingInfoWindow) {
			this.setState({
				activeMarker: null,
				showingInfoWindow: false
			});
		}
	};

	onMapReady = () => this.update();

	renderPlace = (place) =>
		<Marker
			title={String(place.user_id)}
			name={place.name}
			onClick={this.onMarkerClick}
			position={{ lat: place.lat, lng: place.lng }}
			icon={{url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}}
		/>

	render() {
		const position = this.props.geodata ? this.props.geodata : defaultPlace;
		return (
			<Map
				google={this.props.google}
				zoom={14}
				onReady={this.onMapReady}
				style={mapStyles}
				initialCenter={position}
			>

				<Marker
					position={{ ...position }}
				/>
				{this.state.places && this.state.places.map(place => this.renderPlace(place))}

				<InfoWindow
					marker={this.state.activeMarker}
					onClose={this.onInfoWindowClose}
					visible={this.state.showingInfoWindow}>
					<div className='InfoWindow'>
						<div className='InfoWindow__pic'>
							<img src={this.state.selectedPlace.pic} alt=""/>
						</div>
						<div className='InfoWindow__text'>
							<h3>{this.state.selectedPlace.name}</h3>
						</div>
					</div>
				</InfoWindow>
			</Map>
		);
	}
}

MapContainer.propTypes = {
	geodata: PropTypes.shape({
		lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}),
    setSelectedPlace: PropTypes.func.isRequired,
};

export default GoogleApiWrapper({
	apiKey: 'AIzaSyCkRQRctgbtGaGx0QRrXvxiijAd_1HLJ7U'
})(MapContainer);
