---
title: Figuring out Silex SecurityServiceProvider
date: 2013-11-23T06:00:00.000Z
updated: 2013-11-23T06:00:00.000Z
published: false
itemtype: https://schema.org/TechArticle
---

I'm working on a couple of projects that will be using [Silex](https://github.com/silexphp/Silex) as the underlying framework.

Whenever I try out a new framework, it seems that the first roadblock I always hit is when I try to implement user authentication & authorization. It's no different with Silex.

The recommended way is to leverage the SecurityServiceProvider which provides a mechanism to handle a lot of the behind the scenes like properly encoding passwords and defining the permission structure of your website without your controllers needing to know much about your security.

It seems very flexible, but it also seems like a pain in the ass.

What I want to do is have an authentication token available everywhere on the site so I can check to see if the user is logged in or not and change links in the header and whatnot. There are public parts of the site where anonymous users (not logged in) can visit. There are also sections that are off limits to everybody but admins.

This is the configuration I ended up with that seems to work for me. I'll explain after the snippet.

```php
$app['security.firewalls'] = array(
    'secure' => array(
        'anonymous' => true,
        'pattern' => '^/.*$',
        'form' => array('login_path' => '/user/login', 'check_path' => '/user/login_check'),
        'logout' => array('logout_path' => '/user/logout'),
        'users' => $app->share(function () { return new UserAuthUserProvider(); }),
    ),
);

$app['security.access_rules'] = array(
    array('^/user/secret$', 'ROLE_ADMIN'),
);
```

Things to note.

1. The entire site is included in the firewall but anonymous is set to true.
    * This means anonymous users are allowed
    * Everything is accessible by default to everybody
2. The automatically generated routes are not `admin_logout` and such as you'd see in the docs. They are created based on the path. So for me the logout route is `user_logout`.
3. You then define `$app['security.access_rules']` to specify what sections are actually protected.
4. `UserAuthUserProvider` is specific to my project and it implements `Symfony\Component\Security\Core\User\UserProviderInterface`

This took a fair amount of dicking around to get working for me. Hopefully this post will decrease the amount of time you have to spend dicking around. :-)

