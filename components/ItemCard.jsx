import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
import Image from "next/image";

import Fade from "@mui/material/Fade";
import { isWatchListItem } from "utils/search";

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

  const [inWatchList, setInWatchList] = React.useState(
    isWatchListItem(imdbID) || false,
  );

  return (
    <Fade in={true} style={{ transitionDelay: `${props.delay}ms` }}>
      <Box
        sx={{
          p: 1,
          maxWidth: 250,
        }}
      >
        <Box
          sx={{
            display: `flex`,
            transition: "-moz-initial",
            maxWidth: 500,
            flexDirection: `column`,
          }}
        >
          <Card>
            <Box
              sx={{
                display: `flex`,
                maxWidth: 400,
              }}
            >
              <Box
                sx={{
                  position: `absolute`,
                  zIndex: 1,
                  marginLeft: 1,
                  backgroundColor: `rgba(255, 255, 255, 0.8)`,
                  boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)`,
                  borderBottomRightRadius: 6,
                  borderBottomLeftRadius: 6,
                  flex: "1 0 auto",
                }}
              >
                <IconButton
                  aria-label="add to watchlist"
                  color={inWatchList ? `warning` : `default`}
                  onClick={() => {
                    setInWatchList(!inWatchList);
                    props.updatedWatchListState(!inWatchList);
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
              </Box>
              {/* <CardMedia
                component="img"
                image={Poster}
                alt={Title}
                xs={{ width: `100%` }}
              /> */}
              {Poster !== `N/A` && Poster !== null && (
                <Image src={Poster} alt={Title} width={500} height={700} />
              )}
              {(Poster === `N/A` || Poster === null) && (
                <Image
                  src={`/popcorns.png`}
                  alt={Title}
                  width={900}
                  height={700}
                />
              )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5" align="center">
                  {Title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  align="center"
                >
                  {Year}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Box>
      </Box>
    </Fade>
  );
}
