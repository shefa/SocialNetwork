'use strict';

socialNetworkApp.controller('EditProfileController',
    ['$scope', '$location', '$timeout', 'userData', 'credentials', 'toaster', function ($scope, $location, $timeout, userData, credentials, toaster){
        $scope.editUser = credentials.getLoggedUser();
        $scope.editProfile = editProfile;
        $scope.formatProfileImgToBase64 = formatProfileImgToBase64;
        $scope.formatCoverImgToBase64 = formatCoverImgToBase64;

        function backHome(time) {
            $timeout(function () {
                $location.path('/');
            }, time);
        }

        function editProfile(user, editProfileForm) {
            userData.edit(user)
                .$promise
                .then(function (data) {
                    $scope.editProfileForm.$setPristine();
                    toaster.pop('success', 'Edit profile successful!', data.message, 2000);
                    backHome(2000);
                }, function (error) {
                    toaster.pop('error', 'Error while editing profile!', error.data.message, 2000);
                })
        }

        function formatProfileImgToBase64() {
            $scope.editUser.profileImageData = 'data:image/jpg;base64,' + $scope.editUser.profileImageData.base64;
        }

        function formatCoverImgToBase64() {
            $scope.editUser.coverImageData = 'data:image/jpg;base64,' + $scope.editUser.coverImageData.base64;
        }
   
    }
    ]);