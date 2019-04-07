export class TestResult {
    id: number;
    authority: string;
    status: number;
    testDate: Date;
    minResponseTime: number;
    maxResponseTime: number;
    meanResponseTime: number;

    constructor(obj: any) {
        const { id, authority, status, testDate, minResponseTime, maxResponseTime, meanResponseTime } = obj;
        const { Id, Authority, Status, TestDate, MinResponseTime, MaxResponseTime, MeanResponseTime } = obj;
        this.id = id || Id;
        this.authority = authority || Authority;
        this.status = status || Status;
        this.testDate = new Date(testDate || TestDate);
        this.minResponseTime = minResponseTime || MinResponseTime;
        this.maxResponseTime = maxResponseTime || MaxResponseTime;
        this.meanResponseTime = meanResponseTime || MeanResponseTime;
    }
}
