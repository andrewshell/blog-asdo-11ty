---
title: WebFinger for ActivityPub Feed Discovery
date: 2024-02-07T17:46:08.660Z
published: true
pagetype: https://schema.org/WebPage
itemtype: https://schema.org/TechArticle
created: 2022-12-12T15:49:58.993Z

---
This post is the first of several articles about the technology around [Understanding ActivityPub](/understanding-activitypub/).

The first question I had while reading the ActivityPub specification was, "How do I find the different feeds and documents defined by the spec?"

One of the first things defined would be an [actor object](https://www.w3.org/TR/activitypub/#actor-objects) that refers to me. An actor object contains my name, avatar, and paths to the different [collections](https://www.w3.org/TR/activitypub/#collections).

ActivityPub doesn't define how to find an actor object for a specific user. Instead, existing networks like Mastodon use a different standard for this purpose, [WebFinger](https://www.rfc-editor.org/rfc/rfc7033).

WebFinger is a pre-defined URL that allows you to look up information about a specific resource. Here is an example of how Mastodon uses it:

If you have a user in Mastodon `@andrewshell@indieweb.social`, you can request `GET https://indieweb.social/.well-known/webfinger?resource=acct:andrewshell@indieweb.social` and get back a WebFinger document in json:

```json
{
  "subject": "acct:andrewshell@indieweb.social",
  "aliases": [
    "https://indieweb.social/@andrewshell",
    "https://indieweb.social/users/andrewshell"
  ],
  "links": [
    {
      "rel": "http://webfinger.net/rel/profile-page",
      "type": "text/html",
      "href": "https://indieweb.social/@andrewshell"
    },
    {
      "rel": "self",
      "type": "application/activity+json",
      "href": "https://indieweb.social/users/andrewshell"
    },
    {
      "rel": "http://ostatus.org/schema/1.0/subscribe",
      "template": "https://indieweb.social/authorize_interaction?uri={uri}"
    },
    {
      "rel": "http://webfinger.net/rel/avatar",
      "type": "image/png",
      "href": "https://cdn.masto.host/indiewebsocial/accounts/avatars/109/795/026/221/763/182/original/d639e13f753e4656.png"
    }
  ]
}
```

The link defined with `"rel": "self"` and `"type": "application/activity+json"` is the URL for my ActivityPub actor object.

Another link, defined by `"rel": "http://webfinger.net/rel/profile-page"` is the URL a human should visit for this actor's profile page.

The last link is something related to oStatus. However, that URL goes to a gambling spam site. The wiki for it is [available from the w3c](https://www.w3.org/community/ostatus/wiki/Main_Page.html).

Other services can also have links in the WebFinger document. For instance, OpenID Connect uses it.

I hope this post will be a work in progress, so if you have questions or suggestions on expanding it, please [contact me](/contact/).
