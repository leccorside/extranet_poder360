import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

interface Manual {
  id: number;
  titulo: string;
  data: string;
  descricao: string;
  link: string;
  imagem: string;
}

const ManualDetalhes: React.FC = () => {
  const { id } = useParams(); // Pegamos o ID do manual pela URL
  const [manual, setManual] = useState<Manual | null>(null);
  const [loading, setLoading] = useState(true); // Estado para carregamento

  useEffect(() => {
    setLoading(true);
    fetch('/manuais.json')
      .then((response) => response.json())
      .then((data: Manual[]) => {
        const manualEncontrado = data.find((item) => item.id === Number(id));
        setManual(manualEncontrado || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar manual:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!manual) {
    return (
      <Typography variant="h5" color="error">
        Manual não encontrado.
      </Typography>
    );
  }

  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/manuais', title: 'Manuais' },
    { title: manual.titulo }, // Aqui o título do manual é exibido dinamicamente!
  ];

  return (
    <PageContainer title="Manuais" description="Esta é a página de Manuais">
      <Breadcrumb title={manual.titulo} items={BCrumb} />
      <Card style={{ width: '100%', padding: '16px' }}>
        <img
          src={manual.imagem}
          alt={manual.titulo}
          style={{ width: '100%', borderRadius: '8px' }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {manual.titulo}
          </Typography>
          <Typography variant="body1">{manual.descricao}</Typography>
          <Typography variant="caption" color="textSecondary">
            Publicado em:{' '}
            {new Date(manual.data).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            })}
          </Typography>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default ManualDetalhes;
