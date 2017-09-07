/**
 * Created by julia on 5/09/2017.
 */

function DatePicker() {
    //When constructed, create a new current datetime object and populate as default 'selected' variables
    var d = new Date();

    //Static month variables
    var months = [{"name": "January", "max_days": 31}, {"name": "February", "max_days": 28}, {
        "name": "March",
        "max_days": 31
    }, {"name": "April", "max_days": 30}, {"name": "May", "max_days": 31}, {
        "name": "June",
        "max_days": 30
    }, {"name": "July", "max_days": 31}, {"name": "August", "max_days": 31}, {
        "name": "September",
        "max_days": 30
    }, {"name": "October", "max_days": 31}, {"name": "November", "max_days": 30}, {"name": "December", "max_days": 31}];

    //Setup user selection variables
    this.selected_day = d.getDate();
    this.selected_month = d.getMonth();
    this.selected_year = d.getFullYear();

    //Setup input field variables and set initial values in the HTML document
    this.day_input = $('#day');
    this.month_input = $('#month');
    this.year_input = $('#year');
    this.leap_year_input = $('#leap-year');

    this.day_input.val(selected_day);
    this.month_input.val(months[selected_month].name);
    this.year_input.val(selected_year);
    this.leap_year_input.val(leap_year);

    //Method for updating the max_month_day variable
    this.update_max_month_day = function () {
        this.max_month_day = this.calc_maximum_month_day();
    }
    //Call this method initially when constructed
    this.update_max_month_day();

    //Method to check the maximum day for a given month (factoring in leap years and month-to-month variation)
    this.calc_maximum_month_day = function () {
        //Function to calculate maximum allowable day within the month (adapting February for leap years)
        if (this.leap_year && this.selected_month === 1) {
            return 29;
        } else {
            return months[selected_month].max_days;
        }
        this.update_input_attr_val();
    }

    //Method for checking a given day relative to the maximum allowable day for a given month and update private variables accordingly
    this.check_max_day= function () {
        this.update_max_month_day();
        if (this.selected_day > this.max_month_day) {
            this.selected_day = this.max_month_day;
            this.update_input_attr_val();
        }
    }

    this.check_input_values = function () {
        this.selected_day = this.day_input.val();
        this.selected_year = this.year_input.val();
    }

    this.update_input_attr_val = function () {
        //Set HTML day_input 'max' accordingly
        this.day_input.attr('max', max_month_day);
        //Set HTML day_input value accordingly
        this.day_input.val(selected_day);
    }


}

$(document).ready(function () {
    //Set maximum input threshold for days based on year
    

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

function check_leap_year() {
    console.log((selected_year % 4) === 0);
    return (selected_year % 4) === 0;
}

function increment_day() {
    //Increment day accordingly
    selected_day++;
    if (selected_day > max_month_day) {
        selected_day = 1;
    }
    day_input.val(selected_day);
}

function decrement_day() {
    //Increment day accordingly
    selected_day--;
    if (selected_day < 1) {
        selected_day = max_month_day;
    }

    day_input.val(selected_day);
}

function increment_month() {
    //Increment month
    selected_month++;
    if (selected_month > 11) {
        selected_month = 0;
    }
    //Calculate maximum month day
    check_max_day();
    month_input.val(months[selected_month].name);
}

function decrement_month() {
    //Decrement month
    selected_month--;
    if (selected_month < 0) {
        selected_month = 11;
    }
    //Calculate maximum month day
    check_max_day();
    month_input.val(months[selected_month].name);
}

function increment_year() {
    //Check maximum month day
    check_max_day();
    selected_year++;
    if (selected_year > 2500) {
        selected_year = 1900;
        leap_year = true;
    } else {
        leap_year = check_leap_year();
    }
    year_input.val(selected_year);
    leap_year_input.val(leap_year);
}

function decrement_year() {
    //Check maximum month day
    check_max_day();
    selected_year--;
    if (selected_year < 1900) {
        selected_year = 2500;
    } else {
        leap_year = check_leap_year();
    }
    year_input.val(selected_year);
    leap_year_input.val(leap_year);
}