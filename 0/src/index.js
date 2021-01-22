// code!!

// comment
/* terminated comment */

// variables
const CONSTANT_NAME = `you can't change this`;  // equivalent to a final variable in java
let VARIABLE_NAME = 'assignment';               // defines a variable
VARIABLE_NAME = 0; // this works

var GLOBAL_VAR = `don't do this ever`;          // defines a variable - DONT USE THIS
// javascript is a dynamically-typed language
// java is a statically-typed language

// String s = "Hello";
// int i = 1;
// double d = 0.0;
// ^ C type languages
// boolean b = false;

// functions

// old way of doing it
function name () {

};

// new way: "Arrow Notation"
const add = (a, b) => {
  return a + b;
};

// java
//  public static int add(int a, int b) {
//    return a + b;
// }

const hello = (name) => {
  return "Hello, " + name;
};

console.log('Hello, world!');
console.log(CONSTANT_NAME, VARIABLE_NAME, GLOBAL_VAR);

console.log();
// equivalent to System.out.println();
