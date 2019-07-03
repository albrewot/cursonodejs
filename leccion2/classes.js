function Person() {
    this.id = 0;
    this, name = null;
    this.email = null;


    this.whoAmI = () => {
        console.log(`id: ${this.id}, name: ${this.name}, email: ${this.email}`)
        return "Done";
    }
}

var yo = new Person();

// yo.id = 123;
// yo.name = "Albert";
yo.email = "albrewot@gmail.com";

console.log(yo.whoAmI());



