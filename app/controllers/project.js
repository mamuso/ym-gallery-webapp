import Ember from 'ember';

export default Ember.Controller.extend({
  img: null,
  hide: true,
  actions: {
    open: function(img) {
      this.set('hide', false); 
      this.set('img', img); 
      Ember.$("body").addClass("freeze");
    },
    close: function() {
      this.set('hide', true); 
      Ember.$("body").removeClass("freeze");
    }

  }
});
