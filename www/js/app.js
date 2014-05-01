'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['ngRoute' , 'ngAnimate', 'ngTouch']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'MyCtrl1', resolve: {app: function($q, data){
      var deffered = $q.defer();
      data.getData(function(){
        deffered.resolve();
      });
      return deffered.promise;
  }}});
  $routeProvider.when('/contact', {templateUrl: 'partials/contact.html', controller: 'MyCtrl1'});
  $routeProvider.when('/confirmation/:eventId/:adult/:child/:date', {templateUrl: 'partials/confirmation.html', controller: 'MyCtrl4'});
  $routeProvider.when('/payment', {templateUrl: 'partials/payment.html', controller: 'MyCtrl1'});
  $routeProvider.when('/error', {templateUrl: 'partials/error.html', controller: 'MyCtrl1'});
  $routeProvider.when('/map/:eventid/:name/:long/:lat', {templateUrl: 'partials/map.html', controller: 'MapCtrl'});
  $routeProvider.when('/maps', {templateUrl: 'partials/maps.html', controller: 'MapCtrl'});
  $routeProvider.when('/category/:categoryId', {templateUrl: 'partials/category.html', controller: 'MyCtrl2', resolve: {app: function($route, data){
    data.setcategorybyid($route.current.params.categoryId);
  }}});
  $routeProvider.when('/event/:eventId', {templateUrl: 'partials/event.html', controller: 'MyCtrl3', resolve: {app: function($route, data){
    data.seteventbyid($route.current.params.eventId);
  }}});
  $routeProvider.when('/purchase', {templateUrl: 'partials/purchase.html', controller: 'MyCtrl3'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);

app.filter('escape', function() {
  return window.escape;
});