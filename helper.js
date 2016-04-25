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

function mergeArray(arr,mergePoint) {
    if (arr.length == 1 || mergePoint == arr.length) {
        return arr;
    }
    var p = mergePoint;
    while (p > 0) {
        var arr1 = arr[mergePoint];
        var arr2 = arr[p - 1];
        var unique = arr1.concat(arr2).unique();
        if (unique.length < (arr1.length + arr2.length)) {
            arr.splice(mergePoint - 1, 2);
            arr.splice(mergePoint - 1, 0, unique);
            return mergeArray(arr, p);
        } else {
            p--;
        }
    }
    return mergeArray(arr, mergePoint + 1);
}

function isTwoArrayContain(container,containee){
	var result = true;
	containee.forEach(function(e){
		if(container.indexOf(e) == -1){
			result = false;
		}
	})
	return result;
}
function reAggretionArray(source){
	var result = [];
	for(var i = 1; i <= source.length; i++){
		result.push(source.slice(0,i));
	}
	return result;
}

exports.mergeArray = mergeArray;
exports.isTwoArrayContain = isTwoArrayContain;
exports.reAggretionArray = reAggretionArray;