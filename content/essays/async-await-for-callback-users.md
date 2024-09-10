---
title: Async/Await for callback users
date: 2021-02-09T17:25:18.000Z
published: true
itemtype: https://schema.org/TechArticle
created: 2021-02-09T17:25:18.000Z

---

I have a friend that writes node.js code with callbacks. There are some cases where I think using promises or async/await syntax might be advantageous. Here, I'm going to try to connect the dots.

Here is an example of an asynchronous function that uses callbacks:

```javascript
function timedMessage (message, callback) {
  setTimeout(function () {
    if (typeof message === 'string') {
      callback (null, message);
      }
    else {
      callback ('not a string');
      }
    }, 1000)
  }
  
function handleMessage (err, message) {
  if (err) {
    console.error(err);
    return;
    }
  console.log(message);
  }
  
timedMessage ('hello', handleMessage); // hello
timedMessage (false, handleMessage); // not a string
```

We follow the standard format of a callback with the first param err and the second param the value.  If the message is not a string it displays an error message, otherwise, it displays the message. This uses setTimeout to make things asynchronous.

Next, we're going to rewrite this code to use a slightly different syntax and split the callback into two functions.

```javascript
function timedMessage (message, resolve, reject) {
  setTimeout(function () {
    if (typeof message === 'string') {
      resolve (message);
      }
    else {
      reject ('not a string');
      }
    }, 1000)
  }

function handleMessage (message) {
  console.log(message);
  }

function handleError (err) {
  console.error(err);
  }

timedMessage ('hello', handleMessage, handleError); // hello
timedMessage (false, handleMessage, handleError); // not a string
```

We no longer need to have the if statement in handleMessage because it's only called on success. On errors we call handleError.

Now, we'll take things one step further by replacing this callback with a Promise. This encapsulates the callbacks in an object that can be returned by our asynchronous function instead of being passed as parameters.

```javascript
function timedMessage (message) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (typeof message === 'string') {
        resolve (message);
        }
      else {
        reject ('not a string');
        }
      }, 1000)
    });
  }

function handleMessage (message) {
  console.log(message);
  }

function handleError (err) {
  console.error(err);
  }

timedMessage ('hello').then (handleMessage).catch (handleError); // hello
timedMessage (false).then (handleMessage).catch (handleError); // not a string
```

One thing you can do with promises is chain promises together. If handleMessage returned a promise we could have multiple `then` calls, each with the next step of execution. I'm not going to overcomplicate this example with that use case, but it's important to understand that this is desirable to avoid "callback hell" with nested callbacks. Doing this allows you to flatten the logic and break out of the flow and not continue if an error occurs.

The final step will be to convert this to use async/await syntax.  Because, we're using setTimeout which requires a callback, we won't actually rewrite timedMessage. Instead we'll encapsulate our calls to it within an async function.

```javascript
function timedMessage (message) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (typeof message === 'string') {
        resolve (message);
        }
      else {
        reject ('not a string');
        }
      }, 1000)
    });
  }

async function run () {
  try {
    console.log (await timedMessage ('hello')); // hello
    console.log (await timedMessage (false)); // throws an error
    }
  catch (err) {
    console.error (err); // not a string
    }
  }

run();
```

All functions prefixed with async will return a promise. In this case, we don't care because run doesn't return anything.

We can also prefix synchronous function calls with await (within an async function) and it doesn't care.

When you return a value from an async function it's the same as passing that value through `resolve` and if you throw an error it's the same as passing the error through `reject`.

Here's one more example that shows these cases:

```javascript
function timedMessage (message) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (typeof message === 'string') {
        resolve (message);
        }
      else {
        reject ('not a string');
        }
      }, 1000)
    });
  }

function synchMessage (message) {
  return message;
  }

async function run () {
  let message = '+';
  try {
    message += await synchMessage ('1');
    message += await timedMessage ('2');
    message += await timedMessage (false); // throws an error
    message += await timedMessage ('3');
    }
  catch (err) {
    console.error (err); // not a string
    }
  return message;
  }

run().then (function (message) {
  console.log(message); // +12
  });
```

Hopefully, this sheds some light on what's happening under the hood with async/await and how they are related to promises and callbacks.

