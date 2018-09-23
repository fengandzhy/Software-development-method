var notificationCron = require('../crons/NotificationCron');

test('Cron should end.', async () => {
    return notificationCron.start().then (() => {
        expect(1).toBe(1);
    });
});