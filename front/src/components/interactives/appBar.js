import { AppBar, Box, Toolbar, Typography, Container, Button, Card, CardMedia} from '@mui/material';
import imageUrl from '../assets/Secondary-FullColorIcon-WhiteText.png'
const pages = [];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {

  return (
    <AppBar position="static" sx={{background: '#f55353'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          <Card
            sx={{background: '#f55353'}}
          >
            <CardMedia
              component='img'
              sx={{maxHeight: '50px', background: '#f55353'}}
              image={imageUrl}
            >
            </CardMedia>
          </Card>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;