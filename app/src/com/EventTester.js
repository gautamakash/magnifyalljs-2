/**
 * EventTester
 */
EventTester = function(_config){
    var _config = _config || {};

    this.logGroup = function(){
        console.log("Grouped Clicked");
    }
    this.logChild1 = function(){
        console.log("logChild1 Clicked");
    }

    this.__setTemplate([
        {
            hr:{}
        },
        {
            div: {
                prop:{
                    id: "Event Group",
                    onclick: {
                        fn: "logGroup",
                        arg: []
                    }
                },
                childs: [
                    {"#text": "Event Group"},
                    {
                        div:{
                            prop:{
                                onclick: {
                                    fn: "logChild1",
                                    arg: []
                                }
                            },
                            childs:[
                                {"#text": "Child Level One"}
                            ]
                        }
                    },
                    {
                        div:{
                            childs:[
                                {"#text": "Just to check normal"}
                            ]
                        }
                    }
                ]
            }
        }
    ]);
}