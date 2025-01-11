---
title: How to Build a Hassle-Free Server with Docker and Caddy
date: 2024-11-08T20:03:34.000Z
created: 2024-11-08T20:03:34.000Z
published: false
---

![Screenshot of Dockge Dashboard](/notes/img/dockge-dashboard.png)

Over the 20+ years I've hosted websites, I've gone through several server configurations. Heck, I've been managing my own Linux VPS servers since at least 2008. Today, I mostly bounce between Linode and DigitalOcean.

I host a mixture of PHP and Node.js apps, although since my current stack is Node.js, I'm getting rusty on the best ways to host PHP.

I manage my servers manually. I SSH into the server and install and configure everything on the command line. This isn't too bad until it's time to move or upgrade the server. In particular, managing Nginx and Let's Encrypt has been tedious, to say the least.

At work, we use Docker with AWS Elastic Beanstalk, which is nice, but I'm not interested in moving my servers to Amazon.

But Docker... I like it, and it makes it much easier to manage what versions of things I use.

I recently had to get an old PHP app running, and it probably wouldn't have happened without Docker. Throwing a docker-compose.yml file in the root, specifying the version of PHP and MySQL I wanted to use, and having it ready to go was amazing. Long gone are the days of wanting to install MySQL on my laptop.

Since it's so great on my laptop for development, I've been wanting to find the best way to leverage Docker for all my VPS hosting needs.

In this tutorial, I'll walk you through the steps I took to set up my web server on DigitalOcean using Docker, Dockge, and Caddy-Docker-Proxy. I'll then show how I installed Directus with this stack.

This is a living document, and I plan to revisit and update this tutorial as time goes by based on my continuing experience and feedback.

## Setting up a DigitalOcean Droplet

![Screenshot of Create Droplet](/notes/img/digitalocean-droplet.png)

I don't plan on getting too detailed here because DigitalOcean has some of the best documentation I've ever seen.

I started by following the steps outlined in [Set up a Production-Ready Droplet](https://docs.digitalocean.com/products/droplets/getting-started/recommended-droplet-setup/). At the end of that tutorial, you should have a running Ubuntu Linux server you can SSH into. I'll refer to the Cloud Firewall later in this tutorial, so make sure you have that enabled.

I did run into an issue where I got an error: `Failed to restart sshd.service: Unit sshd.service not found.` which was easily corrected by changing `restart sshd` to `restart ssh` in the cloud config script.

If you want to support IPv6, follow the instructions in [How to Enable IPv6 on Droplets](https://docs.digitalocean.com/products/networking/ipv6/how-to/enable/).

I head to my domain registrar and point a subdomain to my new server. You'll need to at least set the A record to the IPv4 address you got from DigitalOcean and the AAAA record if you set up IPv6.

One thing I typically do on my Mac to make things easier is update my SSH config at `~/.ssh/config` with the following (update with your details):

```
Host mywebserver
HostName myhost.example.com
Port 22
User myuser
IdentityFile ~/.ssh/id_rsa
ForwardAgent yes
```

This lets you type in `ssh mywebserver` and easily connect to your server. It also works great with other tools you might use, like rsync or scp.

Once you ssh into your server as your new user (not root) you should be able to update your server with the following commands:

```
sudo apt-get update -y
sudo apt-get dist-upgrade -y
```

The final step for now is to install Docker. I followed the instructions in [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/), and it went smoothly.

## Installing Dockge

Coming soon...

## Installing Caddy-Docker-Proxy with Dockge

Coming soon...

## Installing Directus with Dockge

Coming soon...
