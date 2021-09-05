import { makeStyles } from '@material-ui/core';
export const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
  },
  searchInput: {
    background: "#EEE5FF",
    borderRadius: 5,
    color: "#7F3DFF",
    padding: "0.4rem 1rem",
    fontSize: "0.9rem",
    marginBottom: "2rem",
  },
  album: {
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
    "& + &": {
      marginTop: "2rem",
    },
  },
  photo: {
    display: "flex",
    columnGap: "1rem",
    alignItems: "center",
    "& img": {
      width: "3rem",
      height: "3rem",
    },
  },
  flexColumns: {
    display: "flex",
    flexDirection: "column",
    rowGap: "0.5rem",
  },
  para: {
    display: "flex",
    justifyContent: "center",
    color: "#1dbf73",
    fontWeight: 600,
    fontSize: '18px',

  },
}));