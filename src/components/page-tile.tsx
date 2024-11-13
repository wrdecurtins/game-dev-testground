import {
 Card, CardContent, Paper, Typography
} from "@mui/material";
import { ReactNode } from "react";
import { Link } from 'react-router-dom';

interface PageTileProps {
  name: string,
  route: string,
  elementPreview?: ReactNode,
}

export default function PageTile(props: PageTileProps) {

  return (
    <Card
      component={Link}
      to={props.route}
      sx={{
        textDecoration: 'none',
        margin: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6">
          {props.name}
        </Typography>
        <Paper sx={{
          p: 2,
          marginTop: 1
        }}>
          {props.elementPreview}
        </Paper>
      </CardContent>
    </Card>
  );
}
