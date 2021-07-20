import Mail from '../../lib/Mail';

class CancelMail {
  get key() {
    return 'CancelMail';
  }

  async handle({ data }) {
    const { deliveryman, id } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Encomenda pronta para ser retirada',
      template: 'orderCancel',
      context: {
        id,
        deliveryman_name: deliveryman.name,
      },
    });
  }
}

export default new CancelMail();
