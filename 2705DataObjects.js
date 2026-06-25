// 2705. Compact Object
// Medium
// premium lock icon
// Companies
// Given an object or array obj, return a compact object.

// A compact object is the same as the original object, except with keys containing falsy values removed. This operation applies to the object and any nested objects. Arrays are considered objects where the indices are keys. A value is considered falsy when Boolean(value) returns false.

// You may assume the obj is the output of JSON.parse. In other words, it is valid JSON.

 

// Example 1:

// Input: obj = [null, 0, false, 1]
// Output: [1]
// Explanation: All falsy values have been removed from the array.
// Example 2:

// Input: obj = {"a": null, "b": [false, 1]}
// Output: {"b": [1]}
// Explanation: obj["a"] and obj["b"][0] had falsy values and were removed.
// Example 3:

// Input: obj = [null, 0, 5, [0], [false, 16]]
// Output: [5, [], [16]]
// Explanation: obj[0], obj[1], obj[3][0], and obj[4][0] were falsy and removed.
 

// Constraints:

// obj is a valid JSON object
// 2 <= JSON.stringify(obj).length <= 106

// Problem Analysis
// Core Concepts
// Recursion
// Tree/graph-like traversal of nested structures
// JavaScript truthy/falsy values
// Object and Array manipulation
// Data Structures Involved
// Objects
// Arrays
// Nested Objects/Arrays
// Algorithms / Patterns Involved
// Recursive DFS traversal
// Post-order processing (process children before deciding whether to keep them)
// Common Traps
// Trap 1

// Confusing:

// 0
// false
// ""
// null
// undefined
// NaN

// All of these are falsy and must be removed.

// Trap 2

// Removing falsy values from arrays changes indices.

// Example:

// [1, 0, 2]

// becomes:

// [1, 2]
// Trap 3

// Objects and arrays themselves are always truthy.

// Example:

// {}
// []

// are truthy.

// Do not remove them simply because they are empty.

// Trap 4

// The problem requires compacting nested structures recursively.

// Example:

// {
//   a: null,
//   b: {
//     c: false
//   }
// }

// must process the nested object too.

// Learning Path
// Level 1 — Truthy vs Falsy
// Sub-problem 1
// Question

// Write:

// function isTruthy(value)

// that returns whether JavaScript considers the value truthy.

// Example
// isTruthy(0)

// Output:

// false
// isTruthy("hello")

// Output:

// true
// What it teaches

// Understanding the core rule the entire problem is based on.

//------------------------------------------------------------------------------------------------------------------
//my answer:
// function isTruthy(value){
//     return Boolean(value);
// }

// console.log(isTruthy(0));
// console.log(isTruthy({}));
// console.log(isTruthy("Hello"));

// Level 1 Solution
// function isTruthy(value) {
    //     return Boolean(value);
    // }
    // Complexity
    
    // Time: O(1)
    
    // Space: O(1)
    
//------------------------------------------------------------------------------------------------------------------
// Level 2 — Compact a Flat Array
// Sub-problem 2
// Question

// Remove all falsy values from an array.

// Example

// Input

// [0, 1, false, 2, "", 3]

// Output

// [1, 2, 3]
// What it teaches

// Filtering elements.
//------------------------------------------------------------------------------------------------------------------
//my answer:
// function compactArray(arr) {
//     // return arr.filter(element => Boolean(element)=== true)
//     return arr.filter(Boolean)
// }

// console.log(compactArray([0, 1, false, 2, "", 3]))
// Level 2 Solution
// function compactArray(arr) {
//     return arr.filter(Boolean);
// }
// Complexity

// Time: O(n)

// Space: O(n)

// Level 3 — Compact a Flat Object
// Sub-problem 3
// Question

// Remove all keys whose values are falsy.

// Example

// Input

// {
//     a: null,
//     b: 1,
//     c: false,
//     d: "hello"
// }

// Output

// {
//     b: 1,
//     d: "hello"
// }
// What it teaches

// Object traversal.
//------------------------------------------------------------------------------------------------------------------
// my answer:
function compactObject(obj){
    const result = {};
    for(let key in obj) {
        if(obj[key]) {
            result[key] = obj[key]
        }
    }
    return result;
}
// Level 3 Solution
// function compactObject(obj) {
//     const result = {};

//     for (const key in obj) {
//         if (obj[key]) {
//             result[key] = obj[key];
//         }
//     }

//     return result;
// }
// Complexity

// Time: O(n)

// Space: O(n)

//------------------------------------------------------------------------------------------------------------------

// Level 4 — Traverse Nested Structures
// Sub-problem 4
// Question

// Print every primitive value in a nested object.

// Example

// Input

// {
//     a: 1,
//     b: {
//         c: 2,
//         d: {
//             e: 3
//         }
//     }
// }

// Output

// 1
// 2
// 3
// What it teaches

// Recursive traversal.

//------------------------------------------------------------------------------------------------------------------
// my answer:
// function traverse(value) {
//     if(typeof value !== "object" || value === null) {
//         console.log(value);
//     }
//     for(const key in value) {
//         traverse(value[key]);
//     }
// }
// traverse({
//     a: 1,
//     b: {
//         c: 2,
//         d: {
//             e: 3
//         }
//     }
// })

// Level 4 Solution
// function traverse(value) {

//     if (typeof value !== "object" || value === null) {
//         console.log(value);
//         return;
//     }

//     for (const key in value) {
//         traverse(value[key]);
//     }
// }
// Complexity

// Time: O(n)

// Space: O(depth)
//------------------------------------------------------------------------------------------------------------------


// Level 5 — Compact Nested Arrays
// Sub-problem 5
// Question

// Recursively remove falsy values from nested arrays.

// Example

// Input

// [1, 0, [2, false, 3]]

// Output

// [1, [2, 3]]
// What it teaches

// Recursion with array reconstruction.
//------------------------------------------------------------------------------------------------------------------
// my answer:
// function compactNestedArray(arr){
//     let result = [];

//     for( let element of arr) {
//         if(Array.isArray(element)) {
//             result.push(compactNestedArray(element));
//         } else if(Boolean(element)){
//             result.push(element);
//         }
//     }
//     return result;
// }

// console.log(compactNestedArray([1, 0, [2, false, 3]]))

// Level 5 Solution
// function compactNestedArray(arr) {
//     const result = [];

//     for (const value of arr) {

//         if (Array.isArray(value)) {
//             result.push(compactNestedArray(value));
//         }
//         else if (Boolean(value)) {
//             result.push(value);
//         }
//     }

//     return result;
// }
// Complexity

// Time: O(n)

// Space: O(depth)
//------------------------------------------------------------------------------------------------------------------

// Level 6 — Compact Nested Objects
// Sub-problem 6
// Question

// Recursively remove falsy values from nested objects.

// Example

// Input

// {
//     a: 1,
//     b: {
//         c: 0,
//         d: 2
//     }
// }

// Output

// {
//     a: 1,
//     b: {
//         d: 2
//     }
// }
// What it teaches

// Recursive object rebuilding.

//------------------------------------------------------------------------------------------------------------------
// my answer:
// function compactNestedObject(obj) {
//     let result = {}

//     for(let key in obj) {
//         const value = obj[key];
//         if(typeof value === "object") {
//             result[key] = compactNestedObject(value)
//         } else if( Boolean(value)) {
//             result[key] = value
//         }
//     }
//     return result;
// }

// console.log(compactNestedObject({
//     a: 1,
//     b: {
//         c: 0,
//         d: 2
//     }
// }))

// Level 6 Solution
// function compactNestedObject(obj) {

//     const result = {};

//     for (const key in obj) {

//         const value = obj[key];

//         if (typeof value === "object" && value !== null) {
//             result[key] = compactNestedObject(value);
//         }
//         else if (Boolean(value)) {
//             result[key] = value;
//         }
//     }

//     return result;
// }
// Complexity

// Time: O(n)

// Space: O(depth)

// One-Step-Before-Final
// Sub-problem 7
// Question

// Write a function that:

// Detects whether current value is:
// primitive
// array
// object
// Recursively compacts children.
// Returns the compacted structure.
// Example

// Input

// {
//     a: null,
//     b: [false, 1, 2],
//     c: {
//         d: 0,
//         e: 3
//     }
// }

// Output

// {
//     b: [1, 2],
//     c: {
//         e: 3
//     }
// }
// What it teaches

// The exact recursive framework needed for the final problem.

// Key Insight for the Actual Problem

// The entire problem boils down to:

// If value is primitive:
//     return value

// If value is array:
//     recursively compact every element
//     remove falsy elements

// If value is object:
//     recursively compact every property
//     remove falsy values

// Notice the pattern:

// Process children first
// ↓
// Then decide whether to keep them

//------------------------------------------------------------------------------------------------------------------
//my answer:
// function compactObject(obj) {
//     if(typeof obj !== "object") {
//         return obj;
//     } else if( Array.isArray(obj)) {
//         let result = [];
//         for(let element of obj) {
//             if(Array.isArray(element)) {
//                 result.push(compactObject(element));
//             }    else if(Boolean(element)) {
//                 result.push(element);
//             }
//         }
//         return result;
//     } else if(typeof obj === "object") {
//         let result = {};
//         for(let key in obj) {
//             let value = obj[key];

//             if(typeof value === "object") {
//                 result[key] = compactObject(value);
//             } else if(Boolean(value)){
//                 result[key] = value;
//             }
//         }
//     return result;
//     }
// }

// console.log(compactObject({
//      a: null,
//      b: [false, 1, 2],
//      c: {
//          d: 0,
//          e: 3
//      }
//  }))