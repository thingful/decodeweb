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

## Software description

This application is implemented as [Vue.js](https://vuejs.org) front end,
being served by a [Phoenix](https://phoenixframework.org/) back end. The
Phoenix application currently just returns the HTML, Javascript and other
assets necessary to render the Vue application. It also maintains a socket
server that receives messages sent from Vue, and in addition forwards
messages onto the other external services we speak to, i.e. the
[Policystore](https://policystore.decodeproject.eu), the
[Encoder](https://encoder.decodeproject.eu) or the [Credential
Service](https://credentials.decodeproject.eu).

The Vue front end stores all data purely client side in localstorage, so is
not by any means secure. This data includes a user's device configuration, as
well as the Coconut credentials that will allow the user to prove membership
of a community to the dashboard.

## Deployment

The app has been deployed to heroku, and is available here:
https://decodeweb.herokuapp.com