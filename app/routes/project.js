import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('project', params.project_id);
  },
  setupController: function( controller, model ){
    this._super( controller, model );
    model.reload();
    controller.set('model', model);
    Ember.$(document).attr('title', model.get('title')+' — Design Projects');
    controller.ziplink = "/assets/projects/"+model.get('id')+"/"+model.get('id')+".zip";
  }
});
