---
layout: layouts/page.njk
date: 2024-08-16T21:50:17.000Z
created: 2024-08-16T21:50:17.000Z
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
