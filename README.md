# Simple Bank API

A simple API for handling deposits, withdrawals, and transfers.

## Requirements

- Node.js (Minimum version 18)
- PostgreSQL Database

## Setup

1. Clone this repository:

```shell
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

2. Copy the sample environment file and configure it with your setup:

```shell
cp env.sample .env
```

Edit the .env file and populate it with your configuration.

3. Run:

```shell
npm run dev
```

## Features

**Husky Pre-Commit Hooks:** Husky is configured to ensure that all code in the
repository adheres to the same format and follows rules before each commit.

**GitHub Actions / Pipelines**: GitHub Actions are set up to ensure that only
validated code is deployed to the repository.

## Helpful Scripts:

### Populate DB:

```SQL
-- Add Accounts
INSERT INTO account (id, balance) VALUES (1, 1000);
INSERT INTO account (id, balance) VALUES (2, 2000);

-- Add Deposits
INSERT INTO deposit (accountId, amount) VALUES (1, 500);
INSERT INTO deposit (accountId, amount) VALUES (2, 1000);
```

### API Calls:

Deposit money into account:

```cURL
curl --location 'localhost:3300/account/deposit' \
--header 'Content-Type: application/json' \
--data '{ "accountId": 1, "amount": 200 }'
```

Withdraw money from account:

```cURL
curl --location 'localhost:3300/account/withdraw' \
--header 'Content-Type: application/json' \
--data '{ "accountId": 1, "amount": 200 }'
```

Transfer money in between accounts:

```cURL
curl --location 'localhost:3300/account/transfer' \
--header 'Content-Type: application/json' \
--data '{ "fromAccountId": 1, "toAccountId": 2, "amount": 200 }'
```

## TODO

Here are some tasks to enhance the project:

- Add and Improve Testing: Enhance the test suite for better coverage and reliability.

- Add Authentication: Implement user authentication and authorization mechanisms to secure the API.

- Add Input Validation with Joi: Use the Joi library to validate input data and ensure data integrity.