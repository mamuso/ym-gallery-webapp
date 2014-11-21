import Ember from 'ember';

export default Ember.Component.extend({
  thumbUrl: function () {
    var value = this.get("value"),
        folder = this.get("folder"),
        id = this.get("project_id"),
        route = "",
        spvalue = value.split("."),
        ext = spvalue.pop(),
        file = spvalue.join(".")+"_yamthumbnail."+ext;

    if(id === folder) {
      route = "assets/projects/"+id+"/"+file;
    } else {
      route = "assets/projects/"+id+"/"+folder+"/"+file;
    }
    return route;
  }.property( 'value' , 'folder' ),
  bigUrl: function () {
    var file = this.get("value"),
        folder = this.get("folder"),
        id = this.get("project_id"),
        route = "";

    if(id === folder) {
      route = "assets/projects/"+id+"/"+file;
    } else {
      route = "assets/projects/"+id+"/"+folder+"/"+file;
    }
    return route;
  }.property( 'value' , 'folder' ),
  actions: {
    open: function() {
      this.sendAction('open', this.get('bigUrl'));
    }
  }
});
