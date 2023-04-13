import { StyleSheet } from "react-native"

export default StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: "center",
    marginVertical: 4,
    marginHorizontal: 40,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#dad7cd",
  },
  titleText: {
    fontFamily: "Arial Rounded MT Bold",
    paddingVertical: 6,
    fontSize: 20,
    fontWeight: "300",
  },
  text: {
    fontFamily: "Arial Rounded MT Bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 18,
  },
  updateButton: {
    margin: 5,
    color: "blue",
  },
  deleteButton: {
    margin: 5,
    color: "red",
  },
})
