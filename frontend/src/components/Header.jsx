import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/hooks.js';
import routes from '../routes.js';

const Header = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to={routes.chatPagePath}>{t('chatLogo')}</Navbar.Brand>

        {auth.loggedIn && <Button onClick={auth.logOut}>{t('exitButton')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
