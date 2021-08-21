# next-discord-linear

next-discord-linear is a deployable (preferably on vercel) nextjs site that can act as a linear 
webhook endpoint and translates these into Discord webhooks.

## Installation

To start, press this button to create a Vercel deployment (which will use the defaults and can 
be configured later)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FFloffah%2Fnext-discord-linear&project-name=next-discord-linear&repository-name=next-discord-linear)

**! Make sure you have "Create private Git Repository" checked or you risk leaking admin 
passwords**

Once it creates the GitHub repository, navigate to [/config.json](/config.json) and fill out the 
details.

Now, commit the new config, let Vercel deploy it, then log in to the deployment using your admin 
password. Once you do that, you will be able to create multiple Discord webhook integrations and 
choose which events get sent to which!
