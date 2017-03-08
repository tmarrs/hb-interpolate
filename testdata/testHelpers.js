'use strict';

var testHelpers = exports;

// Your private helper methods go here.

function fullName(name) {
  return (name.first + ' ' + name.last);
}


function prefix() {
  return ('Mr.');
}

/* Put all your helper methods in the helpers object - it's an Object Literal in JS.
   Your helper method name goes on the right-hand side of the ':'
*/
var helpers = {
  fullName: fullName,
  prefix: prefix
};


// Export your registerHelpers() method and use Handlebars to register all your helper methods.
testHelpers.registerHelpers = function registerHelpers(Handlebars) {
  Handlebars.registerHelper(helpers);
};


module.exports = testHelpers;
