---
title: Symfony Forms and Radar - Part 1
date: 2016-09-26T05:00:50.000Z
published: false
created: 2016-09-26T05:00:50.000Z

---

I have several projects I'd like to build soon. One thing they have in common is there will be a lot of data entry via forms. Back in the day I used to use [HTML_QuickForm](https://pear.php.net/package/HTML_QuickForm) but I haven't used it for a long time.

For my projects at work, one uses a custom solution I built and the other uses AngularJS. I figured it was time to look around and find a current solution.

The two I came across was [Symfony Form Component](http://symfony.com/doc/current/components/form.html) and [Zend\Form](https://framework.zend.com/manual/2.4/en/modules/zend.form.intro.html). I've used many Symfony components so I figured I'd start with theirs.

I really dig [Radar](/radar-under-the-hood/) but I know that not everything easily fits in the Action-Domain-Responder model.

I leveraged the [Symfony Forms documentation](http://symfony.com/doc/current/components/form.html) and [webmozart/standalone-forms](https://github.com/webmozart/standalone-forms) to create my proof of concept.

## Configuring a Symfony Form

I managed to get it to work but it's not ideal (yet). To see my first proof of concept check out [futureproofphp/symfony-forms-radar](https://github.com/futureproofphp/symfony-forms-radar/tree/1.x).

The first caveat that I want to express is that I wanted to leverage as much of what Symfony Forms has to offer much of which is optional. My final solution may omit parts of this.

The first issue I found was with having to use multiple setters to build objects.

[Symfony Translation Component](http://symfony.com/doc/current/components/translation.html) uses `addLoader` and `addResource` to be configured correctly. FormFactoryBuilder and Twig_Environment use `addExtension`.

```php
// there are built-in translations for the core error messages
$translator->addResource(
  'xlf',
  $vendorFormDir.'/Resources/translations/validators.en.xlf',
  'en',
  'validators'
);
$translator->addResource(
  'xlf',
  $vendorValidatorDir.'/Resources/translations/validators.en.xlf',
  'en',
  'validators'
);
```

Aura.Di doesn't really handle this use case. You can define a single parameter to be passed to the setter method. The was around this is with the two pass system. In a ContainerConfig you have two methods, `define` and `modify`. The first part `define` is where you define all of your dependencies. You should not be instantiating anything in this method other than `LazyInterface` objects. The second part `modify` actually takes an instantiated object from the container and further modifies it. Ideally, you'd do as much as possible in `define` so you're not instantiating objects that you're not actually using.

I was able to work around this using two strategies.

The first was to find or create setters that can take an array of objects instead of having to call the single method multiple times in the container. FormFactoryBuilder already has `addExtensions` that I can use, but `Translator` needed to be [extended](https://github.com/futureproofphp/symfony-forms-radar/blob/1.x/src/Translator.php) so I could have `addLoaders` and `addResources` methods. `Twig_Extension` has `setExtensions` <del>but I was unable to use that (I'll explain why later)</del>.

```php
/** FormFactoryBuilder */
$di->setters[FormFactoryBuilder::class]['addExtensions'] = [
  $di->lazyNew(CoreExtension::class),
  $di->lazyNew(CsrfExtension::class),
  $di->lazyNew(ValidatorExtension::class),
];
```

The only issue with this strategy was that if I included `LazyInterface` objects in an array, they didn't get resolved when the setter was called.

This leads to my second strategy which was the creation of a new `LazyInterface` class [LazyArray](https://github.com/futureproofphp/symfony-forms-radar/blob/1.x/src/LazyArray.php) which takes an array as a parameter and resolves any `LazyInterface` objects within it, returning an array with the resolved objects.

```php
/** FormFactoryBuilder */
$di->setters[FormFactoryBuilder::class]['addExtensions'] = new LazyArray([
  $di->lazyNew(CoreExtension::class),
  $di->lazyNew(CsrfExtension::class),
  $di->lazyNew(ValidatorExtension::class),
]);
```

<del>Now, why wasn't I able to use the `setExtensions` method from `Twig_Environment`? Circular dependencies.</del>

<del>The `Twig_Environment` extension `FormExtension` requires a `TwigRenderer` which requires a `TwigRendererEngine` which requires the `Twig_Environment`. Aura.di can't resolve this.</del>

<del>The way around it is either to not use that extension, or to configure the `Twig_Environment` extensions in `modify`. I chose the second option.</del>

### Update!

After more digging, I found that calling `setEnvironment` on the `TwigRendererEngine` is not required. I had done it because that's how it was done in the [webmozart tutorial](https://github.com/webmozart/standalone-forms/blob/2.7%2Btwig/src/setup.php#L40) but then I noticed that `setEnvironment` is called from `FormExtension::initRuntime`. This makes sense because since it's a Twig extension, shouldn't it already know the `Twig_Environment`?

Once I [removed this setter](https://github.com/futureproofphp/symfony-forms-radar/commit/6ca6a7b6e14269439c821cfaaef4e5d128d318b0) from the container, I was able to move the configuration of Twig extensions back into `define`.

```php
$di->setters[Twig_Environment::class]['setExtensions'] = new LazyArray([
  $di->lazyNew(TranslationExtension::class),
  $di->lazyNew(Twig_Extension_Debug::class),
  $di->lazyNew(FormExtension::class),
]);
```

## Using the Form

Now that I got everything configured in the ContainerConfig I need to use the form I created. The issue I quickly ran into is that a single form does a whole lot of stuff.

First, the form handles the request. By default, it pulls data out of `$_POST` but can be configured via an extension to take an HTTP Foundation Request object.

Then, the form validates this input and will return the filtered/sanitized output via the `getData` method.

Lastly, through the `Twig` the form is rendered, prepopulated with data and any validation errors.

If you're not familiar with Radar check out my post [Radar Under the Hood](/radar-under-the-hood/) where it talked in depth how it works.

The problem here is that the whole point of Radar is to separate your concerns.

For my form to work, I create the form in the input and call `handleRequest`. I return the form so it's passed on to the domain.

In the domain, I'd check if the form was valid and potentially do something with the data. I return the form as the payload for the responder.

In the responder, I render the form in twig template and return the PSR-7 Response.

I don't like that I need to have a single form object that's passed through all three layers just to render a form.

Ideally, it would work more like this.

In the input, I'd pull out the values from the PSR-7 Request and return an array or domain request object with the data.

In the domain, I'd validate the data from the input and do something with the data if valid. I'd return a domain response to the responder that contained the filtered/sanitized data and any validation error messages I generated.

In the responder, I'd take the domain response and feed it into a form object that is then passed into a twig template for rendering. I'd return the PSR-7 Response.

## Conclusion

I haven't given up on this yet (hence the "Part 1" in the title of this post).

My next step is to look at the components and extensions being used in my proof of concept and see what they are doing and if there are ways to pull them apart.

For instance, I'm creating a `Validation` object that gets passed into the form via the `ValidationExtension`. I'm assuming I can define my validation separately, but I'll have to research how to assign validation error messages to the form externally.

If validation is separate, I can probably pass in an array of data to be validated, instead of having the validator pull data directly from the request.

However, this post is already very long, so I'll save the rest for Part 2.

