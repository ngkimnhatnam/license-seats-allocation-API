## Core requirements for the application

- Admin API to insert new licenses with provided details
- User can reserve a seat with correct key and that user email belongs to associated domain that has registered keys.
- Reservation must be limited according to number of concurrent users

## Extended requirements

- API for proactive seat release from user, so that it frees up the slot for a license key.

## Sidenotes

- Currently the release seat API will release all seats from a user if they are active, for the sake of simplicity.
