// 2726. Calculator with Method Chaining
// Easy
// Companies
// Design a Calculator class. The class should provide the mathematical operations of addition, subtraction, multiplication, division, and exponentiation. It should also allow consecutive operations to be performed using method chaining. The Calculator class constructor should accept a number which serves as the initial value of result.

// Your Calculator class should have the following methods:

// add - This method adds the given number value to the result and returns the updated Calculator.
// subtract - This method subtracts the given number value from the result and returns the updated Calculator.
// multiply - This method multiplies the result  by the given number value and returns the updated Calculator.
// divide - This method divides the result by the given number value and returns the updated Calculator. If the passed value is 0, an error "Division by zero is not allowed" should be thrown.
// power - This method raises the result to the power of the given number value and returns the updated Calculator.
// getResult - This method returns the result.
// Solutions within 10-5 of the actual result are considered correct.

 

// Example 1:

// Input: 
// actions = ["Calculator", "add", "subtract", "getResult"], 
// values = [10, 5, 7]
// Output: 8
// Explanation: 
// new Calculator(10).add(5).subtract(7).getResult() // 10 + 5 - 7 = 8
// Example 2:

// Input: 
// actions = ["Calculator", "multiply", "power", "getResult"], 
// values = [2, 5, 2]
// Output: 100
// Explanation: 
// new Calculator(2).multiply(5).power(2).getResult() // (2 * 5) ^ 2 = 100
// Example 3:

// Input: 
// actions = ["Calculator", "divide", "getResult"], 
// values = [20, 0]
// Output: "Division by zero is not allowed"
// Explanation: 
// new Calculator(20).divide(0).getResult() // 20 / 0 

// The error should be thrown because we cannot divide by zero.
 

// Constraints:

// actions is a valid JSON array of strings
// values is a valid JSON array of numbers
// 2 <= actions.length <= 2 * 104
// 1 <= values.length <= 2 * 104 - 1
// actions[i] is one of "Calculator", "add", "subtract", "multiply", "divide", "power", and "getResult"
// First action is always "Calculator"
// Last action is always "getResult"

//--------------------------------------------------Learning Path--------------------------------------------------

// Level 1 — Store State
// Sub-problem 1
// Question

// Create a class that stores one number.

// Implement:

// constructor(value)

// and

// getResult()
// Example
// const calc = new Calculator(10);

// calc.getResult();

// Output

// 10
// What it teaches

// Object state.

//------------------------------------------------------answer------------------------------------------------------
// class Calculator{
//     constructor(value){
//         this.value =value;
//     }
//     getResult(){
//         return this.value;
//     }
// }

// const calc = new Calculator(10);
// console.log(calc.getResult())
//------------------------------------------------------------------------------------------------------------------

// Level 2 — Addition
// Sub-problem 2
// Question

// Implement:

// add(value)
// Example
// new Calculator(10)
// .add(5)
// .getResult()

// Output

// 15
// What it teaches

// Updating object state.

//------------------------------------------------------answer------------------------------------------------------
// class Calculator{
//     constructor(value){
//         this.value =value;
//     }
//     getResult(){
//         return this.value;
//     }
//     add(value){
//         this.value +=value;
//     }

// }

// const calc = new Calculator(10);
// console.log(calc)
// calc.add(5);
// console.log(calc.getResult())

//------------------------------------------------------------------------------------------------------------------
// Level 3 — Method Chaining
// Sub-problem 3
// Question

// Make this work:

// new Calculator(10)
// .add(5)
// .subtract(3)
// .getResult()
// What it teaches

// Returning this.

//------------------------------------------------------answer------------------------------------------------------
// class Calculator{
//     constructor(value){
//         this.value =value;
//     }
//     getResult(){
//         return this.value;
//     }
//     add(value){
//         this.value +=value;
//         return this
//     }
//     subtract(value) {
//         this.value -=value;
//     }

// }

// const calc = new Calculator(10);
// // console.log(calc)
// // console.log(
    
// calc.add(5)
//     .subtract(2)
// // )

// console.log(calc.getResult())
//------------------------------------------------------------------------------------------------------------------
// Level 4 — Multiple Operations
// Sub-problem 4
// Question

// Implement:

// subtract()
// multiply()
// Example
// new Calculator(10)
// .add(5)
// .multiply(2)
// .subtract(8)
// .getResult()

// Output

// 22
// What it teaches

// Building a fluent interface.

//------------------------------------------------------answer------------------------------------------------------
// class Calculator{
//     constructor(value){
//         this.value =value;
//     }
//     getResult(){
//         return this.value;
//     }
//     add(value){
//         this.value +=value;
//         return this
//     }
//     subtract(value) {
//         this.value -=value;
//         return this;
//     }
//     multiply(value) {
//         this.value *= value;
//         return this;
//     }

// }

// const calc = new Calculator(10);
    
// calc.add(5)
//     .multiply(2)
//     .subtract(8)

// console.log(calc.getResult())
//------------------------------------------------------------------------------------------------------------------
// Level 5 — Division
// Sub-problem 5
// Question

// Implement:

// divide(value)

// Throw an error if

// value === 0
// Example
// new Calculator(20)
// .divide(0)

// Output

// Error:
// Division by zero is not allowed
// What it teaches

// Validation and exceptions.

//------------------------------------------------------answer------------------------------------------------------
// class Calculator{
//     constructor(value){
//         this.value =value;
//     }
//     getResult(){
//         return this.value;
//     }
//     add(value){
//         this.value +=value;
//         return this
//     }
//     subtract(value) {
//         this.value -=value;
//         return this;
//     }
//     multiply(value) {
//         this.value *= value;
//         return this;
//     }
//     divide(value) {
//         if(value === 0){
//             throw Error("Division by zero is not allowed")
//         }
//         this.value /=value;
//         return this
//     }

// }

// const calc = new Calculator(20);
    
// calc.divide(0);

// console.log(calc.getResult())
//------------------------------------------------------------------------------------------------------------------
// Level 6 — Exponentiation
// Sub-problem 6
// Question

// Implement:

// power(value)
// Example
// new Calculator(3)
// .power(3)
// .getResult()

// Output

// 27
// What it teaches

// Completing the calculator API.
//------------------------------------------------------answer------------------------------------------------------
class Calculator{
    constructor(value){
        this.value =value;
    }
    getResult(){
        return this.value;
    }
    add(value){
        this.value +=value;
        return this
    }
    subtract(value) {
        this.value -=value;
        return this;
    }
    multiply(value) {
        this.value *= value;
        return this;
    }
    divide(value) {
        if(value === 0){
            throw Error("Division by zero is not allowed")
        }
        this.value /=value;
        return this
    }
    power(value) {
        const base = this.value;
        for(let i =1 ; i< value; i++) {
            this.value*=base
        }
        return this
    }

}

const calc = new Calculator(3);
    
calc.power(3);
const calc4 = new Calculator(4);
calc4.power(2)

console.log(calc.getResult())
console.log(calc4.getResult())

//------------------------------------------------------------------------------------------------------------------

// One-Step-Before-Final
// Sub-problem 7
// Question

// Combine every operation into one chain.

// Example

// new Calculator(2)
// .add(5)
// .multiply(3)
// .divide(7)
// .power(2)
// .subtract(4)
// .getResult()
// What it teaches

// A complete fluent interface.

// Your First Exercise

// Implement only:

// class Calculator {

//     constructor(value) {

//     }

//     getResult() {

//     }

// }

// Store the value inside the object and return it from getResult().