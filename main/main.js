angular.module('main.controller', ['ngMaterial', 'ngMessages'])

.controller('mainCtrl', function ($scope,Backand, $http, $state, $rootScope, $compile, $timeout, $mdBottomSheet, $mdDialog,$mdToast) {

$http({
  method: 'GET',
  url: Backand.getApiUrl() + '/1/objects/employers'
})
.then(function(res){
$scope.employers = res.data.data;

});
    $scope.newEmployer = function (ev) {
        $mdDialog.show({
            templateUrl: 'main/newEmployer.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true// Only for -xs, -sm breakpoints.
        })
    };

      $scope.deleteRecord= function(employer) {
          
      var id =   employer.id
    
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('CONFIRM?')
          .textContent('Are You sure you want to delete this record')
          .ariaLabel('Lucky day')
          .ok('Delete')
          .cancel('Abort');

    $mdDialog.show(confirm)
    .then(function() {
       $mdToast.show($mdToast.simple().textContent('Removing Record ID:'+ " " + id));
$http({
  method: 'DELETE',
  url: Backand.getApiUrl() + '/1/objects/employers/' + id
})
.then(function(res){

  $mdToast.show($mdToast.simple().textContent('Removed Record ID:'+ " " + id + " " + 'Successfully'  ));
})
.catch(function(err){
    console.log(err)
 $mdToast.show($mdToast.simple().textContent(' Error Removing Record ID:'+ " " + id + " : Record could not be found"));
})


    }, function() {
     $mdToast.show($mdToast.simple().textContent('Delete Aborted'));
    });
  };






})


.controller('employerCtrl', function ($scope, $http, $state, $rootScope, $compile, $timeout, $mdBottomSheet,Backand, $mdDialog,$mdToast) {
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

$scope.createEmployer = function(frm){

var firstName = frm.name;
var lastName = frm.name;
var username =frm.email;
var password = frm.password;

Backand.signup(firstName, lastName, username, password, password)
                .then(function (res) {

    $mdToast.show($mdToast.simple().textContent('Creating Account...'));
      
                  $http ({
  method: 'POST',
  url: Backand.getApiUrl() + '/1/objects/employers',
  data:{
	"Name": frm.name,
	"email": frm.email,
	"phone": frm.phone,
	"LendingLimit": frm.lendingLimit
  }
})
.then(function(res){
console.log(res);
$mdToast.show($mdToast.simple().textContent('Account Create Successfully'));
});
                })
                .catch(function(err){
                console.log(err)
                $mdToast.show($mdToast.simple().textContent('Error:'+ " " + err.data.error_description));
                
                })
}

})

.controller('bottomSheetCtrl', function ($scope, $http, $state, $rootScope, $compile, $timeout, $mdBottomSheet,Backand, $mdDialog) {

    $scope.cancel = function () {
        $mdDialog.cancel();
    };


$scope.details = $rootScope.selectedEmployee; 
  $scope.viewDetails = function() {
            $mdDialog.show({
            templateUrl: 'main/employerDetails.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            fullscreen: true
        })
  };



})
