---
layout: layouts/base.njk
numberOfLatestPostsToShow: 4
fullHeader: true
---

## Me in 10 Seconds

I’m a [software developer](/essays/a-brief-history-of-me-programming/), [writer](/ship-30-for-30-october-2021-cohort/), and [community builder](/essays/teaching-is-an-unfair-advantage/) passionate about [open-source technology](https://github.com/rsscloud/rsscloud-server) and [collaboration](https://feeds.fedwikiriver.com/).

I love [collecting artifacts](/essays/avoiding-the-final-death/), [sharing knowledge](/notes/), and empowering others through code.

I’m always exploring new ways to contribute and grow.

## [Me in 10 Minutes](/about/)?

See [my "about" page](/about/).

## [Contact Me](/contact/)

I love meeting new people, and I reply to every email, so [say hello](/contact/).

## [Search This Site](/search/)

Go to [the search page](/search/) to search for any word or phrase.

## Newest Essays <small>([See All Essays](/essays/))</small>

{% set postsCount = collections.essays | length %}
{% set latestPostsCount = postsCount | min(numberOfLatestPostsToShow) %}
{% set postslist = collections.essays | head(-1 * numberOfLatestPostsToShow) %}

<ul>
{% for essay in postslist %}
  <li><a href="{{ essay.url }}">{{ essay.data.title }}</a></li>
{% endfor %}
</ul>

## Newest Notes <small>([See All Notes](/notes/))</small>

{% set postsCount = collections.notes | length %}
{% set latestPostsCount = postsCount | min(numberOfLatestPostsToShow) %}
{% set postslist = collections.notes | head(-1 * numberOfLatestPostsToShow) %}

<ul>
{% for note in postslist %}
  <li><a href="{{ note.url }}">{{ note.data.title }}</a></li>
{% endfor %}
</ul>
