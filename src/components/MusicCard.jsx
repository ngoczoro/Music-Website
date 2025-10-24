import { Card, CardContent, Typography } from "@mui/material";

export default function MusicCard({ title, artist }) {
  return (
    <Card sx={{ borderRadius: "16px", boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography color="text.secondary">{artist}</Typography>
      </CardContent>
    </Card>
  );
}
