// 获取日期和时间和时间戳
// 如果不传 type 就是获取当前时间
// 如果传 parse 就是解析传过来的时间戳 
export default function dateTime(type, time) {
    let date = '';
    if (type == 'parse') {
        date = {
            time: new Date(time).getTime(),// 时间戳
            year: new Date(time).getFullYear(),// 年
            month: new Date(time).getMonth() + 1,// 月
            date: new Date(time).getDate(),// 日
            week: new Date(time).getDay(),// 星期
            hours: new Date(time).getHours(),// 小时
            minutes: new Date(time).getMinutes(),// 分钟
            seconds: new Date(time).getSeconds(),// 秒数
            fullTime: new Date(time).getFullYear() + '-' + ((new Date(time).getMonth() + 1) < 10 ? '0' + (new Date(time).getMonth() + 1) : (new Date(time).getMonth() + 1)) + '-' + (new Date(time).getDate() < 10 ? '0' + new Date(time).getDate() : new Date(time).getDate()) + ' ' + (new Date(time).getHours() < 10 ? '0' + new Date(time).getHours() : new Date(time).getHours()) + ':' + (new Date(time).getMinutes() < 10 ? '0' + new Date(time).getMinutes() : new Date(time).getMinutes()) + ':' + (new Date(time).getSeconds() < 10 ? '0' + new Date(time).getSeconds() : new Date(time).getSeconds()),
        };
    } else {
        date = {
            time: new Date().getTime(),// 时间戳
            year: new Date().getFullYear(),// 年
            month: new Date().getMonth() + 1,// 月
            date: new Date().getDate(),// 日
            week: new Date().getDay(),// 星期
            hours: new Date().getHours(),// 小时
            minutes: new Date().getMinutes(),// 分钟
            seconds: new Date().getSeconds(),// 秒数
        };
    }
    return date;
}