import React, { Component } from 'react';

export default class GoogleApiComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false
		}
	}

	componentDidMount() {
		if (!window.google) {
			this.addGoogleApi();
		} else {
			this.loadedGoogleApi();
		}
	}

	addGoogleApi() {
		const { apiKey } = this.props;
		const tag = document.createElement('script');
		tag.type = 'text/javascript';
		tag.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=visualization&callback=_onGoogleMapLoaded`;
		window._onGoogleMapLoaded = () => {
			delete window._onGoogleMapLoaded;
			this.loadedGoogleApi();
			if (this.props.onLoaded) {
				this.props.onLoaded();
			}
		}
		document.body.append(tag);
	}

	loadedGoogleApi() {
		this.setState({
			loaded: true
		});
	}

	render() {
		const { loaded } = this.state;
		if (!loaded) {
			return (
				<div>
					Loading...
				</div>
			)
		}
		const { children } = this.props;
		const { google } = window;
		return React.cloneElement(children, { google });
	}
}
