---
title: Yahoo and the semantic web
date: 2008-08-29T06:00:00.000Z
published: true
created: 2008-08-29T06:00:00.000Z

---

At Netconcepts I've implemented [microformats](http://microformats.org/) in order to optimize content for search engines. An example of this would be the [hCard microformat](http://microformats.org/wiki/hcard) which we're using in the Allen Edmonds store locator. We marked up the content with classes like street-address and region. We're hoping that this will be used for local search.

Today I was reading a post about a talk Rasmus Lerdorf (the creator of PHP who currently works at Yahoo) gave yesterday at DrupalCon where he mostly was talking about the performance of PHP frameworks. In the midst of this post, I read something interesting.

Rasmus made a special point of highlighting the importance of embedding structured metadata into the page. RDFa allows you to embed data into your web pages and also lets you create custom vocabularies, or even better, reuse existing vocabularies. Why would you want to do this? SearchMonkey will go out and index this content and open up a rich search API to allow you to do intelligent queries. Well beyond what is possible with traditional search.

I know Netconcepts has started to experiment with SearchMonkey (I spoke on this topic at Web608 but this is the first I've really heard of RDFa. I've heard of RDF before (Resource Description Framework) but only in terms of XML documents (commonly used with RSS feeds). But what is RDFa? A quick look to Wikipedia says:

RDFa (or Resource Description Framework attributes) is a set of extensions to XHTML being proposed by W3C. RDFa uses attributes from XHTML's meta and link elements, and generalises them so that they are usable on all elements. This allows you to annotate XHTML markup with semantics.

Has anyone been paying attention to this? I wonder how useful this could be in GravitySream. Since it's an extension to XHTML I wonder if the site has to be valid XHTML in order to take full advantage of RDFa.

For more information on RDFa, you can check out the [RDFa Primer](http://www.w3.org/TR/xhtml-rdfa-primer/) from the W3C and the original article I read [Rasmus Lerdorf - PHP frameworks? Think again](http://www.sitepoint.com/blogs/2008/08/29/rasmus-lerdorf-php-frameworks-think-again/).

