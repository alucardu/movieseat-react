This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn install`

Installs all project dependencies.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
"# movieseat" 

npx generate-react-cli component MyComponent

## Some Docker tips

docker-compose up -d

docker ls

npx prisma db pull

docker exec -it movieseat-react_postgres_1 bash

psql -U db_user college_db

\dt+

TABLE "Notification";
TABLE "MovieVideo";
TABLE "MovieRating";
TABLE "Movie";
TABLE "User";

DELETE FROM "Notification";
DELETE FROM "MovieVideo";
DELETE FROM "Movie";
DELETE FROM "MovieRating";
DELETE FROM "User";
DELETE FROM "_UserFollows";

## Some Prisma tips

Apollo client resolvers have to connect to Apollo server resolvers

schema.js is interpreted by apollo server
prisma.schema is used for migration

npx prisma migrate dev --name **some_name**

yarn graphql-codegen

alucardu has added Dune to their watchlist

alucardu has rated Dune

alucardu has reviewed Dune

alucardu has commented on your Dune review

alucardu is following you

[movie title] has been updated with a new [movie attribute]

[followedUser] [action] [movie]

systemctl restart nginx

certbot --force-renewal
restart digital ocean droplet

## Deploy changes ##
yarn install
git pull origin master
npm run build
npx prisma generate
npx prisma migrate deploy

https://app.pm2.io/bucket/6373ecef21a6bdcb92083ed0/backend/overview/servers