[![David DM](https://david-dm.org/jhorwit2/hackernews_mining.png)](http://david-dm.org)
[![Travis CI](https://travis-ci.org/jhorwit2/hackernews_mining.svg)](https://travis-ci.org/jhorwit2/hackernews_mining)
[![Coverage Status](https://img.shields.io/coveralls/jhorwit2/hackernews_mining.svg)](https://coveralls.io/r/jhorwit2/hackernews_mining)

hackernews_mining
=================

This application is used in conjunction with the new [Hacker News API](https://github.com/HackerNews/API) so that you can
mine the top 100 threads as they update to analyze at a later date.

My plan is to use this application to mine data and create an open-source web application that performs
text analysis on the data and shows useful trends related the top 100 threads over time in real-time.

<b>Note - this application is not yet stable as the schema and logic is changing.

Database Setup
=================
This application is setup for using postgres, so the scripts below are for that language.</b>


You will need to have a running postgres instance on your machine. You can follow a tutorial like [this](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-14-04).

Once you have a database installed you will want to create a table
with the following structure:

```sql
CREATE TABLE threads
 (
     "id" serial NOT NULL,
     "title" text NOT NULL,
     "updatedAt" date,
     "createdAt" date,
     CONSTRAINT "threads_pkey" PRIMARY KEY (id)
)
```

Installation
=================

**Note**- I'd recommend installing forever if you wish to mine data on a server.

```
npm install -g forever
```

Then install the application

```
git clone https://github.com/jhorwit2/hackernews_mining.git

cd hackernews_mining

npm install
```

Then run one of these commands to run your server
```
forever start app.js

or

node app.js
```
