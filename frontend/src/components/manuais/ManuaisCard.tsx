import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface Manual {
  id: number; // Adicionado ID para identificação correta
  titulo: string;
  data: string;
  descricao: string;
  link: string;
  imagem: string;
}

interface ManuaisCardProps {
  manual: Manual;
}

const ManuaisCard: React.FC<ManuaisCardProps> = ({ manual }) => {
  return (
    <Card style={{ width: '100%', padding: '16px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <img
        src={manual.imagem}
        alt={manual.titulo}
        style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {manual.titulo}
        </Typography>

        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ fontSize: '10px', marginBottom: '10px', display: 'block' }}
        >
          Publicado em:{' '}
          {new Date(manual.data).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          })}
        </Typography>

        <Typography variant="body2">
          {manual.descricao.split(' ').slice(0, 12).join(' ') +
            (manual.descricao.split(' ').length > 12 ? '...' : '')}
        </Typography>

        <Button
          component={Link}
          to={`/manuais/${manual.id}`} // Usando `id` para navegação correta
          variant="contained"
          color="primary"
          sx={{ marginTop: '10px' }}
        >
          Acessar Manual
        </Button>
      </CardContent>
    </Card>
  );
};

export default ManuaisCard;
