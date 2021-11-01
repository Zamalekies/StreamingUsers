# Streaming Users

Simple app with node.js server and angular front-end. Redis is being used for data management. 

## Installation
Simplest way to get up and running is to use the Redis image on docker

```bash
docker pull redis 
```
Start redis container exposing ```port 5000```

```
docker run -d -p 5000:6379 redis
```
Install typescript

```
npm install -g typescript
```

Run in both the node.js and angular applications
```
npm install
```

## Run

### Node.js
Type  | Command
------------- | -------------
build  | tsc --build
clean  | tsc --build --clean
start  | node app
serve  | nodemon app.js

First run a clean, then a build and then nodemon can be used to host the app. This will start the server on ```port 3000```

### Angular

Type  | Command
------------- | -------------
ng  | ng
start  | ng serve
build  | ng build
watch  | ng build --watch --configuration development
test  | ng test
  
```ng serve``` is sufficient to run the application. This will start the service on  ```port 4200```

## Output

![image](https://user-images.githubusercontent.com/44745433/139751208-92f50cb1-9c5a-40f2-b946-a530d6c836c9.png)

#### Side notes
The ```disconnect``` option will only remove the top value from the list in Redis

Example API calls can be found within the root folder and can be imported via postman 'StreamCounter.postman_collection.json'

