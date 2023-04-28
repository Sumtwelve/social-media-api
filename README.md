![a small badge indicating the MIT license](https://img.shields.io/badge/license-MIT-blue)

# API Demonstration: Social Media Platform

This project is simply a REST API for a prototype social media website. With all of these back-end Express routes set up, all this needs is a front end and it will work as a very basic social media platform.

## Demonstration / Usage

To see a demonstration video (which also has instructions for testing the routes yourself), click [here](https://youtu.be/mgg3qWGPBKY).

If you don't want to watch the video, here are some written instructions:

- Install MongoDB if you haven't already
- Install some kind of endpoint-testing software (I use Insomnia)
- Clone / fork the repo, open a terminal in the folder
- Enter `npm i` to install dependencies
- Run `npm run seed` to run seed script (will create a database called `socialDB`)
- Run `npm run start` to start the server, or run `npm run dev` to start it in developer mode (restarts the server when it detects file changes)
- Open endpoint-testing software, hit endpoints as written in [Routes section below](#routes). That section also details what the request's `body` should have.

## Structure

Using MongoDB, the app uses three data structures: Users, Thoughts, and Reactions. A user can post a Thought, which is just a piece of text anyone on the site can read. Other users can add Reactions to that thought, which are like comments. Users can also add other users to their friend lists.

## Routes

I wrote the following routes for querying the database:

- USERS
    - (GET) Get all users: `/api/users/`
    - (GET) Get one user by its ID: `/api/users/:userId`
    - (POST) Create new user: `/api/users/`
        - Required fields: `username`, `email`
    - (PUT) Update one user: `/api/users/:userId`
        - Updatable fields: `username`, `email`
    - (DELETE) Delete one user: `/api/users/:userId`
    - Thoughts
        - (GET) Get all thoughts for one user: `/api/users/:userId/thoughts`
    - Friends
        - (POST) Add one friend to one user: `/api/users/:userId/friends/:friendId`
            - No `body` required
        - (DELETE) Remove one friend from one user: `/api/users/:userId/friends/:friendId`
- THOUGHTS
    - (GET) Get all thoughts
    - (GET) Get one thought by its ID
    - (POST) Create new thought
        - Required fields: `thoughtText`, `username`
    - (PUT) Update one thought's text
        - Updatable fields: `thoughtText`
    - (DELETE) Delete one thought
    - Reactions
        - (POST) Add one reaction to one thought
            - Required fields: `reactionText`, `username`
        - (DELETE) Delete one reaction from one thought

## Development Obstacles

The main obstacles I faced writing this project were learning Mongoose and creating a seed script. I'd never used Mongoose before, and I'd never written my own seed script. Thankfully, the Mongoose docs were usually sufficient to help me understand the errors I ran into. But mostly, I'm glad that Mongoose was simple enough that it didn't pose any major obstacles. At least, it didn't until I started writing the seed script.

I had a perhaps uncommon mindset walking into this. I wanted to write functions that assembled random usernames and emails to create a fully randomized and interlinked dataset. After days of different varieties of headache, I found my best option was to simply hard-code some static data by hand. This wasn't ideal because it meant I had to write out a lot of stuff manually, but it was the easiest way to get it to work with Mongoose.

At first, I had a high opinion of MySQL and Sequelize. NoSQL databases didn't appeal to me, because I could do just about anything with MySQL. But after working on this project, I feel capable of doing basic tasks in either type of database, and I don't think I prefer one over the other anymore. Now I can use them if I need them, rather than only ever sticking to one.

## License

MIT license. I do not care what you do with this code, and I'm open to suggestions/improvements/collaborations.