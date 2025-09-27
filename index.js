// index.cjs
function getNextSaturdayMidnight() {
    const now = new Date();
    const target = new Date(now);
    const day = now.getDay();          // 0=Sun ... 6=Sat
    let daysTo = (6 - day + 7) % 7;
    if (daysTo === 0) daysTo = 7;       // если уже суббота — берём следующую
    target.setDate(now.getDate() + daysTo);
    target.setHours(0, 0, 0, 0);
    return target;
}

function formatDiff(ms) {
    const totalSec = Math.max(0, Math.floor(ms / 1000));
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return { days, hours, minutes, seconds };
}

function start() {
    const target = getNextSaturdayMidnight();
    const tick = () => {
        const diff = target - new Date();
        if (diff <= 0) {
            process.stdout.write(`\rIt's Saturday!             \n`);
            clearInterval(timer);
            return;
        }
        const { days, hours, minutes, seconds } = formatDiff(diff);
        process.stdout.write(
            `\rTime left until Saturday: ${days}d ${hours}h ${minutes}m ${seconds}s   `
        );
    };
    tick();
    const timer = setInterval(tick, 1000);
}

start();