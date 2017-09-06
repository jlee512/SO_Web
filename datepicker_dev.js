/**
 * Created by julia on 5/09/2017.
 */

var months = [{"name" : "January", "max_days" : 31}, {"name" : "February", "max_days" : 28}, {"name" : "March", "max_days" : 31}, {"name" : "April", "max_days" : 30}, {"name" : "May", "max_days" : 31}, { "name" : "June", "max_days": 30}, { "name" : "July", "max_days" : 31}, { "name" : "August", "max_days" : 31}, { "name" : "September", "max_days" : 30}, { "name" : "October", "max_days" : 31}, { "name" : "November", "max_days" : 30}, { "name" : "December", "max_days" : 31}];

var d = new Date();

var current_day = d.getDate();
var current_month = d.getMonth();
var current_year = d.getFullYear();

var selected_day = current_day;
var selected_month = current_month;
var selected_year = current_year;


$(document).ready(function() {
    $('#increase-day').on('click', function () {
        selected_day++;
        if(selected_day > selected_month.max_days) {
            selected_day = 1;
        }
        console.log("Updated day: " + selected_day);
    });

    $('#reduce-day').on('click', function () {
        selected_day--;
        if(selected_day < 1) {
            selected_day = selected_month.max_days;
        }
        console.log("Updated day: " + selected_day);
    });

    $('#increase-month').on('click', function () {
        selected_month++;
        if(selected_month > 11) {
            selected_month = 0;
        }
        console.log("Updated month: " + months[selected_month].name);
    });

    $('#reduce-month').on('click', function () {
        console.log(current_month);
    });

    $('#increase-year').on('click', function () {
        console.log(current_year);
    });

    $('#reduce-year').on('click', function () {
        console.log(current_year);
    });
});
