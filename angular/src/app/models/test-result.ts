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
        this.id = this.isDefined(id) ? id : Id;
        this.authority = authority || Authority;
        this.status = this.isDefined(status) ? status : Status;
        this.testDate = new Date(testDate || TestDate);
        this.minResponseTime = this.isDefined(minResponseTime) ? minResponseTime : MinResponseTime;
        this.maxResponseTime = this.isDefined(maxResponseTime) ? maxResponseTime : MaxResponseTime;
        this.meanResponseTime = this.isDefined(meanResponseTime) ? meanResponseTime : MeanResponseTime;
    }

    private isDefined(value: any) {
        if (value !== undefined && value !== null) {
            return true;
        }

        return false;
    }
}
