import { makeStyles } from "@mui/styles";

import { white, error } from "../../constants/colors";

export const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    marginRight: "5vw",
  },
  textField: {
    backgroundColor: white,
    outline: "none",
    borderRadius: "8px",
  },
  link: {
    fontSize: "16px",
    fontWeight: 400,
    fontFamily: "Open Sans",
    textDecoration: "none",
    color: "#FF6B40",
    transition: "200ms",
    "&:hover": {
      opacity: "0.6",
    },
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "5px",
    alignItems: "center",
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "80px",
  },
  erorText: {
    color: "#D40000",
  },
  fieldContainer: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
  },
});
