var chai = require('chai');
var assert = chai.assert;
var AASKU = require('./../AASKU.js');

function isTwoArrayContain(container,containee){
	var result = true;
	containee.forEach(function(e){
		if(container.indexOf(e) == -1){
			result = false;
		}
	})
	return result;
}

function isTwoArrayIdentical(arr1,arr2){
	var result = true;
	if(arr1.length != arr2.length){
		result = false;
	}
	if(!isTwoArrayContain(arr1,arr2)) {
		result = false;
	}
	return result;
}

describe('AASKU',function(){
	var attrGroups = [["red","blue","yellow"],["S","M","L"]];
	var availableSKUs = [
		["red","S"],
		["red","L"],
		["blue","L"],
		["yellow","L"],
	];
	it('should have no attrs selected when initialized',function(){
		var aaSKU = new AASKU(attrGroups,availableSKUs);
		assert.deepEqual(aaSKU.selectedAttrs,[]);
	});
	it('should have all attrs avaiable in availableSKUs when initialized',function(){
		var aaSKU = new AASKU(attrGroups,availableSKUs);
		assert.deepEqual(aaSKU.availableAttrs,['red',"S","L","blue","yellow"]);
	});

	it('should extract all attributes from attributes groups and store in .allAttrs property',function(){
		var aaSKU = new AASKU(attrGroups,availableSKUs);
		assert.deepEqual(aaSKU.props.allAttrs,['red','blue','yellow','S',"M","L"]);
	});

	it('should selected right attrs',function(){
		var aaSKU = new AASKU(attrGroups,availableSKUs);
		aaSKU.selectAttr('red');
		aaSKU.selectAttr('S');
		assert.deepEqual(aaSKU.selectedAttrs,['red','S']);
	});

	it('should unselected attr when attr is already selected',function(){
		var aaSKU = new AASKU(attrGroups,availableSKUs);
		aaSKU.selectAttr('red');
		aaSKU.selectAttr('red');
		assert.deepEqual(aaSKU.selectedAttrs,[]);

		aaSKU.selectAttr('red');
		aaSKU.selectAttr('S');
		aaSKU.selectAttr('red');
		assert.deepEqual(aaSKU.selectedAttrs,["S"]);
	});

	it('should not select two attribute in same group, only the latest one be selected',function(){
		var aaSKU = new AASKU(attrGroups,availableSKUs);
		aaSKU.selectAttr('red');
		aaSKU.selectAttr('blue');
		assert.deepEqual(aaSKU.selectedAttrs,['blue']);
	});

	it('should return an object that has .selectedAttrs property when .selectAttr method is invoke',function(){
		var aaSKU = new AASKU(attrGroups,availableSKUs);
		var result = aaSKU.selectAttr('red');
		assert.deepEqual(result.selectedAttrs, ['red']);

	});

	it('shuold return an object with right .availableAttrs when .selectAttr method is invoke',function(){
		var attrGroups = [["red","blue","yellow"],["S","M","L"]];
		var availableSKUs = [
			["red","S"],
			["red","L"],
			["blue","L"],
			["yellow","L"],
		];
		var aaSKU = new AASKU(attrGroups,availableSKUs);
		var result = aaSKU.selectAttr('red');
		var expected = ['red','blue','yellow','S','L'];
		assert.equal(result.availableAttrs.length, ['red','blue','yellow','S','L'].length);
		assert.isTrue(isTwoArrayContain(result.availableAttrs, expected));
	});

	it('shuold return an object with right .availableAttrs when .selectAttr method is invoke',function(){
		var attrGroups = [["red","blue","yellow"],["S","M","L"]];
		var availableSKUs = [
			["red","S"],
			["red","L"],
			["blue","M"]
		];
		var aaSKU = new AASKU(attrGroups,availableSKUs);
		var result = aaSKU.selectAttr('blue');
		assert.isTrue(isTwoArrayIdentical(result.availableAttrs, ['red','blue','M']));

		var result = aaSKU.selectAttr('blue');
		assert.isTrue(isTwoArrayIdentical(result.availableAttrs, ['red','blue','S','M','L']));

	});
})
