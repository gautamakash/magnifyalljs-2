/*
FruitList
*/
FruitList = function(_config){
  this.import("com.Fruit");
  var _config = _config || {};
  this.fruits = [];
  this.fruits.push(new com.Fruit({name: "Apple"}));
  this.fruits.push(new com.Fruit({name: "Mango"}));
  this.show=function(_name){
    return "Name: "+_name;
  }
  this.prefix = function(){
    return "Type is Fruit and ";
  }
  this.__setTemplate([
    {"#text":"Fruit List"},
    {
      "#for":{
        data: "fruits",
        template:{
          div:{
            childs: [
              {"#text": "{{@root.prefix:name}}{{@root.show:name}} >> {{:desc}}"}
            ]
          }
        }
      }
    }
  ]);
}
