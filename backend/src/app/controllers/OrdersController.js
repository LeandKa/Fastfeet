import * as yup from 'yup';

import { Op } from 'sequelize';

//Models
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/Files';

//Queues and Jobs
import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class OrdersController {
    async index(req, res) {
        const { name, page } = req.query;

        const schema = yup.object().shape({
            product: yup.string(),
            page: yup.number(),
        });

        if (!(await schema.isValid(req.query))) {
            return res.status(400).json({ Error: 'Validation Fail' });
        }

        const order = await Order.findAll({
            where: {
                product: { [Op.like]: name ? `%${name}%` : `%%` },
            },
            limit: 5,
            offset: ((page || 1) - 1) * 5,
            attributes: [
                'id',
                'product',
                'canceled_at',
                'start_date',
                'end_date',
                'status',
            ],
            include: [
                {
                    model: File,
                    as: 'signature',
                    attributes: ['url', 'path'],
                },
                {
                    model: DeliveryMan,
                    as: 'deliveryman',
                    attributes: ['id', 'name'],
                },
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: [
                        'id',
                        'name',
                        'street',
                        'number',
                        'state',
                        'state',
                        'city',
                        'cep',
                        'adress',
                    ],
                },
            ],
        });

        const OrdersTotal = await Order.count({
            where: {
                product: { [Op.like]: name ? `%${name}%` : `%%` },
            },
        });

        const totalPage = Math.ceil(OrdersTotal / 5);
        return res.status(200).json({ order, totalPage });
    }
    async getOne(req, res) {
        const { id } = req.params;
        const order = await Order.findByPk(id, {
            include: [
                {
                    model: File,
                    as: 'signature',
                    attributes: ['url', 'path'],
                },
                {
                    model: DeliveryMan,
                    as: 'deliveryman',
                    attributes: ['id', 'name'],
                },
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: [
                        'id',
                        'name',
                        'street',
                        'number',
                        'state',
                        'state',
                        'city',
                        'cep',
                        'adress',
                    ],
                },
            ],
        });
        if (order) {
            return res.status(200).json(order);
        }
        return res.status(404).json({ message: 'Order id not found' });
    }

    async getName(req, res) {
        const { name, page } = req.query;

        console.log(name);
        const order = await Recipient.findAll({
            where: {
                name: { [Op.like]: name ? `${name}%` : `%%` },
            },
            limit: 5,
            offset: ((page || 1) - 1) * 5,
        });
        if (order) {
            const RecipientTotal = await Recipient.count({
                where: {
                    name: { [Op.like]: name ? `${name}%` : `%%` },
                },
            });

            const totalPage = Math.ceil(RecipientTotal / 5);
            return res
                .status(200)
                .json({ order, limit: 5, totalPage, page: page || 1 });
        } else {
            return res.status(400).json({ message: 'Erro with Recipient' });
        }
    }

    async create(req, res) {
        const { product, recipient_id, deliveryman_id } = req.body;

        const schema = yup.object().shape({
            product: yup.string().required(),
            recipient_id: yup.number().required(),
            deliveryman_id: yup.number().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ Error: 'Validation fail.' });
        }

        try {
            const recipient = await Recipient.findByPk(recipient_id, {
                attributes: [
                    'name',
                    'cep',
                    'state',
                    'city',
                    'street',
                    'number',
                    'complement',
                ],
            });

            if (!recipient) {
                return res.status(404).json({ message: 'Recipient not found' });
            }

            const delivery = await DeliveryMan.findByPk(deliveryman_id, {
                attributes: ['name'],
            });

            if (!delivery) {
                return res.status(404).json({ message: 'Delivery not found' });
            }

            const order = await Order.create({
                product,
                recipient_id,
                deliveryman_id,
            });
            await Queue.add(RegistrationMail.key, {
                delivery,
                recipient,
                product: req.body.product,
                order,
            });
            if (order) {
                return res.status(200).json(order);
            } else {
                return res.status(400).json({ message: 'Erro with Recipient' });
            }
        } catch (error) {
            return res.status(400).json({ message: 'Erro with Recipient' });
        }
    }

    async update(req, res) {
        const schema = yup.object().shape({
            recipient_id: yup.number(),
            deliveryman_id: yup.number(),
            product: yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Invalid inserted data!' });
        }

        const { id } = req.params;

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(400).json({ error: 'Invalid id!' });
        }

        await order.update(req.body);

        return res.json(order);
    }
    async delete(req, res) {
        const { id } = req.params;

        const schema = yup.object().shape({
            id: yup.number().required(),
        });
        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ Error: 'Id cannot be null .' });
        }

        const order = await Order.destroy({ where: { id } });
        return res.status(200).json({ message: 'Removed with success' });
    }
}

export default new OrdersController();
