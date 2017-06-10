
// constructor function
function Employee(name,age,position) {
    var name = name;
    var age = age;
    var position = position;
}



// let used in a parameterized function
// do not do this
function Employee(name, age, position) {
    let name = name;
    let age = age;
    let position = position;

}



    var objectToReturn = {
        name:name,
        age:age,
        position:position,
        isBoss:false
    }
    return objectToReturn;
};



const objectToReturn = {
    name:name,
    age:age,
    position:position,
    isBoss:false
}
return objectToReturn;
};

var johnDoe = new Employee("john",40,"manager");
var janeDoe = new Employee("jane",35,"sysadmin");

var maxDoe = new Employee("max",35,"sysadmin");

const johnDoe = new Employee("john",40,"manager");
const janeDoe = new Employee("jane",35,"sysadmin");

console.log(johnDoe.age);
console.log(janeDoe.isBoss);
console.log(maxDoe.age);

for (let i = 0; i <= 2; i++) {
    console.log(i);
};

for (let i = 0; i <= 2; i++) {
    console.log(i + 100);
}




var companyMotto = "Lorem Ipsum";

const companyMotto = "Lorem Ipsum";

for(var i=0;i<5;i++){
    console.log(companyMotto);
};