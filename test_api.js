const http = require('http');
http.get('http://localhost:8000/api/timestamp.js', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log('API file fetched:', data.substring(0, 50) + '...'));
});
