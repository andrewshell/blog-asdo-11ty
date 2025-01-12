---
layout: layouts/home.njk
numberOfLatestPostsToShow: 4
fullHeader: true
---
<div class="h-entry">
  <span style="display: none;" class="p-name">Andrew Shell's Weblog</span>
  <div class="e-content">
    <div style="display: flex; align-items: center; gap: var(--spacing-4); margin-bottom: var(--spacing-4);" class="h-card" itemscope itemtype="https://schema.org/Person">
      <div>
        <img class="circle u-photo" itemprop="image" itemscope itemtype="https://schema.org/ImageObject" src="{{ metadata.url }}headshot.jpg" alt="Photo of Andrew Shell" width="50" height="50">
      </div>
      <div>
        <p>Hi!, I'm <a class="p-name u-url u-uid" rel="me" href="{{ metadata.url }}" itemprop="name"><span class="p-given-name" itemprop="givenName">{{ metadata.author.givenName }}</span> <span class="p-family-name" itemprop="familyName">{{ metadata.author.familyName }}</span></a> a <span class="p-job-title" itemprop="jobTitle">{{ metadata.author.jobTitle }}</span> from <span class="adr"><span class="p-locality">{{ metadata.author.locality }}</span>, <abbr class="p-region" title="{{ metadata.author.region }}">{{ metadata.author.regionAbbr }}</abbr></span>.</p>
        <p style="margin: 0;" class="p-note">
            I’m a <a href="{{ metadata.url }}essays/a-brief-history-of-me-programming/">software developer</a>, 
            <a href="{{ metadata.url }}ship-30-for-30-october-2021-cohort/">writer</a>, and 
            <a href="{{ metadata.url }}essays/teaching-is-an-unfair-advantage/">community builder</a> passionate about 
            <a href="{{ metadata.url }}notes/rsscloud-server/">open-source technology</a> and 
            <a href="https://feeds.fedwikiriver.com/">collaboration</a>.
        </p>
      </div>
    </div>

    I love [collecting artifacts](/essays/avoiding-the-final-death/), [sharing knowledge](/notes/), and [empowering others through code](/notes/fedwiki-river/).

    I’m always exploring new ways to contribute and grow.

    See what I'm up to on [my "now" page](/now/).

    Learn more about me on [my "about" page](/about/).

    I love meeting new people, and I reply to every email, so [say hello](/contact/).

    Go to [the search page](/search/) to search for any word or phrase.
    
  </div>
</div>

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
