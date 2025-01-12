---
layout: layouts/home.njk
numberOfLatestPostsToShow: 4
fullHeader: true
---
<div class="bio h-card" itemscope itemtype="https://schema.org/Person">
	<div class="bio-avatar u-photo" itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
		<img src="/img/profile-pic-100.png" width="50" height="50" alt="Profile Picture">
	</div>
	<div>
		<p>Written by <a href="/about/" class="p-name u-url" itemprop="name"><strong><span class="p-given-name" itemprop="givenName">{{ metadata.author.givenName }}</span> <span class="p-family-name" itemprop="familyName">{{ metadata.author.familyName }}</span></strong></a>, a <span class="p-job-title" itemprop="jobTitle">{{ metadata.author.jobTitle }}</span> from <span class="p-locality" itemprop="homeLocation">{{ metadata.author.homeLocation }}</span>.<br /></p>
	</div>
</div>

I’m a [software developer](/essays/a-brief-history-of-me-programming/), [writer](/ship-30-for-30-october-2021-cohort/), and [community builder](/essays/teaching-is-an-unfair-advantage/) passionate about [open-source technology](/notes/rsscloud-server/) and [collaboration](https://feeds.fedwikiriver.com/).

I love [collecting artifacts](/essays/avoiding-the-final-death/), [sharing knowledge](/notes/), and [empowering others through code](/notes/fedwiki-river/).

I’m always exploring new ways to contribute and grow.

See what I'm up to on [my "now" page](/now/).

Learn more about me on [my "about" page](/about/).

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

## Blogroll <small>([See River](https://feedland.com/newsproduct?username=andrewshell))</small>

<blog-roll opmlurl="https://feedland.com/opml?screenname=andrewshell&catname=blogroll"></blog-roll>

<p>
<a href="https://xn--sr8hvo.ws/previous">←</a>
An <a href="https://xn--sr8hvo.ws">IndieWeb Webring</a> 🕸💍
<a href="https://xn--sr8hvo.ws/next">→</a>
</p>
