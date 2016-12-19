


angular.module('simpleService.services', [])

    .service('APIInterceptor', function ($rootScope, $q) {
        var service = this;

        service.responseError = function (response) {
            if (response.status === 401) {
                $rootScope.$broadcast('unauthorized');
            }
            return $q.reject(response);
        };
    })

    


    .service('AuthService', function (Backand,$rootScope,$state) {
        var service = this;


        service.signin = function (email, password, appName) {
            return Backand.signin(email, password);
        };




         service.signup = function (firstName, lastName, username, password, parameters) {
            return Backand.signup(firstName, lastName, username, password, password, parameters)
                .then(function (signUpResponse) {
                    if (signUpResponse.data.currentStatus === 1) {
                        return self.signin(username, password)
                            .then(function () {
                                return signUpResponse;
                            });

                    } else {
                        return signUpResponse;
                    }
                });
        };


        service.changePassword = function (oldPassword, newPassword) {
            return Backand.changePassword(oldPassword, newPassword)
        };

        service.requestResetPassword = function (username) {
            return Backand.requestResetPassword(username)
        };

        service.resetPassword = function (password, token) {
            return Backand.resetPassword(password, token)
        };

        service.signout = function () {
            return Backand.signout()
            .then(function () {
                $rootScope.$broadcast('logout');
                $state.go($state.current, {}, { reload: true });
                $state.transitionTo('login');
                alert("bye :( ");
            })
        };
             
    });

        