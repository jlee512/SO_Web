/**
 * Created by julia on 5/09/2017.
 */

var months = [{"name" : "January", "max_days" : 31}, {"name" : "February", "max_days" : 28}, {"name" : "March", "max_days" : 31}, {"name" : "April", "max_days" : 30}, {"name" : "May", "max_days" : 31}, { "name" : "June", "max_days": 30}, { "name" : "July", "max_days" : 31}, { "name" : "August", "max_days" : 31}, { "name" : "September", "max_days" : 30}, { "name" : "October", "max_days" : 31}, { "name" : "November", "max_days" : 30}, { "name" : "December", "max_days" : 31}];

var d = new Date();

var current_day = d.getDate();
var current_month = d.getMonth();
var current_year = d.getFullYear();

var selected_day = current_day;
var day_input;

var selected_month = current_month;
//Maximum allowable day within a given month (refer to function 'maximum_month_day')
var max_month_day;
var month_input;

var selected_year = current_year;
var year_input;

var leap_year = check_leap_year();
var leap_year_input;


$(document).ready(function() {

    //Set input fields to variables
    day_input = $('#day');
    month_input = $('#month');
    year_input = $('#year');
    leap_year_input = $('#leap-year');

    //Set initial input values
    day_input.val(selected_day);
    month_input.val(months[selected_month].name);
    year_input.val(selected_year);
    leap_year_input.val(leap_year);

    //Set maximum input threshold for days based on year
    maximum_month_day();
    day_input.attr('max', max_month_day);

    $('#increase-day').on('click', function () {
        check_inputs();
        increment_day()
    });

    $('#reduce-day').on('click', function () {
        check_inputs();
        decrement_day();
    });

    $('#increase-month').on('click', function () {
        check_inputs();
        increment_month();
    });

    $('#reduce-month').on('click', function () {
        check_inputs();
        decrement_month();
    });

    $('#increase-year').on('click', function () {
        check_inputs();
        increment_year();
    });

    $('#reduce-year').on('click', function () {
        check_inputs();
        decrement_year();
    });
});

function check_inputs(){
    selected_day = day_input.val();
    selected_year = year_input.val();
}

//Function check alter day if outside of allowable month range when changing month
function check_max_day(){
    maximum_month_day();
    console.log(selected_day);
    console.log(max_month_day);
    if (selected_day > max_month_day) {
        selected_day = max_month_day;
        day_input.val(selected_day);
    }
}

function maximum_month_day(){
    //Function to calculate maximum allowable day within the month (adapting February for leap years)
    if (leap_year && selected_month === 1) {
        max_month_day = 29;
    } else {
        max_month_day = months[selected_month].max_days;
    }
    day_input.attr('max', max_month_day);
}

function check_leap_year(){
    console.log((selected_year % 4) === 0);
    return (selected_year % 4) === 0;
}

function increment_day() {
    //Increment day accordingly
    selected_day++;
    if(selected_day > max_month_day) {
        selected_day = 1;
    }
    day_input.val(selected_day);
}

function decrement_day() {
    //Increment day accordingly
    selected_day--;
    if(selected_day < 1) {
        selected_day = max_month_day;
    }

    day_input.val(selected_day);
}

function increment_month() {
    //Increment month
    selected_month++;
    if(selected_month > 11) {
        selected_month = 0;
    }
    //Calculate maximum month day
    check_max_day();
    month_input.val(months[selected_month].name);
}

function decrement_month() {
    //Decrement month
    selected_month--;
    if(selected_month < 0) {
        selected_month = 11;
    }
    //Calculate maximum month day
    check_max_day();
    month_input.val(months[selected_month].name);
}

function increment_year(){
    //Check maximum month day
    check_max_day();
    selected_year++;
    if(selected_year > 2500) {
        selected_year = 1900;
        leap_year = true;
    } else {
        leap_year = check_leap_year();
    }
    year_input.val(selected_year);
    leap_year_input.val(leap_year);
}

function decrement_year(){
    //Check maximum month day
    check_max_day();
    selected_year--;
    if(selected_year < 1900) {
        selected_year = 2500;
    } else {
        leap_year = check_leap_year();
    }
    year_input.val(selected_year);
    leap_year_input.val(leap_year);
}