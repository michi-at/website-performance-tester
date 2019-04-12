import { TestResult } from '../models/test-result';
import { TestResultDetail } from '../models/test-result-detail';

export function sortByMeanDesc() {
    return (a: TestResult | TestResultDetail, b: TestResult | TestResultDetail): number =>
        a.meanResponseTime < b.meanResponseTime ? 1 : -1;
}