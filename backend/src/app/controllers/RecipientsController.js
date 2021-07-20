import * as yup from 'yup';
import Recipient from '../models/Recipient';
import { Op } from 'sequelize';

class RecipientsController {
    async create(req, res) {
        const schema = yup.object().shape({
            name: yup.string().required(),
            cep: yup.string().required(),
            state: yup.string().required(),
            street: yup.string().required(),
            city: yup.string().required(),
            complement: yup.string().required(),
            number: yup.number().required().positive().integer(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ Error: 'Validation fail.' });
        }

        const address = await Recipient.create(req.body);
        if (address) {
            return res.status(202).json(address);
        } else {
            return res.status(500).json({ message: 'Internal Error' });
        }
    }

    async getRecipient(req, res) {
        const recipients = await Recipient.findAll({
            order: ['name'],
            attributes: ['name', 'id'],
        });

        const data = recipients.map((recipient) => {
            return { value: recipient.id, label: recipient.name };
        });
        return res.json(data);
    }

    async getAllRecipient(req, res) {
        const { page } = req.query;
        const recipients = await Recipient.findAll({
            order: ['name'],
            limit: 5,
            offset: ((page || 1) - 1) * 5,
        });
        if (recipients) {
            const RecipientTotal = await Recipient.count();

            const totalPage = Math.ceil(RecipientTotal / 5);

            return res
                .status(200)
                .json({ recipients, limit: 5, totalPage, page: page || 1 });
        } else {
            return res.status(400).json({ Erro: 'Something goes wrong' });
        }
    }

    async getById(req, res) {
        const { id } = req.params;
        const address = await Recipient.findByPk(id);
        if (!address) {
            return res.status(400).json({ message: 'Erro with Recipient' });
        } else {
            return res.status(200).json(address);
        }
    }

    async getByName(req, res) {
        const { name, page } = req.query;

        console.log(name);
        const recipients = await Recipient.findAll({
            where: {
                name: { [Op.like]: name ? `${name}%` : `%%` },
            },
            limit: 5,
            offset: ((page || 1) - 1) * 5,
        });
        if (recipients) {
            const RecipientTotal = await Recipient.count({
                where: {
                    name: { [Op.like]: name ? `${name}%` : `%%` },
                },
            });

            const totalPage = Math.ceil(RecipientTotal / 5);
            return res
                .status(200)
                .json({ recipients, limit: 5, totalPage, page: page || 1 });
        } else {
            return res.status(400).json({ message: 'Erro with Recipient' });
        }
    }

    async update(req, res) {
        const { id } = req.params;

        const address = await Recipient.findByPk(id);
        if (!address) {
            return res.status(404).json({ message: 'Recipient not found' });
        }
        const schema = yup.object().shape({
            name: yup.string().required(),
            cep: yup.string().required(),
            state: yup.string().required(),
            street: yup.string().required(),
            city: yup.string().required(),
            complement: yup.string().required(),
            number: yup.number().required().positive().integer(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ Error: 'Validation fail.' });
        }

        await address.update(req.body);

        return res.status(200).json(address);
    }
    async delete(req, res) {
        const { id } = req.params;

        const schema = yup.object().shape({
            id: yup.number().required(),
        });
        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ Error: 'Id cannot be null .' });
        }

        const recipient = await Recipient.destroy({ where: { id } });
        return res.status(200).json({ message: 'Removed with success' });
    }
}

export default new RecipientsController();
