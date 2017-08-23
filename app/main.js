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
    }]
});

system.import("com.Test", function(){
    window.test = new com.Test();
    test.__render(document.querySelectorAll('#log'));
    test.show();
}).import("com.Test1", function(){
    window.test1 = new com.Test1();
});