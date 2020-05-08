(function(){
'use strict'

var app = angular.module('NarrowItDownApp',[])
				 .controller('NarrowItDownController',nitd)
				 .service('MenuSearchService', mss)
				 .directive('foundItems', foundItemsDirective);

function foundItemsDirective(){
	var ddo = {
		templateUrl: 'result.html',
		scope: {
			menuitems: "<",			//One way binding for the attribute menuitems, not specifying a name means that the same name is used
			delete: "&delItem"		//'&' here indicated that the function on the rhs(will be the attribute name) and will be execute the function wrt the controller function that the directive is called from
		}
	};
	return ddo;
};

nitd.$inject = ['$scope', '$http','MenuSearchService'];
function nitd($scope, $http, MenuSearchService){
	$scope.validInput = false;
	this.findItems = function(){
		if($scope.searchTerm == undefined || $scope.searchTerm == ""){
			$scope.validInput = true;
			return;
		}
		else{
			$scope.validInput = false;
		}
		var found = MenuSearchService.getMatchedMenuItems($scope.searchTerm);	//So here, the .then() from the service returns a promise so we gotta deal with the promise the js way, by chaining it to another .then() to evaluate the outcome of the promise, either a success or a failure
		found.then(function(success){
			$scope.found = success;
			console.log(success);
			if(success.length == 0){
				$scope.validInput = true;
			}
			else{
				$scope.validInput = false;			
			}
			})
		}

	this.deleteItem = function(index){
		$scope.found.splice(index,1);

	}
		
};

mss.$inject = ['$http'];
function mss($http){
	this.getMatchedMenuItems = function(searchTerm){
		return $http({
			method: "GET",
			url: "https://davids-restaurant.herokuapp.com/menu_items.json"
		}).then(function(items){
			var temp = items.data["menu_items"];
			var menu = [];
			for(var i = 0; i <= temp.length - 1; i++){	
				if(temp[i]["name"].toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1){
					menu.push(temp[i]["name"]);
				}
			}
			return menu;
		});
	}
}

})()