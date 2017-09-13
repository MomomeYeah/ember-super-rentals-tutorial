import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        // interact with the Ember Data store - injected into all components.
        // this calls /api/rentals - presumably because we're on the rentals
        // route and set `api` as the application namespace?
        // 'rental' here refers to the 'rental' model
        return this.get('store').findAll('rental');
    }
});
