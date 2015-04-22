angular.module('charmapApp', ['winjs', 'ngSanitize'])
    .controller('CharMapController', function($scope) {
    var charmap = this;

    charmap.data = global_data;

    charmap.remaining = function() {
      var count = charmap.data.length;
      return count;
    };

    charmap.archive = function() {
        // UNDONE
    };

    $scope.viewState = { currentBlock: 0 };
    $scope.data = CharMap.createBlock(0);

    $scope.$watch("viewState", 
        function(scope) { 
            $scope.data = CharMap.createBlock($scope.viewState.currentBlock); 
        }, true);
});
