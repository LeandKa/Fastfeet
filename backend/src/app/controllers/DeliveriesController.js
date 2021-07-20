import * as yup from 'yup';
import Order from '../models/Order';
import Files from '../models/Files';
import Recipient from '../models/Recipient';
import { Op } from 'sequelize';
import { isBefore, isAfter, endOfDay, startOfDay } from 'date-fns';

class DeliveriesController {
    async show(req, res) {
        const { id } = req.params;
        const { delivered } = req.query;

        const schema = yup.object().shape({
            id: yup.string().required(),
        });
        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ Error: 'Validation Fail' });
        }

        const order = await Order.findAll({
            where: {
                deliveryman_id: id,
                canceled_at: null,
                end_date: delivered === 'true' ? { [Op.ne]: null } : null,
            },
            attributes: [
                'id',
                'product',
                'start_date',
                'end_date',
                'created_at',
            ],
            include: [
                {
                    model: Files,
                    as: 'signature',
                    attributes: ['url', 'path'],
                },
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: [
                        'name',
                        'street',
                        'number',
                        'adress',
                        'state',
                        'city',
                        'cep',
                    ],
                },
            ],
        });

        if (!order) {
            return res.status(400).json({ message: 'Error with order' });
        }

        return res.status(200).json(order);
    }

    async deliveryStartDate(req, res) {
        const { order_id, deliveryman_id } = req.body;

        const schema = yup.object().shape({
            order_id: yup.string().required(),
            deliveryman_id: yup.number(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ Error: 'Validation Fail' });
        }

        const order = await Order.findOne({
            where: {
                id: order_id,
                deliveryman_id: deliveryman_id,
                canceled_at: null,
                start_date: null,
                end_date: null,
            },
        });
        if (!order) {
            return res
                .status(400)
                .json({ message: 'Order not found or already take' });
        }

        const currentDate = new Date(req.currentDate);

        const minDate = currentDate.setHours(8, 0, 0);
        const maxDate = currentDate.setHours(20, 0, 0);

        console.log(
            isBefore(req.currentDate, minDate),
            isAfter(req.currentDate, maxDate)
        );

        if (
            isBefore(req.currentDate, minDate) ||
            isAfter(req.currentDate, maxDate)
        )
            return res.status(401).json({
                error: 'Order withdraw is only allowed between 8am and 8pm!',
            });

        const deliverymanOrders = await Order.count({
            where: {
                deliveryman_id,
                start_date: {
                    [Op.between]: [
                        startOfDay(req.currentDate),
                        endOfDay(req.currentDate),
                    ],
                },
            },
        });

        if (deliverymanOrders >= 5) {
            return res.status(401).json({
                error: 'You already have started 5 orders today, try tomorrow!',
            });
        } else {
            await order.update({ start_date: req.currentDate });
            return res.status(200).json(order);
        }
    }

    async deliveryEndDate(req, res) {
        const { order_id, signature_id } = req.body;

        const schema = yup.object().shape({
            order_id: yup.string().required(),
            signature_id: yup.string().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ Error: 'Validation Fail' });
        }

        const order = await Order.findOne({
            where: {
                id: order_id,
                canceled_at: null,
                start_date: { [Op.ne]: null },
                end_date: null,
            },
        });

        if (!order) {
            return res.status(400).json({
                message:
                    'Order invalid or not have a start-date or is canceled ',
            });
        }

        const file = await Files.findOne({
            where: {
                id: signature_id,
            },
        });
        if (!file) {
            return res
                .status(400)
                .json({ message: 'Please pass a signature id valid' });
        }

        await order.update({ signature_id, end_date: req.currentDate });

        return res.status(200).json(order);
    }
}

export default new DeliveriesController();
