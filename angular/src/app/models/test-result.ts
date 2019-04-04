import { TestResultDetail } from './test-result-detail';

export class TestResult {
    testResultId: number;
    authority: string;
    testDate: Date;
    minResponseTime: number;
    maxResponseTime: number;
    meanResponseTime: number;

    constructor(obj: any) {
        const { testResultId, authority, testDate, minResponseTime, maxResponseTime, meanResponseTime } = obj;
        this.testResultId = testResultId;
        this.authority = authority;
        this.testDate = testDate;
        this.minResponseTime = minResponseTime;
        this.maxResponseTime = maxResponseTime;
        this.meanResponseTime = meanResponseTime;
    }
}
