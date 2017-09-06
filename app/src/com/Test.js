/**
 * Class Test
 */
Test = function(_config){
    var _config = _config || {};
    this.ele = {
        log: false,
        cheese: false
    };
    this.name = _config.name ||"Some Name";
    this.logName = function(uid){
        _instance.ele.log.classList.add('loading');
        console.log(uid, _instance.name);
    }
    this.sayCheese = function(uid){
        _instance.ele.cheese.classList.add('loading');
        console.log("Cheese:"+uid);
    }
    this.onHover = function(msg){
        _instance.ele.log.classList.remove('loading');
        _instance.ele.cheese.classList.remove('loading');
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
                    id: "log_{{:__UID}}",
                    type:"button",
                    value:"log Name",
                    class: "button primary_bt",
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
                    id: "cheese_{{:__UID}}",
                    type:"button",
                    value:"Say Cheese",
                    class: "button secendary_bt",
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
    this.__afterRender = function(){
        _instance.ele.log = _instance.__queryChildElements("#log_"+_instance.__UID)[0];
        _instance.ele.cheese = _instance.__queryChildElements("#cheese_"+_instance.__UID)[0];
    }
}