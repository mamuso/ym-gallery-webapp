import Ember from 'ember';

export default Ember.Controller.extend({
  img: null,
  actions: {
    open: function(img) {
      console.log(img);
      Ember.$("#overlay-img").attr("src", img);
      Ember.$("#overlay").removeClass("hide");
      Ember.$("body").addClass("freeze");
      return false;
    },
    close: function() {
      Ember.$("#overlay-img").attr("src", null);
      Ember.$("#overlay").addClass("hide");
      Ember.$("body").removeClass("freeze");
      return false;
    }

  }
});
