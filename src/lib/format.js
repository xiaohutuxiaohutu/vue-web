export default {

    // 日期去斜杠，入参为YYYY/MM/DD，输出结果为YYYYMMDD
    replaceSlash: function(date) {
        let str = date;
        //console.log(str);
        let startIndex = str.indexOf('/');
        //console.log("startInde+" + startIndex);
        let endIndex = str.indexOf('/', str.indexOf('/') + 1);
        //console.log("endIndex+" + endIndex);
        let len = str.length;
        if (2 == (endIndex - startIndex)) {
            str = str.replace("/", "0");
        } else {
            str = str.replace("/", "");
        }
        //console.log(str);
        if (2 == (len - endIndex)) {
            str = str.replace("/", "0")
        } else {
            str = str.replace("/", "");
        }
        //console.log(str);
        return str;
    }

}