---
title: My Blog
layout: page
---

<h1 class="title _small-shadow">{{page.title}}</h1>

{% for post in site.posts %}
<h1 class="title">\\{{ post.title}}</h1>
[ {{post.date}} ]

---
<p>
    {{post.description}}
</p>
---
{% endfor %}