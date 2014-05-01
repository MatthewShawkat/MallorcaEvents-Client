'use strict';

app.provider('navigation' , function(){  
    var slideClass = {
        value: ''
    };
    this.$get = function(){
        return {
            slideClass: slideClass,
            slide: function() {
                if(slideClass.value == '')
                    slideClass.value = 'show-sidebar';
                else
                    slideClass.value = '';
            }
        };
    };
}).
provider('data' , function(){
    var data = {
        categories: {},
        events: {},
        event: {},
        category: {},
        promotions: {},
    };
    this.$get = function($http, $location){
        return {
            data: data,
            seteventbyid: function(id){
                data.events.forEach(function(event){
                    if(event.id == parseInt(id)) 
                        data.event = event;
                });
            },
            setcategorybyid: function(id){
                data.categories.forEach(function(category){
                    if(category.id == parseInt(id)) 
                        data.category = category;
                });
            },
            getdiscount: function(code){
              data.promotions.forEach(function(promotion){
                    if(promotion.code == code) 
                        return promotion.discount;
                });  
            },
            getData: function(callback){
               $http.get("http://127.0.0.1:8000/event/data")
                // $http.get("http://www.mallorcaplus.net/event/data")
                .success(function(serverdata, status, headers, config) {
                    data.categories = serverdata.categories;
                    data.events = serverdata.events;
                    callback();
                }).error(function(serverdata, status, headers, config) {
                    $location.path("error");
                    console.log(serverdata);
                });   
            },
        };
    };
});
