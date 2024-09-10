---
title: Introducing Cadre.Module
date: 2016-10-20T15:51:24.000Z
published: true
itemtype: https://schema.org/TechArticle
created: 2016-10-20T15:51:24.000Z

---

Today I published a new component [Cadre.Module](https://github.com/cadrephp/Cadre.Module).

This component was born out of my side project that's using [Radar](https://github.com/radarphp/Radar.Project).

## Stock Radar

Radar is built around [Aura.Di](https://github.com/auraphp/Aura.Di) which is a very nice dependency injection container. If you're interested in learning more about Radar check out [Radar Under the Hood](/essays/radar-under-the-hood/).

One thing that's great about Aura.Di is the concept of ContainerConfig objects.

Here is an example:

```php
use Aura\Di\ContainerBuilder;
$container_builder = new ContainerBuilder();
// use the builder to create and configure a container
// using an array of ContainerConfig classes
$di = $container_builder->newConfiguredInstance([
  'Aura\Cli\_Config\Common',
  'Aura\Router\_Config\Common',
  'Aura\Web\_Config\Common',
]);
```

This is nice because I can package my DI configuration into smaller classes that configure a single thing. An example of this could be one ContainerConfig that configures [Twig](https://twig.symfony.com/) and another that configured [Atlas.Orm](https://github.com/atlasphp/Atlas.Orm).

The problem I ran into was where to put things if they are related to different areas. Also, there was an issue about how to make things work between dev and production if they needed a different configuration.

The specific use case that prompted the development of this library was configuring [PHP Debug Bar](http://phpdebugbar.com/) which I've been [working with a lot lately](/essays/collecting-data-from-atlas-orm-with-php-debug-bar/).

PHP Debug Bar can collect data from many different sources. I'm using it currently with Twig and Atlas.Orm. When I push my project to production, I will not want to be loading PHP Debug Bar, but it's very useful during development.

It's also possible that I'll want to reuse this code in the future on projects that may not use Twig and/or Atlas.Orm.

## Cadre.Module

In Cadre.Module I introduce the `Module` and `ModuleLoader` classes. Both are useable as ContainerConfig objects. Modules define four additional methods that are inspired by [Composer](https://getcomposer.org/).

Each module can define what other modules they require, require in dev, conflict with and replace.

I started out also implementing provide and suggest, but decided that they had limited to no application in this use case.

While the new modules are just ContainerConfigs with extra metadata, the module loader does the heavy lifting.

While still behaving as a ContainerConfig, a module loader starts out with a list of modules in the same way `composer.json` defines your starting packages.

When it's used, it goes through and loads each of the modules and loads their required modules. It also checks for conflicts and replacements along the way.

The `define` and `modify` methods just proxy through to all of the loaded modules.

The other neat feature of Cadre.Module is that modules can query the module loader to see if another module is loaded.

This is especially useful for optional modules or development modules that may not always be present.

## Conclusion

I'm interested in what you think of Cadre.Module. Check out [the documentation](https://github.com/cadrephp/Cadre.Module) and ask questions either here in the comments or as [an issue on GitHub](https://github.com/cadrephp/Cadre.Module/issues).

