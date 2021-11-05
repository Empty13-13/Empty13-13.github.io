---
layout: page
title: Blog
---

{% assign liString = "//" %}
{% assign byYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}

<p>{{site.posts.lenght}}</p>

{% for yearItem in byYear %}
<h1 class="title">{{ yearItem.name }}</h1>
<p>
    {% for post in yearItem.items %}
    <p>{{liString}} {{post.date | date: '%d %b'}} >> <a href="{{ post.url }}">{{ post.title }}</a></p>
    {% endfor %}
</p>
{% endfor %}

