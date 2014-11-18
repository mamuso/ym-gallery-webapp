import Ember from 'ember';

export default Ember.Component.extend({
  thumbUrl: function () {
    var value = this.get("value"),
        folder = this.get("folder"),
        id = this.get("project_id"),
        route = "",
        value = value.split("."),
        ext = value.pop(),
        file = value.join(".")+"_."+ext;

    if(id === folder) {
      route = "/assets/projects/"+id+"/"+file;
    } else {
      route = "/assets/projects/"+id+"/"+folder+"/"+file;
    }
    return route;
  }.property( 'value' , 'folder' )
});
