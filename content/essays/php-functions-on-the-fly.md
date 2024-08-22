---
title: PHP Functions on the Fly
date: 2012-06-14T06:00:00.000Z
updated: 2012-06-14T06:00:00.000Z
published: true
---

I've been a big of a laggard when it comes around to the latest and greatest in the world of PHP. Only recently have I been using the new functionality of PHP 5.3 even though 5.4 just came out. Today I had an idea for a proof of concept and I thought I'd share it with you today.

## PHP Example


```php
class Model {
	public function __call($name, $args) {
		if (is_callable($this->$name)) {
			return call_user_func_array($this->$name, $args);
		}
	}
}

$m = new Model();

$m->hello = function ($name) {
	echo "Hello, {$name}";
};

$m->hello('Andrew');
```

What this example does is allow me to assign an anonymous function to any public parameter on my object. Then the `__call` magic method checks to see if that parameter is callable and if so calls it. I could see all sorts of interesting ways of leveraging this functionality. We could create special ways to allow for input and output filters on every one of these parameter functions pretty easily.

Anyway, I thought it was a neat idea.

