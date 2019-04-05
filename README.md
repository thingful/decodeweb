# Decode Demo Webapp

This app is an attempt to implement the user app functionality for the DECODE
IoT pilot until the real app changes. It provides a UI that mimics the wallet
functionality and implements all the Coconut encryption interactions in the
browser to create encoded streams and save credentials.

The implementation saves all data into localstorage within the browser so is
by no means secure, however the aim is to prototype the interaction not
provide a fully secure environment.

## Running locally

The app is built inside Docker/Compose environment so to run locally you
should be able to just run:

```bash
$ make start
```

## Deployment

The app has been deployed to heroku, and is available here:
https://decodeweb.herokuapp.com