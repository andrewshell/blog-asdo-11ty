---
title: PHP Bugtracking
date: 2006-11-05T06:00:00.000Z
published: false
created: 2006-11-05T06:00:00.000Z

---

So I am currently looking for good bug tracking software. I have a few requirements, some of which I'm sure are unreasonable. First the code needs to be able to run without errors, warnings or notices in PHP 5.2 (using php.ini-recommended) and it's an extra bonus if it works under E_STRICT. It should either use no database or MySql. It should not require funky extensions, python or perl.

A few that I've tested out:

* [PEST](http://sourceforge.net/projects/pest/)
* [Flyspray](http://flyspray.org/)
* [CodeTrack](http://kennwhite.sourceforge.net/codetrack/)
* [phpBugTracker](http://phpbt.sourceforge.net/)
* [Eventum](https://github.com/eventum/eventum/wiki)
* [Mantis](http://www.mantisbugtracker.com/)
* [ActiveCollab](http://www.activecollab.com/)

The only two that meet my requirements are Mantis and ActiveCollab. Neither one however stands as a clear winner though.

As it stands Mantis is in the lead. It looks like a very capable bug tracker however the interface leaves something to be desired. It seems overly busy and it's not always obvious where you should be going to do things. Like to add a project you have to:

`Manage > Manage Projects > Create New Project`

I'm also not clear where to administer categories.

ActiveCollab on the other hand has a wonderful user interface. However it isn't actually a bug tracking system yet. It's a project management tool like Base Camp. I can create projects and tasks but tasks are either outstanding or completed. There is no way to comment on the tasks or mark them as complete, pending, not a bug, etc... Bugtracking is on the [roadmap](http://www.activecollab.com/pages/29/development/roadmap/) for 0.7.5. For a 0.7.0 release it's really slick and very usable.

So I'm left not really satisfied with my findings. I don't want to write my own but I may anyways. I'll be really happy with ActiveCollab when bugtracking is added in 0.7.5.

