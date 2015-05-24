'use strict';

socialNetworkApp.controller('ChangePasswordController',
    ['$scope', '$location', '$timeout', 'userData', 'credentials', 'toaster', function ($scope, $location, $timeout, userData, credentials, toaster){
        var defaultNotificationTimeout = 2000;
        $scope.changePassword = changePassword;

        function backHome(time) {
            $timeout(function () {
                $location.path('/');
            }, time);
        }

        function changePassword(password, changePasswordForm) {
            userData.changePassword(password)
                .$promise
                .then(function (data) {
                    $scope.changePasswordForm.$setPristine();
                    toaster.pop('success', 'Successfully changed password!', data.message, defaultNotificationTimeout);
                    backHome(5000);
                }, function (error) {
                    toaster.pop('error', 'Error while changing password!', error.data.message, defaultNotificationTimeout);
                })
        }
        
    }
    ]);