import { StyleSheet } from "react-native"

export default StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: 300,
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 10,
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: "#80ed99",
  },
  expiredBackground: {
    backgroundColor: "#ef233c",
  },
  text: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
  },
  expiredText: {
    color: "#edf2f4",
  },
})
