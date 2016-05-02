// some helper function
Array.prototype.unique = function () {
	var a = this.concat();
	for (var i = 0; i < a.length; ++i) {
		for (var j = i + 1; j < a.length; ++j) {
			if (a[i] === a[j])
				a.splice(j--, 1);
		}
	}
	return a;
};

function mergeRelativeArray(arr, mergePoint) {
	if (arr.length == 1 || mergePoint == arr.length) {
		return arr;
	}
	var p = mergePoint;
	while (p > 0) {
		var arr1 = arr[mergePoint];
		var arr2 = arr[p - 1];
		var unique = arr2.concat(arr1).unique();
		if (unique.length < (arr1.length + arr2.length)) {
			arr.splice(mergePoint, 1);
			arr[p - 1] = unique;
			return mergeRelativeArray(arr, 1);
		} else {
			p--;
		}
	}
	return mergeRelativeArray(arr, mergePoint + 1);
}


function isTwoArrayContain(container, containee) {
	var result = true;
	containee.forEach(function (e) {
		if (container.indexOf(e) == -1) {
			result = false;
		}
	})
	return result;
}

function isTwoArrayContain(container, containee) {
	var result = true;
	containee.forEach(function (e) {
		if (container.indexOf(e) == -1) {
			result = false;
		}
	})
	return result;
}

function reAggretionArray(source) {
	var result = [];
	for (var i = 1; i <= source.length; i++) {
		result.push(source.slice(0, i));
	}
	return result;
}

function AASKU(attrGroups, availableSKUs) {
	this.props = {};
	this.props.attrGroup = attrGroups;
	this.props.availableSKUs = availableSKUs;
	this.props.allAttrs = [];
	var that = this;
	attrGroups.forEach(function (group) {
		that.props.allAttrs = that.props.allAttrs.concat(group);
	});
	this.availableAttrs = [];
	availableSKUs.forEach(function (sku) {
		that.availableAttrs = that.availableAttrs.concat(sku).unique();
	});
	this.selectedAttrs = [];
}

AASKU.prototype.getAllAttrs = function () {
	var result = [];
	this.props.attrGroup.forEach(function (group) {
		result = result.concat(group);
	});
	return result;
}
AASKU.prototype.getAllAvailableAttrs = function () {
	var result = [];
	this.props.availableSKUs.forEach(function (sku) {
		result = result.concat(sku);
	});
	return result.unique();
}

AASKU.prototype.selectAttr = function (attr) {
	var that = this;
	var isAlreadySelected = (this.selectedAttrs.indexOf(attr) != -1);
	var groupIndexOfAttr = this.groupIndexOfAttr(attr);
	if (isAlreadySelected) {
		var selectedIndex = this.selectedAttrs.indexOf(attr);
		this.selectedAttrs.splice(selectedIndex, 1);
	} else {
		this.selectedAttrs.forEach(function (selectedAttr, idx) {
			var goupIndexOfAlreadySelectedAttr = that.groupIndexOfAttr(selectedAttr);
			if (groupIndexOfAttr == goupIndexOfAlreadySelectedAttr) {
				that.selectedAttrs.splice(idx, 1);
			}
		});
		this.selectedAttrs.push(attr);
	}
	return this.calculate();
}

AASKU.prototype.calculate = function () {
	var that = this;
	var result = {};
	result.availableAttrs = this.getAllAvailableAttrs();

	var latestSelectedAttr = this.selectedAttrs.slice(-1)[0];

	var reAggretedSelectedList = reAggretionArray(this.selectedAttrs);
	reAggretedSelectedList.forEach(function (reAggretedSelectedItem) {

		var latestSelectedAttr = reAggretedSelectedItem.slice(-1)[0];
		var groupindexOfLatestSelectedAttr;
		that.props.attrGroup.forEach(function (group, idx) {
			if (group.indexOf(latestSelectedAttr) != -1) {
				groupindexOfLatestSelectedAttr = idx;
			}
		});

		that.props.availableSKUs.forEach(function (combine) {
			var isContain = false;
			if (isTwoArrayContain(combine, reAggretedSelectedItem)) {
				isContain = true;
			}

			if (!isContain) {
				combine.forEach(function (combineAttr, idx) {
					if (idx != groupindexOfLatestSelectedAttr) {
						var indexToDelete = result.availableAttrs.indexOf(combineAttr);
						if (indexToDelete != -1) {
							result.availableAttrs.splice(indexToDelete, 1);
						}
					}
				})
			} else {
				combine.forEach(function (combineAttr) {
					if (result.availableAttrs.indexOf(combineAttr) != -1) {
						result.availableAttrs = result.availableAttrs.concat(combine);
					}
				})
			}

		})
	})

	result.availableAttrs = result.availableAttrs.unique();

	result.selectedAttrs = this.selectedAttrs;
	return result;
}

AASKU.prototype.groupIndexOfAttr = function (attr) {
	var groupIndexOfAttr = -1;
	this.props.attrGroup.forEach(function (group, idx) {
		if (group.indexOf(attr) != -1) {
			groupIndexOfAttr = idx;
		}
	});
	return groupIndexOfAttr;
}

module.exports = AASKU;

