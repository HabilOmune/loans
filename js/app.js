/**************************************************/


var portal = angular.module('portal', [
    'ngMaterial',
    'ui.router',
    'simpleService.services',
    'auth.controller',
    'main.controller',
    'ui.bootstrap',
    'backand',
]);

portal.run(function ($rootScope, $state, AuthService) {

});


portal.config(function ($stateProvider, $urlRouterProvider, BackandProvider, $mdThemingProvider) {




    BackandProvider.setAppName('payadvance');
    BackandProvider.setSignUpToken('a56ad0f4-f5f6-4da8-9630-c8d3ae605a83');
    BackandProvider.setAnonymousToken('3595faf5-cc81-49bf-8ea8-2266e114239f');


    $urlRouterProvider.otherwise('/login');

   
    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: 'auth/login.html',
            controller: 'authCtrl'
        })

        .state('main', {
            url: '/main',
            templateUrl: 'main/main.html',
            controller: 'mainCtrl'
        })

 
})



