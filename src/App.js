import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import Home from './Panels/Home';
import '@vkontakte/vkui/dist/vkui.css';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fetchedUser: null,
			geodata: null,
            selectedId: null,
			payment: null,
		};
	}

	componentDidMount() {
		connect.subscribe((e) => {
			if (e.detail.hasOwnProperty('type')) {
				switch (e.detail.type) {
					case 'VKWebAppGetUserInfoResult':
						this.setState({ fetchedUser: e.detail.data });
						break;
					case 'VKWebAppGeodataResult':
						this.setState({
							geodata: {
								lat: e.detail.data.lat,
								lng: e.detail.data.long
							}
						});
						break;
					default:
						break;
				}
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
		connect.send('VKWebAppGetGeodata', {});
	}

	payFunc = (e) => {
		var money = Number(this.payment)
		if (isNaN(money))
		{
			alert("Invalid payment");
		}
		else
		{
			console.log(money)
			console.log("Test payment!");
			connect.send("VKWebAppOpenPayForm", {"app_id": 6746789, "action": "pay-to-user", "params": {"amount": money,
				"description": "donat",
				"action": "pay-to-user",
				"user_id": this.selectedId}});
		}
	};

	payVal = (e) => {
		this.payment = e.target.value
	}

    setSelectedPlace = (selectedId) => {
        this.selectedId = selectedId;
        console.log(this.selectedId);
    }

	render() {
		return (
			<View activePanel='home'>
				<Home id="home" geodata={this.state.geodata} payFunc={this.payFunc} payVal={this.payVal} setSelectedPlace={this.setSelectedPlace} />
			</View>
		);
	}
}

export default App;
