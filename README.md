-- Insert data into the Account table INSERT INTO account (id, balance) VALUES
(1, 1000); INSERT INTO account (id, balance) VALUES (2, 2000);

-- Insert data into the Deposit table INSERT INTO deposit ("accountId", amount)
VALUES (1, 500); INSERT INTO deposit ("accountId", amount) VALUES (2, 1000); --
Add more deposits as needed

curl --location 'localhost:3300/account/deposit' \
--header 'Content-Type: application/json' \
--data '{ "accountId": 1, "amount": 200 }'

curl --location 'localhost:3300/account/withdraw' \
--header 'Content-Type: application/json' \
--data '{ "accountId": 1, "amount": 200 }'

curl --location 'localhost:3300/account/transfer' \
--header 'Content-Type: application/json' \
--data '{ "fromAccountId": 1, "toAccountId": 2, "amount": 200 }'
