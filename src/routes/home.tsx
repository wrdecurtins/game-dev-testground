import {
 Paper, Typography, Box
} from "@mui/material";
import { demoRoutes } from "./routes";
import PageTile from "../components/page-tile";

export default function Home() {

  return (
    <Paper sx={{
      marginY: 2,
      marginX: 5,
      padding: 1,
      height: '100%'
    }}>
      <Typography variant="h2" sx={{ margin: 1 }}>
        Welcome to homepage
      </Typography>
      <Typography variant="h4" sx={{ margin: 1 }}>
        Pages:
      </Typography>

      <Box
        sx={{
          display: 'flex'
        }}
      >
        {Object.entries(demoRoutes).map(([name, route]) => {
          return (
            <PageTile
              name={name}
              route={route.path}
              elementPreview={route.element}
            />
          );
        })}
      </Box>
    </Paper>
  );
}
