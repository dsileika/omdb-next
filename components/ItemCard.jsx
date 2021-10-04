import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  display: `flex`,
  width: 200,
  flexDirection: `column`,
  [theme.breakpoints.down(701)]: {
    flexDirection: `row`,
    width: "100%",
  },
  [theme.breakpoints.down(469)]: {
    flexDirection: `column`,
  },
}));

const CardMediaGrid = styled(Grid)(({ theme }) => ({
  width: `auto`,
  display: `flex`,
  flexDirection: `column`,
  // [theme.breakpoints.down(701)]: {
  [theme.breakpoints.down(701)]: {
    minWidth: 150,
    width: 150,
    flexDirection: `row`,
  },
  [theme.breakpoints.down(469)]: {
    width: "100%",
    flexDirection: `column`,
  },
}));

export default function ItemCard(props) {
  const {
    Title,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Language,
    Country,
    Awards,
    Poster,
    Ratings,
    Metascore,
    imdbRating,
    imdbVotes,
    imdbID,
    Type,
    DVD,
    BoxOffice,
    Production,
    Website,
    Response,
  } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <StyledCard>
      <CardMediaGrid item>
        <CardMedia
          component="img"
          image={Poster}
          alt={Title}
          xs={{ width: `100%` }}
        />
      </CardMediaGrid>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {Title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {Year}
          </Typography>
        </CardContent>

        <CardActions
          disableSpacing
          sx={{ display: `flex`, justifyContent: `flex-end` }}
        >
          {/* <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Box>
    </StyledCard>
  );
}
