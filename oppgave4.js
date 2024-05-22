var testCars = [
    { modell: "Volvo", arsmodell: 2013, pris: 120000, farge: "Blå" },
    { modell: "Tesla", arsmodell: 2012, pris: 150000, farge: "Svart" },
    { modell: "Audi", arsmodell: 2009, pris: 90000, farge: "Sølv" },
];
/*
Remove cars older than 2010
Filter out cars with a pricetag lower than 100k
Sort cars after colour, alphabetically
Return the resulting array of cars
*/
function filterCars(cars) {
    var filteredCars = cars.filter(function (car) { return car.arsmodell > 2010 && car.pris > 100000; });
    return filteredCars.sort(function (a, b) { return b.farge.localeCompare(a.farge); });
}
console.log(filterCars(testCars));
