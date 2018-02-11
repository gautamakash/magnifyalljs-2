/**
 * JonsLoop
 */
JsonLoop = function(){
    var _config = _config || {};
    this.list = {
        "x001": {name: "Xman-01"},        
        "x002": {name: "Xman-02"}
    }
    //this.list = [{name:"array-01"},{name:"array-02"}];

    this.__setTemplate([
        {
            div:{
                prop:{
                    class: "loop_class"
                },
                childs:[
                    {
                        "#for":{
                            data: "list",
                            template: { 
                                div: {
                                    childs:[
                                        {"#text": "{{:@index}} : {{:name}}"}
                                    ]
                                }
                            }
                        }
                    }
                ]
            }
        }
    ]);
}