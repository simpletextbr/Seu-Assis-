const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');


const SessionController = require('./controllers/SessionController');
const MobileController = require('./controllers/MobileController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const RequestController = require('./controllers/RequestController');
const DetailController = require('./controllers/DetailController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes = express.Router();
const upload = multer(uploadConfig);

//Suporters
routes.post('/sessions', SessionController.store);
routes.get('/dashboard', DashboardController.show);
routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

//Usuarios
routes.post('/mobiles', MobileController.store);
//routes.put('/mobiles/warranty', MobileController.update);
routes.post('/spots/:spot_id/requests', RequestController.store);
routes.get('/detail', DetailController.show);

routes.post('/requests/:requests_id/approvals', ApprovalController.store);
routes.post('/requests/:requests_id/rejections', RejectionController.store);





module.exports = routes;