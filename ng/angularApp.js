window.unicode = global_data;

angular.module('charmapApp', ['winjs', 'ngSanitize'])
    .controller('CharMapController', function($scope) {
    var charmap = this;

    $scope.viewState = { currentBlock: 0 };
    $scope.data = CharMap.createBlock(0);
    $scope.homeClicked = CharMap.homeClicked;

    $scope.$watch("viewState", 
        function(scope) { 
            $scope.data = CharMap.createBlock($scope.viewState.currentBlock); 
        }, true);
});
