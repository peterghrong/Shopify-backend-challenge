# Shopify-backend-challenge

Hi! This repository contains my submission to the shopify internship challenge, built with the MERN stack with typescript. All the relevent backend codes are stored in [`server/src`](https://github.com/peterghrong/Shopify-backend-challenge/tree/main/server/src)

The project contains basic CRUD functionalities:
-   Create Inventory Item
-   Edit them
-   Delete them
-   View a list of them

as well as an additional feature:

-   Push a button to export all product data into a CSV file.

## Deployment:

The project is deployed [Here](https://amazing-swirles-53ba41.netlify.app/) feel free to play around with it.

-   Database hosted by: MongoDB Atlas
-   Backend hosted by: Heroku
-   Frontend hosted by: Netlify

## Installation

#### Backend

1. Clone the repository.

```
 git clone git@github.com:peterghrong/Shopify-backend-challenge.git
```

2. In the root directory, go to the backend folder.

```
cd server
```

3. Install server dependencies.

```
yarn install
```

4. Add `.env` file, then copy and edit the below variables into the env file to spin up the database.

```
DB=<YOUR MONGODB ATLAS DATABASE URI>
PORT=<YOUR DESIRED LOCAL PORT LOCATION>
```

#### Frontend

1. In the root directory, go to the frontend folder.

```
cd client
```

2. Install client dependencies.

```
yarn install
```

3. Update the `baseUrl` variable in `/api/api.ts` to your desired `localhost` url, for example:

```typescript
const baseUrl: string = "http://localhost:4000;
```

Now you have all the prerequesites to run the application in development enviroment.

## Running the application

1. In the server folder, start the server.

```
yarn dev
```

2. In the frontend folder, start the React client.

```
yarn start
```

3. Go to the `localhost` you previously defined on the above step 3 to use the application.

## Run backend tests

In the server folder, run:

```
yarn test
```

## Screenshots
1. Interface
![Screen Shot 2022-01-09 at 3 22 47 PM](https://user-images.githubusercontent.com/66083521/148699451-9f694f61-937f-4cee-87b6-81d9ec4b1285.png)
2. Click the Export CSV button to download the CSV file. 
![Screen Shot 2022-01-09 at 3 25 10 PM](https://user-images.githubusercontent.com/66083521/148699502-14b439ba-35dc-4078-a1f9-68f5d71dacf0.png)
3. Example CSV file downloaded. 
![Screen Shot 2022-01-09 at 3 26 50 PM](https://user-images.githubusercontent.com/66083521/148699531-a8916be3-c7a9-46c2-9d09-53656bfb9340.png)


## Readings

1. [Deploying MERN Application](https://dev.to/stlnick/how-to-deploy-a-full-stack-mern-app-with-heroku-netlify-ncb)
2. [Client Server CSV Export](https://stackoverflow.com/questions/18306013/how-to-export-csv-nodejs)
