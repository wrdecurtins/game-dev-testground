import {
  Typography, Box
} from "@mui/material";
import { demoRoutes } from "./routes";
import PageTile from "../components/page-tile";
import PagePaper from "../components/page-paper";

export default function Home() {

  return (
    <PagePaper>
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
              key={name}
              name={name}
              route={route.path}
              elementPreview={route.element}
            />
          );
        })}
      </Box>
    </PagePaper>
  );
}
