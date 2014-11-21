import Ember from 'ember';

export default Ember.Controller.extend({
  img: null,
  hide: true,
  freeze: false,
  actions: {
    open: function(img) {
      this.set('hide', false); 
      this.set('freeze', true); 
      this.set('img', img); 
    },
    close: function() {
      this.set('hide', true); 
      this.set('freeze', false); 
    }

  }
});
