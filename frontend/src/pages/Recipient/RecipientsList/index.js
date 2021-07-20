import React, { useEffect, useState } from 'react';

import { MdMoreHoriz } from 'react-icons/md';
import { toast } from 'react-toastify';

import NavBar from '~/components/NavBar';
import Title from '~/components/Title';
import Filter from '~/components/Filter';
import ActionMenu from '~/components/ActionMenu';
import Pagination from '~/components/Pagination';
import Api from '~/services/Api';

import { Container, Content, ContentTable, RecipientsTable } from './style';

export default function RecipientsList() {
  const [recipients, setRecipients] = useState([]);
  const [data, setData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchParam, setSearchParam] = useState('');
  const [maxPage, setMaxPage] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedDelivery, setSelectedDelivery] = useState(-1);

  useEffect(() => {
    console.log(isSearch, searchParam);
    async function getRecipients() {
      const recipient = await Api.get(`/recipients?page=${page}`);
      if (recipient) {
        setMaxPage(recipient.data.totalPage);
        setRecipients(recipient.data.recipients);
        setData(recipient.data.recipients);
      } else {
        toast.error('Something goes wrong with Recipient');
      }
    }

    getRecipients();
  }, []);

  const afterRemove = () => {
    async function refresh() {
      const recipient = await Api.get(`/recipients?page=${page}`);
      if (recipient) {
        setRecipients(recipient.data.recipients);
        setData(recipient.data.recipients);
        setSelectedDelivery(-1);
      }
    }
    refresh();
  };

  const handleChangePage = page => {
    setPage(page);
    async function changePage() {
      const recipientNextPage = await Api.get(`/recipients?page=${page}`);
      if (recipientNextPage) {
        setRecipients(recipientNextPage.data.recipients);
        setData(recipientNextPage.data.recipients);
        setMaxPage(recipientNextPage.data.totalPage);
        setSelectedDelivery(-1);
      }
    }

    async function changePageSearch() {
      const recipientNextPage = await Api.get(
        `/recipients?page=${page}&name=${searchParam}`
      );
      if (recipientNextPage) {
        setRecipients(recipientNextPage.data.recipients);
        setData(recipientNextPage.data.recipients);
        setMaxPage(recipientNextPage.data.totalPage);
        setSelectedDelivery(-1);
      }
    }

    if (isSearch) {
      changePageSearch();
    } else {
      changePage();
    }
  };

  const handleRemoveRecipient = id => {
    async function deleteRecipient() {
      const recipientDel = await Api.delete(`/recipient/${id}`);
      if (recipientDel) {
        toast.success('Delete with Success');
        afterRemove();
      } else {
        toast.error('Something goes wrong with delete action');
      }
    }

    deleteRecipient();
  };

  const handleSearch = event => {
    event.preventDefault();
    async function getRecipientSearch() {
      const recipient = await Api.get(
        `/recipient?page=${page}&name=${searchParam}`
      );
      console.log(recipient);
      if (recipient) {
        setMaxPage(recipient.data.totalPage);
        setRecipients(recipient.data.recipients);
        setData(recipient.data.recipients);
        setIsSearch(true);
      } else {
        toast.error('Something goes wrong with Recipient');
      }
    }

    getRecipientSearch();
  };

  return (
    <>
      <NavBar />
      <Container>
        <Content>
          <Title text="Gerenciando destinatários" />
          <Filter
            onsubmit={handleSearch}
            onChange={e => setSearchParam(e.target.value)}
            text="Buscar pro destinatários"
            path="/recipients/create"
          />
          <ContentTable>
            <RecipientsTable>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Nome</td>
                  <td>Endereço</td>
                  <td>Ações</td>
                </tr>
              </thead>
              <tbody>
                {recipients.map((recipient, index) => (
                  <tr key={recipient.id}>
                    <td>#{recipient.id}</td>
                    <td>{recipient.name}</td>
                    <td>{recipient.adress}</td>
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
                          path={`edit/${recipient.id}`}
                          Editar={data[selectedDelivery]}
                          Remove={() => handleRemoveRecipient(recipient.id)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </RecipientsTable>
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
