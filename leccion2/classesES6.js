class Animal {
    makeSound() {
        return this._sound;
    }
}

class Dog extends Animal {
    constructor(name) {
        super();
        this._name = name;
        super._sound = "Woof";
        super.makeSound = () => {
            return "Miau"
        }
    }

    get name() {
        console.log("Se esta ejeutando el metodo getter de Dog");
        return this._name;
    }

    get sound() {
        console.log("sonido del perro");
        return
    }

    set name(value) {
        console.log("Se esta ejecutando el metodo setter de Dog");
        this._name = value;
    }
}

const myDog = new Dog("Spike");
console.log(myDog);
console.log(myDog._name);
console.log(myDog.name);
console.log(myDog.name = "Tom");
console.log(myDog);
console.log(myDog._sound);
console.log(myDog.makeSound());

