/*
    VALID TESTS:
    1. 3*3$
    2. (3*3)$
    3. (3*3*3/3)$
    4. (3*3)/(3*3)$
    5.
    6.
    7.

    INVALID TESTS:
    1. (((3*3$
    2. (3*3)/3*3)$

    Ex: http://athena.ecs.csus.edu/~rdp135/rdr/rdr1.php
*/

let input;
let result;
let pos = 0;

function start() {
    pos = 0;
    input = document.getElementById("input").value;
    console.log(input);

    document.getElementById("result").style.visibility = "hidden";
    document.getElementById("result").innerHTML = "The input " + input + " is valid.";

    EXP();

    //An expression must end with '$' to be valid.
    if (input.charAt(pos) != '$') {
        invalid();
    }
    document.getElementById("result").style.visibility = "initial";
}


// EXP ::= TERM {(+|-)TERM}
function EXP() {
    TERM();
}


function TERM() {
    FACTOR();
    if (input.charAt(pos) == '*' || input.charAt(pos) == '/') {
        pos++;
        TERM();
    }
}


// FACTOR ::= (EXP) | DIGIT
function FACTOR() {
    if (input.charAt(pos) == '(') {
        pos++;
        EXP();
        if (input.charAt(pos) == ')') {
            pos++;
        }
        else {
            invalid();
        }
    }
    else { 
        DIGIT();
    }
}


function DIGIT() {
    //console.log('Correctly called digit: ', input.charAt(pos));
    if (input.charAt(pos) in ['0', '1', '2', '3']) pos++;
    else invalid();
}

function invalid() {
    console.log('Invalid because of ', input.charAt(pos));
    document.getElementById("result").innerHTML = "The input " + input + " is invalid.";
}
