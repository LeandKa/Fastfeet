import React, { useState, useEffect } from 'react';
import { lighten } from 'polished';
import { MdMoreHoriz } from 'react-icons/md';
import { toast } from 'react-toastify';
import NavBar from '~/components/NavBar';
import {
  Container,
  Content,
  ContentTable,
  Status,
  CircleIcon,
  DeliveryTable,
} from './style';

import ActionMenu from '../../../components/ActionMenu';
import Title from '../../../components/Title';
import Filter from '../../../components/Filter';
import Pagination from '../../../components/Pagination';
import DeliveryListDetails from '../../../components/DeliveryListDetails';
import Api from '../../../services/Api';

export default function DeliveriesList() {
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchParam, setSearchParam] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState(-1);
  const [maxPage, setMaxPage] = useState(0);
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState(false);

  const GetColorStatus = text => {
    switch (text) {
      case 'ENTREGUE':
        return '#2CA42B';
      case 'PENDENTE':
        return '#C1BC35';
      case 'CANCELADO':
        return '#DE3B3B';
      case 'RETIRADA':
        return '#4D85EE';
      default:
        return 'black';
    }
  };

  useEffect(() => {
    console.log(searchParam, isSearch);
    async function getOrders() {
      const order = await Api.get(`/order?page=${page}`);
      if (order) {
        setOrders(order.data.order);
        setData(order.data.order);
        setMaxPage(order.data.totalPage);
      } else {
        toast.error('Something goes wrong with Orders');
      }
    }
    getOrders();
  }, []);

  const afterRemove = () => {
    async function refresh() {
      const orders = await Api.get(`/order?page=${page}`);
      if (orders) {
        setOrders(orders.data.order);
        setData(orders.data.order);
        setMaxPage(orders.data.totalPage);
        setSelectedDelivery(-1);
      }
    }
    refresh();
  };

  const handleChangePage = page => {
    setPage(page);
    async function changePage() {
      const orderNextPage = await Api.get(`/order?page=${page}`);
      if (orderNextPage) {
        setOrders(orderNextPage.data.order);
        setData(orderNextPage.data.order);
        setMaxPage(orderNextPage.data.totalPage);
        setSelectedDelivery(-1);
      }
    }

    async function changePageSearch() {
      setPage(page);
      const orderNextPage = await Api.get(
        `/order?page=${page}&name=${searchParam}`
      );
      if (orderNextPage) {
        setOrders(orderNextPage.data.order);
        setData(orderNextPage.data.order);
        setMaxPage(orderNextPage.data.totalPage);
        setSelectedDelivery(-1);
      }
    }

    if (isSearch) {
      changePageSearch();
    } else {
      changePage();
    }
  };

  const handleRemoveDelivery = id => {
    async function deleteOrder() {
      const orderDel = await Api.delete(`/order/${id}`);
      if (orderDel) {
        toast.success('Delete with success');
        afterRemove();
      } else {
        toast.error('Something goes wrong delete action');
      }
    }

    deleteOrder();
  };

  const handleSearch = event => {
    event.preventDefault();
    async function getOrdersSearch() {
      const order = await Api.get(`/order?page=${page}&name=${searchParam}`);
      if (order) {
        setOrders(order.data.order);
        setData(order.data.order);
        setMaxPage(order.data.totalPage);
        setIsSearch(true);
      } else {
        toast.error('Something goes wrong with Orders');
      }
    }
    getOrdersSearch();
  };

  return (
    <>
      {dialog && (
        <DeliveryListDetails
          handleClose={() => setDialog(!dialog)}
          delivery={data[selectedDelivery]}
        />
      )}
      <NavBar />
      <Container>
        <Content>
          <Title text="Gerenciando encomendas" />
          <Filter
            onsubmit={handleSearch}
            onChange={e => setSearchParam(e.target.value)}
            text="Busca pro encomendas"
            path="/delivery/create"
          />
          <ContentTable>
            <DeliveryTable>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Destinatário</td>
                  <td>Entregador</td>
                  <td>Cidade</td>
                  <td>Estado</td>
                  <td>Status</td>
                  <td>Ações</td>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.recipient.name}</td>
                    <td>{order.deliveryman.name}</td>
                    <td>{order.recipient.city}</td>
                    <td>{order.recipient.state}</td>
                    <td>
                      <Status
                        color={GetColorStatus(order.status)}
                        background={lighten(0.3, GetColorStatus(order.status))}
                      >
                        <CircleIcon color={GetColorStatus(order.status)} />
                        {order.status}
                      </Status>
                    </td>
                    <td>
                      <MdMoreHoriz
                        size={32}
                        onClick={() =>
                          setSelectedDelivery(
                            selectedDelivery === index ? -1 : index
                          )
                        }
                      />
                      {selectedDelivery === index && (
                        <ActionMenu
                          path={`edit/${order.id}`}
                          Editar={{ order }}
                          Remove={() => handleRemoveDelivery(order.id)}
                          VisualizeClick={() => setDialog(!dialog)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </DeliveryTable>
          </ContentTable>
          {maxPage > 1 && (
            <Pagination
              page={page}
              maxPage={maxPage}
              handleChangePage={handleChangePage}
            />
          )}
        </Content>
      </Container>
    </>
  );
}
