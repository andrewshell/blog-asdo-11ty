---
title: Ionic 4 and MobX
date: 2018-06-28T21:02:31.000Z
published: false
created: 2018-06-28T21:02:31.000Z

---

I just spent several hours debugging an issue and hopefully, this will save you a lot of time.

I'm building a new Ionic 4 app and I'm using MobX to handle state.

I had previously used it in an Ionic 3 app, but I don't think I was using it correctly.

This time I wanted to make sure that my pages & components worked with `ChangeDetectionStrategy.OnPush`.

The tutorials I found showed something simple like this:

```ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import {store} from './store/counter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div>{{ store.value }} - {{ store.computedValue }}
  <button>Action</button></div>
  `
})
export class AppComponent {
}
```

Now I'm not doing inline templates, but I'd make sure I was using `@observable` and `@computed` properties. However, whenever I put *mobxAutorun on an element, the entire element disappeared.

I made sure I had `MobxAngularModule` imported in `app.module.ts` but nothing I did made a difference.

Finally, I found the issue.

You need to import `MobxAngularModule` in the page module as well.

As soon as I added it everything started working as expected.

