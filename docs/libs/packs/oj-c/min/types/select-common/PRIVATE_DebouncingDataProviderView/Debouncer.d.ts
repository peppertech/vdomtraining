export declare class Debouncer {
    private readonly _responseTimes;
    private readonly _requestTime;
    private _lastRequestTime;
    debounce(callback: (...args: any) => void, filterTextLength: number): (...args: any) => void;
    recordResponseTime(time: number, filterTextLength: number): void;
    recordRequestTime(): void;
    private _getResponseTime;
    private _getRequestTime;
    protected GetDebounceTime(filterTextLength: number): number;
}
