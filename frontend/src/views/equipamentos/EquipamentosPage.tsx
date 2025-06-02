import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  Typography,
  Box,
  TextField,
  Pagination,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

interface Equipamento {
  id: number;
  tipo: string;
  nome: string;
  patrimonio: string;
  serial: string;
  funcionario_anterior: string;
  funcionario_atual: string;
  data_troca: string;
  funcao: string;
  status: string;
}

const ROWS_PER_PAGE = 10;

const renderStatusBox = (status: string) => {
  const normalized = status.toLowerCase();
  let backgroundColor = '#999';

  switch (normalized) {
    case 'em uso':
      backgroundColor = '#f6bb42';
      break;
    case 'disponível':
      backgroundColor = '#7bcb4d';
      break;
    case 'em manutenção':
      backgroundColor = '#184478';
      break;
    case 'roubo':
      backgroundColor = '#d33333';
      break;
  }

  return (
    <Box
      component="span"
      sx={{
        px: 1.5,
        py: 0.5,
        borderRadius: '12px',
        backgroundColor,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '0.8rem',
        textTransform: 'capitalize',
        display: 'inline-block',
        minWidth: 80,
        textAlign: 'center',
      }}
    >
      {status}
    </Box>
  );
};

const ResponsiveTable: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<Equipamento | null>(null);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [editData, setEditData] = useState<Equipamento | null>(null);

  useEffect(() => {
    fetch('/equipamentos.json')
      .then((res) => res.json())
      .then((data) => setEquipamentos(data))
      .catch((err) => console.error('Erro ao carregar equipamentos:', err));
  }, []);

  const filteredData = equipamentos.filter((item) =>
    Object.values(item).some((val) => String(val).toLowerCase().includes(search.toLowerCase())),
  );

  const paginatedData = filteredData.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const pageCount = Math.ceil(filteredData.length / ROWS_PER_PAGE);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleView = (row: Equipamento) => {
    setSelectedRow(row);
    setViewModalOpen(true);
  };

  const handleEdit = (row: Equipamento) => {
    setEditData({ ...row });
    setEditModalOpen(true);
  };

  const handleDelete = (row: Equipamento) => {
    setSelectedRow(row);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRow) {
      setEquipamentos((prev) => prev.filter((e) => e.id !== selectedRow.id));
      setDeleteDialogOpen(false);
    }
  };

  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Equipamentos',
    },
  ];

  return (
    <PageContainer title="Equipamentos" description="this is Equipamentos">
      {/* breadcrumb */}
      <Breadcrumb title="Equipamentos" items={BCrumb} />

      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems="left"
        sx={{ mb: 2 }}
      >
        <TextField
          label="Buscar"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1, mr: { sm: 2 } }}
        />
        <Button variant="contained" color="primary">
          Adicionar Equipamento
        </Button>
      </Stack>

      <Box>
        {isMobile ? (
          <Stack spacing={2}>
            {paginatedData.map((item) => (
              <Paper key={item.id} sx={{ p: 2 }}>
                <Typography variant="subtitle1">
                  <strong>Tipo:</strong> {item.tipo}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Nome:</strong> {item.nome}
                </Typography>
                <Typography variant="body2">
                  <strong>Serial:</strong> {item.serial}
                </Typography>
                <Typography variant="body2">
                  <strong>Status:</strong> {renderStatusBox(item.status)}
                </Typography>
                <Typography variant="body2">
                  <strong>Funcionário atual:</strong> {item.funcionario_atual}
                </Typography>
                <Box mt={1}>
                  <IconButton onClick={() => handleView(item)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            ))}
          </Stack>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Tipo</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Nome</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Serial</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Funcionário Atual</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Ações</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.tipo}</TableCell>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.serial}</TableCell>
                    <TableCell>{renderStatusBox(item.status)}</TableCell>
                    <TableCell>{item.funcionario_atual}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleView(item)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(item)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(item)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {pageCount > 1 && (
          <Stack alignItems="center" mt={3}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="small"
            />
          </Stack>
        )}

        {/* Modal de Visualização */}
        <Dialog
          open={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Detalhes do Equipamento</DialogTitle>
          <DialogContent dividers>
            {selectedRow &&
              Object.entries(selectedRow).map(([key, value]) => (
                <Typography key={key}>
                  <strong>{key}:</strong> {value}
                </Typography>
              ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewModalOpen(false)}>Fechar</Button>
          </DialogActions>
        </Dialog>

        {/* Modal de Edição */}
        <Dialog
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Editar Equipamento</DialogTitle>
          <DialogContent dividers>
            {editData &&
              Object.entries(editData).map(([key, value]) => (
                <TextField
                  key={key}
                  label={key}
                  fullWidth
                  margin="dense"
                  value={value}
                  onChange={(e) =>
                    setEditData((prev) => (prev ? { ...prev, [key]: e.target.value } : prev))
                  }
                />
              ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditModalOpen(false)}>Cancelar</Button>
            <Button
              variant="contained"
              onClick={() => {
                if (editData) {
                  setEquipamentos((prev) =>
                    prev.map((item) => (item.id === editData.id ? editData : item)),
                  );
                  setEditModalOpen(false);
                }
              }}
            >
              Salvar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Diálogo de Confirmação de Exclusão */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Confirmar exclusão</DialogTitle>
          <DialogContent>
            <Typography>
              Tem certeza que deseja excluir o item <strong>{selectedRow?.nome}</strong>?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
            <Button color="error" variant="contained" onClick={confirmDelete}>
              Deletar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default ResponsiveTable;
