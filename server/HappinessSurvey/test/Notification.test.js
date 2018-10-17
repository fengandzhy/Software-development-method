var notificationCron = require('../crons/NotificationCron');

test('just a test ', async () => {
    return notificationCron.start().then (() => {
        expect(1).toBe(1);
    });
});