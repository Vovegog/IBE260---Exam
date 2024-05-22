const testCars = [
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

function filterCars(cars: any[]) {
  const filteredCars = cars.filter((car) => car.arsmodell > 2010 && car.pris > 100000);
  return filteredCars.sort((a, b) => b.farge.localeCompare(a.farge));
}

console.log(filterCars(testCars));

/*
Funksjon plasserBrikker(n):
    Hvis n < 1:
        Returner en tom liste
    Dersom n = 1:
        Returner en matrise med en Brikk
    result = []
    brett = Array(n) med nuller
    plasserBrikkerRekursivt(brett, 0, result)
    Returner result

Funksjon plasserBrikkerRekursivt(brett, rad, result):
    // basisbetingelsen: alle Brikker er plassert
    Hvis rad >= lengden av brettet:
        kopiAvBrett = lag en kopi av brettet
        Legg til kopiAvBrett i result
        Returner

    For alle kolonner i brettet:
        // prøv å plassere en Brikk i rad og kolonne
        Hvis brettErTrygt(brett, rad, kolonne):
            brett[rad][kolonne] = 1 // plasser Brikken
            // plasser resten av Brikkene rekursivt
            plasserBrikkerRekursivt(brett, rad + 1, result)
            brett[rad][kolonne] = 0 // fjern Brikken

Funksjon brettErTrygt(brett, rad, kolonne):
    // sjekk kolonne
    For r = 0 til rad - 1:
        Hvis brett[r][kolonne] er 1:
            Returner false

    // sjekk diagonal /
    for r = rad - 1, k = kolonne - 1; r >= 0 && k >= 0; r--, k–
        Hvis brett[r][k] er 1:
            Returner false

    // sjekk diagonal \
    for r = rad - 1, k = kolonne + 1; r >= 0 && k < lengden av brettet; r--, k++
        Hvis brett[r][k] er 1:
            Returner false

    // brettet er trygt
    Returner true
*/