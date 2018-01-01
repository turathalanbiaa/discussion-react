
export default class TimeUtils
{

    static timestampToDate = (timestamp) =>
    {
        let a = new Date(timestamp);
        //let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = a.getFullYear();
        let month = a.getMonth() + 1;   //months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        //let sec = a.getSeconds();
        return year + '-' + month + '-' + date + ' ' + hour + ':' + min;

    }

}