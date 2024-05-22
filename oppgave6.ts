/*
Pseudo:

Model cars of different models as classes

Implement support for at least one type of car for private use, one for commercial use and one for racing

Use at least one interface to define a common set of properties for all cars

Create a class-hierarchi for obstructions on the road where obstructions differ between easy obstructions (e.g. a pothole) and
hard obstructions (e.g. a wall), as well as living obstructions (e.g. a cat) and objects.

At least one interface and one abstract class should be used in the class-hierarchi

The car classes should have a "black box" that store the cars speed in case of an accident, or 0 km/h if not in accident, or stopped before accident

The car classes must be different in (at least) these two following ways (logically, technically and ethically)
1: Braking length
    Braking length is dependent on speed for the private car
    Braking length is dependent on weight for the commercial car
    Braking length is dependent on air resistance (AERO) or maneuverability (MANU) for the racing car

Brake length is calculated as follows:
    (x*x)/L, where x is 1/10 of the speed and L is the abstraction of the class the braking is calculated for
    Private car: (x*x)/1
    Commercial car: (x*x)/2
    Racing car: (x*x)/3

2: If a hindrance/obstruction pops up in front of the car, the cars should break maximally to avoid collision AND
    a) The private car should swerve away if it can't stop in time, no matter the obstruction
    b) The commercial car should swerve away if the weight it's carrying is less than a constant (MAXWEIGHT) AND the hindrance is non-movable (e.g. "hard" type)
    c) The racing car should swerve away if it's set to MANU and it doesn't imply swerving into another obstacle

*/

interface Car {
    speed: number;
    weight: number;
    model: string;
    color: string;
    year: number;
    blackBox: BlackBox;
    brake(): void;
    swerve(): void;
}

abstract class Obstruction {
    abstract type: string;
    abstract weight: number;
    abstract movable: boolean;
    abstract distance: number;
    abstract maneuverability: number;
}

class BlackBox {
    speedAtCrash: number;

    constructor() {
        this.speedAtCrash = 0;
    }
}

class PrivateCar implements Car {
    speed: number;
    weight: number;
    model: string;
    color: string;
    year: number;
    blackBox: BlackBox;

    constructor(speed: number, weight: number, model: string, color: string, year: number) {
        this.speed = speed;
        this.weight = weight;
        this.model = model;
        this.color = color;
        this.year = year;
        this.blackBox = new BlackBox();
    }

    brake() {
        console.log("Braking for private car");
    }

    swerve() {
        console.log("Swerving for private car");
    }
}

class CommercialCar implements Car {
    speed: number;
    weight: number;
    model: string;
    color: string;
    year: number;
    blackBox: BlackBox;

    constructor(speed: number, weight: number, model: string, color: string, year: number) {
        this.speed = speed;
        this.weight = weight;
        this.model = model;
        this.color = color;
        this.year = year;
        this.blackBox = new BlackBox();
    }

    brake() {
        console.log("Braking for commercial car");
    }

    swerve() {
        console.log("Swerving for commercial car");
    }
}

class RacingCar implements Car {
    speed: number;
    weight: number;
    model: string;
    color: string;
    year: number;
    blackBox: BlackBox;
    setting: string;

    constructor(speed: number, weight: number, model: string, color: string, year: number, setting: string) {
        this.speed = speed;
        this.weight = weight;
        this.model = model;
        this.color = color;
        this.year = year;
        this.blackBox = new BlackBox();
        this.setting = setting;
    }

    brake() {
        console.log("Braking for racing car");
    }

    swerve() {
        console.log("Swerving for racing car");
    }
}

class EasyObstruction extends Obstruction {
    type = "easy";
    weight = 0;
    movable = true;
    distance: number = 50;
    maneuverability = 0;
}

class HardObstruction extends Obstruction {
    type = "hard";
    weight = 1000;
    movable = false;
    distance: number = 100;
    maneuverability = 0;
}

class LivingObstruction extends Obstruction {
    type = "living";
    weight = 1;
    movable = true;
    distance: number = 80;
    maneuverability = 0;
}

class ObjectObstruction extends Obstruction {
    type = "object";
    weight = 100;
    movable = false;
    distance: number = 150;
    maneuverability = 0;
}

function avoidObstruction(car: Car, obstruction: Obstruction) {
    const carSpeed = car.speed;
    let brakingFactor: number = 0;

    if (car instanceof PrivateCar) {
        brakingFactor = 1;
    } else if (car instanceof CommercialCar) {
        brakingFactor = 2;
    } else if (car instanceof RacingCar) {
        brakingFactor = 3;
    }
    
    if (obstruction.distance < (carSpeed/10 * carSpeed/10) / brakingFactor) {
        car.brake();
        console.log("Succesfully avoided collision by braking.\n")
    } else {
        console.log("Collision imminent, calculating possibility for swerving.");
        if (obstruction.type === "easy") {
            car.swerve();
            console.log("Succesfully avoided collision by swerving.\n")
            return;
        } else if (obstruction.type === "hard") {
            if (car instanceof CommercialCar) {
                if (car.weight < 1000) {
                    car.swerve();
                    console.log("Succesfully avoided collision by swerving.\n")
                    return;
                } else { // In this instance, we will crash. Need to calculate crash speed
                         // There is no way in hell I have enough time to implement this hahaha
                         // I will settle for a console.log statement without any logic behind it
                    console.log("Collission imminent, no swerving possible.")
                    car.brake();
                    if (carSpeed > 0) {
                        car.blackBox.speedAtCrash = carSpeed;
                        console.log("Crashed at speed: " + carSpeed + "\n");
                        return;
                    }
                }
            } else {
                car.brake();
                console.log("Succesfully avoided collision by braking.\n")
                return;
            }
        } else if (obstruction.type === "living") {
            car.swerve();
            return;
        } else if (obstruction.type === "object") {
            car.brake();
            return;
        }
        car.swerve();
        return;
    }
}

/*
INITIALIZE THE .TS FILE BY RUNNING "npx tsc oppgave6.ts" IN THE TERMINAL
THEN RUN THE .JS FILE BY RUNNING "node oppgave6.js" IN THE TERMINAL
*/

/* 
Her kan du lage biler av forskjellige typer, kall de hva du vil.
Syntax er som følger:
    const car = new Car(speed, weight, model, color, year);
*/

const privateCar = new PrivateCar(100, 1000, "Tesla Model S", "red", 2021);
const commercialCar = new CommercialCar(80, 2000, "Volvo V70", "blue", 2021);
const commercialCar2 = new CommercialCar(70, 900, "Volvo V70", "black", 2020);
const racingCar = new RacingCar(200, 800, "Ferrari 488", "yellow", 2021, "MANU");

/* Her kan du lage hindringer. De har hardkoda egenskaper */
const easyObstruction = new EasyObstruction();
const hardObstruction = new HardObstruction();
const livingObstruction = new LivingObstruction();
const objectObstruction = new ObjectObstruction();

// console.log(privateCar);
// console.log(commercialCar);
// console.log(racingCar);

/* Bruk funksjon for å teste om bilene klarer å unngå hindringene */
avoidObstruction(privateCar, easyObstruction);
avoidObstruction(commercialCar, hardObstruction);
avoidObstruction(commercialCar2, hardObstruction);
avoidObstruction(racingCar, objectObstruction);