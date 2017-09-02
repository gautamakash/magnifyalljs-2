var system = new System({
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