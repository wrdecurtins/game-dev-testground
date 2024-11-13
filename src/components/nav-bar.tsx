import {
 AppBar, IconButton, Toolbar, Typography, Box
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { homeRoot } from "../routes/routes";

export function NavBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar sx={{
          justifyContent: 'space-between'
        }}>
          <Typography variant="h5">
            Game Dev Testing Grounds
          </Typography>
          <IconButton
            size="large"
            onClick={() => {
              navigate(homeRoot);
            }}
            sx={{
              color: 'white'
            }}
          >
            <HomeIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
