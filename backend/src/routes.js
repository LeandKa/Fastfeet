import { Router } from 'express';

const router = new Router();

//Controllers
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import FileController from './app/controllers/FileController';
import DeliveryManController from './app/controllers/DeliveryManController';
import OrdersController from './app/controllers/OrdersController';
import DeliveriesController from './app/controllers/DeliveriesController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';

//Configs
import upload from './config/multer';

//Middlewares
import auth from './app/middlewares/auth';

import getDate from './app/middlewares/getDate';

//Session
router.post('/session', SessionController.loginStore);

//Create select recipients//Deliveryman
router.get('/recipients/select', RecipientsController.getRecipient);
router.get('/deliveryman/select', DeliveryManController.getDeliveryman);

//Recipients
router.post('/recipient/save', auth, RecipientsController.create);
router.get('/recipients', auth, RecipientsController.getAllRecipient);
router.get('/recipient/:id', auth, RecipientsController.getById);
router.get('/recipient', auth, RecipientsController.getByName);
router.put('/recipient/:id', auth, RecipientsController.update);
router.delete('/recipient/:id', auth, RecipientsController.delete);

//DeliveryMan
router.post('/deliveryman/save', auth, DeliveryManController.create);
router.get('/deliveryman', auth, DeliveryManController.getAllDeliveryMans);
router.get('/deliveryman/:id', DeliveryManController.getById);
router.get('/deliverymans', auth, DeliveryManController.getByName);
router.put('/deliveryman/:id', auth, DeliveryManController.update);
router.delete('/deliveryman/:id', auth, DeliveryManController.delete);

//Orders
router.post('/orders/save', auth, OrdersController.create);
router.get('/order', auth, OrdersController.index);
router.put('/order/:id', auth, OrdersController.update);
router.delete('/order/:id', auth, OrdersController.delete);
router.get('/order/:id', OrdersController.getOne);

//Deliveries
router.get('/deliveryman/:id/deliveries', DeliveriesController.show);

//DeliveryMan Routes with Problems Functions
router.post('/delivery/problems', DeliveryProblemsController.addProblem);
router.get('/delivery/problems', DeliveryProblemsController.show);
router.get('/delivery/problems/:id', DeliveryProblemsController.getById);
router.delete(
    '/problem/:id/cancel-delivery',
    auth,
    getDate,
    DeliveryProblemsController.cancelDelivery
);

//DeliveryMan Routes Functions
router.post(
    '/deliveryman/start',
    getDate,
    DeliveriesController.deliveryStartDate
);

router.post('/deliveryman/end', getDate, DeliveriesController.deliveryEndDate);

//Files
router.post('/files', upload.single('avatar'), FileController.create);

export default router;
