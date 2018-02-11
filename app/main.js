var system = new magnifyall.System({
    aop: [{
    // Aop reference name
        "name": "logger",
    // Aop execution defination
        "execution": "* com.Test.*(..)",
    // Aop cut-point name
        "before": function(_aopData, _aurg){
    // Have any implementation here
            console.log("_aopData: ", _aopData);
            console.log("_aurg: ", _aurg);
        }
    }],
    beanFactory: {
        "com.Bean": {
            fetchService: function(_query, _callBack){
                _callBack(JSON.stringify({id: _query, name: 'Bean Name'}));
            }
        }
    },
    jsonLD: {
        "WebSite": "com.WebSite"
    }
});

system.import("com.Test", function(){
    window.test = new com.Test();
    test.__render(document.querySelectorAll('#log'));
    test.show();
    window.test_1 = new com.Test({name: "Testing"});
    test_1.__render(document.querySelectorAll('#log1'));
    test_1.show();
}).import("com.Test1", function(){
    window.test1 = new com.Test1();
});
system.getBean("com.Bean", "001", function(_obj){
    window.bean = _obj;
    console.log(bean.serialize());
});

system.import("com.magnifyall.form.Input",function(){
    window.userName = new com.magnifyall.form.Input({
        name: "user_name",
        description: "Please enter User Name",
        validateOnIntract: function(_value){
            if(_value.match(/^[a-zA-Z0-9_@]{0,}$/g)){
                return false;
            }
            return "Invalid Format";
        }
    });
    window.userName.__render(document.querySelectorAll('#userName'));
});
system.import("com.FruitList",function(){
  window.fruits = new com.FruitList();
  window.fruits.__render(document.querySelectorAll('#fruits'));
});
system.import("com.magnifyall.form.Select",function(){
    window.state = new com.magnifyall.form.Select({
        name: "user_name",
        description: "Please select State",
        validateOnIntract: function(_value){
            if(_value.match(/^[a-zA-Z0-9_@]{0,}$/g)){
                return false;
            }
            return "Invalid Format";
        },
        options: [
          {name: "North South Whale", value: "NSW"},
          {name: "Victoria", value: "VIC"}
        ]
    });
    window.state.__render(document.querySelectorAll('#state'));
});
system.import("com.EventTester",function(){
  window.eventTester = new com.EventTester();
  window.eventTester.__render(document.querySelectorAll('#tester'));
});
system.import("com.JsonLoop",function(){
  window.jsonLoop = new com.JsonLoop();
  window.jsonLoop.__render(document.querySelectorAll('#json-loop'));
});
