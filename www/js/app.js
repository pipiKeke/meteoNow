// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("homeController", function($scope, $ionicLoading, $state){
  $scope.submitDay = function(city){
      $state.go('weatherDay', {city: city});
  }
  $scope.submitWeek = function(city){
      $state.go('weatherWeek', {city: city});
  }
  $scope.geolocate = function(){
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  
  navigator.geolocation.getCurrentPosition
    (onWeatherSuccess, onWeatherError,posOptions);
  };
   
   var onWeatherSuccess = function (position) {
      var lat  = position.coords.latitude;
      var lng = position.coords.longitude;
   
      $state.go('weatherGeo', {lat: lat, lng: lng});
   }; 

   function onWeatherError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}
  

})

.controller("weatherDayController", function($ionicLoading, $scope, $stateParams, $http){
  $scope.city = $stateParams.city;
  url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+$stateParams.city+'&lang=fr&appid=c8e07a46c7f8df9a0c3776aa09c44a93&units=metric';
   $ionicLoading.show({
      template: 'Loading...'
    })
  $http.get(url).success(function(response){
     $ionicLoading.hide();
     $('.meteoSemaine').hide();
     $scope.jour= response.list[0].dt;
     $scope.icon = response.list[0].weather[0].icon;
     $scope.description = response.list[0].weather[0].description;
     $scope.temp= Math.round(response.list[0].temp.day) + "°C";
    })
    
  
})

.controller("weatherWeekController", function($ionicLoading, $scope, $stateParams, $http){
  $scope.city = $stateParams.city;
  url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+$stateParams.city+'&lang=fr&appid=c8e07a46c7f8df9a0c3776aa09c44a93&units=metric';
   $ionicLoading.show({
      template: 'Loading...'
    })
  $http.get(url).success(function(response){
     $ionicLoading.hide();
     $('.meteoJour').hide();
    $scope.days = response.list;
    })
    
  
})

.controller("weatherGeoController", function($ionicLoading, $scope, $stateParams, $http){
  
  url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+$stateParams.lat+'&lon='+$stateParams.lng+'&lang=fr&appid=c8e07a46c7f8df9a0c3776aa09c44a93&units=metric';
   $ionicLoading.show({
      template: 'Loading...'
    })

  $http.get(url).success(function(response){
     $ionicLoading.hide();
     $('.meteoJour').hide();
    $scope.days = response.list;
    $scope.city = response.city.name;
   
    
  
})
})
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'homeController'
            })
        $stateProvider
            .state('weatherDay', {
                url: '/weather/:city',
                templateUrl: 'templates/weather.html',
                controller: 'weatherDayController'
            })
        $stateProvider
            .state('weatherWeek', {
                url: '/weather/:city',
                templateUrl: 'templates/weather.html',
                controller: 'weatherWeekController'
            })
        $stateProvider
            .state('weatherGeo', {
                url: '/weather/:lng/:lat',
                templateUrl: 'templates/weather.html',
                controller: 'weatherGeoController'
            })
        $stateProvider.state('about', {
          url: '/about',
          templateUrl:'templates/about.html'
        })

      $urlRouterProvider.otherwise('/home')
});