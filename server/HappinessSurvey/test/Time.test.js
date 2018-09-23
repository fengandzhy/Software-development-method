var Time = require('../utils/Time');


test('toString 1', () => {
    var t = new Time("09:00:00");
    expect(t.toString()).toBe('09:00:00');
});

test('string constructor', () => {
    var t = new Time("09:00:00");
    expect(t.toString()).toBe('09:00:00');
});

test('addSecondsToTime 1', () => {
    var t = new Time("09:00:00");
    t.addSeconds(34);
    var result = t.toString();
    expect(result).toBe('09:00:34');
});

test('addSecondsToTime 2', () => {
    var t = new Time("09:00:28");
    t.addSeconds(34);
    var result = t.toString();

    expect(result).toBe('09:01:02');
});


test('compare time 1', () => {
    var t = new Time("09:00:28");
    var t2 = new Time("10:00:00");
    var result = t.compareTo(t2);

    expect(result).toBeLessThan(0);
});

test('compare time 2', () => {
    var t = new Time("19:08:28");
    var t2 = new Time("19:06:00");
    var result = t.compareTo(t2);

    expect(result).toBeGreaterThan(0);
});
