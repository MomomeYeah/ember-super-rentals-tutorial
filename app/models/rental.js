import DS from 'ember-data';

// attributes can have types, e.g. DS.attr('string')
// relationships can be specified, e.g. DS.hasMany('<DS.model>')
export default DS.Model.extend({
    // what we've defined is a `record`, or an instance of a model
    title: DS.attr(),
    owner: DS.attr(),
    city: DS.attr(),
    propertyType: DS.attr(),
    image: DS.attr(),
    bedrooms: DS.attr(),
    description: DS.attr()
});
