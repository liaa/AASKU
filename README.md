# AASKU

An object that help you figure out sku problem

## Example 1: select only one attribute

```js
    var attrGroups = [
        ['银色', '金色', '深空灰', '玫瑰金色'],
        ['16GB', '64GB', '128GB']
    ];
    
    var skus = [
        ['银色', '16GB'],
        ['银色', '64GB'],
        ['银色', '128GB'],
        ['金色', '64GB'],
        ['深空灰', '16GB'],
        ['玫瑰金', '16GB'],
    ];
    
    var aaSKU = new AASKU(attrGroups, skus);
    var result = aaSKU.selectAttr('金色');
```

Now `result` should be:

    {
        availableAttrs: ['银色', '金色', '深空灰', '玫瑰金', '64GB'],
        selectedAttrs: ['金色']
    }
    

## Example 2: select all attributes of a sku

```js
    var attrGroups = [
        ['银色', '金色', '深空灰', '玫瑰金色'],
        ['16GB', '64GB', '128GB']
    ];
    
    var skus = [
        ['银色', '16GB'],
        ['银色', '64GB'],
        ['银色', '128GB'],
        ['金色', '64GB'],
        ['深空灰', '16GB'],
        ['玫瑰金', '16GB'],
    ];
    
    var aaSKU = new AASKU(attrGroups, skus);
    aaSKU.selectAttr('金色');
    var result = aaSKU.selectAttr('64GB');
```

Now `result` should be:

    {
        availableAttrs: ['银色', '金色', '64GB'],
        selectedAttrs: ['金色','64GB']
    }
    
## Example 3: unselect an attribute

To unselect a attribute just select it again, AASKU will do the unselect action and return the result.

```js
    // select '金色'
    aaSKU.selectAttr('金色');
    // unselect '金色'
    aaSKU.selectAttr('金色');
```