// 2694. Event Emitter
// Medium
// Companies
// Design an EventEmitter class. This interface is similar (but with some differences) to the one found in Node.js or the Event Target interface of the DOM. The EventEmitter should allow for subscribing to events and emitting them.

// Your EventEmitter class should have the following two methods:

// subscribe - This method takes in two arguments: the name of an event as a string and a callback function. This callback function will later be called when the event is emitted.
// An event should be able to have multiple listeners for the same event. When emitting an event with multiple callbacks, each should be called in the order in which they were subscribed. An array of results should be returned. You can assume no callbacks passed to subscribe are referentially identical.
// The subscribe method should also return an object with an unsubscribe method that enables the user to unsubscribe. When it is called, the callback should be removed from the list of subscriptions and undefined should be returned.
// emit - This method takes in two arguments: the name of an event as a string and an optional array of arguments that will be passed to the callback(s). If there are no callbacks subscribed to the given event, return an empty array. Otherwise, return an array of the results of all callback calls in the order they were subscribed.
 

// Example 1:

// Input: 
// actions = ["EventEmitter", "emit", "subscribe", "subscribe", "emit"], 
// values = [[], ["firstEvent"], ["firstEvent", "function cb1() { return 5; }"],  ["firstEvent", "function cb1() { return 6; }"], ["firstEvent"]]
// Output: [[],["emitted",[]],["subscribed"],["subscribed"],["emitted",[5,6]]]
// Explanation: 
// const emitter = new EventEmitter();
// emitter.emit("firstEvent"); // [], no callback are subscribed yet
// emitter.subscribe("firstEvent", function cb1() { return 5; });
// emitter.subscribe("firstEvent", function cb2() { return 6; });
// emitter.emit("firstEvent"); // [5, 6], returns the output of cb1 and cb2
// Example 2:

// Input: 
// actions = ["EventEmitter", "subscribe", "emit", "emit"], 
// values = [[], ["firstEvent", "function cb1(...args) { return args.join(','); }"], ["firstEvent", [1,2,3]], ["firstEvent", [3,4,6]]]
// Output: [[],["subscribed"],["emitted",["1,2,3"]],["emitted",["3,4,6"]]]
// Explanation: Note that the emit method should be able to accept an OPTIONAL array of arguments.

// const emitter = new EventEmitter();
// emitter.subscribe("firstEvent, function cb1(...args) { return args.join(','); });
// emitter.emit("firstEvent", [1, 2, 3]); // ["1,2,3"]
// emitter.emit("firstEvent", [3, 4, 6]); // ["3,4,6"]
// Example 3:

// Input: 
// actions = ["EventEmitter", "subscribe", "emit", "unsubscribe", "emit"], 
// values = [[], ["firstEvent", "(...args) => args.join(',')"], ["firstEvent", [1,2,3]], [0], ["firstEvent", [4,5,6]]]
// Output: [[],["subscribed"],["emitted",["1,2,3"]],["unsubscribed",0],["emitted",[]]]
// Explanation:
// const emitter = new EventEmitter();
// const sub = emitter.subscribe("firstEvent", (...args) => args.join(','));
// emitter.emit("firstEvent", [1, 2, 3]); // ["1,2,3"]
// sub.unsubscribe(); // undefined
// emitter.emit("firstEvent", [4, 5, 6]); // [], there are no subscriptions
// Example 4:

// Input: 
// actions = ["EventEmitter", "subscribe", "subscribe", "unsubscribe", "emit"], 
// values = [[], ["firstEvent", "x => x + 1"], ["firstEvent", "x => x + 2"], [0], ["firstEvent", [5]]]
// Output: [[],["subscribed"],["subscribed"],["unsubscribed",0],["emitted",[7]]]
// Explanation:
// const emitter = new EventEmitter();
// const sub1 = emitter.subscribe("firstEvent", x => x + 1);
// const sub2 = emitter.subscribe("firstEvent", x => x + 2);
// sub1.unsubscribe(); // undefined
// emitter.emit("firstEvent", [5]); // [7]
 

// Constraints:

// 1 <= actions.length <= 10
// values.length === actions.length
// All test cases are valid, e.g. you don't need to handle scenarios when unsubscribing from a non-existing subscription.
// There are only 4 different actions: EventEmitter, emit, subscribe, and unsubscribe.
// The EventEmitter action doesn't take any arguments.
// The emit action takes between either 1 or 2 arguments. The first argument is the name of the event we want to emit, and the 2nd argument is passed to the callback functions.
// The subscribe action takes 2 arguments, where the first one is the event name and the second is the callback function.
// The unsubscribe action takes one argument, which is the 0-indexed order of the subscription made before.
 

// Problem Analysis
// Core Concepts
// Classes
// Hash Map / Object
// Function References
// Publish-Subscribe Pattern (Pub/Sub)
// Closures
// Data Structures Involved

// Most likely:

// {
//     eventName: [callback1, callback2, callback3]
// }

// or

// Map {
//     eventName => [callbacks]
// }
// Algorithms / Patterns Involved
// Event Emitter Pattern
// Observer Pattern
// Subscription Management
// Common Traps
// Trap 1

// Using callback names instead of callback references.

// This:

// cb1

// is a function object.

// You must store the function itself.

// Trap 2

// Losing subscription order.

// Callbacks must execute in the order subscribed.

// Trap 3

// Not handling multiple events.

// Example:

// subscribe("A", fn1)
// subscribe("B", fn2)

// Need separate listener lists.

// Trap 4

// Unsubscribe must remove exactly one callback.

// Trap 5

// emit may receive arguments.

// Example:

// emit("event", [1,2,3])

// Need:

// callback(...args)

// not

// callback(args)
// Learning Path
// Level 1 — Store Callbacks
// Sub-problem 1
// Question

// Create a class that stores callbacks for a single event.

// Implement:

// add(cb)

// and

// getCallbacks()
// Example
// store.add(() => 1);
// store.add(() => 2);

// Output:

// [
//   fn1,
//   fn2
// ]
// What it teaches

// Storing function references.
//-------------------------------------------------------------------------------------------------------------------
//answer:
// class callbackStore{
//     constructor() {
//         this.callbacks = [];
//     }
//     add(cb) {
//         this.callbacks.push(cb);
//     }
//     getCallbacks() {
//         return this.callbacks;
//     }
// }

// const store = new callbackStore();

// store.add (()=> 1);
// store.add(()=> 2);

// console.log(JSON.stringify(
//   store.getCallbacks(), 
//   (key, value) => typeof value === 'function' ? value.toString() : value, 
//   2
// ));
//-------------------------------------------------------------------------------------------------------------------

// Level 2 — Execute Callbacks
// Sub-problem 2
// Question

// Given an array of callbacks, execute all of them and collect results.

// Example
// [
//  () => 5,
//  () => 6
// ]

// Output:

// [5,6]
// What it teaches

// Iteration and function invocation.
//-------------------------------------------------------------------------------------------------------------------
//answer:
// function executeCallbacks(callbacks) {
//     let result = [];

//     for(let cb of callbacks) {
//         result.push(cb());
//     }
//     return result;
// }

// console.log(executeCallbacks(store.getCallbacks()));
//-------------------------------------------------------------------------------------------------------------------

// Level 3 — Multiple Events
// Sub-problem 3
// Question

// Store callbacks by event name.

// Example
// subscribe("login", fn1)
// subscribe("logout", fn2)

// Internal structure:

// {
//   login: [fn1],
//   logout: [fn2]
// }
// What it teaches

// Hash map organization.
// class EventStore{
//     constructor() {
//         this.events = {};

//     }

//     subscribe(eventName, cb) {
//         if(!this.events[eventName])  {
//             this.events[eventName] = []
//         }
//         this.events[eventName].push(cb);

//     }
// }


// const store = new EventStore();

// store.subscribe("login", ()=>"login");
// store.subscribe("logout",()=> "logout");

// console.log(store.events);
//-------------------------------------------------------------------------------------------------------------------

// Level 4 — Emit
// Sub-problem 4
// Question

// Implement:

// emit(event)
// Example
// subscribe("event", () => 1)
// subscribe("event", () => 2)

// emit("event")

// Output:

// [1,2]
// What it teaches

// Lookup + execute listeners.
//-------------------------------------------------------------------------------------------------------------------
//answer: 
// class EventStore{
//     constructor() {
//         this.events = {};
//     }

//     subscribe(eventName, cb) {
//         if(!this.events[eventName]) {
//             this.events[eventName] = [];
//         }
//         this.events[eventName].push(cb);
//     }

//     emit(eventName) {
//         if(!this.events[eventName]){
//             return [];
//         }
//         const result = [];

//         for(let cb of this.events[eventName]) {
//             result.push(cb());
//         }
        
//     return result;
//     }
// }

// const emitter = new EventStore();

// emitter.subscribe("event", ()=>1);
// emitter.subscribe("event", ()=> 2);


// console.log(emitter.emit("event"));
// Level 5 — Emit Arguments
// Sub-problem 5
// Question

// Pass arguments into callbacks.

// Example
// subscribe("event", (...args) => args.join(","))

// Emit:

// emit("event", [1,2,3])

// Output:

// ["1,2,3"]
// What it teaches

// Spread operator.

//-------------------------------------------------------------------------------------------------------------------
//answer:
// class EventStore{
//     constructor(){
//         this.events = {};
//     }

//     subscribe(eventName, cb){
//         if(!this.events[eventName]) {
//             this.events[eventName] = [];
//         }
//         this.events[eventName].push(cb);
//     }

//     emit(eventName, args =[]) {
//         if(!this.events[eventName]){
//             return [];
//         }
//         const result = [];

//         for(const cb of this.events[eventName]) {
//             result.push(cb(...args))
//         }
//         return result;
//     }
// }

// const emitter = new EventStore();

// emitter.subscribe("event",(...args)=> args.join(","));
// console.log(emitter.emit("event",[1,2,3]))
//-------------------------------------------------------------------------------------------------------------------

// Level 6 — Remove a Callback
// Sub-problem 6
// Question

// Given:

// [
//  fn1,
//  fn2,
//  fn3
// ]

// Remove:

// fn2
// Example

// Output:

// [
//  fn1,
//  fn3
// ]
// What it teaches

//-------------------------------------------------------------------------------------------------------------------
//answer:
// function removeCallback(callbacks,target) {
//     return callbacks.filter((fn)=> fn != target);
// }

// const fn1 = () => 1;
// const fn2 = () => 2;
// const fn3 = () => 3;

// const callbacks = [fn1, fn2, fn3];

// console.log(
//     removeCallback(callbacks, fn2)
// );

//-------------------------------------------------------------------------------------------------------------------


// Function identity comparison.

// Level 7 — Unsubscribe Object
// Sub-problem 7
// Question

// Return:

// {
//    unsubscribe() {}
// }

// from subscribe.

// Example
// const sub = subscribe(...)

// sub.unsubscribe()
// What it teaches

// Closures.
//-------------------------------------------------------------------------------------------------------------------
//answers:
class EventStore{
    constructor(){
        this.events= {};
    }
    subscribe(eventName, cb) {
        if(!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(cb); 
        return {
            unsubscribe: ()=> {
                this.events[eventName] = this.events[eventName]
                .filter((fn)=> fn != cb);
            }
        }
    }

    emit(eventName, args= []) {
        if(!this.events[eventName]){
            return [];
        }
        let result = [];

        for(let cb of this.events[eventEmitter]){
            result.push(cb(...args));
        }
        return result;
    }
}
//-------------------------------------------------------------------------------------------------------------------


// One-Step-Before-Final
// Sub-problem 8
// Question

// Suppose:

// subscribe("event", fn1)
// subscribe("event", fn2)

// returns:

// sub1
// sub2

// After:

// sub1.unsubscribe()

// what should remain in storage?

// Example

// Before:

// {
//   event: [fn1, fn2]
// }

// After:

// {
//   event: [fn2]
// }
// What it teaches

// The exact mechanism needed for the final solution.

// Your First Exercise

// Start with Sub-problem 1.

// Implement a class:

// class CallbackStore

// with methods:

// add(cb)
// getCallbacks()

// that stores callbacks in insertion order.