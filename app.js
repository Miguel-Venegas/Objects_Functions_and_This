// global execution context level

console.log(this); // output window, i.e., the global object

// 2nd example

function a(){
    console.log(this);
}

// 3rd example

let b = function() {
    console.log(this);
}

a(); // output window. If you are simply invoking the function, the keyword 'this' will still point to the global object

b(); // output window. even if the function sits in a variable, the keyword 'this' will still point to the global object


// because 'this' points to the global object in various cases, you can do strange things with this phenomenon, for example:


function c(){
    console.log(this);
    this.newVariable = 'this is an example of how you can create new variables from within a function and still call it outside of the function, so long as you attach it to the keyword * this *, which refers to the global object.';
}

c();
// you cannot console.log "newVariable" without, first, invoking the function where it resides, i.e., function c

console.log(newVariable);

// this is important because there may be a confusion of where 'this' is pointing to, especially in the function context. Avoid thinking that the this is attached to the function, as we have seen it is, in fact, referring to the global object

// in this example, the function is a method inside of the variable d or object. What will 'this' refer to in this case?

let d = {
    name: 'this is object d',
    log: function(){
        // this is interesting because you are able to use a method to change/mutate its own properties from within the object itself. 
        this.name = 'Updated: I updated the name value of object d';
        console.log(this);

        // here is a weird part of javascript, often viewed as a bug
        let setName = function(newName){
            this.name = newName;
        // here we are trying to update/mutate the object, but will it? 
        }
        // Here we suspect that the this keyword would point to the containing object.
        setName('Updated again! The d object!');
        console.log(this); // output: Window {window: Window, self: Window, document: document, name: "Updated again! The d object!", location: Location, …} 
        
        // Conclusion: The d object remains the same and, instead, the global/window object is updated. This is strange because the function inside of a function, which is contained in an object, does not refer to the same object as the one containing it. Instead, it refers to the global object. 

    }
}


d.log(); // output 'this' refers to 'object d'


// here is a work around for the above 'this' example
// you can set the 'this' inside of the object's function/method to a variable
// then, use that variable name to refer to 'this' aka, in this example, object d.

let e = {
    name: 'this is object e',
    log: function(){
        let self = this;
        self.name = 'Updated: I updated the name value of object e';
        console.log(self);

        let setName = function(newName){
            self.name = newName;
        }
        setName('Updated the e object again!');
        console.log(self); // output:  object e
    }
}

// the setName function outputs won't show unless you invoke the main function like so
e.log();