import Mail from '../../lib/Mail';

class RegistrationMail {
    get key() {
        return 'RegistrationMail';
    }

    async handle({ data }) {
        const { delivery, recipient, order, product } = data;

        await Mail.sendMail({
            to: `${deliveryman.name} <${deliveryman.email}>`,
            subject: 'Encomenda pronta para ser retirada',
            template: 'orderCreated',
            context: {
                id: order.id,
                deliveryman_name: delivery.name,
                product_name: product,
                recipient_name: recipient.name,
                street: recipient.street,
                number: recipient.number,
                additional_address: recipient.additional_address,
                city: recipient.city,
                state: recipient.state,
                zip_code: recipient.zip_code,
            },
        });
    }
}

export default new RegistrationMail();
