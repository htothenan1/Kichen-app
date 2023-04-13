import { StyleSheet } from "react-native"

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edede9",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 40,
    textAlign: "center",
    marginVertical: 15,
    color: "#3d405b",
    fontFamily: "Arial Rounded MT Bold",
  },
  dateText: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 15,
    color: "#3d405b",
    fontFamily: "Arial Rounded MT Bold",
    paddingHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    marginVertical: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})
