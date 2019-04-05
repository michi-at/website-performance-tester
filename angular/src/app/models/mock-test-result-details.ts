import { TestResultDetail } from './test-result-detail';

export const TEST_RESULT_DETAILS: TestResultDetail[] = [
    { testResultDetailId: 1, uri: 'https://angular.io', responseTime: 28, minResponseTime: 28,
    maxResponseTime: 501, meanResponseTime: 218.667 },
    { testResultDetailId: 2, uri: 'https://angular.io/features', responseTime: 689, minResponseTime: 61,
    maxResponseTime: 689, meanResponseTime: 313.667 },
    { testResultDetailId: 3, uri: 'https://angular.io/docs', responseTime: 497, minResponseTime: 65,
    maxResponseTime: 497, meanResponseTime: 305 },
    { testResultDetailId: 4, uri: 'https://angular.io/resources', responseTime: 463, minResponseTime: 463,
    maxResponseTime: 789, meanResponseTime: 614 },
    { testResultDetailId: 5, uri: 'https://angular.io/events', responseTime: 347, minResponseTime: 347,
    maxResponseTime: 626, meanResponseTime: 517.333 },
    { testResultDetailId: 6, uri: 'https://angular.io/guide/quickstart', responseTime: 684, minResponseTime: 240,
    maxResponseTime: 684, meanResponseTime: 464 },
    { testResultDetailId: 7, uri: 'https://angular.io/license', responseTime: 299, minResponseTime: 299,
    maxResponseTime: 790, meanResponseTime: 593.333 },
];
