//https://leetcode.com/problems/number-of-zigzag-arrays-i/description/?envType=daily-question&envId=2026-06-23

// 3699. Number of ZigZag Arrays I
// Hard
// Companies
// You are given three integers n, l, and r.

// A ZigZag array of length n is defined as follows:

// Each element lies in the range [l, r].
// No two adjacent elements are equal.
// No three consecutive elements form a strictly increasing or strictly decreasing sequence.
// Return the total number of valid ZigZag arrays.

// Since the answer may be large, return it modulo 109 + 7.

// A sequence is said to be strictly increasing if each element is strictly greater than its previous one (if exists).

// A sequence is said to be strictly decreasing if each element is strictly smaller than its previous one (if exists).

 

// Example 1:

// Input: n = 3, l = 4, r = 5

// Output: 2

// Explanation:

// There are only 2 valid ZigZag arrays of length n = 3 using values in the range [4, 5]:

// [4, 5, 4]
// [5, 4, 5]​​​​​​​
// Example 2:

// Input: n = 3, l = 1, r = 3

// Output: 10

// Explanation:

// There are 10 valid ZigZag arrays of length n = 3 using values in the range [1, 3]:

// [1, 2, 1], [1, 3, 1], [1, 3, 2]
// [2, 1, 2], [2, 1, 3], [2, 3, 1], [2, 3, 2]
// [3, 1, 2], [3, 1, 3], [3, 2, 3]
// All arrays meet the ZigZag conditions.

 

// Constraints:

// 3 <= n <= 2000
// 1 <= l < r <= 2000
// -----------------------------------------------------------------------------------------------------------------
// Problem Analysis

// LeetCode 3699 — Number of ZigZag Arrays I

// Core Concepts
    // * Dynamic Programming
    // * State Design
    // * Transition Optimization
    // * Prefix Sums / Suffix Sums
    // * Counting problems under modulo
// Data Structures Involved
    // * Arrays
    // * DP tables
    // * Prefix sum arrays
// Algorithms / Patterns Involved
// DP on sequences
// State compression
// Prefix-sum optimized transitions
// Common Traps
    //1. Checking only adjacent elements is not enough.

    //2.  The condition:

        // *  No a < b < c
        // * No a > b > c

        // means the direction must alternate.

    //3. A naive DP transition becomes O(n·m²) and is too slow.
    //4. Missing modulo operations.
    //5. Using actual values [l,r] instead of compressing them into m = r-l+1 positions.
//------------------------------------------------------------------------------------------------------------------

// Learning Path

// Before solving the actual problem, we need to build several ideas.

// Level 1 — Understanding ZigZag
    // Sub-problem 1
    // Question

    // Given three numbers (a,b,c), determine whether they form a valid zigzag.

    // A triple is valid if:

    // a < b > c
    // or
    // a > b < c

    // Otherwise it is invalid.

    // Example

    // Input:
    // 1, 3, 2

    // Output:
    // true

    // Input:
    // 1, 2, 3

    // Output:
    // false
    // What it teaches:
    // Local zigzag condition
    // Detecting peaks and valleys

//------------------------------------------------------------------------------------------------------------------
    //answer:
    // function isZigZagTriple(a,b,c){
    //     return(a<b && b>c) || (a>b && b<c);
    // }

    // console.log(isZigZagTriple(1,3,2));

    // console.log(isZigZagTriple(1,2,3))
//------------------------------------------------------------------------------------------------------------------
    // Sub-problem 2
    // Question

    // Given an array, determine whether every consecutive triple forms a zigzag.

    // Example

    // Input
    // [1,3,2,4,1]

    // Output
    // true

    // Input
    // [1,2,3,2]

    // Output
    // false

    // What it teaches
        // Understanding the global constraint
        // Sliding through triples
//------------------------------------------------------------------------------------------------------------------
//answer:
// function isZigZagArray(arr){
//     if(arr.length < 3) return true;

//     for(let i = 0 ; i<= arr.length -3; i++) {
//         const a = arr[i];
//         const b = arr[i + 1];
//         const c = arr[i + 2];

//         if(!((a <b && b> c) || (a>b && b < c))) {
//             return false;
//         }
//     }
//     return true;
// } 

// console.log(isZigZagArray([1,3,2,4,1]))// true
// console.log(isZigZagArray([1,2,3,2])) // false
//------------------------------------------------------------------------------------------------------------------
// Level 2 — Counting Small Cases
    // Sub-problem 3
    // Question

    // For values in [1,3], count all valid arrays of length 3.

    // Example

    // Input
    // n = 3
    // values = [1,2,3]

    // Output
    // 10
    // What it teaches
        // Brute force generation
        // Observing patterns
 //-----------------------------------------------------------------------------------------------------------------
 //answer:
//  function countLength3() {
//     let count = 0;
//     for(let a = 1; a<= 3; a++) {
//         for(let b = 1; b <= 3; b++) {
//             for(let c = 1; c <= 3; c++){
//                 // console.log(`[${a}, ${b}, ${c}]`)
//                 if((a>b && b< c) || (a<b && b> c)) {
//                     console.log(`[${a}, ${b}, ${c}]`)
//                     count ++;
//                 }
//             }
//         }
//     }
//     return count;
//  }
//  console.log(countLength3());
//------------------------------------------------------------------------------------------------------------------

    // Sub-problem 4
    // Question

    // Let

    // dp[len][last]

    // represent the number of arrays of length len ending with value last, with adjacent values different.
                                                                                                             
    // Build the recurrence.

    // Example

    // Values:
    // 1..3

    // Length:\
    // 4
    // What it teaches
        // Basic sequence DP
        // Counting extensions
// Level 3 — Tracking Direction

// The actual difficulty begins here.

// Observation

// To determine whether the next value is valid, knowing only the last value is insufficient.

// You also need to know whether the previous move was:

// up
// or
// down
// Sub-problem 5
// Question

// Design a DP state that stores:

// last value
// last comparison direction

// Possible directions:

// UP
// DOWN

// Example:

// 1 → 4

// Direction = UP

// 5 → 2

// Direction = DOWN

// What it teaches
// State augmentation
// Why DP needs additional information
// Sub-problem 6
// Question

// Suppose:

// Current state:
// last value = x
// last direction = UP

// Which values y can be appended?

// Example

// Current:

// 2 → 5

// (last direction = UP)

// Possible next values?

// What it teaches
// Deriving transitions
// Understanding alternating directions
// Level 4 — Building the Actual DP
// Sub-problem 7
// Question

// Define:

// dp[i][UP][x]
// dp[i][DOWN][x]

// where:

// length = i
// ends at value x
// next move must go in opposite direction

// Write the transition formula.

// Example

// Consider values:

// 1..5

// How can states ending at value 3 be updated?

// What it teaches
// Full DP recurrence
// State transitions
// Level 5 — Complexity Analysis
// Sub-problem 8
// Question

// If for every value x we iterate through every value y, what is the complexity?

// Assume:

// n = 2000
// m = r-l+1 = 2000
// What it teaches
// Detecting TLE
// Complexity estimation

// Expected realization:

// O(n * m²)

// is too large.

// One-Step-Before-Final
// Sub-problem 9
// Question

// Suppose you have:

// dpUp[x]
// dpDown[x]

// for the current layer.

// Can you compute:

// sum of all dpUp values less than x
// sum of all dpDown values greater than x

// in O(1) per value after preprocessing?

// Example
// dpUp = [2,5,1,4]

// Build a prefix-sum structure.

// What it teaches
// Prefix sums
// Suffix sums
// Transition optimization from O(m²) → O(m)

// This is the final idea needed before the complete solution.

// Your First Exercise

// Start with Sub-problem 1:

// Write a JavaScript function:

// function isZigZagTriple(a, b, c)

// that returns true if:

// a < b > c
// or
// a > b < c

// otherwise returns false.