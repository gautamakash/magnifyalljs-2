/*
Select
*/
Select = function(_config){
  var _config = _config || {};
  this.name = _config.name;
  var _value = _config.defaultValue || "";
  this.value = _value;
  this.error = _config.error || "";
  var _type = (_config.isSecure)?"password":"text";
  this.isEmpty = (_value == "")?true:false;
  this.validateOnChange = _config.validateOnChange || function(){return false;};
  this.validateOnIntract = _config.validateOnIntract || function(){return false;};
  this.options = _config.options || [];
  this.optionNode = _config.optionNode || {name: "name", value: "value"}
  this.ele = {
      input: false,
      desc: false,
      wrap: false,
      error: false,
      options: false
  };
  this.getType = function(){
      return _type;
  }
  this.getSelected = function(){
    if(this.value || this.value !=""){
      for(var _optionI = 0; _optionI<_instance.options.length; _optionI++){
          var _option = _instance.options[_optionI];
          if(this.__traversePath(this.optionNode.name,_option) === this.value){
            return _option;
          }
      }
    }
      return;
  }
  this.setError = function(_error){
      _instance.error = _error;
      if(_instance.error && _instance.error != ""){
          _instance.ele.wrap.classList.add('error');
      }else{
            _instance.ele.wrap.classList.remove('error');
      }
      _instance.ele.error.innerHTML = _instance.error;
  }
  this.description = _config.description;
  this.getClass = function (_isEmpty){
      return (_isEmpty)?"empty":"";
  }
  this._uiFocus = function(){
      if(_instance.isEmpty){
          _instance.ele.desc.classList.remove('empty');
      }
      _instance.ele.options.style.display = "block";
      while (_instance.ele.options.firstChild) {
          _instance.ele.options.removeChild(_instance.ele.options.firstChild);
      }
      for(var _optionI = 0; _optionI<_instance.options.length; _optionI++){
        var _option = _instance.options[_optionI];
        var _optionDiv = document.createElement('div');
        _optionDiv.innerHTML = _instance.__traversePath(_instance.optionNode.name,_option);
        _optionDiv.setAttribute("data-on-select", _instance.__traversePath(_instance.optionNode.value,_option))
        _optionDiv.onclick = function(e){
          _instance.value = e.target.innerHTML;
          _instance.ele.input.value = _instance.value;
          _instance.ele.options.style.display = "none";
          _instance._uiChange();
        }
        _instance.ele.options.append(_optionDiv);
      }
  }
  this._uiBlur = function(){
      if(_instance.isEmpty){
          _instance.ele.desc.classList.add('empty');
      }
  }
  var _validateValue = function(){
      var _isChanged = false;
      if(_value != _instance.ele.input.value){
          _isChanged = true;
          _value = _instance.ele.input.value;
      }
      _instance.value = _value;
      return _isChanged;
  }
  this._uiChange = function(){
      var _isChanged = _validateValue();
      if(_value == ""){
          _instance.isEmpty = true;
          _instance.ele.desc.classList.add('empty');
      }else{
          _instance.isEmpty = false;
          _instance.ele.desc.classList.remove('empty');
      }
      if(_isChanged){
          var _error = _instance.validateOnChange(_instance.ele.input.value);
          if(!_error){
              _error = _instance.validateOnIntract(_instance.ele.input.value);
          }
          _instance.setError((_error)?_error:"");
          _instance.__update(true);
      }
  }
  this._uiKeyUp = function(){
      var _error = _instance.validateOnIntract(_instance.ele.input.value);
      _instance.setError((_error)?_error:"");
      var _isChanged = _validateValue();
      if(_isChanged){
          _instance.__update(true);
      }
  }

  this.__setTemplate([
    {
        div: {
            prop: {
                class: "select",
                id: "select_{{:__UID}}"
            },
            childs:[
                {
                    input: {
                        prop:{
                            type: "{{getType:name}}",
                            name: "{{:name}}",
                            value: "{{:value}}",
                            onfocus: {
                                fn: '_uiFocus',
                                arg: []
                            },
                            onblur:{
                                fn: '_uiBlur',
                                arg: []
                            },
                            onchange:{
                                fn: '_uiChange',
                                arg: []
                            },
                            onkeyup: {
                                fn: '_uiKeyUp',
                                arg: []
                            }
                        }
                    }
                },
                {
                    div: {
                        prop:{
                            class: "description {{getClass:isEmpty}}"
                        },
                        childs:[
                            {'#text':"{{:description}}"}
                        ]
                    }
                },
                {
                    div: {
                        prop:{
                            class: "error_msg"
                        },
                        childs:[
                            {"#text":"{{:error}}"}
                        ]
                    }
                },
                {
                  div: {
                    prop:{
                      class: "options",
                      style: {
                        "display": "none"
                      }
                    }
                  }
                }
            ]
        }
    }
  ]);
  this.__afterRender = function(){
      _instance.ele.input = _instance.__queryChildElements("#select_"+_instance.__UID+">input")[0];
      _instance.ele.desc = _instance.__queryChildElements("#select_"+_instance.__UID+">.description")[0];
      _instance.ele.wrap = _instance.__queryChildElements("#select_"+_instance.__UID)[0];
      _instance.ele.error = _instance.__queryChildElements("#select_"+_instance.__UID+">.error_msg")[0];
      _instance.ele.options = _instance.__queryChildElements("#select_"+_instance.__UID+">.options")[0];
  };
}
