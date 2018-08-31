# Referral-System-API
A collection of REST API endpoints that exposes methods that allows contacts of a system the ability to referral people to the system

# Requirements
This project was built with the following:
- Node LTS version - v8.9.0
- NPM - v6.2.0
- Postgres - v10.3


# Setting Up
## A. Structure/Project Setup
- Clone the repo and cd into the folder:
```
git clone git@github.com:ruqoyyasadiq/referral-system-api.git && cd referral-system-api
```

- Rename `env.sample` as `.env` and set the contained values appropriate.

> Note: The value `REFERRAL_POINTS` is set as an environment variable, to provide flexiblity of points assigned to referrer. For the sake of this project's requirement, the value of `REFERRAL_POINTS` should be left at 100 as set in the sample file. In subsequent versions, depending on the possibility of having multiple, different types of points, we should have a static table in the database that stores these points values.


- Install Project dependencies
```
npm install
```

## B. DB and App Setup
- Ensure Postgres services is running. [Click here](https://www.moncefbelyamani.com/how-to-install-postgresql-on-a-mac-with-homebrew-and-lunchy/) to view setup for Mac OS users
- Create DB
```
npm run db:create
```

- Start the app in development with:
```
npm run dev
```

or in non-dev mode with:
```
npm start
```

- Run Database migrations
```
npm run db:migrate
```

- Seed Database with Contact Details
```
npm run db:seed
```

- Access the server via:
```
http://localhost:5000/v1/{resourceName}
```

# Endpoints List
| Endpoint Description  | Routes                    | Method  |
|-----------------------|---------------------------|---------|
| Fetch all Contacts    | /v1/contacts              |   GET   |
| Fetch Leaderboard     | /v1/contacts/leaderboard  |   GET   |
| Fetch Single Contact  | /v1/contacts/:contactId   |   GET   |
| Update Single Contact | /v1/contacts/:contactId   |   PUT   |
| Update Single Contact | /v1/referrals/new         |   POST  |


# TODOs
- Paginate lists - Contacts and Leaderboard list
- Implement actual `SlackNotifier` for referral creation
- Increase Test Coverage
- Set up static table for points. Assumptions made is: down the line there would be multiple types of points for (possibly) different kinds/levels of referrals. This should live in the DB

# Author
[Rukayat Sadiq](https://github.com/ruqoyyasadiq)
