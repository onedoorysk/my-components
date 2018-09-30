var year = 2018;
var month = 10;
 
window.onload = function() {
    console.log(get_month_calendar(year, month));
}
 
/**
 * 指定した年月のカレンダー情報を返す
 * @param {number} year  - 年の指定
 * @param {number} month - 月の指定
 */
function get_month_calendar(year, month) {
    var firstDate = new Date(year, (month - 1), 1); // 指定した年月の初日の情報
    var lastDay = new Date(year, (firstDate.getMonth() + 1), 0).getDate(); // 指定した年月の末日
    var weekday = firstDate.getDay(); // 指定した年月の初日の曜日
 
    var calendarData = []; // カレンダーの情報を格納
    var weekdayCount = weekday; // 曜日のカウント用
    for (var i = 0; i < lastDay; i++) {
        calendarData[i] = {
            day: i + 1,
            weekday: weekdayCount
        }
        // 曜日のカウントが6(土曜日)まできたら0(日曜日)に戻す
        if(weekdayCount >= 6) {
            weekdayCount = 0;
        } else {
            weekdayCount++;
        }
    }
    return calendarData;
}
