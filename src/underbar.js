(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
      return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.

  // Takes an array and a number n (number of items from last number to specify)
    // Checks if n was given, if it's undefined or not
        // It no n was given, it assumes you want just last and returns last array[index]
    // else if n is given
        // return array.slice of array.length - n, cover cases where n makes the slice negative vis-a-vis array.length

  _.last = function(array, n) {
      if(n === undefined){
          return (array[array.length - 1]);
      }else{
          return (array.slice([Math.max(0, array.length - n)])); // slice needs 0 to be specified as bottom limit in case negative numbers are passed
      }
  };

  // Could also be written as:

  _.last = function(array, n) {
      return n === undefined ? array[array.length - 1] : array.slice([Math.max(0, array.length - n)]);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.

  // Takes a collection and an iterator function
    // Checks if collection is an array
        // Passes array item info to iterator
    // Else if collection is an object
        // Passes object info to iterator

  _.each = function(collection, iterator) {
    if(Array.isArray(collection)){
        for(var i = 0, length = collection.length; i <length; i++){
            iterator(collection[i], i, collection);
        }
    }else{
        for(var k in collection){
            iterator(collection[k], k, collection);
        }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.

  // Takes a collection and a testing function
    // Create an array of elements passed as true to later return
    // Use _.each taking the collection and a function that will use each item in the collection
        // If the collection item passes the test
            // Then push the item to the array of truthy elements
    // Return the array of truth elements

  _.filter = function(collection, test) {
      var arrayOfTestedThings = [];
      _.each(collection, function(givenCollectionItem){
          if(test(givenCollectionItem)){
            arrayOfTestedThings.push(givenCollectionItem);
          }
      });
      return arrayOfTestedThings;
  };

  // Return all elements of an array that don't pass a truth test.

    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    // Note: We can call the inverse of a function when made into a "callback" w/in another function

    // Takes a collection and a testing function
        // Return _.filter taking the collection and a function that uses a given collection item
            // Returns the inverse or opposite ! of the truthy test(givenCollectionItem)

  _.reject = function(collection, test) {
      return _.filter(collection, function(givenCollectionItem){
          return !test(givenCollectionItem);
      });
  };

  // Produce a duplicate-free version of the array.

  // Takes an array
    // Create an array of Elements proven to be Unique
    // Use _.each to take the array and a function that uses the given element from the array
        // If the given element does NOT exists in the array of unique elements already
            // Push the element to the array of unique elements
  // Return the array of unique elements

  _.uniq = function(array) {
      var arrayOfUniqueElements = [];
      _.each(array, function(givenArrayElement){
          if(_.indexOf(arrayOfUniqueElements, givenArrayElement) === -1){
              arrayOfUniqueElements.push(givenArrayElement);
          }
      });
      return arrayOfUniqueElements;
  };

  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

        // Create an array to store results of collection elements passed through iterator
        // Use _.each to take the collection and a function that uses those elements
            // Push the results of each element passed to the iterator to the array to results array
        // Return the array of results

        var arrayOfIteratedElementResults = [];
        _.each(collection, function(collectionElement){
            arrayOfIteratedElementResults.push(iterator(collectionElement));
        });
        return arrayOfIteratedElementResults;
    };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  // Takes a collection, an iterator that uses the elements of the collection, and an accumulator value
    // First check to see if the accumulator has been defined/passed in - create accumulator undefined checker value
    // Use _.each taking the collection and a function that will do something with its elements
        // If the accumulator isn't defined
            // Then set the accumulator to equal the first element in the collection
        // Else if the accumulator is defined
            // Then increments the accumulator setting it equal to the result of the iterator function taking the current accumulator value and the next element value to be acted on
    // Return the accumulator

  _.reduce = function(collection, iterator, accumulator) {
      var checkIfAccumulatorUndefined = arguments.length < 3;
    _.each(collection, function(nextGivenElement){
      if(checkIfAccumulatorUndefined){
        accumulator = nextGivenElement;
        checkIfAccumulatorUndefined = false;
      }else{
        accumulator = iterator(accumulator, nextGivenElement);
      }
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.

  _.every = function(collection, truthyIteratorTest) {
    // TIP: Try re-using reduce() here.

    // Check that iterator defined
        // If not, set with _.identity
    // Return _.reduce using collection, a Testing function tracking truthiness, current item, & base truthy case
        // If truthy so far && iterator(currentItem) also truthy
            // Return true
        // Else
            // Return false

    if(truthyIteratorTest === undefined){
        truthyIteratorTest = _.identity;
    }
    return _.reduce(collection, function(truthyThusFar, currentItem){
        if(truthyThusFar && truthyIteratorTest(currentItem)){
            return true;
        }else{
            return false;
        }
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, truthyTestingIterator) {
    // TIP: There's a very clever way to re-use every() here.

    // Check that iterator defined
        // If not, set with _.identity
    // Return NOT every using collection and test
        // that Returns NOT testingIteratorFunction(item)
    // -- Note that these two BANG! undo themselves and return true if "Not Not" all true; i.e. "some" true --

    if(truthyTestingIterator === undefined){
        truthyTestingIterator = _.identity;
    }
    return !(_.every(collection, function(collectionItem){
        return !(truthyTestingIterator(collectionItem));
    }));
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla

  // Takes an object
    // Use _.each to iterate through the array of arguments
        // Use _.each to iterate through each argument object in the array
            // Pass each element as a property w/key to the object
    // Return newly extended object

  _.extend = function(obj) {
    _.each(arguments, function(argumentElement){
        _.each(argumentElement, function(argumentElement, key){
            obj[key] = argumentElement;
        });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
      // Use _.each to iterate through the array of arguments
        // Use _.each to iterate through each argument object in the array
            //  Check to see if the obj[key] already exists so as to not override
                // If not, then Pass each element as a property w/key to the object
    // Return newly extended object
      _.each(arguments, function(argumentElement){
          _.each(argumentElement, function(argumentElement, key){
              if(!obj.hasOwnProperty(key)){
                 obj[key] = argumentElement;
                 }
          });
      });
      return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    // Create an object to store results
    // Encapsulate operations within a Returned function -- memoize takes a function and produces a 'new' behaving one
        // Create a variable to access given arguments using Array.prototype.slice.call
        // If the given argument does not already exist in stored results object -- property w/ key and value --
            // Pass stored results object that given argument as a using -- func.apply passes info between functions --
        // Return stored results
    var storedResults = {};
    return function(){
      var givenArguments = Array.prototype.slice.call(arguments);
      if (storedResults[givenArguments] === undefined){
        storedResults[givenArguments] = func.apply(this, givenArguments);
      }
      return storedResults[givenArguments];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
      // Create variable to hold Array.prototype.slice.call to access arguments (func, and time)
      // Return set time out function using that variable in func.apply
        // Passing in given arguments and wait time amt
        var givenArguments = Array.prototype.slice.call(arguments, 2);
        return setTimeout(function(){
            func.apply(this, givenArguments);
        }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
  // Create a copy of the array
    // Create an empty array to store shuffled elements
    // Use for loop to loop through array copy elements
        // Create value to randomize index locations access order
        // Push arrayCopy[random index location] to shuffled array
        // Remove arrayCopy[random index location] so it doesn't get duplicated before picking random index again
    // Return shuffled array
    var arrayCopy = array.slice();
    var shuffledArray = [];
    for(var i =0; i < array.length; i++){
      var randomIndex = Math.floor(Math.random() * arrayCopy.length);
      shuffledArray.push(arrayCopy[randomIndex]);
      arrayCopy.splice(randomIndex, 1);
    }
    return shuffledArray;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
