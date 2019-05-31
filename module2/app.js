(function(){
'use strict'

angular.module('module2',[])
	.controller('toBuy', l1)
	.controller('bought',l2)
	.service('listService', LS);

l1.$inject = ['listService']
function l1(listService){
	var buying = this;
	buying.items = listService.display();
	buying.Add = function ($index){
		listService.addItem($index);
	}
};

l2.$inject = ['listService']
function l2(listService){
	var bought = this;
	bought.items = listService.displayB();
};

function LS(){
	var service = this;

	var tblist = [									//List of items to buy
		{ name: "Cookies" , quantity: "10 boxes" },
		{ name: "Chips" , quantity: "5 bags" },
		{ name: "Cola" , quantity: "40 bottles" },
		{ name: "Wheat" , quantity: "6 quintals" },
		{ name: "Barley" , quantity: "3 bags" }
	]

	var blist = [];		//List of items already bought

	service.display = function (){		//Displays list of items to be bought
		return tblist;
	}

	service.displayB = function (){		//Displays list of bought items
		return blist;
	}
	service.addItem = function($index){		//Transfer items from tblist->blist
		blist.push(tblist[$index]);
		tblist.splice($index,1);
	};
}

})();