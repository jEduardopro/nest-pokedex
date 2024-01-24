<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Run in development

1. Clone repository

2. Run
```
npm install
```
3. Install Nest CLI
```
npm i -g @nestjs/cli
```

4. Spin up the database
```
docker-compose up -d
```

5. Rebuild the database with the seed
```
http://localhost:4000/api/v2/seed
```

## Stack
* MongoDB
* Nest