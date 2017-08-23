/**
 * Class Test
 */
Test = function(_config){
    this.name = "Some Name";
    this.__setTemplate([
        {
            div: {
                "childs": [
                    {"#text": "{{:name}}"}
                ]
            }
        }
    ]);
    this.show = function (_name){
        console.log(this.name);
    }
    this.showAgain = (_name)=>{console.log(this.name);};
}