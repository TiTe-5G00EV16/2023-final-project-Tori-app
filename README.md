[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-8d59dc4de5201274e310e4c54b9627a8934c3b88527886e3b421487c677d23eb.svg)](https://classroom.github.com/a/qBr6G7dS)
# final-project
Web Programming 2023 - Final Project

Running service:
https://torifront.onrender.com/

## Running instructions:

Run `docker-compose up -d` in root directory.

Create .env file in **/frontend** that includes `VITE_API_URL=http://localhost:5000`

Create .env file in **/backend** that includes:
```
MYSQL_HOST='localhost'
MYSQL_USERNAME='root'
MYSQL_PASSWORD='listings_password'
MYSQL_DATABASE='listings_db'
JWT_KEY='yourownkey'
```

Run:
```
npm install
npm run dev
```
in /backend directory

Run:
```
npm install
npm run dev
```
in /frontend directory

# Summary
Database runs in docker and it uses mySQL. Listings table has foreign key userId and it is used to find listings author information in each listingItem component. I used useQuery to get the author information in each listingItem, but it went in some kind of error loop so it was a **challenge**. Query couldn't separate all the requests from eachother, because the request name/id was same in all of them. So the fix was to include userId in the request so the request name was unigue. Listings foreign key also uses ON DELETE CASCADE, so when user is deleted all the users listings also deletes from database.

Backend uses express. Passwords are hashed.

Pages are switched using react-router-dom.