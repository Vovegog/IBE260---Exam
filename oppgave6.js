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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Obstruction = /** @class */ (function () {
    function Obstruction() {
    }
    return Obstruction;
}());
var BlackBox = /** @class */ (function () {
    function BlackBox() {
        this.speedAtCrash = 0;
    }
    return BlackBox;
}());
var PrivateCar = /** @class */ (function () {
    function PrivateCar(speed, weight, model, color, year) {
        this.speed = speed;
        this.weight = weight;
        this.model = model;
        this.color = color;
        this.year = year;
        this.blackBox = new BlackBox();
    }
    PrivateCar.prototype.brake = function () {
        console.log("Braking for private car");
    };
    PrivateCar.prototype.swerve = function () {
        console.log("Swerving for private car");
    };
    return PrivateCar;
}());
var CommercialCar = /** @class */ (function () {
    function CommercialCar(speed, weight, model, color, year) {
        this.speed = speed;
        this.weight = weight;
        this.model = model;
        this.color = color;
        this.year = year;
        this.blackBox = new BlackBox();
    }
    CommercialCar.prototype.brake = function () {
        console.log("Braking for commercial car");
    };
    CommercialCar.prototype.swerve = function () {
        console.log("Swerving for commercial car");
    };
    return CommercialCar;
}());
var RacingCar = /** @class */ (function () {
    function RacingCar(speed, weight, model, color, year, setting) {
        this.speed = speed;
        this.weight = weight;
        this.model = model;
        this.color = color;
        this.year = year;
        this.blackBox = new BlackBox();
        this.setting = setting;
    }
    RacingCar.prototype.brake = function () {
        console.log("Braking for racing car");
    };
    RacingCar.prototype.swerve = function () {
        console.log("Swerving for racing car");
    };
    return RacingCar;
}());
var EasyObstruction = /** @class */ (function (_super) {
    __extends(EasyObstruction, _super);
    function EasyObstruction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "easy";
        _this.weight = 0;
        _this.movable = true;
        _this.distance = 50;
        _this.maneuverability = 0;
        return _this;
    }
    return EasyObstruction;
}(Obstruction));
var HardObstruction = /** @class */ (function (_super) {
    __extends(HardObstruction, _super);
    function HardObstruction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "hard";
        _this.weight = 1000;
        _this.movable = false;
        _this.distance = 100;
        _this.maneuverability = 0;
        return _this;
    }
    return HardObstruction;
}(Obstruction));
var LivingObstruction = /** @class */ (function (_super) {
    __extends(LivingObstruction, _super);
    function LivingObstruction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "living";
        _this.weight = 1;
        _this.movable = true;
        _this.distance = 80;
        _this.maneuverability = 0;
        return _this;
    }
    return LivingObstruction;
}(Obstruction));
var ObjectObstruction = /** @class */ (function (_super) {
    __extends(ObjectObstruction, _super);
    function ObjectObstruction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "object";
        _this.weight = 100;
        _this.movable = false;
        _this.distance = 150;
        _this.maneuverability = 0;
        return _this;
    }
    return ObjectObstruction;
}(Obstruction));
function avoidObstruction(car, obstruction) {
    var carSpeed = car.speed;
    var brakingFactor = 0;
    if (car instanceof PrivateCar) {
        brakingFactor = 1;
    }
    else if (car instanceof CommercialCar) {
        brakingFactor = 2;
    }
    else if (car instanceof RacingCar) {
        brakingFactor = 3;
    }
    if (obstruction.distance < (carSpeed / 10 * carSpeed / 10) / brakingFactor) {
        car.brake();
        console.log("Succesfully avoided collision by braking.\n");
    }
    else {
        console.log("Collision imminent, calculating possibility for swerving.");
        if (obstruction.type === "easy") {
            car.swerve();
            console.log("Succesfully avoided collision by swerving.\n");
            return;
        }
        else if (obstruction.type === "hard") {
            if (car instanceof CommercialCar) {
                if (car.weight < 1000) {
                    car.swerve();
                    console.log("Succesfully avoided collision by swerving.\n");
                    return;
                }
                else { // In this instance, we will crash. Need to calculate crash speed
                    console.log("Collission imminent, no swerving possible.");
                    car.brake();
                    if (carSpeed > 0) {
                        car.blackBox.speedAtCrash = carSpeed;
                        console.log("Crashed at speed: " + carSpeed + "\n");
                        return;
                    }
                }
            }
            else {
                car.brake();
                console.log("Succesfully avoided collision by braking.\n");
                return;
            }
        }
        else if (obstruction.type === "living") {
            car.swerve();
            return;
        }
        else if (obstruction.type === "object") {
            car.brake();
            return;
        }
        car.swerve();
        return;
    }
}
/*
Her kan du lage biler av forskjellige typer, kall de hva du vil.
Syntax er som følger:
    const car = new Car(speed, weight, model, color, year);
*/
var privateCar = new PrivateCar(100, 1000, "Tesla Model S", "red", 2021);
var commercialCar = new CommercialCar(80, 2000, "Volvo V70", "blue", 2021);
var commercialCar2 = new CommercialCar(70, 900, "Volvo V70", "black", 2020);
var racingCar = new RacingCar(200, 800, "Ferrari 488", "yellow", 2021, "MANU");
/* Her kan du lage hindringer. De har hardkoda egenskaper */
var easyObstruction = new EasyObstruction();
var hardObstruction = new HardObstruction();
var livingObstruction = new LivingObstruction();
var objectObstruction = new ObjectObstruction();
// console.log(privateCar);
// console.log(commercialCar);
// console.log(racingCar);
/* Bruk funksjon for å teste om bilene klarer å unngå hindringene */
avoidObstruction(privateCar, easyObstruction);
avoidObstruction(commercialCar, hardObstruction);
avoidObstruction(commercialCar2, hardObstruction);
avoidObstruction(racingCar, objectObstruction);
