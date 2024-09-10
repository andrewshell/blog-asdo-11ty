---
title: Alternate Linked Data Syntax
date: 2020-12-23T21:07:54.000Z
published: true
itemtype: https://schema.org/TechArticle
created: 2020-12-23T21:07:54.000Z

---

Following my intuition keeps leading me to fun coincidences.

I've been following the work of [Dorian Taylor](https://doriantaylor.com/hello-internet), learning more about how he uses linked data. [App::IBIS](https://ibis.makethingsmakesense.com/) is interesting, but also how he's using attributes on links on his website.

Here's an example:

```html
<a
  href="https://doriantaylor.com/policy/uris-resources-and-representations"
  rev="dct:references xhv:up" 
  typeof="bibo:Report">
  <span property="dct:title">
    URIs, Resources and Representations
    </span>
  </a>
```

I've implemented a markdown syntax so that I could assign arbitrary attributes on links. If I wanted to do something like this, that's the way I'd have to go. If I only used `rev="dct:references"` it's simpler but still ugly, and it doesn't provide any context for someone using a web browser.

Today on a Federated Wiki Zoom, there was [a demo](http://eric.dojo.fed.wiki/view/obeya) showing how [Eric Dobbs](http://eric.dojo.fed.wiki/view/eric-dobbs) labels the relations between pages using [Graphviz DOT language](https://graphviz.org/doc/info/lang.html).

He uses a syntax that matches the words that start a line that link to other pages. Examples are "Includes," "Consists of," or "Enabled by." I could see this used in conjunction with the work Dorian is doing. I could prefix a line "References," and my blog engine would know to add `rev="dct:references"` to all the links on that line.

Pulling from his [Content Inventory](https://privatealpha.com/ontology/content-inventory/1#) I could prefix links with "Mentions," "Introduces," or "Evokes."

I'm excited about this idea. I think the next step is to decide my use case. What types of links do I want? Do I want to have matched inverses? So any page linked with "Evokes" would automatically have a backlink that is "Evoked by."

The link prefix context is way more relevant to what I'm doing because I want it to be useful to a human, not necessarily a scraper.

