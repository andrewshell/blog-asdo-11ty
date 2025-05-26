---
title: Improving My Code
date: 2013-08-02T06:00:00.000Z
published: true
created: 2013-08-02T06:00:00.000Z

---

I'll be honest with you. I had kinda stagnated over the last couple years when it came to improving my skills as a developer. When I first started developing professionally I went from not knowing much PHP to being well regarded as a developer in a few years.

Part of my improvement came from building one content management system after another for the first 3.5 years. Lots of iteration and certainly a few big mistakes.

But then I hit my stride. I was writing good code and there was no real external pressure to improve. Things are different now.

I don't have any external pressure in the form of people telling me I have to get better. It's more like the external pressure of supporting code I wrote 2 years ago and finding all the areas that really need to be improved.

One thing that really illustrated to me that I was not developing code as well as I could be was the video [Architecture the Lost Years by Robert Martin](http://youtu.be/WpkDN78P884) and then reading his book [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/B08X8ZXT15/).

[My app](http://www.datecheckpro.com/) was built on [Kohana 3.1](http://kohanaframework.org/) which is a nice framework but was not really built on a test-driven development methodology. There are a lot of static methods. Take a look at this [database example](https://docs.koseven.ga/guide/database/examples) and see what's typical.

I was thinking that the solution would be to build an API on [Symfony](http://symfony.com/) and then rewrite the site to just be a front-end calling API methods. This may still be the final solution, but I think first I need to reorganize and clean up the existing site. There are certainly ways (as illustrated in the Robert Martin video) to write well-tested code that is outside of your framework and you use the framework as a delivery mechanism. Once I do this, I could theoretically take the code I'd written and move it from Kohana into Symfony if that makes sense and I won't have to reinvent the wheel.

We do a lot of complex SQL queries so it's about time to get off the ORM so I can fine tune and optimize my queries and database tables.

I'm learning to stop myself and ask "Is what I'm proposing actually the best idea?" and "What other things could I do to solve this problem?". If I force myself to come up with a few possible solutions I'll probably find that my first solution was not optimal.

