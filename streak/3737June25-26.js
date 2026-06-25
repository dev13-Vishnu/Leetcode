// 3737. Count Subarrays With Majority Element I
// Medium
// Topics
// premium lock icon
// Companies
// Hint
// You are given an integer array nums and an integer target.

// Return the number of subarrays of nums in which target is the majority element.

// The majority element of a subarray is the element that appears strictly more than half of the times in that subarray.

 

// Example 1:

// Input: nums = [1,2,2,3], target = 2

// Output: 5

// Explanation:

// Valid subarrays with target = 2 as the majority element:

// nums[1..1] = [2]
// nums[2..2] = [2]
// nums[1..2] = [2,2]
// nums[0..2] = [1,2,2]
// nums[1..3] = [2,2,3]
// So there are 5 such subarrays.

// Example 2:

// Input: nums = [1,1,1,1], target = 1

// Output: 10

// Explanation:

// ​​​​​​​All 10 subarrays have 1 as the majority element.

// Example 3:

// Input: nums = [1,2,3], target = 4

// Output: 0

// Explanation:

// target = 4 does not appear in nums at all. Therefore, there cannot be any subarray where 4 is the majority element. Hence the answer is 0.

 

// Constraints:

// 1 <= nums.length <= 1000
// 1 <= nums[i] <= 10​​​​​​​9
// 1 <= target <= 109

// Level 1 — Understanding Majority
// Sub-problem 1
// Question

// Write:

// function isMajority(arr, target)

// Return true if target appears strictly more than half the time.

// Example
// isMajority([2,2,1],2)

// Output

// true
// isMajority([2,1,3],2)

// Output

// false
// What it teaches

// The exact definition of majority.

//------------------------------------------------------------------------------------------------------------------
//answer:
// function isMaroity(arr,target){
//     console.log(arr)
//     let threshold = Math.floor(arr.length/2);
//     console.log('threshold:',threshold)
//     let count = 0
//     for(let i = 0; i< arr.length;i++) {
//         if(arr[i] === target) {
//             count++
//         }
//     }
//     console.log('count:',count)
//     return count>threshold;

// }

// console.log(isMaroity([1,2,2,], 2))
// console.log(isMaroity([1,2,2,3], 2))
//------------------------------------------------------------------------------------------------------------------

// Level 2 — Count Frequency
// Sub-problem 2
// Question

// Count how many times target appears in an array.

// Example
// nums = [1,2,2,3]
// target = 2

// Output

// 2
// What it teaches

// Frequency counting.
//------------------------------------------------------answer------------------------------------------------------
// function countFrequency(arr,target) {
//     let count =0;
//     for(let i = 0; i < arr.length; i++) {
//         if(arr[i]== target) {
//             count++;
//         }
//     }
//     return count
// }
// console.log(countFrequency([1,2,2,3], 2))
//------------------------------------------------------answer------------------------------------------------------

// Level 3 — Brute Force Subarrays
// Sub-problem 3
// Question

// Generate every subarray.

// Example

// Input

// [1,2,3]

// Output

// [1]
// [1,2]
// [1,2,3]
// [2]
// [2,3]
// [3]
// What it teaches

// Subarray enumeration.
//------------------------------------------------------answer------------------------------------------------------
// function generateSubArrays(arr) {
//     let result=[];
//     for(let i = 0; i< arr.length; i++) {
//         let sub = [];
//         for(let j = i; j<arr.length; j++) {
//             sub.push(arr[j]);
//         result.push([...sub])
//         }
//     }
//     return result;
// }

// console.log(generateSubArrays([1,2,3]))


//------------------------------------------------------answer------------------------------------------------------

// Level 4 — Brute Force Solution
// Sub-problem 4
// Question

// Using Sub-problems 1–3, count valid subarrays.

// Example
// nums=[1,2,2,3]
// target=2

// Output

// 5
// What it teaches

// A correct but inefficient baseline.
//------------------------------------------------------answer------------------------------------------------------
// function bruteForce(arr, target) {
//     let subs = generateSubArrays(arr);
//     let count = 0
//     subs.forEach((sub)=>{
//         let ismajority=     isMaroity(sub,target)
//         if(ismajority) {
//             count++
//         }
//     })
//     return count;
// }

// console.log('bruteForce:',bruteForce([1,2,2,3], 2))
//------------------------------------------------------answer------------------------------------------------------

// Level 5 — Transform the Array
// Sub-problem 5
// Question

// Replace every element with:

// +1  if value == target
// -1  otherwise
// Example
// nums:
// 1 2 2 3

// becomes

// -1 +1 +1 -1
// What it teaches

// The key mathematical transformation.
//------------------------------------------------------answer------------------------------------------------------
// function transform(arr, target) {
//     for(let i = 0; i<arr.length; i++) {
//         arr[i] === target? arr[i] = +1: arr[i] = -1
//     }
//     return arr;
// }

// let arr = [1, 2,2, 3];
// let target = 2;
// console.log(transform(arr,target));
// console.log(arr);
//------------------------------------------------------answer------------------------------------------------------

// Level 6 — Why the Transformation Works
// Sub-problem 6
// Question

// Show that a subarray has target as a majority if and only if the transformed subarray has a positive sum.

// Example

// Original

// 2 2 1

// Transform

// +1 +1 -1

// Sum

// 1

// Positive → majority.

// What it teaches

// The crucial reduction from "majority" to "positive subarray sum."
//------------------------------------------------------answer------------------------------------------------------
// function generateTransformSubArrays(arr,target) {
//     let result=[];
//     for(let i = 0; i< arr.length; i++) {
//         let sub = [];
//         for(let j = i; j<arr.length; j++) {
//             if(arr[j] !== target) {
//                 sub.push(-1);
//             } else {
//                 sub.push(+1)
//             }
//         result.push([...sub])
//         }
//     }
//     return result;
// }

// function finalAfterTransfom(arr,target) {
//     let subs = generateTransformSubArrays(arr,target);

//     let values = subs.map((sub)=> sub.reduce((acc,curr)=> {
//         return acc+ curr
//     },0))

//     let count = 0; 
//     for(let sum of values) {
//         if(sum > 0) {
//             count ++;
//         }
//     }

//     return count;
// }

// console.log('finalAfterTransform:',finalAfterTransfom([1,2,2,3], 2))


//------------------------------------------------------answer------------------------------------------------------

// Level 7 — Prefix Sums
// Sub-problem 7
// Question

// Build a prefix sum array for the transformed values.

// Example

// Transform

// -1 +1 +1 -1

// Prefix

// 0
// -1
// 0
// 1
// 0
// What it teaches

// Fast subarray sum computation.
//------------------------------------------------------answer------------------------------------------------------

//------------------------------------------------------answer------------------------------------------------------

// Level 8 — Counting Positive Subarray Sums
// Sub-problem 8
// Question

// A subarray sum is

// prefix[j] - prefix[i]

// How can we count all pairs where

// prefix[j] > prefix[i]

// instead of checking every pair?

// What it teaches

// Converting the problem into counting prefix relationships.
//------------------------------------------------------answer------------------------------------------------------

//------------------------------------------------------answer------------------------------------------------------

// One-Step-Before-Final
// Sub-problem 9
// Question

// Design a data structure that supports:

// inserting a prefix sum
// counting how many previous prefix sums are smaller than the current one

// efficiently.

// Possible choices:

// Fenwick Tree
// Segment Tree
// Balanced BST
// What it teaches

// The optimization that reduces the overall complexity to an efficient solution suitable for the problem constraints.
//------------------------------------------------------answer------------------------------------------------------

//------------------------------------------------------answer------------------------------------------------------

// Your First Exercise

// Start with Sub-problem 1:

// Implement:

// function isMajority(arr, target)

// Return true if target appears strictly more than half the number of elements in arr; otherwise return false.

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// var countSubarrays = function(nums, target) {

//     const n = nums.length;

//     let answer = 0;

//     for (let left = 0; left < n; left++) {

//         let targetCount = 0;

//         for (let right = left; right < n; right++) {

//             if (nums[right] === target) {
//                 targetCount++;
//             }

//             const length = right - left + 1;

//             if (targetCount > Math.floor(length / 2)) {
//                 answer++;
//             }
//         }
//     }

//     return answer;
// };