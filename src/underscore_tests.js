/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (typeof n !== "undefined")
      return array.slice(0, n);
    else return array[0];
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (typeof n != "undefined"){
      if (n > array.length) {
        return array;
      }
      else {
        return array.slice(array.length - n, n + 1);
      }
    }
    else return array[array.length - 1];
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if ((typeof collection).toLowerCase() === "object") {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
    
    else if ((typeof collection).toLowerCase() === "array") {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    var isFound = -1;
    
    for (var i = 0; i < array.length; i++) {
      if (array[i] === target) {
        isFound = i;
        break;
      }
    }
    
    return isFound;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var collect = [];
    for (var i = 0; i < collection.length; i++) {
      if (iterator(collection[i])) {
        collect.push(collection[i]);
      }
    }
    return collect;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    var collect = [];
    for (var i = 0; i < collection.length; i++) {
      if (!iterator(collection[i])) {
        collect.push(collection[i]);
      }
    }
    return collect;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var unique = [];
    
    function isFound(query) {
      var found = false;
      for (var j = 0; j < unique.length; j++) {
        if (unique[j] === query) {
          found = true;
        }
      }
      return found;
    }
    for (var i = 0; i < array.length; i++) {
      if (!isFound(array[i])) {
        unique.push(array[i]);
      }
    }
    return unique;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var results = [];
    for (var i = 0; i < array.length; i++) {
      results.push(iterator(array[i]));
    }
    return results;
  };

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var results = [];
    
    for (var i = 0; i < array.length; i++) {
      results.push(array[i][propertyName]);
    }
    
    return results;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    var results = [];
    
    for (var i = 0; i < list.length; i++) {
      if ((typeof methodName).toLowerCase() === "string") {
        args = list[i][methodName];
        results.push(args.apply(list[i]));
      } else if ((typeof methodName).toLowerCase() === "function") {
        results.push(methodName.apply(list[i]));
      }
    }
    
    return results;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    var previousValue = initialValue || 0;
    // console.log(previousValue);
    
    for (var i = 0; i < collection.length; i++) {
      previousValue = iterator(previousValue, collection[i]);
    }
    
    return previousValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    var isFound = false;
    
    if ((typeof collection).toLowerCase() === "object"){
      for (var key in collection) {
        if (collection[key] === target) {
          isFound = true;
        }
      }
    } else if ((typeof collection).toLowerCase() === "array") {
      for (var i = 0; i < collection.length; i++) {
        if (collection[i] === target) {
          isFound = true;
        }
      }
    }
    
    return isFound;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    var isTrue = true;
    
    if (typeof iterator !== "undefined") {
      for (var i = 0; i < collection.length; i++) {
        if (!iterator(collection[i])) {
          isTrue = false;
        }
      }
    }
    
    return isTrue;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    var isTrue = false;
    
    if (typeof iterator === "undefined") {
      iterator = function(x) {
        if (x) {
          return true;
        } else return false;
      };
    }
    
    for (var i = 0; i < collection.length; i++) {
      if (iterator(collection[i])) {
        isTrue = true;
      }
    }
    
    return isTrue;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      for (var key1 in arguments[i]) {
        // var isFound = false;
        // console.log("other obj", key1);
        
        // for (var key2 in obj) {
        //   console.log("obj", key2);
        //   if (key1 === key2) {
        //     // console.log("found");
        //     isFound = true;
        //   }
        // }
        
        obj[key1] = arguments[i][key1];
        // if (!isFound) {
        // }
      }
    }
    
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      for (var key1 in arguments[i]) {
        var isFound = false;
        // console.log("other obj", key1);
        
        for (var key2 in obj) {
          // console.log("obj", key2);
          if (key1 === key2) {
            // console.log("found");
            isFound = true;
          }
        }
        
        if (!isFound) {
        obj[key1] = arguments[i][key1];
        }
      }
    }
    
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    func();
    return function () {
      
    }
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var memory = [];
    
    if (memory.length !== 0) {
      for (var i = 0; i < memory.length; i++) {
        if (func === memory[i]) {
          return memory[i];
        }
      }
    } else {
      memory.push(func);
      return func;
    }
  };
  
  
                //  ^^^  NO IDEA WHY THAT WORKED  ^^^  ask a mentor




  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = arguments;
    
    return setTimeout(function() {
      var params = [];
      
      for (var i = 2; i < args.length; i++) {
        params.push(args[i]);
      }
      
      func.apply(null, params);
    }, wait);
  };



  // Shuffle an array.
  _.shuffle = function(array) {
    var tempArr = array.slice(), 
    resultArr = [], 
    rand = function() { return Math.floor(Math.random() * tempArr.length); };
    
    for (var i = 0; i < array.length; i++) {
      var j = rand();
      
      resultArr.push(tempArr.splice(j, 1)[0]);
    }
    
    return resultArr;
  };



  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if ((typeof iterator) === "function") {
      collection.sort(function (a, b) {
        return iterator(a) - iterator(b);
      });
    }
    
    else if ((typeof iterator) === "string")
    {
      collection.sort(function(a, b) {
        return a.length - b.length;
      });
    }
    
    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var result = [], longestArr = 0;
    
    for (var i = 0; i < arguments.length; i++) {
      if (longestArr < arguments[i].length) {
        longestArr = arguments[i].length;
      }
    }
    
    for (var i = 0; i < longestArr; i++) {
      var arrForIndex = [];
      
      for (var j = 0; j < arguments.length; j++) {
        arrForIndex.push(arguments[j][i]);
      }
      
      result.push(arrForIndex);
    }
    
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
    result = [];
    
    function seekValues(arr) {
      for (var i = 0; i < arr.length; i++) {
        if ((typeof arr[i]).toLowerCase() === "array" || (typeof arr[i]).toLowerCase() === "object") {
          seekValues(arr[i]);
        } else {
          result.push(arr[i]);
        }
      }
    }
    
    seekValues(nestedArray);
    
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var result = [];
    
    for (var i = 0; i < arguments.length; i++) {
      for (var j = 0; j < arguments[i].length; j++) {
        var instance = 0;
        
        for (var k = 0; k < arguments.length; k++) {
          for (var l = 0; l < arguments[k].length; l++) {
            if (arguments[i][j] === arguments[k][l]) {
              var addToArr = true;
              
              for (var m = 0; m < result.length; m++) {
                if (arguments[i][j] === result[m]) {
                  addToArr = false;
                  break;
                }
              }
              
              if (addToArr)
                instance++;
            }
          }
        }
        
        if (instance === arguments.length) {
          result.push(arguments[i][j]);
        }
      }
    }
    
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var result = array.slice();
    
    for (var i = 0; i < result.length; i++) {
      var valueToCheck = result[i];
      
      for (var j = 1; j < arguments.length; j++) {
        for (var k = 0; k < arguments[j].length; k++) {
          if (valueToCheck === arguments[j][k]) {
            result.splice(i, 1);
            i--;
          }
        }
      }
    }
    
    return result;
  };

}).call(this);
