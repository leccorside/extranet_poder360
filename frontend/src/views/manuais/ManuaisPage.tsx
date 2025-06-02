import React, { useEffect, useState } from 'react';
import { Grid, Pagination, Stack } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import ManuaisCard from 'src/components/manuais/ManuaisCard';

const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Manuais' }];

const ManuaisPage: React.FC = () => {
  const [manuais, setManuais] = useState<any[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const manuaisPorPagina = 9;

  useEffect(() => {
    fetch('/manuais.json')
      .then((response) => response.json())
      .then((data) => {
        console.log('Dados carregados:', data);
        setManuais(data);
      })
      .catch((error) => console.error('Erro ao carregar manuais:', error));
  }, []);

  const totalPaginas = Math.ceil(manuais.length / manuaisPorPagina);

  // Ajuste para sempre mostrar os últimos manuais primeiro
  const manuaisOrdenados = [...manuais].reverse(); // Garante que os últimos dados apareçam primeiro

  // Ajuste para exibir somente os manuais da página atual
  const inicioIndex = (paginaAtual - 1) * manuaisPorPagina;
  const manuaisPaginados = manuaisOrdenados.slice(inicioIndex, inicioIndex + manuaisPorPagina);

  const handleChangePagina = (_event: React.ChangeEvent<unknown>, valor: number) => {
    setPaginaAtual(valor);
  };

  return (
    <PageContainer title="Manuais" description="Esta é a página de Manuais">
      {/* Breadcrumb */}
      <Breadcrumb title="Manuais" items={BCrumb} />

      <Grid container spacing={3} justifyContent="center">
        {manuaisPaginados.length === 0 ? (
          <p>Nenhum manual encontrado.</p>
        ) : (
          manuaisPaginados.map((manual) => (
            <Grid size={{ sm: 4, md: 4, xs: 12 }} key={manual.titulo}>
              <ManuaisCard manual={manual} />
            </Grid>
          ))
        )}
      </Grid>

      {/* Paginação */}
      <Stack alignItems="center" mt={3}>
        <Pagination
          count={totalPaginas}
          page={paginaAtual}
          onChange={handleChangePagina}
          color="primary"
          size="small"
        />
      </Stack>
    </PageContainer>
  );
};

export default ManuaisPage;
