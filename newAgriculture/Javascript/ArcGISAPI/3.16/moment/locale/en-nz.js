//>>built
(function(a,b){"object"===typeof exports&&"undefined"!==typeof module&&"function"===typeof require?b(require("../moment")):"function"===typeof define&&define.amd?define("moment/locale/en-nz",["../moment"],b):b(a.moment)})(this,function(a){return a.defineLocale("en-nz",{months:"January February March April May June July August September October November December".split(" "),monthsShort:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
weekdaysShort:"Sun Mon Tue Wed Thu Fri Sat".split(" "),weekdaysMin:"Su Mo Tu We Th Fr Sa".split(" "),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",
d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(b){var a=b%10;return b+(1===~~(b%100/10)?"th":1===a?"st":2===a?"nd":3===a?"rd":"th")},week:{dow:1,doy:4}})});