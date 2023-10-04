const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use('/', require('./routes/bookRoutes'));
require('./config/db');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
