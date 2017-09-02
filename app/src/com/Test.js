/**
 * Class Test
 */
Test = function(_config){
    var _config = _config || {};
    this.name = _config.name ||"Some Name";
    this.logName = function(uid){
        console.log(uid, _instance.name);
    }
    this.sayCheese = function(uid){
        console.log("Cheese:"+uid);
    }
    this.onHover = function(msg){
        console.log("On Hover:"+msg);
    }
    this.__setTemplate([
        {
            div: {
                "childs": [
                    {"#text": "{{:name}}"}
                ]
            }
        },
        {
            input: {
                prop:{
                    type:"button",
                    value:"log Name",
                    onclick:{
                        fn: "logName",
                        arg: ["{{__UID}}"]
                    },
                    onmouseover: {
                        fn: "onHover",
                        arg: ["log Name"]
                    }
                }
            }
        },
        {
            input: {
                prop:{
                    type:"button",
                    value:"Say Cheese",
                    onclick:{
                        fn: "sayCheese",
                        arg: ["{{__UID}}"]
                    },
                    onmouseover: {
                        fn: "onHover",
                        arg: ["Say Cheese"]
                    }
                }
            }
        }
    ]);
    this.show = function (_name){
        console.log(this.name);
    }
    this.showAgain = (_name)=>{console.log(this.name);};
}