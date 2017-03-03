'use strict';

var testHelpers = exports;

// Your code goes here.

function fullName(name) {
  return (name.first + ' ' + name.last);
}


function prefix() {
  return ('Mr.');
}

var helpers = {
  fullName: fullName,
  prefix: prefix
};

testHelpers.registerHelpers = function registerHelpers(Handlebars) {
  Handlebars.registerHelper(helpers);
};

/*
testHelpers.registerHelpers = function registerHelpers (Handlebars) {
  Handlebars.registerHelper('fullName', function(name) {
    return ('fullName: ' + name.first + ' ' + name.last);
  });
}
*/

module.exports = testHelpers
