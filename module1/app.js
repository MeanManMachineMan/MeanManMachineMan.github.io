(function(){
'use strict'

angular.module('mod1',[])
	.controller('LunchCheckController',lccontrol);
lccontrol.$inject = ['$scope'];
function lccontrol($scope){
	$scope.list = "";
	$scope.check = function(){
		if($scope.list == ""){
			$scope.output = "Please enter data first!"
		}
		else{
			var words = $scope.list.split(',');
			var a = words.length;
			console.log(words)
			words.forEach(function(item){ 
				if(item =="")
					a -= 1
				});
			console.log(a)
			if(a <= 3)
				$scope.output = "Enjoy!"
			else
				$scope.output = "Too much!"
		}
	}
};


})();