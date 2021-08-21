# next-discord-linear

**This is unfinished. A release will be created once the first version is released**

next-discord-linear is a deployable (preferably on vercel) nextjs site that can act as a linear 
webhook endpoint and translates these into Discord webhooks.

## Installation

To start, press this button to create a Vercel deployment (which will use the defaults and can 
be configured later)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FFloffah%2Fnext-discord-linear&project-name=next-discord-linear&repository-name=next-discord-linear)

**! Make sure you have "Create private Git Repository" checked or you risk leaking admin 
passwords**

You will need to define the `DATABASE_URL` environment variable. This should be a postgres 
database which you can get (completely free) from Heroku by doing the following:
1. Open [heroku](https://www.heroku.com) and login
2. Once on your dashboard, press New near the top right of the page then choose create new app
3. On this page, give it any name and set the region to United States (by default, Vercel 
   deploys serverless functions to aws lambda in the US)
4. Go to the resources tab, and in the search box in the middle of the page, type Postgres and 
   choose "Heroku Postgres"
5. It shouldn't take long to create, click on the icon next to its name (it might take you to a 
   page called elements, if it does close that tab and keep clicking it until it sends you to 
   the page)
6. On first try the page may take a little bit to load, but once it does go to the settings tab, 
   then click view credentials
7. One of the items should be called "URI". In Vercel, create a new environment variable called 
   `DATABASE_URL` and paste the URI bit into it (you may need to add `?scheme=public` on the end)
8. Once done, Vercel will deploy it and next-discord-linear will automatically manage the 
   database for you from then on

Note: Heroku says "Heroku rotates credentials periodically and updates applications where this 
database is attached." but from experience it has never reset any of my credentials so this 
shouldn't happen.

Once it creates the GitHub repository, navigate to [/config-example.json](/config-example.json), 
rename 
it to config.json, and fill out the 
details.

Now, commit the new config, let Vercel deploy it, then log in to the deployment using your admin 
password. Once you do that, you will be able to create multiple Discord webhook integrations and 
choose which events get sent to which!
