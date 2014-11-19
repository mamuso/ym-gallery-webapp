import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
  actions: {
    open: function() {
      console.log("open-actions");
      this.render('modal', { into: 'application', outlet: 'modal' });
    },
    close: function() {
      this.render('nothing', { into: 'application', outlet: 'modal' });
    }
  }
});

Router.map(function() {
  this.resource('projects', { path: '/' }, function() { });
  this.resource('project', { path: 'projects/:project_id' }, function() { });
});

export default Router;
