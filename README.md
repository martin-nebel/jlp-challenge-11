# jlp-challenge-11
A Javascript solution to [JLP Coding Challenge 11](https://coding-challenges.jl-engineering.net/challenges/challenge-11/)

Takes a string of JSON data from https://pubcrawlapi.appspot.com/ containing pub information and returns a JSON object containing an array of beers available in pubs, using the most recently timestamped version of data for each pub and sorting the results by beer name and pub name.

This function will probably run out of memory at some point if passed a large enough string of JSON.  I've assumed that whatever calls the function would handle or restrict the amount of data that it can be passed :-)  

This could potentially be addressed by streaming the JSON from and to files, for instance, and processing chunks of it at a time via the function. This would rely on all entries for a pub being in the chunk being processed, else that chunk may not be using the latest details for a given pub.

## To install and run tests locally:
- ensure you have Node and NPM installed (See [https://nodejs.org/en/](https://nodejs.org/en/) if not)
- clone the repository (**git clone https://github.com/martin-nebel/jlp-challenge-11.git**)
- install jest (**npm install --save-dev jest**)
- run tests (**cd jlp-challenge-11 && npm run test**)
