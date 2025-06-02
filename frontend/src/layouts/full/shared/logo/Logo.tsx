import { FC, useContext } from 'react';
import { Link } from 'react-router';
import { styled } from '@mui/material';

import config from 'src/context/config';
import { CustomizerContext } from 'src/context/CustomizerContext';

// Importe imagens .png normalmente
import logoDark from 'src/assets/images/logos/logo-azul.png';
import logoDarkRTL from 'src/assets/images/logos/logo-branca.png';
import logoLight from 'src/assets/images/logos/logo-branca.png';
import logoLightRTL from 'src/assets/images/logos/logo-azul.png';

const Logo: FC = () => {
  const { isCollapse, isSidebarHover, activeDir, activeMode } = useContext(CustomizerContext);
  const TopbarHeight = config.topbarHeight;

  const LinkStyled = styled(Link)(() => ({
    height: TopbarHeight,
    width: isCollapse === 'mini-sidebar' && !isSidebarHover ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
  }));

  const getLogoSrc = () => {
    if (activeDir === 'ltr') {
      return activeMode === 'dark' ? logoLight : logoDark;
    } else {
      return activeMode === 'dark' ? logoDarkRTL : logoLightRTL;
    }
  };

  return (
    <LinkStyled
      to="/"
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img src={getLogoSrc()} alt="Logo" style={{ width: '100%' }} />
    </LinkStyled>
  );
};

export default Logo;
