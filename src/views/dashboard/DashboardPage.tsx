// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Typography } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Home Page',
  },
];

const HomePage = () => {
  return (
    <PageContainer title="Home Page" description="this is Home page">
      {/* breadcrumb */}
      <Breadcrumb title="Home Page" items={BCrumb} />
      {/* end breadcrumb */}
      <DashboardCard title="Home Page">
        <Typography>Esta é a Home Page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default HomePage;
