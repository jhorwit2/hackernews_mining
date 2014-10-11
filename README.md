[![David DM](https://david-dm.org/jhorwit2/hackernews_mining.png)](http://david-dm.org)
[![Travis CI](https://travis-ci.org/jhorwit2/hackernews_mining.svg)](https://travis-ci.org/jhorwit2/hackernews_mining)
[![Coverage Status](https://img.shields.io/coveralls/jhorwit2/hackernews_mining.svg)](https://coveralls.io/r/jhorwit2/hackernews_mining)

Mining Hacker News Top 100
=================

This application is used in conjunction with the new [Hacker News API](https://github.com/HackerNews/API) so that you can
mine the top 100 threads as they update to analyze at a later date.

My plan is to use this application to mine data and create an open-source web application that performs
text analysis on the data and shows useful trends related the top 100 threads over time in real-time.

<b>Note - This application is stable and any major updates will come via version tags. Major updates include logic
for storing the data and the schema structure.</b>

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

CREATE TABLE thread_rank
(
  "id" serial NOT NULL,
  "threadId" integer NOT NULL,
  "createdAt" date,
  "updatedAt" date,
  "rank" integer,
  CONSTRAINT thread_rank_pkey PRIMARY KEY (id),
  CONSTRAINT thread_rank_threadId_fkey FOREIGN KEY ("threadId")
      REFERENCES "threads" ("id") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
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
