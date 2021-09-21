const express = require('express')
const config = require('./config')
const cors = require('cors');
const adminRoutes = require('./routes/admin-routes');
const teacherRoutes = require('./routes/teacher-routes');
const app = express();

// middlewares
app.use(express.json())
app.use(cors());

app.use('/api/admin', adminRoutes.routes)
app.use('/api/teacher', teacherRoutes.routes)
app.listen(config.port, () => console.log('App is listening on url: ' + config.url));


