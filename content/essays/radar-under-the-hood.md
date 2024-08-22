---
title: Radar Under the Hood
date: 2016-09-21T20:23:10.000Z
updated: 2016-09-21T20:23:10.000Z
published: true
---

[Radar](https://github.com/radarphp/Radar.Project) is a project that I really like.

Radar is a PSR-7 compliant [Action-Domain-Responder](http://pmjones.io/adr/) (ADR) system. While it may look like a micro-framework, it is more like a wrapper around the real core of your application domain.

Have your eyes glossed over yet? Don't worry. Radar is actually very simple to use, especially once you understand what's happening under the hood.

Today, I'd like to give you a quick tour under the hood to explain the libraries that Radar glues together and what that whole Action-Domain-Responder thing is.

## Action-Domain-Responder (ADR)

Action-Domain-Responder or ADR is a pattern defined by [Paul M. Jones](http://paul-m-jones.com/) as a refinement of Model-View-Controller or MVC which you may have heard of.

### Action

In MVC frameworks you're typically calling "Actions" within a "Controller". If you look at the examples on the Symfony page for [Controller](http://symfony.com/doc/current/controller.html) you'll see that you have a method `numberAction` within `LuckyController`. In ADR the action is the minimal glue that holds your application requests together.

### Domain

The domain is the core code in your application that actually does the work. The idea is that this code is specific to your application. If you're familiar with [Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html) from Uncle Bob, the domain entails the Use Cases (Application Business Rules) and Entities (Enterprise Business Rules) in your application. The domain shouldn't know or care how its response is being presented to the user. It could be an HTML web page, a REST API, a command line tool, or unit test.

### Responder

The responder takes a response from your domain and formats the actual response to the user. This could be done via a template system like [Twig](https://twig.symfony.com/) or JSON encoder.

## How Radar does ADR

When you first go through the [Radar documentation](http://radarphp.com/) (which is very nice). The first question I asked myself is "Where's the Action?"

You direct routes to Domain objects, and per route, you can define Inputs and Responders. If this is Action-Domain-Responder shouldn't I be creating Actions?

Radar (or more specifically [Arbiter](https://github.com/arbiterphp/Arbiter.Arbiter)) actually creates the Action for you. Remember where I mentioned that Actions are minimal glue? Radar takes that seriously.

An `Arbiter\Action` is simply a data object that contains three [callables](http://php.net/manual/en/language.types.callable.php) the Input, Domain, and Responder.

Then there is an `Arbiter\ActionHandler` which does the work.

First, a PSR-7 Request is passed into the Input and it returns the parameters for the Domain.

Then, the parameters are passed into the Domain and a payload is returned.

Finally, the responder is passed the payload along with the PSR-7 Request and Response.

Here is the actual code:

```php
public function handle(Action $action, Request $request, Response $response) {
  $responder = $this->resolve($action->getResponder());
  if (! $responder) {
  }
  $domain = $this->resolve($action->getDomain());
  if (! $domain) {
  }
  $params = [];
  $input = $this->resolve($action->getInput());
  if ($input) {
  }
  $payload = call_user_func_array($domain, $params);
  return $responder($request, $response, $payload);
}
```

## So What Does Radar Do?

It bootstraps the application using [Aura.Di](https://github.com/auraphp/Aura.Di), dependency injection container.

It exposes [Aura.Router](https://github.com/auraphp/Aura.Router) to actually map paths to [Arbiter](https://github.com/arbiterphp/Arbiter.Arbiter) Actions.

The whole thing is delivered as [Relay](https://github.com/relayphp/Relay.Relay) (a PSR-7 middleware dispatcher) middlewares that do a lot of the work.

[RoutingHandler](https://github.com/radarphp/Radar.Adr/blob/1.x/src/Handler/RoutingHandler.php) takes the Input, Domain, and Responder values from the route and creates the Action.

[ActionHandler](https://github.com/radarphp/Radar.Adr/blob/1.x/src/Handler/ActionHandler.php) then takes the Action created by `RoutingHandler` and handles it with the `Arbiter\ActionHandler`.

## What Next?

If you're interested in watching me demo Radar, you can watch my video [FutureProof Your Code](/essays/futureproof-your-code/) where I talk about Clean Architecture and how to use Radar.
