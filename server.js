const express = require('express');
const router = require('./routes/router');
const PORT = 4000;
const app = express();

app.use('/api/', router);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

