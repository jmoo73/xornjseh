const days = [
   'Sunday',
   'Monday',
   'Tuesday',
   'Wednesday',
   'Thursday',
   'Friday',
   'Saturday',
];

const sixDays = [
   'Monday',
   'Tuesday',
   'Wednesday',
   'Thursday',
   'Friday',
   'Saturday',
];

const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const sixDaysShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
   'Jan',
   'Feb',
   'Mar',
   'Apr',
   'May',
   'Jun',
   'Jul',
   'Aug',
   'Sep',
   'Oct',
   'Nov',
   'Dev',
];
const colors = [
   'Tigertot',
   'White',
   'Yellowstr',
   'Yellow',
   'Greenstr',
   'Green',
   'Bluestr',
   'Blue',
   'Redstr',
   'Red',
   'Blackstr',
   'Bodon',
   'Black',
];

const now = new Date();
const thisYear = now.getFullYear();
const lastYear = thisYear - 1;
const day = now.getDay(); // day=0 on Sunday.
const today = days[day];
// date used for column title.
const date = now.getMonth() + 1 + '/' + now.getDate() + '/' + now.getFullYear();

// dayTot : Total days.
let start = new Date(now.getFullYear(), 0, 0);
let diff = now - start;
let oneDay = 1000 * 60 * 60 * 24;
let daysTot = Math.floor(diff / oneDay);

// reArrDays : rearragned days THIS YEAR
const d = new Date('1/1/' + thisYear);
let ind = d.getDay();
let reArrDays = days.slice(ind, 7).concat(days.slice(0, ind));

// reArrDaysLast : rearragned days LAST YEAR
const dLast = new Date('1/1/' + lastYear);
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
   let yS = year + '-01-02';
   let yF = year + 1 + '-01-02';
   let start = new Date(yS);
   let finish = new Date(yF);
   while (start < finish) {
      const date =
         start.getMonth() +
         1 +
         '/' +
         start.getDate() +
         '/' +
         start.getFullYear() +
         ' ' +
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
function makeDateString(current) {
   return (
      current.getMonth() +
      1 +
      '/' +
      current.getDate() +
      '/' +
      current.getFullYear() +
      ' ' +
      days[current.getDay()]
   );
}

function makeDateStringNoDay(current) {
   return (
      current.getMonth() +
      1 +
      '/' +
      current.getDate() +
      '/' +
      current.getFullYear()
   );
}

function weekDates(current) {
   let week = [];
   // Starting Monday not Sunday So, MTWTFS .  NO SAUNDAY is included. //
   // On Sunday, coming M-S are listed.
   current.setDate(current.getDate() - current.getDay() + 1);
   for (let i = 0; i < 6; i++) {
      week.push(makeDateString(current));
      current.setDate(current.getDate() + 1);
   }
   return week;
}

function makeDateList(howManyDaysBefore) {
   let dateList = []; // It includes today as well. ( 14 * 6 - 1 ) = 83days.
   let current = new Date();

   current.setDate(current.getDate() - howManyDaysBefore);
   for (let i = howManyDaysBefore; i >= 0; i--) {
      dateList.push(makeDateStringNoDay(current));
      current.setDate(current.getDate() + 1);
   }

   return dateList;
}

function makeMonthlyDataList() {
   let attendance = []; // data list to return.

   for (let i = 2; i >= 0; i--) {
      let id = 0;
      let monthlyList = [];
      let now = new Date();
      // now is set to the first day of i months prior.
      now.setMonth(now.getMonth() - i);
      now.setDate(1);
      let month = now.getMonth();

      if (now.getDay() !== 0) {
         // if not Sunday, set it to Sunday.
         now.setDate(now.getDate() - now.getDay());
      }
      while (true) {
         if (now.getMonth() === month) {
            monthlyList.push({
               id,
               date: makeDateStringNoDay(now),
               day: days[now.getDay()],
               attendance: [],
               needDataFetch: true,
               test: false,
               start: false,
            });
            id++;
         } else if (now.getMonth() < month ) {
            // for last days of prev month.
            monthlyList.push({
               id,
               date: makeDateStringNoDay(now),
               day: days[now.getDay()],
               attendance: [],
               needDataFetch: false,
               test: false,
               start: false,
            });
            id++;
         } else if (now.getDay() !== 0) {
            monthlyList.push({
               id,
               date: makeDateStringNoDay(now),
               day: days[now.getDay()],
               attendance: [],
               needDataFetch: false,
               test: false,
               start: false,
            });
            id++;
         } else break;
         now.setDate(now.getDate() + 1);
      }
      attendance.push([months[month], monthlyList]); // 3-letter month.
   }
   return attendance;
}

export {
   sixDays,
   sixDaysShort,
   day, // 0 ~ 6
   today, // Sunday ~ Saturday
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
   makeDateList,
   makeMonthlyDataList,
};
