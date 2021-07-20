import React, { useState, useEffect } from 'react';

import { MdMoreHoriz } from 'react-icons/md';
import { toast } from 'react-toastify';

import NavBar from '~/components/NavBar';
import Title from '~/components/Title';
import Filter from '~/components/Filter';
import ActionMenu from '~/components/ActionMenu';
import Pagination from '~/components/Pagination';
import Api from '~/services/Api';

import {
  Container,
  Content,
  ContentTable,
  Img,
  DeliverymanTable,
} from './style';

export default function DeliverymanList() {
  const [deliverymans, setDeliverymans] = useState([]);
  const [data, setData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchParam, setSearchParam] = useState('');
  const [maxPage, setMaxPage] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedDelivery, setSelectedDelivery] = useState(-1);

  useEffect(() => {
    async function getDeliveryMans() {
      const deliveryman = await Api.get(`/deliveryman?page=${page}`);
      if (deliveryman) {
        setMaxPage(deliveryman.data.totalPage);
        setDeliverymans(deliveryman.data.deliverys);
        setData(deliveryman.data.deliverys);
      } else {
        toast.error('Something goes wrong with Deliveryman');
      }
    }

    getDeliveryMans();
  }, []);

  const afterRemove = () => {
    async function refresh() {
      const deliveryman = await Api.get(`/deliveryman?page=${page}`);
      if (deliveryman) {
        setDeliverymans(deliveryman.data.deliverys);
        setData(deliveryman.data.deliverys);
        setSelectedDelivery(-1);
      }
    }
    refresh();
  };

  const handleChangePage = page => {
    setPage(page);
    async function changePage() {
      const orderNextPage = await Api.get(`/deliveryman?page=${page}`);
      if (orderNextPage) {
        setDeliverymans(orderNextPage.data.deliverys);
        setData(orderNextPage.data.deliverys);
        setMaxPage(orderNextPage.data.totalPage);
        setSelectedDelivery(-1);
      }
    }

    async function changePageSearch() {
      setPage(page);
      const orderNextPage = await Api.get(
        `/deliveryman?page=${page}&name=${searchParam}`
      );
      if (orderNextPage) {
        setDeliverymans(orderNextPage.data.deliverys);
        setData(orderNextPage.data.deliverys);
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

  const handleRemoveDeliveryman = id => {
    async function deleteOrder() {
      const deliverymanDel = await Api.delete(`/deliveryman/${id}`);
      if (deliverymanDel) {
        toast.success('Delete with Success');
        afterRemove();
      } else {
        toast.error('Something goes wrong with delete action');
      }
    }

    deleteOrder();
  };

  const handleSearch = event => {
    event.preventDefault();
    async function getDeliverySearch() {
      const deliveryman = await Api.get(
        `/deliverymans?page=${page}&name=${searchParam}`
      );
      if (deliveryman) {
        setIsSearch(true);
        setMaxPage(deliveryman.data.totalPage);
        setDeliverymans(deliveryman.data.deliverys);
        setData(deliveryman.data.deliverys);
      } else {
        toast.error('Something goes wrong with Deliveryman');
      }
    }
    getDeliverySearch();
  };

  return (
    <>
      <NavBar />
      <Container>
        <Content>
          <Title text="Gerenciando entregadores" />
          <Filter
            onsubmit={handleSearch}
            onChange={e => setSearchParam(e.target.value)}
            text="Buscar pro entregadores"
            path="/deliveryman/create"
          />
          <ContentTable>
            <DeliverymanTable>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Avatar</td>
                  <td>Nome</td>
                  <td>Email</td>
                  <td>Ações</td>
                </tr>
              </thead>
              <tbody>
                {deliverymans.map((deliveryman, index) => (
                  <tr key={deliveryman.id}>
                    <td>#{deliveryman.id}</td>
                    {deliveryman.avatar_id ? (
                      <td>
                        <Img src={deliveryman.avatar.url} />
                      </td>
                    ) : (
                      <td>Sem imagem</td>
                    )}
                    <td>{deliveryman.name}</td>
                    <td>{deliveryman.email}</td>
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
                          path={`edit/${deliveryman.id}`}
                          Editar={data[selectedDelivery]}
                          Remove={() => handleRemoveDeliveryman(deliveryman.id)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </DeliverymanTable>
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
