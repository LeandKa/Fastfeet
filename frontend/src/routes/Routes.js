import React from 'react';
import { Switch } from 'react-router-dom';
import WrapperRouter from './WrapperRouter';
import DeliverymanList from '../pages/Deliveryman/DeliverymanList';
import DeliveriesList from '../pages/Delivery/DeliveriesList';
import Signin from '../pages/Signin';
import RecipientsList from '../pages/Recipient/RecipientsList';
import DeliveryProblems from '../pages/DeliveryProblems';
import DeliveryForm from '../pages/Deliveryman/DeliverymanForm';
import RecipientsForm from '../pages/Recipient/RecipientsForm';
import DeliveriesForm from '../pages/Delivery/DeliveriesForm';

export default function Routes() {
  return (
    <Switch>
      <WrapperRouter path="/" exact component={Signin} />
      <WrapperRouter
        path="/delivery/list"
        isPrivate
        component={DeliveriesList}
      />
      <WrapperRouter
        path="/recipients/list"
        isPrivate
        component={RecipientsList}
      />
      <WrapperRouter
        path="/problems/list"
        isPrivate
        component={DeliveryProblems}
      />
      <WrapperRouter
        path="/deliveryman/list"
        isPrivate
        component={DeliverymanList}
      />
      <WrapperRouter
        path="/deliveryman/create"
        isPrivate
        component={DeliveryForm}
      />
      <WrapperRouter
        path="/recipients/create"
        isPrivate
        component={RecipientsForm}
      />
      <WrapperRouter
        path="/delivery/create"
        isPrivate
        component={DeliveriesForm}
      />
      <WrapperRouter
        path="/deliveryman/edit/:id"
        isPrivate
        component={DeliveryForm}
      />
      <WrapperRouter
        path="/recipients/edit/:id"
        isPrivate
        component={RecipientsForm}
      />
      <WrapperRouter
        path="/delivery/edit/:id"
        isPrivate
        component={DeliveriesForm}
      />
    </Switch>
  );
}
