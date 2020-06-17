const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const sixDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const sixDaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dev",
];
const colors = [
    "Tigertot",
    "White",
    "Yellowstr",
    "Yellow",
    "Greenstr",
    "Green",
    "Bluestr",
    "Blue",
    "Redstr",
    "Red",
    "Blackstr",
    "Bodon",
    "Black",
];

const now = new Date();
const thisYear = now.getFullYear();
const lastYear = thisYear - 1;
const day = now.getDay(); // day=0 on Sunday.
const today = days[day];
// date used for column title.
const date = now.getMonth() + 1 + "/" + now.getDate() + "/" + now.getFullYear();

// dayTot : Total days.
let start = new Date(now.getFullYear(), 0, 0);
let diff = now - start;
let oneDay = 1000 * 60 * 60 * 24;
let daysTot = Math.floor(diff / oneDay);

// reArrDays : rearragned days THIS YEAR
const d = new Date("1/1/" + thisYear);
let ind = d.getDay();
let reArrDays = days.slice(ind, 7).concat(days.slice(0, ind));

// reArrDaysLast : rearragned days LAST YEAR
const dLast = new Date("1/1/" + lastYear);
let indLast = dLast.getDay();
let reArrDaysLast = days.slice(indLast, 7).concat(days.slice(0, indLast));

// daysOfYear and daysOfYearLast
const daysOfYear = countDays(thisYear);
const daysOfYearLast = countDays(lastYear);

function countDays(year) {
    let isLeapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    return isLeapYear ? 366 : 365;
}

//Days of the year
const daysOfThisYear = makeDayArray(thisYear);
const daysOfLastYear = makeDayArray(lastYear);

function makeDayArray(year) {
    let result = [];
    let yS = year + "-01-02";
    let yF = year + 1 + "-01-02";
    let start = new Date(yS);
    let finish = new Date(yF);
    while (start < finish) {
        const date =
            start.getMonth() +
            1 +
            "/" +
            start.getDate() +
            "/" +
            start.getFullYear() +
            " " +
            daysShort[start.getDay()];
        result.push(date);
        start.setDate(start.getDate() + 1);
    }
    return result;
}

//!!!!!!!!!!!!!! const now = new Date();
//!!!!!!!!!!!!!! This CURRENT date-time changes as setDate function is called.

// Obtaining the days of the week with a specific Day(herein, current)
// """4/2/2020 Monday"""
function weekDates(current) {
    let week = [];
    // Starting Monday not Sunday So, MTWTFS .  NO SAUNDAY is included. //
    // On Sunday, coming M-S are listed.
    current.setDate(current.getDate() - current.getDay() + 1);
    for (let i = 0; i < 6; i++) {
        week.push(
            current.getMonth() +
                1 +
                "/" +
                current.getDate() +
                "/" +
                current.getFullYear() +
                " " +
                days[current.getDay()]
        );
        current.setDate(current.getDate() + 1);
    }
    return week;
}

export {
    sixDays,
    sixDaysShort,
    day,
    today,
    date,
    days,
    months,
    colors,
    thisYear,
    lastYear,
    daysOfYear,
    daysOfYearLast,
    daysShort,
    reArrDays,
    reArrDaysLast,
    daysTot,
    daysOfThisYear,
    daysOfLastYear,
    weekDates, //Function!!
};
