---
layout: layouts/page.njk
title: All Essays
published: true
---
{% set postslist = collections.essays %}
{% set lastmonth = "" %}
{% for post in postslist | reverse %}
  {% set thismonth = post.date | readableDate("LLLL yyyy") %}
  {% if thismonth !== lastmonth %}
    {% if lastmonth !== "" %}</ol>{% endif %}
    <h2>{{ thismonth }}</h2>
    <ol class="list-none">
    {% set lastmonth = thismonth %}
  {% endif %}
  <li><a href="{{ post.url }}" itemprop="url">
    <span itemprop="headline">{{ post.data.title }}</span>
  </a></li>
{% endfor %}
</ol>
