import {
 Paper, PaperProps
} from "@mui/material";

export default function PagePaper(props: PaperProps) {
  return (
    <Paper
      {...props}
      sx={{
        marginY: 2,
        marginX: 5,
        padding: 1,
        height: '100%',
        ...props.sx
      }}
    />
  );
}
