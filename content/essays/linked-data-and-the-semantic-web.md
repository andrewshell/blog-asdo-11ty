---
title: Linked Data and the Semantic Web
date: 2020-12-10T22:49:42.000Z
published: true
created: 2020-12-10T22:49:42.000Z

---

## Knowledge Byproducts

When I took Building a Second Brain, one of the concepts was "knowledge byproducts." The idea that as you're doing your work, you're creating things that could be useful later on in a different project.

I decided that what I'd like to do is find a way to use my website to work (and think) in public and use technology under the hood to help surface connections and themes that I might not have identified otherwise.

## Roam

One tool that was popular with members of my cohort was [Roam](https://roamresearch.com/).

Roam is a knowledge management system that is an outliner wiki built on a graph database. You write content on different pages, and as you write, there are conventions for tagging keywords.

There are then ways to view these keywords and see what other content links to them, a concept that is common with wikis.

## Zettelkasten

One method of notetaking that has become popular, especially with Roam, is the [Zettelkasten Method](https://zettelkasten.de/introduction/).

Niklas Luhmann was a highly productive social scientist who collected notes on index cards. He tagged them so that individual notes linked to other notes. He kept these notes in a giant card catalog.

## My Website

I was hoping to combine these ideas into the CMS underlying my website. I write all my content in an outliner, and this makes for a very fluid writing experience. Each node in the outline is part of a hierarchy and can have arbitrary attributes associated with the text.

Each page of my site is built from a combination of structure and attribute metadata.

I want to build in the wiki-like functionality from Roam to tag content as I'm writing it and link it to tag/topic pages. These pages can have original content (see [Progressive Summarization](https://fortelabs.co/blog/progressive-summarization-a-practical-technique-for-designing-discoverable-notes/)) as well as automatically generated backlinks.

## The Semantic Web

In [The Symbol Management Problem](https://doriantaylor.com/the-symbol-management-problem) Dorian talks about using [RDFa](https://www.w3.org/TR/rdfa-core/) with [special vocabularies](https://privatealpha.com/ontology/content-inventory/1#) to represent metadata about the links between content.

{% youtube "https://www.youtube.com/watch?v=TfIZY0s1JG0" %}

## My Vision

Perhaps, as I'm writing in my outline for my daily posts, I can link to subjects in a way that specifies the relationship between what I'm writing and the topic. 

For instance, in the IBIS demo, an object "responds to," is "supported by", or is "questioned by" a subject. This metadata can be used by the CMS when assembling backlinks on a wiki page. This way, instead of just seeing random backlinks, there is context, and the CMS can group the various contexts appropriately.

Likewise, when a note references multiple topics, it can create contextual relationships between those topics.

## Next Steps

Dorian has sent me some follow-up links to review. By putting my thoughts together in this post, I can share this with him, and he might have more ideas of how I can apply his concepts.

The first version of my wiki linking will hopefully be live soon. Ideally, leveraging metadata to do something unique.

