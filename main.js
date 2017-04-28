/*
    VALID TESTS:
    1. 3*3$         //Multiply
    2. (3*3)$       // (EXP)
    3. (3*3*3/3)$   // (EXP)
    4. (3*3)/(3*3)$ // (EXP) * (EXP)
    5. 
    6.
    7.

    INVALID TESTS:
    1. (((3*3$      //Mismatched parenthesis (Extra left parenthesis)
    2. (3*3)/3*3)$  //Mismatched parenthesis (Extra right parenthesis)
    3. (1-4)*3$     //4 is not allowed
    4. 22-3$        //Two-digit numbers not allowed

    Ex: http://athena.ecs.csus.edu/~rdp135/rdr/rdr1.php
*/

let input;
let result = true;
let pos = 0;

function start() {
    //Re-initialize all variables every time a new string is entered by the user.
    input = document.getElementById("input").value;
    pos = 0;
    result = true;

    //Hide the result message. It is valid until an error is found in the string.
    document.getElementById("result").style.visibility = "hidden";
    document.getElementById("result").innerHTML = "The input " + input + " is valid.";

    EXP();

    //An expression must end with '$' to be valid.
    if (input.charAt(pos) != '$') {
        invalid();
    }

    document.getElementById("result").style.visibility = "initial"; //Show result message

    if (result) {
        document.getElementById("result").style.color = "limegreen";
    }
    else {
        document.getElementById("result").style.color = "red";
    }
}


function EXP() {
    TERM();
    if (input.charAt(pos) == '+' || input.charAt(pos) == '-') {
        pos++;
        EXP();
    }
}

function TERM() {
    FACTOR();
    if (input.charAt(pos) == '*' || input.charAt(pos) == '/') {
        pos++;
        TERM();
    }
}


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
    if (input.charAt(pos) in ['0', '1', '2', '3']) pos++;
    else invalid();
}

function invalid() {
    result = false;
    document.getElementById("result").innerHTML = "The input " + input + " is invalid.";
}

