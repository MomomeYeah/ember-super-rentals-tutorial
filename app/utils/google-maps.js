import Ember from 'ember';

const google = window.google;

// for now, Google Maps API is not required.  If that changes, run ember server
// with GOOGLE_MAPS_API_KEY environment variable set to an appropriate key
export default Ember.Object.extend({

    init() {
        this.set('geocoder', new google.maps.Geocoder());
    },

    createMap(element, location) {
        let map = new google.maps.Map(element, { scrollwheel: false, zoom: 10 });
        this.pinLocation(location, map);
        return map;
    },

    pinLocation(location, map) {
        this.get('geocoder').geocode({address: location}, (result, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                let geometry = result[0].geometry.location;
                let position = { lat: geometry.lat(), lng: geometry.lng() };
                map.setCenter(position);
                new google.maps.Marker({ position, map, title: location });
            }
        });
    }

});
