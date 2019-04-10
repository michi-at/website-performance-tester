export class TestResultDetail {
    id: number;
    uri: string;
    responseTime: number;
    minResponseTime: number;
    maxResponseTime: number;
    meanResponseTime: number;
    resultId: number;

    constructor(obj: any) {
        const { id, uri, responseTime, minResponseTime, maxResponseTime, meanResponseTime, testResultId  } = obj;
        const { Id, Uri, ResponseTime, MinResponseTime, MaxResponseTime, MeanResponseTime, TestResultId  } = obj;

        this.id = id || Id;
        this.uri = uri || Uri;
        this.responseTime = responseTime || ResponseTime;
        this.minResponseTime = minResponseTime || MinResponseTime;
        this.maxResponseTime =  maxResponseTime || MaxResponseTime;
        this.meanResponseTime = meanResponseTime || MeanResponseTime;
        this.resultId = testResultId || TestResultId;
    }
}
