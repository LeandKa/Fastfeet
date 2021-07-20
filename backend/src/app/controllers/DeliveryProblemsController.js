import Order from '../models/Order';
import DeliveryProblems from '../models/DeliveryProblems';
import * as yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/DeliveryMan';
import CancelMail from '../jobs/CancelMail';
import Queue from '../../lib/Queue';
import Recipient from '../models/Recipient';

class DeliveryProblemsController {
    async addProblem(req, res) {
        const schema = yup.object().shape({
            delivery_id: yup.number().required(),
            description: yup.string().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ Error: 'Validation fail.' });
        }

        const { delivery_id, description } = req.body;

        const deliveryValidation = await Order.findByPk(delivery_id);

        if (!deliveryValidation) {
            return res.status(400).json({ message: 'Order not exist' });
        }

        const DeliveryProbs = await DeliveryProblems.create({
            description,
            delivery_id,
        });

        return res.status(200).json(DeliveryProbs);
    }

    async show(req, res) {
        const { page } = req.query;

        const schema = yup.object().shape({
            page: yup.number().required(),
        });
        if (!(await schema.isValid(req.query))) {
            return res.status(400).json({ Error: 'Validation fail.' });
        }

        const DeliveryProbs = await DeliveryProblems.findAll({
            attributes: ['id', 'delivery_id', 'description'],
            limit: 5,
            offset: ((page || 1) - 1) * 5,
            include: [
                {
                    model: Order,
                    as: 'order',
                    attributes: ['id', 'product'],
                    include: [
                        {
                            model: Recipient,
                            as: 'recipient',
                            attributes: ['name'],
                        },
                    ],
                    where: { canceled_at: null },
                },
            ],
        });

        const maxPage = Math.ceil(DeliveryProbs.length / 5);

        return res.json({ DeliveryProbs, maxPage });
    }

    async getById(req, res) {
        const { id, page } = req.params;

        const schema = yup.object().shape({
            id: yup.number().required(),
        });
        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ Error: 'Validation fail.' });
        }

        const DeliveryProbs = await DeliveryProblems.findAll({
            where: {
                delivery_id: {
                    [Op.like]: id,
                },
            },
            limit: 5,
            offset: ((page || 1) - 1) * 5,
        });

        if (!DeliveryProbs) {
            return res
                .status(400)
                .json({ message: 'Not Delivery Problems found' });
        } else {
            return res.status(200).json(DeliveryProbs);
        }
    }

    async cancelDelivery(req, res) {
        const { id } = req.params;

        const schema = yup.object().shape({
            id: yup.number().required(),
        });
        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ Error: 'Validation fail.' });
        }

        const DeliveryProbs = await DeliveryProblems.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: Order,
                    as: 'order',
                    attributes: ['id'],
                    include: [
                        {
                            model: Deliveryman,
                            as: 'deliveryman',
                            attributes: ['email', 'name'],
                        },
                    ],
                },
            ],
        });

        if (!DeliveryProbs) {
            return res
                .status(400)
                .json({ message: 'Erro with the Delivery Problems' });
        }

        const { order } = DeliveryProbs;

        const OrderUp = await Order.findByPk('2', {
            include: [
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: ['email', 'name'],
                },
            ],
        });

        await OrderUp.update({
            canceled_at: req.currentDate,
        });

        await Queue.add(CancelMail.key, {
            deliveryman: OrderUp.deliveryman,
            id: OrderUp.id,
        });

        return res.status(200).json(OrderUp);
    }
}

export default new DeliveryProblemsController();
