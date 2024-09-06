---
layout: layouts/base.njk
numberOfLatestPostsToShow: 4
fullHeader: true
---

I’m a [software developer](/essays/a-brief-history-of-me-programming/), [writer](/ship-30-for-30-october-2021-cohort/), and [community builder](/essays/teaching-is-an-unfair-advantage/) passionate about [open-source technology](/notes/rsscloud-server/) and [collaboration](https://feeds.fedwikiriver.com/).

I love [collecting artifacts](/essays/avoiding-the-final-death/), [sharing knowledge](/notes/), and [empowering others through code](/notes/fedwiki-river/).

I’m always exploring new ways to contribute and grow.

Learn more on [my "about" page](/about/).

I love meeting new people, and I reply to every email, so [say hello](/contact/).

Go to [the search page](/search/) to search for any word or phrase.

## Recent Essays <small>([See All Essays](/essays/))</small>

{% set postsCount = collections.essays | length %}
{% set latestPostsCount = postsCount | min(numberOfLatestPostsToShow) %}
{% set postslist = collections.essays | head(-1 * numberOfLatestPostsToShow) %}

<ul>
{% for essay in postslist | reverse %}
  <li><a href="{{ essay.url }}">{{ essay.data.title }}</a></li>
{% endfor %}
</ul>

## Recent Notes <small>([See All Notes](/notes/))</small>

{% set postsCount = collections.notes | length %}
{% set latestPostsCount = postsCount | min(numberOfLatestPostsToShow) %}
{% set postslist = collections.notes | head(-1 * numberOfLatestPostsToShow) %}

<ul>
{% for note in postslist | reverse %}
  <li><a href="{{ note.url }}">{{ note.data.title }}</a></li>
{% endfor %}
</ul>
