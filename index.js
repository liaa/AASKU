Array.prototype.unique = function() {
	var a = this.concat();
	for(var i=0; i<a.length; ++i) {
		for(var j=i+1; j<a.length; ++j) {
			if(a[i] === a[j])
				a.splice(j--, 1);
		}
	}

	return a;
};


var helper = require('./helper.js');
var state = {};
state.attrGroup = [[1,2],[3,4,5]];
state.skus = [[2,5],[1,3],[1,4]];

state.skus = helper.mergeArray(state.skus,1);
state.allAttrs = [1,2,3,4,5,6,7];
function getAllAttrs(){
	return [1,2,3,4,5];
}
function calculate(selectedAttrs) {
	var result={};
	result.selectedAttrs = [];
	result.availableAttrs = getAllAttrs();

	var latestSelectedAttr = selectedAttrs.slice(-1)[0];
	// check if its a select or a unselect	
	var isSelectAction = true;
	if(selectedAttrs.unique().length != selectedAttrs.length){
		isSelectAction = false;
	}

	if(isSelectAction){
		var reAggretedSelectedList = helper.reAggretionArray(selectedAttrs);
		console.log('reAggretedSelectedList', reAggretedSelectedList);
		reAggretedSelectedList.forEach(function(reAggretedSelectedItem){

			var latestSelectedAttr = reAggretedSelectedItem.slice(-1)[0];
			console.log('latestSelectedAttr', latestSelectedAttr);
			var groupindexOfLatestSelectedAttr;
			state.attrGroup.forEach(function(group, idx){
				if(group.indexOf(latestSelectedAttr) != -1)	{
					groupindexOfLatestSelectedAttr = idx;
				}
			});

			state.skus.forEach(function(combine){
				console.log('combine', combine);
				console.log('reAggretedSelectedItem', reAggretedSelectedItem);
				var isContain = false;
				if(helper.isTwoArrayContain(combine,reAggretedSelectedItem)){
					isContain = true;
				}
				console.log('isReaggretedSelectedItemContainInCombine', isContain);

				if(!isContain){
					combine.forEach(function(combineAttr,idx){
						if(idx != groupindexOfLatestSelectedAttr) {
							var indexToDelete = result.availableAttrs.indexOf(combineAttr);	
							if(indexToDelete!=-1){
								result.availableAttrs.splice(indexToDelete,1);
								console.log('attr to delete: ', combineAttr);
							}
						}
					})
				} else {
					combine.forEach(function(combineAttr){
						if(result.availableAttrs.indexOf(combineAttr) != -1){
							result.availableAttrs = result.availableAttrs.concat(combine);
						};
					})
				}

			})	


		})
	}

	result.availableAttrs = result.availableAttrs.unique();
	return result;
}


var result = calculate([3,1]);
console.log(result);
