import DeliveryMan from '../models/DeliveryMan';
import Files from '../models/Files';
import * as yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/DeliveryMan';

class DeliveryManController {
    async create(req, res) {
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            avatar_id: yup.number().required().positive().integer(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ Error: 'Validation fail.' });
        }
        const { name, email, avatar_id } = req.body;
        const avatar = await Files.findByPk(avatar_id);
        if (!avatar) {
            return res.status(404).json({ Error: 'Avatar id not found' });
        }

        const Delivery = await DeliveryMan.create({ name, email, avatar_id });
        if (Delivery) {
            return res.status(200).json(Delivery);
        } else {
            return res.status(400).json({ Erro: 'Something goes wrong' });
        }
    }

    async getDeliveryman(req, res) {
        const deliveryman = await DeliveryMan.findAll({
            order: ['name'],
            attributes: ['name', 'id'],
        });

        if (deliveryman) {
            const data = deliveryman.map((deliveryman) => {
                return { value: deliveryman.id, label: deliveryman.name };
            });
            return res.status(200).json(data);
        }
    }

    async getAllDeliveryMans(req, res) {
        const { page } = req.query;
        const deliverys = await DeliveryMan.findAll({
            include: [
                {
                    model: Files,
                    as: 'avatar',
                    attributes: ['path', 'url'],
                },
            ],
            limit: 5,
            offset: ((page || 1) - 1) * 5,
        });
        if (deliverys) {
            const DeliveryManTotal = await DeliveryMan.count();

            const totalPage = Math.ceil(DeliveryManTotal / 5);

            return res.status(200).json({
                deliverys,
                limit: 5,
                totalPage: totalPage,
                page: page || 1,
            });
        } else {
            return res.status(400).json({ Erro: 'Something goes wrong' });
        }
    }

    async getById(req, res) {
        const { id } = req.params;

        const deliverys = await DeliveryMan.findByPk(id, {
            include: [
                {
                    model: Files,
                    as: 'avatar',
                    attributes: ['url', 'id', 'path'],
                },
            ],
        });
        if (deliverys) {
            return res.status(200).json(deliverys);
        } else {
            return res.status(400).json({ Erro: 'Something goes wrong' });
        }
    }

    async getByName(req, res) {
        const { name, page } = req.query;

        const deliverys = await DeliveryMan.findAll({
            where: {
                name: { [Op.like]: name ? `${name}%` : `%%` },
            },
            include: [
                {
                    model: Files,
                    as: 'avatar',
                    attributes: ['path', 'url'],
                },
            ],
            limit: 5,
            offset: ((page || 1) - 1) * 5,
        });
        if (deliverys) {
            const DeliveryManTotal = await DeliveryMan.count({
                where: {
                    name: { [Op.like]: name ? `${name}%` : `%%` },
                },
            });

            console.log(DeliveryManTotal);
            const totalPage = Math.ceil(DeliveryManTotal / 5);

            return res.status(200).json({
                deliverys,
                limit: 5,
                totalPage: totalPage,
                page: page || 1,
            });
        } else {
            return res.status(400).json({ Erro: 'Something goes wrong' });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, email, avatar_id } = req.body;
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            avatar_id: yup.number().required().positive().integer(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ Error: 'Validation fail.' });
        }

        const DeliveryManUpdate = await DeliveryMan.findByPk(id);
        const File = await Files.findByPk(avatar_id);
        if (!File || !DeliveryManUpdate) {
            return res.status(400).json({
                message:
                    'Avatar id cannot be null or DeliveryMan id cannot be null',
            });
        } else {
            await DeliveryManUpdate.update({ name, email, avatar_id });

            return res.status(200).json(DeliveryManUpdate);
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        const schema = yup.object().shape({
            id: yup.number().required(),
        });
        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ Error: 'Id cannot be null .' });
        }

        const deliveryManDelete = await Deliveryman.findByPk(id);
        if (!deliveryManDelete) {
            return res.status(400).json({ message: 'Invalid id' });
        } else {
            await deliveryManDelete.destroy();
            return res
                .status(200)
                .json({ message: 'DeliveryMan delete with success' });
        }
    }
}

export default new DeliveryManController();
