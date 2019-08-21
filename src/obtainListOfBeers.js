function obtainListOfBeers(incomingJsonAsString) {

  const LEAVE_ELEMENTS_AS_THEY_ARE = -1;
  const SWAP_ELEMENTS = 1;

  const sortByIdThenBranchThenCreateTs = () => (pubA, pubB) => {
    if (pubA.Id === pubB.Id && pubA.Branch === pubB.Branch) {
      return pubA.CreateTS < pubB.CreateTS ? SWAP_ELEMENTS : LEAVE_ELEMENTS_AS_THEY_ARE;
    }
    if (pubA.Id === pubB.Id) {
      return pubA.Branch < pubB.Branch ? LEAVE_ELEMENTS_AS_THEY_ARE : SWAP_ELEMENTS;
    }
    return pubA.Id < pubB.Id ? LEAVE_ELEMENTS_AS_THEY_ARE : SWAP_ELEMENTS;
  }

  const onlyKeepFirstOccurrenceOfEachPub = () => (currentPub, indexOfPubInList, listOfPubs) =>
    indexOfPubInList === listOfPubs.findIndex((pub) => pub.Id === currentPub.Id && pub.Branch === currentPub.Branch);

  const extractListOfAllBeersSoldAtPub = pubDetails =>
    extractBeersFromList(pubDetails, true).concat(extractBeersFromList(pubDetails, false));

  const extractBeersFromList = (pubDetails, useRegularBeersList) => {
    return ((useRegularBeersList ? pubDetails.RegularBeers : pubDetails.GuestBeers) || [])
      .map((beer) => {
        return {
          Name: beer,
          PubName: pubDetails.Name,
          PubService: pubDetails.PubService,
          RegularBeer: useRegularBeersList
        }
      });
  }

  const concatenateAllPubResultsIntoSingleArray = () => (beerListForAllPubs, beerListForIndividualPub) =>
    beerListForAllPubs.concat(beerListForIndividualPub);

  const sortByBeerNameThenPubName = () => (beerA, beerB) => {
    if (beerA.Name === beerB.Name) {
      return beerA.PubName < beerB.PubName ? LEAVE_ELEMENTS_AS_THEY_ARE : SWAP_ELEMENTS;
    }
    return beerA.Name < beerB.Name ? LEAVE_ELEMENTS_AS_THEY_ARE : SWAP_ELEMENTS;
  }

  try {
    return JSON.parse(incomingJsonAsString).Pubs
      .sort(sortByIdThenBranchThenCreateTs())
      .filter(onlyKeepFirstOccurrenceOfEachPub())
      .map((thisPub) => extractListOfAllBeersSoldAtPub(thisPub))
      .reduce(concatenateAllPubResultsIntoSingleArray(), [])
      .sort(sortByBeerNameThenPubName())
      ;
  } catch (err) {
    return "Error: " + err;
  }  
}

module.exports = obtainListOfBeers;