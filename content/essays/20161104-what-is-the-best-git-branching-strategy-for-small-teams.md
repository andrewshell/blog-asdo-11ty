---
title: What is the best git branching strategy for small teams?
date: 2016-11-04T12:45:59.000Z
published: true
created: 2016-11-04T12:45:59.000Z

---

In my development, I use Git all the time. It was a little tricky to figure out at first but, I feel like I have a good understanding of how to use it.

When I've worked with other developers I see them struggling with a few concepts that I use regularly and thought it might be helpful to document my workflow.

On our team, we use feature branches and pull requests. I don't have a strong preference of whether the feature branch is in our main repo or in a developers fork of our repo. For this post, I'll assume feature branches are in the main repo.

Let's start with the following `master` branch.

```
master A-B-C
```

I'm going to work on a new feature so I create a new branch off of `master` and start committing my changes.

```
master  A-B-C
feature      \_F1-F2
```

During that time, other developers merged in features.

```
master  A-B-C-D-E
feature      \_F1-F2
```

I'm ready to submit my PR, but first I need to rebase off of `master`, potentially resolving conflicts that emerge.

```
master  A-B-C-D-E
feature          \_F1-F2
```

I need to make changes based on a code review, so I commit those to my repo. Meanwhile, other features are merged into `master`.

```
master  A-B-C-D-E-F-G
feature          \_F1-F2-F3
```

Before I have my new changes reviewed I once again need to rebase off of `master`.

```
master  A-B-C-D-E-F-G
feature              \_F1-F2-F3
```

To push up to the main repo I need to do a force push because I'm overwriting what was previously there.

```bash
git push -f origin feature
```

My PR is accepted, so it's squashed and merged into `master` as `H` (via GitHub), the `feature` branch is deleted.

```
master  A-B-C-D-E-F-G-H
```

Once something is merged into `master` it's locked.  Other than specific edge cases, you shouldn't ever have to force push to `master`, only to feature branches.

With our main SaaS applications I also use Git to deploy to staging and production.  I wouldn't use this for library development or any applications that have multiple deployments.

I have special branches `staging` and `production` which our continuous integration platform watch. When I push changes into those branches they are tested (as with all pushes) and if tests pass, they are deployed to that environment.

So if we wanted to deploy my latest feature, I'd merge it into `staging` and have our team review it to determine if there are any issues that need to be resolved before deploying to production.

```bash
git checkout staging
git merge master
git push origin staging
```

If there are changes we create a new feature branch and start at the top of this workflow.

If there are no changes to be made then we merge into `production`, it's tested and deployed.

```bash
git checkout production
git merge staging
git push origin production
```

That's it!  Developers I've worked with tend to get hung up on rebasing.  I know some workflows never rebase and always merge, but I strongly prefer keeping things clean with rebasing.

I know that there are a million ways to use Git and different teams have different workflows.  What do you think of my process?  Anything you'd change?

