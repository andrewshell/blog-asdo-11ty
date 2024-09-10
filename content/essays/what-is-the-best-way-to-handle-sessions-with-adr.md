---
title: What is the best way to handle sessions with ADR?
date: 2017-05-02T10:00:59.000Z
published: false
created: 2017-05-02T10:00:59.000Z

---

Right before Christmas, I reached out to [Paul Jones](http://paul-m-jones.com/) asking:

>  I've reached a point with a couple of my Radar projects where I need to add a login and set permissions.  I'm trying to figure out the best way to handle this, especially with PSR-7 and ADR.

This led to discussing how to do sessions properly in [Radar](/radar-under-the-hood/). I had read Paul's post [PSR-7 and Session Cookies](http://paul-m-jones.com/archives/6310) which discussed how to tweak PHP Sessions to work better in a [PSR-7](http://www.php-fig.org/psr/psr-7/) architecture. You don't really want PHP automatically sending and reading cookies outside of the Request object.

Paul responded:

>  Finally, the more I work with separated domain layer, the more I dislike the built-in PHP session system. Lately, I have started to consider avoiding it entirely, in favor of something like a custom DomainSession. Attached are my very rough notes-in-code; maybe they'll be useful to you.

Needless to say, they have been very useful. Paul has been incredibly generous with his time and after going back and forth through several rounds of refactoring and revising I'm ready to officially announce [Cadre.DomainSession](https://github.com/cadrephp/Cadre.DomainSession). The current version as of this post is [0.4.0](https://github.com/cadrephp/Cadre.DomainSession/releases/tag/0.4.0).

## Why DomainSession?

The reason for this package is that as Paul had said: "Anything that touches storage should be considered domain-layer work." so it's ok to read the session cookie in an Input class, and it's ok to write the cookie in a Responder class, but pretty much everything else should be in the Domain layer.

_For more information about Radar see [Radar Under the Hood](/essays/radar-under-the-hood/)._

## What does it do?

Cadre.DomainSession takes a session id (or generates one) and loads session data from storage. It's smart enough to handle regenerating session ids and cleaning up expired sessions.

## Demo

I've put together a small demo app using Radar and Cadre.DomainSession at [radar-domain-session](https://github.com/futureproofphp/radar-domain-session).

### Loading the Session ID From a Cookie

Reading the session ID from a cookie is handled in the `Input` of your route. I used the excellent library [dflydev-fig-cookies](https://github.com/dflydev/dflydev-fig-cookies) to simplify getting and setting cookies in PSR-7.

In [Application\Delivery\DefaultInput](https://github.com/futureproofphp/radar-domain-session/blob/master/src/Application/Delivery/DefaultInput.php#L11-L15) I read from the `SESSION_ID` cookie, returning null if it doesn't exist.

```php
public function __invoke(Request $request) {
  $sessionId = FigRequestCookies::get($request, 'SESSION_ID');
  return [$sessionId->getValue()];
}
```

### Starting, Using and Finishing the Session

In [Application\Domain\Home](https://github.com/futureproofphp/radar-domain-session/blob/master/src/Application/Domain/Home.php#L12-L32) I first inject the `Cadre\DomainSession\SessionManager`. Then I start the session with the session ID I passed in from the `Input`. I check to see if there is a timestamp session value (Unknown if not present) and assign it with the current timestamp. Finally, I finish the session which is what persists the data to storage. In this case, it's just to the filesystem. One important thing to note is that I have to return the session object in the payload for the final step.

```php
public function __construct(SessionManager $sessionManager) {
}
public function __invoke($sessionId) {
  $session = $this->sessionManager->start($sessionId);
  $lastTimestamp = $session->timestamp ?? 'Unknown';
  $session->timestamp = date('Y-m-d H:i:s');
  $this->sessionManager->finish($session);
  return [
    'success' => true,
    'session' => $session,
    'timestamp' => $lastTimestamp,
  ];
}
```

If you want to regenerate the session ID you can do so by calling `$session->getId()->regenerate()`.

### Persisting the Session ID in a Cookie

In [Application\Delivery\DefaultResponder](https://github.com/futureproofphp/radar-domain-session/blob/master/src/Application/Delivery/DefaultResponder.php#L42-L50) I check to see if there was a session in the payload. If there is, I check to see if the session ID has been updated (new or regenerated session id).  If it's been updated I persist the session ID value to the session cookie I'm reading from in the `Input` and that's all there is to it.

```php
if (isset($payload['session']) && $payload['session'] instanceof Session) {
  if ($payload['session']->getId()->hasUpdatedValue()) {
    $this->response = FigResponseCookies::set(
      $this->response,
      SetCookie::create('SESSION_ID')
    );
  }
}
```

## Concerns

I have some concerns with this library. The built-in session handling has withstood the test of time. It's been looked at and I assume many security concerns have been fixed. I'm not a security expert, so I worry that there are vulnerabilities in my code.

In particular, I'm using what I consider to be a fairly naive method for generating session IDs.

```php
public function regenerate(int $bytes = 16): string {
  $this->value = bin2hex(random_bytes($bytes));
  return $this->value;
}
```

I need to do some research and find if [session_create_id](http://php.net/manual/en/function.session-create-id.php) would be a better method to use. I'm not sure if it just generates an ID or if it depends on the storage implementation.

## Summary

When you're using ADR, it's important to be absolutely clear what is and isn't part of your domain. Paul considers anything that touches storage as domain-layer work. Reading and writing cookies is an implementation detail that is part of the delivery mechanism. Imagine using the same domain objects in a command line application. You wouldn't use cookies, but perhaps you would pass a session ID in as a command line argument.

## UPDATE: 

There is also an interesting conversation going over on [Reddit](https://www.reddit.com/r/PHP/comments/68th28/what_is_the_best_way_to_handle_sessions_with_adr/).

