/*
Fruit
*/
Fruit = function(_config){
  var _config = _config || {};
  this.name = _config.name;
  this.prefix = function(){
    return "Child:Type is Fruit and ";
  }
  this.show=function(_name){
    return "Fruit: "+_name;
  }
  this.getDesc = function(){
    return "some description for "+this.name;
  }
}
