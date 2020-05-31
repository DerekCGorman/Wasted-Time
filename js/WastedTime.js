const inputs = document.querySelectorAll("input");
const dob = document.getElementById("dob");
const td = document.getElementById("td");
const month = moment().month() + 1;
const day = moment().date();
const year = moment().year();

setDateValue();

function setDateValue(){ // automatically sets the date in "Todays Date" input
    if(month < 10){
        td.value = "0" + month + "/" + day + "/" + year;
    }else{
        td.value = month + "/" + day + "/" + year;
    }
}

// regular expressions to validate the inputs
var regex = {
    Birthday: /^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(19|20)\d\d$/,
    Date: /^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(19|20)\d\d$/
}

// validation function
function validate(field, regex){
    if(regex.test(field.value)){ // if the user input is valid against the regex
        var valid = document.getElementById("validityText");
        valid.innerHTML = field.name + " is Valid";
        valid.style.color = "greenyellow";
        if(regex.test(dob.value) && regex.test(td.value)){ // if both input fields are valid
            var button = document.getElementById("submitBtn");
            button.disabled = false;
            valid.innerHTML = "Birthday & Date are Valid";
        }
    }else{ // otherwise mess with the validty text to prompt the user
        let invalid = document.getElementById("validityText");
        button = document.getElementById("submitBtn").disabled = true;
        invalid.innerHTML = field.name + " is Invalid";
        invalid.style.color = "tomato";
    }
}

// gets the input field and sends it and the value to the validate function
inputs.forEach((input) => {
    input.addEventListener("keyup", (e) => {
        validate(e.target, regex[e.target.attributes.name.value]);
    });
});

Date.getFormattedDateDiff = function(dob, td){ // This is where the moment library starts
    let b = moment(dob);
    let a = moment(td);
    let intervals = ["years","months","weeks","days"];
    let out = [];

    for(var i = 0; i < intervals.length; i++){
        var diff = a.diff(b, intervals[i]);
        b.add(diff, intervals[i]);
        out.push(diff + "," + intervals[i]);
    }
    return out.join(",");
}

function calculateInterval(dob, td){ // calculatesInterval stores the users inputs and sends them to "getFormatedDateDiff" then to "setValues" && gets exact number of days
    var startDate = new Date(dob);
    var endDate = new Date(td);

    let a = moment(dob, "MM/DD/YYYY");
    let b = moment(td, "MM/DD/YYYY");
    var daysBetween = b.diff(a, "days");

    var timeline = Date.getFormattedDateDiff(startDate, endDate);
    setValues(timeline, daysBetween);
}

function setValues(timeline, daysBetween){ // sets all the values and performs calculations to be displayed on in the HTML DOM elements.
    var pageOne = document.getElementById("allElements");
    var pageTwo = document.getElementById("allElementsTwo"); 
    pageOne.parentNode.removeChild(pageOne); //  Deletes "pageOne" might change how this works
    pageTwo.style.display = "inline"; // shows "pageTwo" also might change how this works

    // Splits the elements from timeline and stores them into timelineArr
    var timelineArr = timeline.split(",");

    // very rough equations based on averages of each activity
    var booksRead = daysBetween * 4; // average of 4 books a day. Non stop with small breaks reading at 250wpm also depends on book size
    var milesRun = daysBetween * 5; // average of 5 miles a day. Olympic Runners run 10 miles a day! WOW! 
    var moviesWatched = daysBetween * 12; // average of 12 movies a day. Each movie being 2 hours long
    var languagesLearned = Math.floor(daysBetween / 48); // average of 7 langauges a year or 48 days to learn a language

    // sets the text values equal to the date calculation from calculate interval
    var years = document.getElementById("yearsAlive");
    years.innerHTML = timelineArr[0];
    var months = document.getElementById("monthsAlive");
    months.innerHTML = timelineArr[2];
    var weeks = document.getElementById("weeksAlive");
    weeks.innerHTML = timelineArr[4];
    var days = document.getElementById("daysAlive");
    days.innerHTML = timelineArr[6];

    // Sets the text values equal to the equations 
    var books = document.getElementById("booksRead");
    books.innerHTML = booksRead;
    var miles = document.getElementById("milesRun");
    miles.innerHTML = milesRun;
    var movies = document.getElementById("moviesWatched");
    movies.innerHTML = moviesWatched;
    var languages = document.getElementById("languagesLearned");
    languages.innerHTML = languagesLearned;
}