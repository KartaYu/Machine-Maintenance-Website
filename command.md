
## Frontend Init
```
forever start -c "npm start" ./
forever list
forever stopall

```

## Backend Init
```
forever start -c "npm run devStart" ./
forever list
forever stopall

```

## AWS DB
- vpc inbound : all traffic
- account : admin
- pwd : password

```mysql
//create test db
CREATE SCHEMA `test_db` ; 

// create table
CREATE TABLE `test_db`.`new_table` (
  `m_name` VARCHAR(200) NOT NULL,
  `user_name` VARCHAR(45) NOT NULL,
  `mail` VARCHAR(200) NOT NULL,
  `start_date` TIMESTAMP NOT NULL,
  `days` VARCHAR(45) NOT NULL,
  `next_date` TIMESTAMP NOT NULL,
  `due_date` TIMESTAMP NOT NULL,
  PRIMARY KEY (`m_name`, `user_name`));
```

## AWS EC2 Setting
``` linux
 sudo yum install curl

 curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

 . ~/.nvm/nvm.sh

 nvm install 16

 node -e "console.log('Running Node.js ' + process.version)" ### test env

 cd backend

 npm install -g pm2

 sudo amazon-linux-extras install nginx1

 sudo systemctl enable nginx

 sudo systemctl start nginx

 service nginx status

 sudo systemctl reload nginx

 sudo vi /etc/nginx/nginx.conf

 location = / {
               proxy_pass http://localhost:3000;
        }

## edit localhost in js file to aws ip address.

```

## Control Command
```
killall node
```

