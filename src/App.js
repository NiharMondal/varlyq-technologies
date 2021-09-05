import { Container, InputBase, Typography, Box } from "@material-ui/core";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAlbums } from "./redux/features/albumSlice";
import { getPhotos } from "./redux/features/photoSlice";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useStyles } from "./components/styles/appStyle";

const App = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { allPhotos } = useSelector((state) => state.photos);
  const { albums } = useSelector((state) => state.albums);

  useEffect(() => {
    dispatch(getPhotos());
    dispatch(getAlbums());
  }, [dispatch]);
  const data = useMemo(() => {
    const albumIdSet = new Set();

    allPhotos.forEach((pic) => {
      if (pic.title.includes(search)) {
        albumIdSet.add(pic.albumId);
      }
    });

    const selectedIds = [...albumIdSet.values()];

    const filteredAlbum = albums.filter((album) =>
      selectedIds.includes(album.id)
    );

    const displayData = filteredAlbum.map((album) => ({
      ...album,
      photos: [
        ...allPhotos
          .filter((photo) => photo.albumId === album.id)
          .filter((photo) => photo.title.includes(search))
          .map((photo) => ({
            ...photo,
            random: Math.floor(Math.random() * 200 + 50),
          })),
      ],
    }));

    return displayData;
  }, [albums, allPhotos, search]);
  return (
    <Container className={classes.root}>
      <InputBase
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        endAdornment={<ChevronRightIcon />}
        placeholder="See your financial report"
        className={classes.searchInput}
        fullWidth
      />
      {data.length > 0 ? (
        data.map((album) => (
          <div className={classes.album} key={album.id}>
            <Typography variant="h3"> {album.title} </Typography>
            {album.photos.map((photo) => (
              <div className={classes.photo} key={photo.title}>
                <img src={photo.thumbnailUrl} alt="" />
                <Box className={classes.flexColumns} flexGrow="1">
                  <Typography variant="h5"> {photo.title} </Typography>{" "}
                  <Typography
                    component={"a"}
                    href={photo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      alignSelf: "flex-start",
                    }}
                  >
                    {photo.url}{" "}
                  </Typography>{" "}
                </Box>{" "}
                <div className={classes.flexColumns}>
                  <Typography
                    variant="h5"
                    component="p"
                    style={{
                      color: photo.random < 95 ? "red" : "green",
                    }}
                  >
                    $ {photo.random}
                  </Typography>
                  <Typography> 7: 00 PM </Typography>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className={classes.para}>Loading... please wait</p>
      )}
    </Container>
  );
};

export default App;
