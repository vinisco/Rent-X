<h1 align=center>Rent-X</h1>

<p align=center>Car rental application built on <a href="https://www.rocketseat.com.br/" target="_blank">Ignite<a> - Node.js</p>

<p align="center">
  <a href="[https://github.com/prettier/prettier](https://yarnpkg.com/)">
    <img height="22px" src="https://badgen.net/badge/node/yarn/2688b6">
  </a>  &nbsp;  &nbsp; 
  <a href="https://github.com/prettier/prettier">
    <img height="22px" src="https://img.shields.io/badge/code_style-prettier-f7c543.svg">
  </a>  &nbsp;  &nbsp; 
  <a href="https://github.com/airbnb/javascript">
    <img height="22px" src="https://badgen.net/badge/style/Airbnb/ff5a5f?icon=airbnb">
  </a> &nbsp;  &nbsp; 
  <a href="#License">
    <img height="22px" src="https://img.shields.io/badge/license-MIT-green">
  </a>
</p>
  
# Run Locally :computer:

Clone the project

```bash
git clone https://github.com/vinisco/rentex.git
```

Go to the project directory

```bash
cd rentex
```

Install dependencies

```bash
yarn
```

Start docker services

```bash
docker compose up
```

Run migrations to create tables

```bash
yarn typeorm migration:run
```

# Business rules

## Car Registration

- It must be possible to register a new car.

- It must not be possible to register a car with an existing license plate.
- The car must be registered as available by default.
- The user responsible for the registration must be an administrator user.

## Car Listing

- It must be possible to list all available cars.
- It must be possible to list all available cars by category name.
- It must be possible to list all available cars by brand name.
- It must be possible to list all available cars by car name.

- The user does not need to be logged into the system.

## Car Specification Registration

- It must be possible to register a specification for a car.

- It must not be possible to register a specification for an - unregistered car.
- It must not be possible to register an existing specification - for the same car.
- The user responsible for the registration must be an - administrator user.

## Car Image Registration

- It must be possible to register the car image.

## Use multer for file upload.

- The user must be able to register more than one image for the - same car.
- The user responsible for the registration must be an - administrator user.

## Car Rental

- It must be possible to register a rental.

- The rental must have a minimum duration of 24 hours.
- It must not be possible to register a new rental if there is - already one open for the same user.
- It must not be possible to register a new rental if there is - already one open for the same car.
- The user must be logged into the application.
- When renting a car, the car status must be changed to - unavailable.

## Car Return

- It must be possible to return a car.

- If the car is returned with less than 24 hours, a full day must be charged.
- When returning the car, it must be made available for - another rental.
- When returning the car, the user must be made available - for another rental.
- When returning the car, the rental total must be calculated.
- If the return time is later than the expected delivery time, - a proportional late fee must be charged.
- If there is a late fee, it must be added to the rental total.
- The user must be logged into the application.

## Rental Listing for User

- It must be possible to search for all rentals for the user.

- The user must be logged into the application.

## Password Recovery

- It must be possible for the user to recover the password by - providing the email.
- The user must receive an email with the step-by-step process - for password recovery.
- The user must be able to enter a new password.

- The user must provide a new password.
- The link sent for recovery must expire in 3 hours.

# Diagram

<p align=center> 
  <img width="95%" src="../../blob/master/diagrama.png" >
</p>

# Authors

- [@vinisco](https://github.com/vinisco)
- [@rocketseat-education](https://github.com/rocketseat-education)

# License

This project is [MIT](LICENSE) licensed.
