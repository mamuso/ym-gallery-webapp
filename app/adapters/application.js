import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  buildURL: function(type, id) {
    var url = Ember.String.pluralize(type);
    if (id) {
        url += '/' + id + '/yamproject';
    }
    url += '.json';
    return url;
  }
});
