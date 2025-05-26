---
title: Custom templates in pagePark
date: 2020-10-24T21:41:59.000Z
published: false
itemtype: https://schema.org/TechArticle
created: 2020-10-24T21:41:59.000Z

---

My next experiment is creating a custom template on pagePark for OPML files. I'll have to see to what extent I can make this work.

Things I'd like to change from the default template:

1. If I use "New note" functionality in Little Outliner (like this note), I'd like the Month & Day to be h2 & h3 headers and I'd like the titles of the items to be h4.
2. I'd like to have markdown support so whether it's read in an outline or as a webpage it looks good. Right now in the outline, it looks messy especially when I'm using blockquotes. (see October 21). In markdown, I could just prefix the line with "> "

I can see in the pagePark code that getOpmlTemplate first checks for config.opmlTemplatePath but that isn't actually something I can define in config.json

In order for this to work I'd need to:

1. Add opmlTemplatePath to pageparkPrefs
2. Comment out where it gets wiped out in gatherAttributes
    * gatherAttributes seems to be something that parses variables with a hashmark in the path
    * Not sure why that would be a location to overwrite the template since opmlTemplatePath is a local path

I also tried putting urlDefaultOpmlTemplate in config.json since it's already in pageparkPrefs but the code references pageparkPrefs.urlDefaultOpmlTemplate and not config.urlDefaultOpmlTemplate so it doesn't work.

Changing pageparkPrefs to config in getOpmlTemplate would probably be the least impactful change. It's not a problem to reference the template by URL since it's already in the domain bucket that's being served.

I should look into Persistent Apps because that would provide the most flexibility with what I'm trying to do.

