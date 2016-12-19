angular.module('auth.controller', [])

    .controller('authCtrl', function ($rootScope, $scope, $state, $http, $compile, $timeout, Backand) {

        $scope.login = function (email, password)
        {
            console.log("Running...")
            Backand.signin(email, password)
            .then(function (res) {
                console.log(res);
                $state.transitionTo('main')
            })
            .catch(function(err){
                console.log(err);
            })
        }

    })