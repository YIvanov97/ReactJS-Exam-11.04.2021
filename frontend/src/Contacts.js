import React from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import './styles/contacts.scss'

class Contacts extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  onMarkerClick = (props, marker, e) =>
    this.setState ({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState ({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render () {
    return (
      <div className="about--Container">
        <h1>Contacts</h1>
          <div className="google--Map">
            <Map
              google={this.props.google}
              zoom={14}
              style={{
                height: 400,
                width: 600,
                display: 'flex',
                justifyContent: 'center',
                margin: 'auto',
                borderRadius: 20,
              }}
              initialCenter={{
                lat: 42.697708,
                lng: 23.321867,
              }}
            >
              <Marker
                onClick={this.onMarkerClick}
                name={'We are waiting for you!'}
              />
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
              >
                <div>
                  <h4>{this.state.selectedPlace.name}</h4>
                </div>
              </InfoWindow>
            </Map>
        </div>
        <div className="contactUs--Container">
            <div className="info--Container">
                <h3>Adress:</h3>
                <p>st. Tsar Simeon 30</p>
            </div>
            <div className="info--Container">
                <h3>Email:</h3>
                <p>newan.technologies@info.com</p>
            </div>
            <div className="info--Container">
                <h3>Phone:</h3>
                <p>+359883965215</p>
            </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA9NupwjQhFETx-c8xvqe_WdhTqYuBMQM4'
  })(Contacts);