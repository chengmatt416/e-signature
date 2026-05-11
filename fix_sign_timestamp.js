const fs = require('fs');
let content = fs.readFileSync('sign.html', 'utf8');

// Replace the updateDateTime logic
const oldScript = `// Update date and time (ISO 8601 format for Taiwan)
        function updateDateTime() {
            const now = new Date();
            // ISO 8601 format with timezone (Taiwan is UTC+8)
            const formatted = now.toISOString();
            const taiwanTime = new Date(now.getTime() + (8 * 60 * 60 * 1000)).toISOString().replace('Z', '+08:00');
            document.getElementById('datetime').textContent = taiwanTime;
        }

        // Initialize
        const signId = generateSignId();
        document.getElementById('signId').textContent = signId;
        document.getElementById('deviceId').textContent = generateDeviceId();
        updateDateTime();
        setInterval(updateDateTime, 1000);`;

const newScript = `let serverTimeOffset = 0;
        let isTimeSynced = false;

        // Update date and time (ISO 8601 format for Taiwan)
        async function initDateTime() {
            try {
                // Fetch trusted timestamp from server (Vercel API)
                const response = await fetch('/api/timestamp');
                if (response.ok) {
                    const data = await response.json();
                    serverTimeOffset = data.timestamp - Date.now();
                    isTimeSynced = true;
                    console.log('Time synchronized with server. Offset:', serverTimeOffset);
                }
            } catch (error) {
                console.log('Using local time fallback');
            }
            updateDateTime();
            setInterval(updateDateTime, 1000);
        }

        function updateDateTime() {
            // Apply server offset if available to ensure accurate timestamp regardless of client clock
            const now = new Date(Date.now() + serverTimeOffset);

            // ISO 8601 format with timezone (Taiwan is UTC+8)
            const taiwanTime = new Date(now.getTime() + (8 * 60 * 60 * 1000)).toISOString().replace('Z', '+08:00');

            const datetimeEl = document.getElementById('datetime');
            if (datetimeEl) {
                datetimeEl.textContent = taiwanTime + (isTimeSynced ? ' (Server Sync)' : '');
            }
        }

        // Initialize
        const signId = generateSignId();
        document.getElementById('signId').textContent = signId;
        document.getElementById('deviceId').textContent = generateDeviceId();
        initDateTime();`;

content = content.replace(oldScript, newScript);
fs.writeFileSync('sign.html', content);
