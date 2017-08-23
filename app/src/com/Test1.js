/**
 * Test1 Class
 */
Test1 = function(_config){
    this.import("com.Test2");
    this.test = new com.Test2();
    this.test.show();
};