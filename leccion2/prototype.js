function Person() {
    this.id = 0;
    this, name = null;
    this.email = null;


    this.whoAmI = () => {
        console.log(`id: ${this.id}, name: ${this.name}, email: ${this.email}`)
        return "Done";
    }
}



Person.prototype.age = 20;
var persona = Person.prototype;
Person.prototype.isOld = () => {
    console.log("Estoy evaluando que se este llamando isOld")
    console.log("1", persona.age);
    return persona.age >= 18;
}

var otraPersona = new Person();
console.log("2", otraPersona.isOld());
console.log("3", otraPersona);
console.log("4", Person.prototype);

