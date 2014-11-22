import Ember from 'ember';

export default Ember.Component.extend({
  thumbUrl: function () {
    var value = this.get("value"),
        folder = this.get("folder"),
        id = this.get("project_id"),
        spvalue = value.split("."),
        ext = spvalue.pop(),
        file = spvalue.join(".")+"_yamthumbnail."+ext,
        route = this.getURL(file, folder, id);
    return route;
  }.property( 'value' , 'folder' ),

  bigUrl: function () {
    var file = this.get("value"),
        folder = this.get("folder"),
        id = this.get("project_id"),
        route = this.getURL(file, folder, id);

    return route;
  }.property( 'value' , 'folder' ),

  getURL: function(file, folder, id) {
    var route = "";
    if(id === folder) {
      route = "assets/projects/"+id+"/"+file;
    } else {
      route = "assets/projects/"+id+"/"+folder+"/"+file;
    }
    return route;
  },

  actions: {
    open: function(bigUrl) {
      this.sendAction('open', bigUrl);
    }
  }
});
