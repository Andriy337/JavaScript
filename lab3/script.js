
const car1 = new Object();
car1.color = "Cиній";
car1.maxSpeed = 200;
car1.driver = {
    name: "Файбиш Андрій",
    category: "C",
    personalLimitations: "Не їждю вночі"
};
car1.tuning = true;
car1.numberOfAccidents = 0;


const car2 = {
    color: "Червоний",
    maxSpeed: 180,
    driver: {
        name: "Файбиш Андрій",
        category: "B",
        personalLimitations: null
    },
    tuning: false,
    numberOfAccidents: 2
};


car1.drive = function() {
    console.log("Я не їждю вночі");
};
car1.drive(); 


car2.drive = function() {
    console.log("Я можу їздити в будь-який час");
};
car2.drive(); 


function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;
}


Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};


Truck.prototype.trip = function() {
    if (!this.driver) {
        console.log("Не призначено водія");
    } else {
        console.log(`Водій ${this.driver.name} ${this.driver.nightDriving ? 'керує вночі' : 'не керує вночі'} та має ${this.driver.experience} років досвіду`);
    }
};


const truck1 = new Truck("Жовтий", 3000, 60, "BrandA", "ModelX");
const truck2 = new Truck("Зелений", 2500, 50, "BrandB", "ModelY");


truck1.AssignDriver("Файбиш Андрій", true, 5);
truck2.AssignDriver("Файбиш Андрій", false, 3);


truck1.trip();
truck2.trip();




class Square {
    constructor(a) {
        this.a = a;
    }

    static help() {
        console.log("Квадрат: чотирикутник, у якого всі сторони рівні, а всі кути прямі.");
    }

    length() {
        return this.a * 4;
    }

    square() {
        return this.a * this.a;
    }

    info() {
        console.log(`Квадрат зі стороною довжиною ${this.a}:`);
        console.log(`Усі сторони рівні: ${this.a}`);
        console.log(`Усі кути прямі: 90 градусів`);
        console.log(`Периметр: ${this.length()}`);
        console.log(`Площа: ${this.square()}`);
    }
}


class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }

    static help() {
        console.log("Прямокутник: чотирикутник з усіма прямими кутами та протилежними сторонами однакової довжини.");
    }

    length() {
        return (this.a + this.b) * 2;
    }

    square() {
        return this.a * this.b;
    }

    info() {
        console.log(`Прямокутник зі сторонами довжиною ${this.a} та ${this.b}:`);
        console.log(`Протилежні сторони однакові: ${this.a}, ${this.b}`);
        console.log(`Усі кути прямі: 90 градусів`);
        console.log(`Периметр: ${this.length()}`);
        console.log(`Площа: ${this.square()}`);
    }
}

// Клас Rhombus
class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Ромб: чотирикутник зі всіма сторонами рівними, але кути не прямі.");
    }

    length() {
        return this.a * 4;
    }

    square() {
        return this.a * this.a * Math.sin(this.alpha * Math.PI / 180);
    }

    info() {
        console.log(`Ромб зі стороною довжиною ${this.a}, тупим кутом ${this.alpha}° та гострим кутом ${this.beta}°:`);
        console.log(`Усі сторони рівні: ${this.a}`);
        console.log(`Тупий кут: ${this.alpha}°, гострий кут: ${this.beta}°`);
        console.log(`Периметр: ${this.length()}`);
        console.log(`Площа: ${this.square()}`);
    }
}

// Клас Parallelogram
class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Паралелограм: чотирикутник з протилежними сторонами однакової довжини та кутами, які не є прямими.");
    }

    length() {
        return (this.a + this.b) * 2;
    }

    square() {
        return this.a * this.b * Math.sin(this.alpha * Math.PI / 180);
    }

    info() {
        console.log(`Паралелограм зі сторонами довжиною ${this.a} та ${this.b}, тупим кутом ${this.alpha}° та гострим кутом ${this.beta}°:`);
        console.log(`Протилежні сторони однакові: ${this.a}, ${this.b}`);
        console.log(`Тупий кут: ${this.alpha}°, гострий кут: ${this.beta}°`);
        console.log(`Периметр: ${this.length()}`);
        console.log(`Площа: ${this.square()}`);
    }
}


Object.defineProperty(Rhombus.prototype, "a", {
    get: function() {
        return this._a;
    },
    set: function(value) {
        this._a = value;
    }
});

Object.defineProperty(Rhombus.prototype, "alpha", {
    get: function() {
        return this._alpha;
    },
    set: function(value) {
        this._alpha = value;
    }
});

Object.defineProperty(Rhombus.prototype, "beta", {
    get: function() {
        return this._beta;
    },
    set: function(value) {
        this._beta = value;
    }
});


Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();


const squareObj = new Square(5);
const rectangleObj = new Rectangle(5, 8);
const rhombusObj = new Rhombus(5, 120, 60);
const parallelogramObj = new Parallelogram(5, 8, 120, 60);

squareObj.info();
rectangleObj.info();
rhombusObj.info();
parallelogramObj.info();


function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}


const triangular1 = Triangular(3, 4, 5);
const triangular2 = Triangular(5, 12, 13);
const triangular3 = Triangular(); // Значення за замовчуванням

console.log("Трикутник 1:", triangular1);
console.log("Трикутник 2:", triangular2);
console.log("Трикутник 3:", triangular3);


function PiMultiplier(num) {
    return function() {
        return Math.PI * num;
    };
}


const piTimes2 = PiMultiplier(2);
const piTimes32 = PiMultiplier(32);
const piDividedBy2 = PiMultiplier(0.5);

console.log("π * 2 =", piTimes2());
console.log("π * 32 =", piTimes32());
console.log("π / 2 =", piDividedBy2());


function Painter(color) {
    return function(obj) {
        if (obj.type) {
            console.log(`${color} ${obj.type}`);
        } else {
            console.log("Властивість 'type' не знайдена!");
        }
    };
}


const paintBlue = Painter("Синій");
const paintRed = Painter("Червоний");
const paintYellow = Painter("Жовтий");


const obj1 = { maxSpeed: 280, type: 'Truck' };
const obj2 = { maxSpeed: 180, type: 'Sportcar' };
const obj3 = { avgSpeed: 90, color: 'Фіолетовий' };

console.log("\nPaintBlue:");
paintBlue(obj1);
paintBlue(obj2);
paintBlue(obj3);

console.log("\nPaintRed:");
paintRed(obj1);
paintRed(obj2);
paintRed(obj3);

console.log("\nPaintYellow:");
paintYellow(obj1);
paintYellow(obj2);
paintYellow(obj3);
