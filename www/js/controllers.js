'use strict';

/* Controllers */

app.controller('MyCtrl1', ['$scope' , '$location', '$http' , 'navigation' , 'data' , function($scope, $location, $http, navigation, data) {
      $scope.myclass = navigation.slideClass;
      $scope.categories = data.data.categories;
      $scope.events = data.data.events;
    
      $scope.hide = function(path){
        $location.path( path );
        navigation.slide();
      };
    
      $scope.email = function(){
        var url = 'http://mallorcaplus.net/email?' + "subject=" + $scope.contactname + "&email=" + $scope.contactemail + "&message=" + $scope.contactmessage;
          $http.get(url).success(
            function(){alert("An email has been sent");}
        ).error(function(serverdata, status, headers, config) {
            $location.path("error");
            console.log(serverdata);
        });
      };
    
    //*************************************************************************************************
      $scope.slides = [
            {image: 'http://1.bp.blogspot.com/-19ahBq67LOQ/UDRwxIgMPJI/AAAAAAAAAFw/gHuryQQddM4/s400/bigstockphoto_Books_789849-1m6bd2q.jpg', description: 'Image 00'},
            {image: 'http://www.marketproject.org.uk/wp-content/uploads/2012/04/Mp_Book_Simulation72dpi-400x400.jpg', description: 'Image 01'},
            {image: 'http://cdn.itproportal.com/photos/asus_transformer_book_thumb_contentfullwidth.jpg', description: 'Image 02'}
        ];

        $scope.direction = 'left';
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex < $scope.events.filter(function(element){return element.featured == true;}).length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function () {
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.events.filter(function(element){return element.featured == true;}).length - 1;
        };
    //****************************************************************************************************
  }])
  .controller('MyCtrl2', ['$scope' , '$routeParams' , 'data' , function($scope, $routeParams, data) {
      $scope.categoryId = $routeParams.categoryId;
      $scope.category = data.data.category;
      $scope.events = data.data.events;
  }])
  .controller('MapCtrl', ['$scope' , '$routeParams' , 'data' , function($scope, $routeParams, data) {
        $scope.eventid = $routeParams.eventid;
        $scope.name = $routeParams.name;
        $scope.long = $routeParams.long;
        $scope.lat = $routeParams.lat;
  }])
  .controller('MyCtrl3', ['$scope' , '$routeParams' , '$location' , 'data' , function($scope, $routeParams, $location, data) {
      $scope.eventId = $routeParams.eventId;
      $scope.event = data.data.event;
      
      $scope.options = [
          {value: 0, name: 0},
          {value: 1, name: 1},
          {value: 2, name: 2},
          {value: 3, name: 3},
          {value: 4, name: 4},
          {value: 5, name: 5},
          {value: 6, name: 6},
          {value: 7, name: 7},
          {value: 8, name: 8},
          {value: 9, name: 9},
          {value: 10, name: 10}
      ];
      $scope.selectedadult = "";
      $scope.selectedchild = "";
      
      $scope.confirm = function() {
        if($scope.selectedadult.length == 0) {
          alert("Please select adult tickets");
        } else if($scope.selectedchild.length == 0) {
          alert("Please select child tickets");
        } else if(false){//$scope.date == $scope.datetext) {
          alert("Please select a date");
        } else if($scope.selectedadult == 0 && $scope.selectedchild == 0){
          alert("Please select at least one adult or child ticket");
        } else {
          var path = "confirmation/" + $scope.event.id + "/" + $scope.selectedadult + "/" + $scope.selectedchild + "/" + $scope.date;
          $location.path(path);
        }
      };

      
      $scope.datetext = "Select a date for your tour";
      $scope.date = $scope.datetext;
      $scope.selectdate = function(){
          var options = {
              date: new Date(),
              mode: 'date'
            };
        
        datePicker.show(options, function(date){
          if(!isNaN(date.getTime())) {
            $scope.date = date.getDate() + " - " + (date.getMonth() + 1) + " - " + date.getFullYear();
            $scope.$apply();
          }
        });
      };
      
      //*************************************************************************************************
      $scope.slides = $scope.event.image;

        $scope.direction = 'left';
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function () {
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };
    //****************************************************************************************************
  }])
  .controller('MyCtrl4', ['$scope' , '$routeParams' , '$location' , 'data' , function($scope, $routeParams, $location, data) {
    $scope.eventId = $routeParams.eventId;
    $scope.event = data.data.event; 

    $scope.date = $routeParams.date; 
    $scope.adult = $routeParams.adult; 
    $scope.child = $routeParams.child;

    $scope.paypal = function(){
          var amount = ($scope.adult * $scope.event.adultprice) + ($scope.child * $scope.event.childprice);
          var description = escape($scope.event.name) + "(" + $scope.adult + " adult, " + $scope.child + " child)" + " " + $scope.date;
          var returnUrl = "http://www.mallorcaplus.net";
          var url = "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=ra1988%40hotmail%2eco%2euk&lc=GB&item_name=" + description + "&amount=" + amount + "&currency_code=EUR&button_subtype=services&no_note=0&bn=PP%2dBuyNowBF%3abtn_buynowCC_LG%2egif%3aNonHostedGuest&return=" + escape(returnUrl);
          
          var ref = window.open(url, '_blank', 'location=no');
              
          ref.addEventListener('loadstart', function(event){
              if(event.url.indexOf(returnUrl) !== -1){
                ref.close();
                // go to home page
                $location.path( "#/payment" );
              };
          });
      };
  }]);