'use strict';

/* Directives */


app.
  directive('pageheader', ['navigation' , function(navigation) {
    return {
        restrict: 'E',
        scope: { title: '@title'},
        link: function(scope, element, attrs){
            scope.back = function(){history.back();};
            
            scope.slide = navigation.slide;
            scope.myclass = navigation.slideClass;
        },
        replace: true,
        templateUrl: 'partials/directives/pageheader.html'
    };
  }]).
    directive('category', [function(){
        return {
            restrict: 'E',
            scope: {
                title: '@title',
                image: '@image',
                id: '@id',
            },
            replace: true,
            templateUrl: 'partials/directives/category.html'
        };
    }]).
    directive('event', [function(){
        return {
            restrict: 'E',
            scope: {
                eventid: '@eventid',
                title: '@title',
                location: '@location',
                adultprice: '@adultprice',
                childprice: '@childprice',
                description: '@description',
                image: '@image',
            },
            replace: true,
            templateUrl: 'partials/directives/event.html'
        };
    }]).
    directive('map', [function(){
        return {
            restrict: 'E',
            replace: true,
            template: '<div></div>',
            link: function(scope, element, attrs) {
            
                var myOptions = {
                    zoom: 9,
                    center: new google.maps.LatLng(attrs.lat, attrs.long),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById(attrs.id), myOptions);
                
                var myLatlng = new google.maps.LatLng(attrs.lat, attrs.long);
                var marker = new google.maps.Marker({
                    position: myLatlng, 
                    map: map,
                    title:"Location"
                });
                
                console.log(attrs);
                var infowindow = new google.maps.InfoWindow({
                    content: '<div style="padding:5px"><a href="#/event/'+ attrs.eventid +'">' + attrs.name + '</a></div>'
                });
                
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map,marker);
                });
                
            }
        };
    }]).
    directive('maps', ['$compile', 'data', function($compile, data){
        return {
            restrict: 'E',
            replace: true,
            template: '<div></div>',
            link: function(scope, element, attrs) {
                
                var myOptions = {
                    zoom: 9,
                    center: new google.maps.LatLng(39.72092, 3.021026),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById(attrs.id), myOptions);
                
                var addMarker = function(pos, name, id){
                   var myLatlng = new google.maps.LatLng(pos.lat,pos.lng);
                   var marker = new google.maps.Marker({
                        position: myLatlng, 
                        map: map,
                        title:"Location"
                    });
                    
                    var infowindow = new google.maps.InfoWindow({
                        content: '<div style="padding:5px"><a href="#/event/'+ id +'">' + name + '</a></div>'
                    });
                    
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map,marker);
                    });
                } //end
                
                for(var index in data.data.events) {
                    var event = data.data.events[index]
                    var pos = {
                        lng: event.longitude,
                        lat: event.latitude
                    };
                    addMarker(pos, event.name, event.id);
                }
                
            }
        };
    }]);
