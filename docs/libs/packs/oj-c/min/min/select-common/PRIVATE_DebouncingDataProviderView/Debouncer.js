define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Debouncer = void 0;
    class Debouncer {
        constructor() {
            this._responseTimes = [
                { time: 900, count: 0 },
                { time: 720, count: 0 },
                { time: 600, count: 0 },
                { time: 450, count: 0 },
                { time: 360, count: 0 },
                { time: 300, count: 0 }
            ];
            this._requestTime = { time: 250, count: 0 };
            this._lastRequestTime = 0;
        }
        debounce(callback, filterTextLength) {
            const wait = this.GetDebounceTime(filterTextLength);
            return (...args) => {
                window.setTimeout(() => {
                    callback(...args);
                }, wait);
            };
        }
        recordResponseTime(time, filterTextLength) {
            const index = Math.min(filterTextLength, 5);
            const record = this._responseTimes[index];
            if (record.count === 0) {
                record.time = time;
            }
            else {
                record.time = (record.time * record.count + time) / (record.count + 1);
            }
            record.count += 1;
        }
        recordRequestTime() {
            const requestTime = Date.now();
            const lastRequestTime = this._lastRequestTime;
            this._lastRequestTime = requestTime;
            if (lastRequestTime === 0) {
                return;
            }
            const time = requestTime - lastRequestTime;
            if (time > 1000) {
                return;
            }
            const record = this._requestTime;
            if (record.count === 0) {
                record.time = time;
            }
            else {
                record.time = (record.time * record.count + time) / (record.count + 1);
            }
            record.count += 1;
        }
        _getResponseTime(filterTextLength) {
            const index = Math.min(filterTextLength, 5);
            const record = this._responseTimes[index];
            return record.time;
        }
        _getRequestTime() {
            return this._requestTime.time;
        }
        GetDebounceTime(filterTextLength) {
            const responseTime = this._getResponseTime(filterTextLength);
            const requestTime = this._getRequestTime();
            const paddedRequestTime = 1.2 * requestTime;
            if (responseTime < paddedRequestTime) {
                return 0;
            }
            const factor = (responseTime - paddedRequestTime) / responseTime;
            const debounceTime = (1 + factor) * paddedRequestTime;
            return debounceTime;
        }
    }
    exports.Debouncer = Debouncer;
});
