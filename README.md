# left-field-locator

Code challenge for Left Field

A hosted example is available [here](http://sheltered-tundra-5570.herokuapp.com/).

## Running locally

Running locally requires Node.js and the node package manager.

1. ```git clone https://github.com/ericwestbrook/left-field-locator.git```
2. ```cd left-field-locator```
3. ```npm install```
4. ```node app.js```

## Summary

I decided to put something together that utilizes a front-end with a small node back-end for relaying requests to google's API. I chose to implement angular so that I could bind DOM elements to live data and focus on writing functional code.

I abstracted the code to allow you to input any location you like to compare. The field also uses google location for live-searching location results.

## Next steps

I stood true to only using a couple of hours on this. If I was going to spend more, I would first implement gulp with sass & uglify (of which I have already put the appropriate libraries in place). I would split the controllers and services for the front-end to separate files that are then compiled. I would also visualize this by simply adding a google world map embed and plotting the points of search locations with lines leading to the home location.