---
title: Getting started with Radar
date: 2015-12-17T06:00:00.000Z
published: true
created: 2015-12-17T06:00:00.000Z

---

I recently needed a quick tool to track and generate invoices for my small random freelance jobs. I thought this would be a good project to try out [Radar](https://github.com/radarphp/Radar.Project), a PSR-7 compliant Action-Domain-Responder (ADR) system created by [Paul M. Jones](https://paul-m-jones.com/tag/radar/).

I like Radar and I'd like to document some of the things that I noticed while I built my app. This is not meant to be a replacement of the [official docs](https://github.com/radarphp/Radar.Project/blob/1.x/docs/index.md) which you should read first if you want to build an application using Radar. If you'd like to follow along, my project is [Stupid Simple Invoices](https://github.com/andrewshell/invoice/tree/0.0.1).

## Great for Domain Driven Design (DDD)

Robert Martin Architecture

In [the documentation](https://github.com/radarphp/Radar.Project/blob/1.x/docs/domain.md) Paul leads with:

Radar concentrates exclusively the HTTP request/response cycle. This means that, for Radar to be useful, you need to build your Domain outside of, and probably in parallel with, your Radar wrapper around that Domain.

The best illustration of this was in Robert Martin's talk [Architecture the Lost Years](https://www.youtube.com/watch?v=WpkDN78P884) in which he works his way through a [UML diagram I recreated here](/uploads/2015/12/architecture-uml.pdf) for you:

[![UML Diagram](img/architecture-uml-2x.png)](/uploads/2015/12/architecture-uml.pdf)

Your application's domain code should be framework agnostic and not depend on any logic related to the delivery mechanism or specific implementations (like databases).

Radar is the perfect tool for this style of design. If you look in my project you'll see I split the code into two main folders under `src` folder. `Application` is for the Radar specific "delivery mechanism" code and `Domain` is for the meat and potato logic for my app.

Looking at my UML diagram there is no real Controller. It's functionality is built into Radar. However, we have an Input class (I'm using the default `RadarAdrInput`) which is tasked with taking the PSR-7 Request and creating a domain specific Request model. In the case of the default Input class it just returns an array of the various available values merged together ([More information](https://github.com/radarphp/Radar.Project/blob/1.x/docs/routing.md#manually-specifying-a-custom-input-class)).

The Interactor is what Radar calls the Action. It takes the Domain specific Request Model and returns a Domain specific Response Model. A good way to check yourself to make sure you're doing it right is to ask "Would the request and response make sense if this app logic was being delivered via HTTP, CLI, Api, etc". This is why we're not passing in the PSR-7 Request, that's specific only to an HTTP delivery mechanism.

In the default Radar example, Paul uses `AuraPayloadPayload` as the Response Model. I chose to not do so, because I felt it was making my domain depend on a third party class outside of my domain. If you like the Payload class (it's actually very nice) and wanted to use it, I'd personally prefer copying it into my domain and moving forward using my fork of it. For simplicity and symmetry with the Input class, I chose to use an array as the Response Model.

The Responder in Radar corresponds to the Presenter in my diagram. The default Responder is `RadarAdrResponderResponder` which expects `AuraPayloadPayload` and outputs JSON. It's ideal for a REST API. My app isn't a REST API and I'm not returning a Payload object, so I needed to replace it.

## Getting used to Aura.Di

Since Paul is also the brains behind [Aura](http://auraphp.com/) a collection of high quality components, it should be of no surprise that Radar uses Aura under the hood.

The two main components used are [Aura.Router](https://github.com/auraphp/Aura.Router/tree/3.x) and [Aura.Di](https://github.com/auraphp/Aura.Di/tree/3.x).

My experience is with [Symfony](https://symfony.com/) and [Silex](https://github.com/silexphp/Silex) and the Aura.Router implementation made perfect sense to me and caused no friction.

Aura.Di (a dependency injection container) on the other hand kind of confused me before it clicked.

Here's how I'd explain it:

With Pimple (the DI container with Silex) or Symfony DI pretty much everything is a service. With Pimple you'd do:

```php
// define some services
$container['session_storage'] = function ($c) {
};
$container['session'] = function ($c) {
  // use predefined service
  return new Session($c['session_storage']);
};
```

In Aura.Di _not everything has to be a service_ which is the root of what confused me.

The previous example in Aura.Di could be:

```php
$di->set('session', $di->lazyNew('Session'));
$di->params['Session']['storage'] = $di->lazyNew('SessionStorage');
$di->params['SessionStorage']['id'] = 'SESSION_ID';
```

In this example SessionStorage is never defined as a service, you've just configured it so if someone calls `$di->lazyNew('SessionStorage')` it will create a new one. If someone wants the service `session` they would do `$di->get('session')` which would continue to return the same `Session` object.

So you need to get the hang of Aura.Di in order to use Radar because this is where you'll configure how to wire up your application.

## My new Responder class

As I mentioned before, since I wasn't using `AuraPayloadPayload` and I wasn't responding with JSON I needed to create my own `Responder` class.

Looking at the default `RadarAdrResponderResponder` is a good place to start, but I kept mine very simple.

My `InvoiceApplicationResponder` class takes a `Twig_Environment` as a dependency. This introduced an interesting puzzle for my development. If I was using a common Responder for multiple actions, how would I select which template to load? I didn't want the action to know anything about how it's response was going to be delivered so it couldn't go in there. It had to be defined outside of the domain.

My solution was to pass it in as a default value through the router. It's technically passed into the action, but the actions aren't using it in any way. My responder however, knows to fetch the `_view` attribute from the request and uses that value to render the page.

## Conclusion

I'm really happy with how well Radar worked. I like how it enforces the pattern of the Domain Interactor from Robert Martin's talk. It was too easy with Silex to skirt around creating interactors for things.

