class Time {
    // constructor(hour, minute, second) {
    //     this.hour = hour;
    //     this.minute = minute;
    //     this.second = second;
    // }

    constructor(s) {
        var arr = s.split(":");
        this.hour = parseInt(arr[0]);
        this.minute = parseInt(arr[1]);
        this.second = parseInt(arr[2]);
    }

    addSeconds(seconds) {
        var m = 0;
        var h = 0;

        this.second += seconds;

        if (this.second > 59) {
            m = Math.floor(this.second / 60);
            this.second = this.second % 60;
        }

        this.minute += m;
        if (this.minute > 59) {
            h = Math.floor(this.minute / 60);
            this.minute = this.minute % 60;
        }

        this.hour += h;

        this.hour = this.hour % 24;
    }

    toString() {
        return this._formatNumber(this.hour) + ":" + this._formatNumber(this.minute) + ":" + this._formatNumber(this.second);
    }

    _formatNumber(n) {
        if (n > 9) return "" + n;
        return "0" + n;
    }

    compareTo(anotherTime) {
        if (this.hour < anotherTime.hour) return -1;
        if (this.hour > anotherTime.hour) return 1;

        if (this.minute > anotherTime.minute) return 1;
        if (this.minute < anotherTime.minute) return -1;

        if (this.second > anotherTime.second) return 1;
        if (this.second < anotherTime.second) return -1;

        return 0;
    }
}

module.exports = Time;