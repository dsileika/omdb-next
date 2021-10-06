import React, { useState } from "react";
import Fade from "@mui/material/Fade";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";
import { isWatchListItem } from "utils/search";

export default function ItemCard(props) {
  const { Title, Year, Poster, imdbID } = props;

  const [inWatchList, setInWatchList] = useState(
    isWatchListItem(imdbID) || false,
  );

  return (
    <Fade in={true} style={{ transitionDelay: `${props.delay}ms` }}>
      <Box
        sx={{
          p: 1,
        }}
      >
        <Box
          sx={{
            display: `flex`,
            transition: "-moz-initial",
            height: "100%",
          }}
        >
          <Card>
            <Box
              sx={{
                display: `flex`,
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

              {Poster !== `N/A` && Poster !== null && (
                <Image src={Poster} alt={Title} width={500} height={700} />
              )}
              {(Poster === `N/A` || Poster === null) && (
                <Image
                  src={`/popcorns.png`}
                  alt={Title}
                  width={500}
                  height={700}
                />
              )}
            </Box>
            <Box sx={{ display: "flex", height: "100%" }}>
              <CardContent sx={{ flex: "1 0 auto", width: "100%" }}>
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
