'use strict';

let today_num = new Date();
let index = today_num.getDay() -1;
// index is for determining what day today is.
class Weekday {
    constructor(name, weather, precipitationValue, temp) {
        this.name = name;
        this.weather = weather;
        this.precipitationValue = precipitationValue;
        this.temp = temp;
    }
}

const monday = new Weekday("monday", "sunny", 0, 26);
const tuesday = new Weekday("tuesday", "sunny", 0, 26);
const wednesday = new Weekday("wednesday", "cloudy", 10, 22);
const thursday = new Weekday("thursday", "sunny", 10, 26);
const friday = new Weekday("friday", "rainy", 40, 18);
const saturday = new Weekday("saturday", "rainy", 40, 22);
const sunday = new Weekday("sunday", "sunny", 10, 24);
const weekdays = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
// weekdays will be used often as a looping mechanism and reference.
const weather = {
    weekdayDisplay: $('.weekday'),
    weatherImage: $('.weather-image'),
    precipitation: $('#precipitation'),
    temperature: $('.temperature p'),
    degrees: 'celsius',
    currentObject: '',
    displayOnLoad: function(day) {
        displayWeather(day);
        // calls function displayWeather using parameter day.
    },
    determineDay: function(index){
        this.displayOnLoad(weekdays[index]);
        // calls method displayOnLoad using variable index as the array index for object weekdays.
    },
}

function weekOrder() {
    let order = weekdays;
    for (let day of weekdays) {
        if (day === weekdays[index]) {
            return order;
        }
        else {
            order.unshift;
            order.push(day);
        }
    }
}
// function for shuffling the order of a new object that will hold the order of the week.

function weekDisplay(array) {
    let orderNum = 1;
    for (let object of array) {
        $('.weather-tab').each(function() {
            if ($(this).hasClass(object.name) === true) {
                $(this).css('order', orderNum);
                orderNum+=1;
                $(this).on('click', () => {
                    displayWeather(object);
                });
                $(this).hover(
                    function() {
                        $(this).css('background-color', 'var(--clr-gray200)');
                    }, 
                    function() {
                        $(this).css('background-color', 'var(--clr-gray100)');
                    }
                );
            }
        });
    }
}
// function for displaying the days of the week in order for the expanded weekday menu in the weather panel. Also
// contains a .hover function that changes the css of days that you hover over to have a gray background.
function displayWeather(object) {
    weather.currentObject = object;
    weather.weekdayDisplay.text(object.name);
    if (object.weather === 'sunny') {
        weather.weatherImage.attr({src:'images/sunny.svg', alt: 'sunny'});
    }
    else if (object.weather === 'cloudy') {
        weather.weatherImage.attr({src:'images/sunny_cloudy.png', alt: 'cloudy'});
    }
    else if (object.weather === 'rainy') {
        weather.weatherImage.attr({src:'images/rainy.svg', alt: 'rainy'});
    }
    weather.precipitation.text(object.precipitationValue);
    unitConversion(object);
}

// function for the main weather display. Displays the weather of whatever day value is put into the parameter.

function unitConversion(object) {
    if (weather.degrees === 'celsius') {
        weather.temperature.text(object.temp);
    }
    else if (weather.degrees === 'fahrenheit') {
        let fahrenheit = Math.round(object.temp * 1.8 + 32);
        weather.temperature.text(fahrenheit);
    }
}

// function for changing the degrees number depending on if the desired format is fahrenheit or celsius.

$(() => {
    weather.determineDay(index);
    $('.weekday-menu').removeClass('expanded');
    $('.expand').removeClass('expanded');
    weekDisplay(weekOrder());
    // removing classes so script works with css, calls functions to display the weather of today.
    $('.celsius').on('click', () => {
        weather.degrees = 'celsius';
        unitConversion(weather.currentObject);
        if ($('.celsius').hasClass('degree-inactive') === true) {
            $('.celsius').toggleClass("degree-active degree-inactive");
            $('.fahrenheit').toggleClass("degree-active degree-inactive");
        }
        // onclick for celsius button that shows if it is active and if it is not uses the unitConversion function
        // to convert the current degree number.
    });
    
    $('.fahrenheit').on('click', () => {
        weather.degrees = 'fahrenheit';
        unitConversion(weather.currentObject);
        if ($('.fahrenheit').hasClass('degree-inactive') === true) {
            $('.celsius').toggleClass("degree-active degree-inactive");
            $('.fahrenheit').toggleClass("degree-active degree-inactive");
        }
    });
    // onclick for fahrenheit button that shows if it is active and if it is not uses the unitConversion function
        // to convert the current degree number.
    
    $('.expand').on('click', () => {
        if ($('.expand').hasClass('expanded') === true) {
            weather.determineDay(index);
        }
        $('.weekday-menu, .expand').toggleClass('expanded');
    });
    // onclick for expanding and contracting the weekday menu. Also changes the display back to today's display if
    // the menu is contracted.

    $(".hamburger-button").on("click", function() {
        $(".hamburger-button .bar").toggleClass("is-active");
        $(".hamburger-nav").toggleClass("is-active");
    });
    // onclick that activates the hamburger-menu.
})
