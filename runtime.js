((globalThis) => {
    const core = Deno.core;
    const DEBUG = typeof Deno.env !== 'undefined' && Deno.env.get('DEBUG') === 'true'; // Check if debug mode is enabled

    function argsToMessage(...args) {
        return args.map((arg) => JSON.stringify(arg)).join(" ");
    }

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    }

    const sarcasticPhrases = [
        "Oh, brilliant idea", "Wow, never heard that one before...", "Oh, how original...",
        "Congratulations, you broke the code", "Great job, you found a bug", "Keep up the good work, genius!",
        "Oh, the brilliance is blinding...", "I'm in awe of your coding skills...",
        "You must be a real expert...", "Such a groundbreaking contribution...",
        "You should be a comedian...", "Sarcasa level: expert...",
    ];

    globalThis.console = {
        log: (...args) => {
            core.print(`[out]: ${argsToMessage(...args)}\n`, false);
        },
        warn: (...args) => {
            const time = getCurrentTime();
            const message = argsToMessage(...args);
            const logMessage = `\x1b[1;33m[${time}][warn]:\x1b[0m ${message}`;
            core.print(`${logMessage}\n`, true);
        },
        debug: (...args) => {
            if (DEBUG) {
                const time = getCurrentTime();
                const message = argsToMessage(...args);
                const logMessage = `\x1b[1;34m[${time}][debug]:\x1b[0m ${message}`;
                core.print(`${logMessage}\n`, true);
            }
        },
        sarcasm: (...args) => {
            const time = getCurrentTime();
            const sarcasticMessage = sarcasticPhrases[Math.floor(Math.random() * sarcasticPhrases.length)];
            const message = argsToMessage(...args) + `\n\x1b[1m${sarcasticMessage}\x1b[0m`;
            const logMessage = `\x1b[1;35m[${time}][message]:\x1b[0m ${message}`;
            core.print(`${logMessage}\n`, true);
        }
    };
})(globalThis);
