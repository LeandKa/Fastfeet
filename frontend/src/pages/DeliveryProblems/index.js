import React, { useEffect, useState } from 'react';

import { MdMoreHoriz } from 'react-icons/md';
import { toast } from 'react-toastify';

import NavBar from '~/components/NavBar';
import Title from '~/components/Title';
import ActionMenu from '~/components/ActionMenu';
import Pagination from '~/components/Pagination';

import {
  Container,
  Content,
  ContentTable,
  DeliveryProblemsTable,
} from './style';
import DeliveryProblemsDetails from '../../components/DeliveryProblemsDetails';
import Api from '../../services/Api';

export default function DeliveryProblems() {
  const [problems, setProblems] = useState([]);
  const [data, setData] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(-1);
  const [maxPage, setMaxPage] = useState(0);
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    async function getProblems() {
      const order = await Api.get(`/delivery/problems?page=${page}`);
      if (order) {
        setProblems(order.data.DeliveryProbs);
        setData(order.data.DeliveryProbs);
        setMaxPage(order.data.maxPage);
      } else {
        toast.error('Something goes wrong with Orders');
      }
    }

    getProblems();
  }, []);

  const handleChangePage = page => {
    setPage(page);
  };

  const handleCancelDelivery = id => {
    alert(id);
  };

  return (
    <>
      {dialog && (
        <DeliveryProblemsDetails
          handleClose={() => setDialog(!dialog)}
          problem={data[selectedDelivery]}
        />
      )}
      <NavBar />
      <Container>
        <Content>
          <Title text="Problemas na entrega" />
          <ContentTable>
            <DeliveryProblemsTable>
              <thead>
                <tr>
                  <td>Encomenda</td>
                  <td>Nome</td>
                  <td>Problema</td>
                  <td>Ações</td>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem, index) => (
                  <tr>
                    <td>#{problem.order.id}</td>
                    <td>{problem.order.recipient.name}</td>
                    <td>{problem.description}</td>
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
                          path="delivery"
                          Editar={{ problem }}
                          Cancel={() => handleCancelDelivery(problem.id)}
                          VisualizeClick={() => setDialog(!dialog)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </DeliveryProblemsTable>
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
