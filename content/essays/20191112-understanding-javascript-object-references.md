---
title: Understanding Javascript Object References
date: 2019-11-12T06:00:00.000Z
published: true
created: 2019-11-12T06:00:00.000Z

---

Today I was in a class learning about [Kinvey](https://www.progress.com/kinvey) and my instructor was stuck on a problem in a node.js app he was working on.

He wanted to use `map` on an array of rows but pass an additional parameter to the callback.

I knew that one way to handle that was with `bind` like this:

```javascript
function mapper(extra, entity) {
  // do stuff with extra
  return entity;
}
const result = [1,2,3].map(mapper.bind(null, extra));
```

He implemented `bind` but it still wasn't working for him. I looked at the code and realized he wasn't assigning the response from map, but expected the original array to be modified.  His reasoning was that the following worked:

```javascript
let rows = [
  { id: 1, title: 'A' },
  { id: 2, title: 'B' },
  { id: 3, title: 'C' }
];
rows.map((obj) => { obj.desc = 'something'; return obj; })
console.dir(rows);
```

So this should work:

```javascript
let rows = [
  { id: 1, title: 'A' },
  { id: 2, title: 'B' },
  { id: 3, title: 'C' }
];
rows.map((obj) => { obj = { id: 4, title: 'D' }; return obj; });
console.dir(rows);
```

But it doesn't.

I explained why it worked this way and thought it might be useful to other people.

In Javascript when you pass a variable into a function you're really passing in a reference to data stored in memory.

So in his first example when he added a parameter to the passed in object he was modifying the object in memory that `obj` pointed to. Since this was the same object that was in the rows array the result was that it looked as if he was modifying the rows array.  In reality he was getting a new array with the same objects from the original array because he was returning `obj` in the callback.

In his second example he was replacing the reference to the original variable with a reference to a new variable that he defined in the callback. This was the variable he was returning, so that was the variable that was included in the new array. Since he didn't modify the data in the variables from the original array, it didn't look like anything changed.

I showed him the following example:

```javascript
const f0 = { f: 0 };
const f1 = { f: 1 };
const f2 = { f: 2 };
const arr0 = [f0, f1, f2];
const arr1 = arr0.map((ent) => {
  ent = { f: 3 };
  return ent;
});
// [ { f: 0 }, { f: 1 }, { f: 2 } ]
console.dir(arr0);
// [ { f: 3 }, { f: 3 }, { f: 3 } ]
console.dir(arr1);
```

This shows why he needed to use the response from map and not expect it to modify the original array.

This is certainly a weird edge case that a lot of developers might not come across under normal circumstances. Hopefully, once you understand what is actually being passed around and what assignments are doing under the hood you won't run into these sorts of issues.

