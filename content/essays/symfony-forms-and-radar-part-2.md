---
title: Symfony Forms and Radar - Part 2
date: 2016-09-28T05:00:55.000Z
published: false
created: 2016-09-28T05:00:55.000Z

---

In [Part 1](/symfony-forms-radar/) I talked about the difficulties in getting Symfony Forms to play nicely with Aura.Di and Radars ADR model.

Today I'm picking up where I left off. My goal is to figure out what I need to do differently to achieve the clean separation I desire.

All of my issues with Aura.Di have been resolved and my LazyArray class is currently [being reviewed](https://github.com/auraphp/Aura.Di/pull/138) for inclusion in Aura.Di.

## Removing Validation

The first thing I did was remove [Symfony Validator](http://symfony.com/components/Validator) from the form (and my app). I did this for several reasons.

First, my initial attempts to validate independently from the Form showed that Validator is fairly complex. There also seems to be very little documentation for using outside of Symfony. The [few](https://blog.tinned-software.net/using-the-symfony-validator-as-a-standalone-component/) [examples](https://gist.github.com/chrisguitarguy/2b27669a2e8d84d948ff) I found didn't seem like the sort of validation I'd like to use in my projects.

Second, the point of this series is to integrate Symfony Forms, not Validator. No sense going down another rabbit hole. If you're interested in me figuring out Symfony Validator, please [contact me](/contact/) and let me know.

## Isolating Form to the Responder

The second thing I did was move all use of the Form object to the Responder. Since I'd like to handle the Request manually and validate separately in the domain, the form can be moved to the Responder.

You can follow along with my [commits here](https://github.com/futureproofphp/symfony-forms-radar/commit/2ed2da998c9084bff97c647d2cf158a9903b5d70).

How I'm handling things in Input and the Domain right now are just placeholders until I get the form figured out.

I'm still calling `handleRequest` at this point because I haven't figured out how to pass in the payload from the domain. I'll do that next.

## Handling Request from Payload

This was far easier than I expected. Since I'm not doing anything crazy with file uploads or anything I was simply able to submit the form directly.

```php
$form = $this->formFactory->create(RegistrationType::class);
$name = $form->getName();
if ('' === $name) {
} elseif (array_key_exists($name, $data)) {
}
```

## Validating and Showing Validation Errors

Now that the basics are working, I can implement validation and display the validation errors with the form.

I decided to use [Aura.Filter](https://github.com/auraphp/Aura.Filter) for my validation. It integrates easily with Aura.Di and fits my idea of a clean validation library.

The first step is to create a filter. This is easily done by extending `Aura\Filter\SubjectFilter` and overriding the `init` method.

```php
namespace FutureProofPhp;
use Aura\Filter\SubjectFilter;
class RegistrationFilter extends SubjectFilter {
  public function init() {
    $this->validate('firstName')->isNotBlank();
    $this->validate('firstName')->is('strlenMin', 4);
    $this->sanitize('firstName')->to('string');
    $this->useFieldMessage('firstName', 'Minimum length of 4 is required.');
    $this->validate('lastName')->isNotBlank();
    $this->validate('lastName')->is('strlenMin', 4);
    $this->sanitize('lastName')->to('string');
    $this->useFieldMessage('lastName', 'Minimum length of 4 is required.');
    $this->validate('gender')->isNotBlank();
    $this->validate('gender')->is('inValues', ['male', 'female']);
    $this->sanitize('gender')->to('string');
    $this->useFieldMessage('gender', 'Invalid value.');
    $this->validate('newsletter')->isBlankOr('equalToValue', 1);
    $this->useFieldMessage('newsletter', 'Invalid value.');
    $this->validate('_token')->isNotBlank();
    $this->useFieldMessage('_token', 'Invalid value.');
  }
}
```

Next, since I'll need this filter in my post domain, I convert my closure into an invokable class.

```php
$adr->post('postHome', '/', 'FutureProofPhp\RegistrationPost')
  ->input('FutureProofPhp\RegistrationInput')
  ->responder('FutureProofPhp\RegistrationResponder');
```

I then configure the container to instantiate this filter and pass it into `RegistrationPost`.

```php
$di->set('filter:registration', $di->lazy(
  [$di->lazyNew(FilterFactory::class), 'newSubjectFilter'],
  RegistrationFilter::class
));
$di->params[RegistrationPost::class]['filter'] = $di->lazyGet('filter:registration');
```

Next, I apply this filter on the data I get from `RegistrationInput`.

```php
public function __invoke($data) {
  $payload = [
  ];
  if (!$payload['success']) {
    $failures = $this->filter->getFailures();
    $payload['failures'] = $failures->getMessages();
  }
  $payload['data'] = $data['registration'];
  return $payload;
}
```

Finally, I consume the payload in `RegistrationResponder` going through the failure messages and adding `FormError` objects to the correct elements.

```php
$form = $this->formFactory->create(RegistrationType::class);
$form->submit($payload['data'], true);
if (isset($payload['failures'])) {
  foreach ($payload['failures'] as $name => $messages) {
    $element = $form->get($name);
    foreach ($messages as $message) {
    }
  }
}
```

You can see the result of this in the [2.x branch](https://github.com/futureproofphp/symfony-forms-radar/tree/2.x) of the project repo.

## Conclusion

This exercise left me with a greater understanding of Symfony Forms and Aura.Filter. I think the solution is pretty good. If I was using this in production, I'd probably refactor some of this to be more reusable, especially if I plan on defining a lot of forms. I probably wouldn't use arrays as the data transfer mechanism. I'd also probably create a factory that takes a generic definition and generates the form, validation and entity objects that I'd be using.

I’m very interested in hearing from you. I will be creating new content over the coming weeks and I want to customize the content for YOU and help you overcome any obstacles you might be experiencing. [Send me a message](/contact/)!

