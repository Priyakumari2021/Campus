const helpers = {

    formatDate: function (dbDate) {
        let date = new Date(String(dbDate));
        let day = ("0" + (date.getDate())).slice(-2);
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let year = date.getFullYear();
        return day + '.' + month + '.' + year;
    },

    removeSeconds: function (dbTime) {
        let splitTime = dbTime.toString().split(":");
        let cleanedTime = splitTime[0] + ":" + splitTime[1];
        return cleanedTime;
    }

}

export default helpers