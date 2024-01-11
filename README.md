# Diamond Hand Stock Trading App

Check out the project [here](https://diamond-hand-trading.com)!

![Getting Started]()

## Description

What I learned

This is the first project that I have deployed with AWS. I created an Amazon Lightasail instance to host the site, and Amazon RDS for the managed database services. Through that process I learned basic linux commands, as well as how to navigate the vim editor, use an ssh connection to connect to the lightsail server, and how to use an SFTP process.

What to Improve

- Organization of Types and Type file structure. This isn't client facing, but I started to learn more about typing and working with types as this project progressed. Moving into my next project I will do a better job of organizing my type files and create more reusable types.
- I used React Bootstrap tables to get through the project a bit faster. But for a better asethically pleasing application, I would like to improve the style of the portfolio table and stock search table.

Stock Trading Site Functionality :

- Register as a user to be able to access the application
- View trending Economic news
- "Paper trade" popular stocks using $100,000 that

![Getting Started](/client/src/assets/random-page.png)

## Installation Instructions

### Client

1. run 'cd client'
2. run 'npm install'
3. run 'npm run dev'

### Server

1. Open a sperate terminal window
2. run 'cd server'
3. Create .env file and include `REACT_APP_bearer_token=XXX`
4. Gain access to a Finhub API key and add `FINHUB_API_KEY-XXX` to .env file
5. Gain access to a Financial Modeling Pro API key and add `FMP_API_KEY-XXX` to .env file
6. run 'npm install'
7. run 'npm run startServer'

### Database Setup

1. Setup a postgres database with these details:
   `host: 'localHost'`
   `user: 'postgres'`
   `password: process.env.PGADMIN_PWD`
   `port: 5432`
   `database: 'postgres'`

## Author

Kurtis Casperson, Software Developer
connect with me on [LinkedIn](https://www.linkedin.com/feed/) !
