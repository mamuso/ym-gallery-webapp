import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  buildURL: function(type, id) {
    var url = 'assets/'+Ember.String.pluralize(type);
    if (id) {
        url += '/'+id+'/yamproject';
    } else {
      url += '/'+Ember.String.pluralize(type);
    }
    url += '.json';
    return url;
  }
});
