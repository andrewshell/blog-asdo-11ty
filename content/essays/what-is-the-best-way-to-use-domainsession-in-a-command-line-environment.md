---
title: What is the best way to use DomainSession in a command line environment?
date: 2017-05-25T16:42:29.000Z
published: false
created: 2017-05-25T16:42:29.000Z

---

Jory Geerts asks:

>  Do you have any thoughts on how [DomainSession] could be used from a CLI environment?

The first thing to ask yourself is how would you like sessions to work on the command line? There are a few ways this could work.

## Each run has its own new session

The main reason I see for this option would be to reuse the domain logic from your web app and it depends on DomainSession. You don't really care what gets stored in the session because you consider it temporary.

In [bin/with_new.php](https://github.com/futureproofphp/radar-domain-session/blob/master/bin/with_new.php) I've defined a very simple script.

First, I init the script. In this case, since I'm using a Radar application, I just use Aura.Di directly to load `DomainModule`. This makes sure I have `SessionManager` and `Home` configured.

If I was doing this in production, I'd probably have a different definition for `DomainModule` that I used with the CLI that used the Memory storage instead of File storage. In this example, I won't worry about that.

Then I can get a new instance of my domain object `Home` and call it with null as the `$sessionId`. This will let the `SessionManager` generate a new ID for this request.

```php
$home = $di->newInstance(Home::class);
$payload = $home(null);
```

## Each run has its own new prepopulated session

If I need to prepopulate the session with data (like a logged in user) I can simply start a new session, assign the values I want to the session and finish it like normal. Then I can grab the session ID from that session and pass it into the domain object so it can reuse that session.

I implement this in [bin/with_prepopulated.php](https://github.com/futureproofphp/radar-domain-session/blob/master/bin/with_prepopulated.php#L7-L14).

```php
$sessionManager = $di->newInstance(SessionManager::class);
$session = $sessionManager->start(null);
$session->timestamp = '1981-08-27 17:00:00';
$sessionManager->finish($session);
$sessionId = $session->getId()->value();
$home = $di->newInstance(Home::class);
$payload = $home($sessionId);
```

## Reuse the session between script runs

The next option would be if you wanted to reuse the session between script runs. You'll need to determine how you want to store the `$sessionId` between script runs, but one way would be to print it in the output, then include it as a parameter when calling your script in the future.

I implement this in [bin/with_reused.php](https://github.com/futureproofphp/radar-domain-session/blob/master/bin/with_reused.php#L7-L13).

```php
$sessionId = isset($argv[1]) ? $argv[1] : null;
$home = $di->newInstance(Home::class);
$payload = $home($sessionId);
echo "Timestamp: {$payload['timestamp']}\n";
echo "Session ID: {$payload['session']->getId()->value()}\n";
```

The output would work as such:

```bash
$ php with_reused.php
Timestamp: Unknown
Session ID: 2337858b313a2e4fb3bc2fd8b0636e5a
$ php with_reused.php 2337858b313a2e4fb3bc2fd8b0636e5a
Timestamp: 2017-05-25 16:32:35
Session ID: 2337858b313a2e4fb3bc2fd8b0636e5a
$ php with_reused.php 2337858b313a2e4fb3bc2fd8b0636e5a
Timestamp: 2017-05-25 16:32:44
Session ID: 2337858b313a2e4fb3bc2fd8b0636e5a
```

## Summary

These three ways illustrate some of the ways you could to go about solving this issue. There will most likely be specific requirements based on your application, but it will most likely be some variation of these.  For instance instead of printing the `$sessionId` you might store it in a file.

What do you think? Let me know in the comments if you see any problems with these approaches.

