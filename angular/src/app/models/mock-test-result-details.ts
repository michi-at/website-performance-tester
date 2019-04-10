import { TestResultDetail } from './test-result-detail';

export const TEST_RESULT_DETAILS: TestResultDetail[] = [
    { id: 1, uri: 'https://angular.io', responseTime: 28, minResponseTime: 28,
    maxResponseTime: 501, meanResponseTime: 218.667, resultId: 1 },
    { id: 2, uri: 'https://angular.io/features', responseTime: 689, minResponseTime: 61,
    maxResponseTime: 689, meanResponseTime: 313.667, resultId: 1 },
    { id: 3, uri: 'https://angular.io/docs', responseTime: 497, minResponseTime: 65,
    maxResponseTime: 497, meanResponseTime: 305, resultId: 1 },
    { id: 4, uri: 'https://angular.io/resources', responseTime: 463, minResponseTime: 463,
    maxResponseTime: 789, meanResponseTime: 614, resultId: 1 },
    { id: 5, uri: 'https://angular.io/events', responseTime: 347, minResponseTime: 347,
    maxResponseTime: 626, meanResponseTime: 517.333, resultId: 1 },
    { id: 6, uri: 'https://angular.io/guide/quickstart', responseTime: 684, minResponseTime: 240,
    maxResponseTime: 684, meanResponseTime: 464, resultId: 1 },
    { id: 7, uri: 'https://angular.io/license', responseTime: 299, minResponseTime: 299,
    maxResponseTime: 790, meanResponseTime: 593.333, resultId: 1 },
];
