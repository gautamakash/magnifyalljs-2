/*
 java-script.js v0.0.0
 (c) 2016-2017 Akash Gautam . http://www.magnifyall.com
 License: MIT
*/

// instance
/**
 * System imported class object will inherit describe Methods and variables
 * @namespace Object
 * @author Akash Gautam
 */

 /**
   * Access this object in async method by _instance
   * @member {Object} _instance
   * @memberof Object
   */
var _instance = this;

// Checking arguments
if(arguments && arguments.length>0){
    for(var arugI = 0 ; arugI<arguments.length; arugI++){
        var arguObj = arguments[arugI];
        if(arguObj['@context']){
            this['@context'] = arguObj['@context'];
        }
        if(arguObj['@type']){
            this['@type'] = arguObj['@type'];
        }
    }
}


// get systems
 /**
   * Get associated system object
   * @memberof Object
   * @return {Object} Current System where this object is pooled
   */
this.__getSystem = function(){
    return magnifyall.__systems[_system];
}

// Traverse Object
 /**
   * Get Path object
   * @memberof Object
   * @param {string} _path Path to traverse
   * @param {Object} _obj Object to traverse (if not passed traverse current object)
   * @return {Object} Get Object reside on specific path
   */
this.__traversePath = function(_path, _obj){
    _obj = _obj || this;
    return magnifyall.__systems[_system].getTemplateProcessor().getDataValue(_obj, _path);
}
// get data current path
 /**
   * Get object path of package object in source
   * @memberof Object
   * @return {string} package path of object
   */
this.__getCurrentPath = function(){
    return _currentPath;
}
// get data className
 /**
   * Get package name if this object (object type)
   * @memberof Object
   * @return {string} object type, like com.magnifyall.Test
   */
this.__getClassName = function(){
    return _currentPackage;
}

 /**
   * Import this package befor current package
   * @memberof Object
   * @param {string} _package Dependent Package to import first
   */
this.import=function(_package){
    console.log("Dependent Package import is not supported at runtime.");
}

 /**
   * Extend this package
   * @memberof Object
   * @param {string} _package Extend this package
   */
this.extend=function(_package){
    console.log("Extending Package is not supported at runtime.");
}


// listners, subscribers
var _onChangeListners = {};
// Method to subscribe with unique id
 /**
   * Subscribe to this object update (not change, object must be updated by calling this.__update())
   * @memberof Object
   * @param {string} _id Unique Id of subscription (will required to unsubscribe)
   * @param {function} _fnc Function to call whenever object is updated
   */
this.subscribe = function(_id, _fnc){
    _onChangeListners[_id] = _fnc;
}
// unsubscribe unique id
 /**
   * Unsubscribe this object updates
   * @memberof Object
   * @param {string} _id subscription Id to unsubscribe
   */
this.unsubscribe = function(_id){
    delete _onChangeListners[_id];
}
// trigger update to object and trigger change event to subscriber
 /**
   * Update this object changes
   * @memberof Object
   * @param {boolean} _disableRender (optional) if set true will not render current object on update
   */
this.__update = function(_disableRender){
    __change(this);
    if(__bindElement && !_disableRender){
        this.__render(false);
    }
}

// trigger change events to subscriber
var __change = function(_objectInstance){
    for(var _listner in _onChangeListners){
        _onChangeListners[_listner](_objectInstance);
    }
}
// serialize object
 /**
   * Serialize current object
   * @memberof Object
   * @return {string} serialize all property of object which can be use to transit or compare
   */
this.serialize = function(_suppress){
    var _suppress = _suppress || [];
    _suppress[_suppress.length] = "_bind";
    _suppress[_suppress.length] = "@root";
    _suppress[_suppress.length] = "@index";
    return JSON.stringify(this, function(_key,_value){
        for(var _i = 0; _i<_suppress.length; _i++){
            if(_key == _suppress[_i]){
                return undefined;
            }
        }
        return _value;
    });
}
// check if value(serialize) are equal
 /**
   * Compare current Object with another by calling Serialize ( Clone object will not have same UID)
   * @memberof Object
   * @return {boolean} return if serialize value match
   */
this.equal = function(_ele){
    return (this.serialize() === _ele.serialize());
}

// default template
var __template = {};
var __bindElement = false;
this.__setTemplate = function(_template){
    __template = _template;
}
// render template
 /**
   * Render current object
   * @memberof Object
   * @param {domNodes} _bindElement Dom element to render current object (optional if already binded)
   * @param {boolean} _isAppend (optional) if set true will not replace inner Element, rather append new
   */
this.__render = function(_bindElement, _isAppend){
    this.__bindElement(_bindElement);
    this.__getSystem().getTemplateProcessor().process(__template, __bindElement, this, _isAppend);
    // render hook
    if(this.__afterRender){
        this.__afterRender(__bindElement);
    }
}

// bind element
/**
   * Bind Dom Element to current object
   * @memberof Object
   * @param {domNodes} _bindElement Dom element to render current object
   */
this.__bindElement =  function(_bindElement){
    if(_bindElement){
        try{
            __bindElement = document.querySelectorAll(_bindElement)||__bindElement;
        }catch (e){
            if(_bindElement.length && _bindElement.length > 0){
                __bindElement = _bindElement;
            }else{
                __bindElement = [_bindElement];
            }
        }
    }
}
// unbind element
/**
   * Unbind current binded dom element
   * @memberof Object
   */
this.__unbindElement = function(){
    __bindElement = false;
}
// get bind element
/**
   * get current binded dom element
   * @memberof Object
   * @return {domNodes} Current binded nodes
   */
this.__getBindElement = function(){
    return __bindElement;
}
/**
   * Return dom nodes by querying current bind
   * @memberof Object
   * @param {string} _query CSS selector
   * @return {domNodes} selected query nodes in scope of binded nodes
   */
this.__queryChildElements = function(_query){
    var _retObj = [];
    if(__bindElement && __bindElement.length && __bindElement.length > 0){
        for(var _eleIndex = 0; _eleIndex< __bindElement.length; _eleIndex++){
            if(_eleIndex === 0){
                _retObj = Array.prototype.slice.call(__bindElement[_eleIndex].querySelectorAll(_query));
            }else{
                var _nodeList = Array.prototype.slice.call(__bindElement[_eleIndex].querySelectorAll(_query));
                _retObj = (_retObj.length>0)?_retObj.concat(_nodeList):_nodeList;
            }
        }
    }
    return _retObj;
}
/**
   * String reffrence to current object which can be eval()
   * @memberof Object
   * @return {string} evaluable string which will return current object
   */
this.__getReference = function(){
    var returnString = 'magnifyall.__systems.';
    returnString += _system;
    returnString += '.getObject(';
    returnString += "'"+this.__UID+"')";
    return returnString;
}
