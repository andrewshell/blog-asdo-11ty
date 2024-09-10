---
title: Lightswitches and OCD
date: 2014-01-29T06:00:00.000Z
published: false
created: 2014-01-29T06:00:00.000Z

---

I'm a little OCD when it comes to light switches. My particular obsession goes a little like this:

A light switch should be up for on and down for off.  When you have multiple switches, the light should be off when all of the switches are off.  I'm not worried about the state of the light when all the switches are on, just when they are all off.

When I moved into my condo many years ago I had two light switches that controlled the dining room light that did not meet my requirement.  I tried to ignore it, but it would eat away at me every time I went to bed and had to leave one of the switches "on" so the light would turn off.

After about a month or so I couldn't take it anymore and I got out a screwdriver and flipped one of the switches so I could go to bed anxiety free.

Now I live in a new house and we have a lot of switches.  In fact we have enough that in some cases even after living here for over 6 months I can't remember which switches control what.

For the most part they all work as they should.  The light over the stairs has 2 switches that are correct.  The upstairs hallway light has 3 switches that are correct.  The downstairs hallway light has 2 switches that are correct.  But the kitchen has 2 switches which are wrong and the basement stairs has two switches which are wrong. I'm starting to get twitchy.

Today I was thinking about it and realized I had no idea how these switches even function in the universe.  I'm a software developer so I think of switches as boolean operators.  They are on or off, true or false.  Therefore based on this logic the switches should operate one of two ways.

The first way is an "and" conditional.

```php
if ($switch1 && $switch2) {
} else {
}
```

The second way is an "or" conditional.

```php
if ($switch1 || $switch2) {
} else {
}
```

However neither of these are actually what I observe.

## Table

### Header

Switch 1

Switch 2

Light

### Row 1

off

off

off

### Row 2

off

on

on

### Row 3

on

off

on

### Row 4

on

on

off <- WTF

Up until that last row it was behaving as an "or" conditional and then things got real.

Of course I had to research to find out how this actually works.  Turns out my whole theory of light switches being boolean was false.

There are obviously simple switches that behave the way I would expect.  You have a wire on two different posts and the switch is either connecting the two or not connecting the two.

There are also 3-way and 4-way switches.

If you are wiring up more then 1 switch you will have 2 3-way switches (on the outside of the circuit) and 4-way switches in the middle (assuming you have at least 3 switches).

So, how do these magical 3 and 4 way switches work?  Glad you asked.

A 3-way switch has 3 posts, let's call them A, B and C.  If the switch is in one position, A & B are connected and if the switch is in the other position then A & C are connected.

A 4-way switch has 4 posts, again A, B, C and D.  If the switch is in one position then A & B are connected and C & D are connected.  In the other position A & D are connected and B & C are connected.

To see how they connect to each other to make the circuit work I had to dig around a bit but found this awesome animation.

How 4-way switches work

It shows exactly how this multiple switch setup is possible.  Which certainly makes me feel a little better.

I'm not sure though if this knowledge will cure my OCD or if I'm going to have to go find a screwdriver again.

