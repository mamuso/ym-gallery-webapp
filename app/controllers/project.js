import Ember from 'ember';

export default Ember.Controller.extend({
  img: null,
  actions: {
    open: function(img) {
      $("#overlay-img").attr("src", img);
      $("#overlay").removeClass("hide");
      $("body").addClass("freeze");
      return false;
    },
    close: function() {
      $("#overlay-img").attr("src", null);
      $("#overlay").addClass("hide");
      $("body").removeClass("freeze");
      return false;
    }

  }
});
