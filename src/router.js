/**
 * Route Class
 * @constructor
 * @param {JSON} _config - Configuratin for route object
 * @author Akash Gautam
 */
var Route = function(_config){
    this.name = _config.name;
    this.obj = _config.obj;
    this.onEnter = _config.onEnter;
    this.onLeave = _config.onLeave;
}
/**
 * Router Class
 * @constructor
 * @param {JSON} _config - Configuratin for router object
 */
var Router = function(_config){
  var _instance = this;
  this.id = _config.id;
  this.routes = {};
  var _nextRoute = false;
  var _prevRoute = false;
  var _currentRoute = false;
  var _callBacks = [];
  var _debug = _config.debug || false;
  if(_config.routes){
    for(var _routeI = 0; _routeI < _config.routes.length; _routeI++){
      var _route = _config.routes[_routeI];
      this.routes[_route.name] = _route;
    }
  }
  /**
   * Add Route object to router
   * @public
   * @param {Object} _route Route object
   */
  this.addRoute = function(_route){
      this.routes[_route.name] = _route;
  }
  this.bindElement = _config.bindElement || false;
   /**
   * Bind Dom element to this Router
   * @public
   * @param {Object} _ele Dom Node
   */
  this.bind = function(_ele){
       this.bindElement = _ele || this.bindElement;
  }

  var _onEnterHookCallBack = function(_isAllow){
    if(_isAllow){
      _instance.currentRoute = _nextRoute.name;
      _currentRoute = _nextRoute;
      _nextRoute = false;
      _currentRoute.obj.__render(_instance.bindElement);
      if(_callBacks && _callBacks.length > 0){
        for(var _callBackI = 0; _callBackI< _callBacks.length; _callBackI++){
          try{
            _callBacks[_callBackI](_instance.currentRoute);
          }catch(e){
            console.log(e);
          }
        }
      }
    }
  }

  var _onLeaveHookCallBack = function(_isAllow){
    if(_isAllow){
      if(_nextRoute
        && _nextRoute.onEnter){
        _nextRoute.onEnter(_currentRoute, _nextRoute, _onEnterHookCallBack);
      }else{
        _onEnterHookCallBack(true);
      }
    }
  }
 /**
   * Load route by route Name
   * @public
   * @param {string} _routeName Route name
   */
  this.loadRoute = function(_routeName){
    if(_instance.routes[_routeName]
    && _instance.bindElement){
      _nextRoute = _instance.routes[_routeName];
      if(_currentRoute
      && _currentRoute.onLeave){
        _currentRoute.onLeave(_currentRoute, _nextRoute, _onLeaveHookCallBack);
      }else{
        _onLeaveHookCallBack(true);
      }
    }
  }
 /**
   * Load next route
   * @public
   */
  this.goNext = function(){
    var _nextRoute = false;
    var _markCurrentRoute = false;
    for(var _localRouteName in _instance.routes){
      if(_markCurrentRoute){
        _nextRoute = _localRouteName;
      }
      if(this.currentRoute == _localRouteName){
        _markCurrentRoute = true;
      }else{
        _markCurrentRoute = false;
      }
    }
    if(_nextRoute){
      this.loadRoute(_nextRoute);
    }
  }
 /**
   * Load Back route
   * @public
   */
  this.goBack = function(){
    var _backRoute = false;
    var _previousRoute = false;
    for(var _localRouteName in _instance.routes){
      if(this.currentRoute == _localRouteName && _previousRoute){
        _backRoute = _previousRoute;
      }
      _previousRoute = _localRouteName;
    }
    if(_backRoute){
      this.loadRoute(_backRoute);
    }
  }
  /**
   * CallBack on route change
   * @public
   */
  this.onRouteChange = function(_callBack){
    _callBacks.push(_callBack);
  }
  if(_config.defaultRoute){
    this.loadRoute(_config.defaultRoute);
    this.currentRoute = _config.defaultRoute;
    if(this.currentRoute){
      _currentRoute = this.routes[this.currentRoute] || false;
    }
  }
}
