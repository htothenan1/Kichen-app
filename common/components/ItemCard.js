import {
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import React, { useState } from "react"
import styles from "./styles/itemCard"

const ItemCard = ({ title, quantity, expired }) => {
  const [open, setOpen] = useState(false)
  const height = open ? "auto" : 36
  // const bottomRadius = open ? 0 : 8

  return (
    <KeyboardAvoidingView
      style={[
        styles.cardContainer,
        expired && styles.expiredBackground,
        { height: height, overflow: "hidden" },
      ]}
    >
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <Text style={styles.text}>{title}</Text>
      </TouchableWithoutFeedback>
      <Text style={styles.text}>{`Quantity: ${quantity}`}</Text>
      <Text style={styles.text}>
        {`Expired: ${expired ? "YES!" : "Not Yet"}`}
      </Text>
    </KeyboardAvoidingView>
    // <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
    //   <View
    //     style={[
    //       styles.container,
    //       {
    //         borderBottomLeftRadius: bottomRadius,
    //         borderBottomRightRadius: bottomRadius,
    //       },
    //     ]}
    //   >
    //     <Text>item</Text>
    //   </View>
    // </TouchableWithoutFeedback>
    // <View>
    //   {}
    // </View>
  )
}

export default ItemCard

// import React, { useState } from 'react';
// import {
//   SafeAreaView,
//   Switch,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
// } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import Accordion from 'react-native-collapsible/Accordion';

// const CONTENT = [
//   {
//     title: 'Terms and Conditions',
//     content:
//       'The following terms and conditions, together with any referenced documents (collectively, "Terms of Use") form a legal agreement between you and your employer, employees, agents, contractors and any other entity on whose behalf you accept these terms (collectively, “you” and “your”), and ServiceNow, Inc. (“ServiceNow,” “we,” “us” and “our”).',
//   },
//   {
//     title: 'Privacy Policy',
//     content:
//       'A Privacy Policy agreement is the agreement where you specify if you collect personal data from your users, what kind of personal data you collect and what you do with that data.',
//   },
//   {
//     title: 'Return Policy',
//     content:
//       'Our Return & Refund Policy template lets you get started with a Return and Refund Policy agreement. This template is free to download and use.According to TrueShip study, over 60% of customers review a Return/Refund Policy before they make a purchasing decision.',
//   },
// ];

// const App = () => {
//   const [activeSections, setActiveSections] = useState([]);
//   const [multipleSelect] = useState(true);
//   const setSections = (sections) => {
//     setActiveSections(sections.includes(undefined) ? [] : sections);
//   };

//   const renderHeader = (section, _, isActive) => {
//     return (
//       <Animatable.View
//         duration={400}
//         style={[styles.header, isActive ? styles.active : styles.inactive]}
//         transition="backgroundColor">
//         <Text style={styles.headerText}>{section.title}</Text>
//       </Animatable.View>
//     );
//   };

//   const renderContent = (section, _, isActive) => {
//     return (
//       <Animatable.View
//         duration={400}
//         style={[styles.content, isActive ? styles.active : styles.inactive]}
//         transition="backgroundColor">
//         <Animatable.Text
//           animation={isActive ? 'bounceIn' : undefined}
//           style={{ textAlign: 'center' }}>
//           {section.content}
//         </Animatable.Text>
//       </Animatable.View>
//     );
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <ScrollView>
//           <Text style={styles.selectTitle}>
//             Click Below to Multiple Expand
//           </Text>

//           <Accordion
//             activeSections={activeSections}
//             sections={CONTENT}
//             touchableComponent={TouchableOpacity}
//             expandMultiple={multipleSelect}
//             renderHeader={renderHeader}
//             renderContent={renderContent}
//             duration={400}
//             onChange={setSections}
//           />
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//     paddingTop: 30,
//   },
//   title: {
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: '300',
//     marginBottom: 20,
//   },
//   header: {
//     backgroundColor: '#F5FCFF',
//     padding: 10,
//   },
//   headerText: {
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   content: {
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   active: {
//     backgroundColor: 'rgba(255,255,255,1)',
//   },
//   inactive: {
//     backgroundColor: 'rgba(245,252,255,1)',
//   },
//   selectors: {
//     marginBottom: 10,
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   selector: {
//     backgroundColor: '#F5FCFF',
//     padding: 10,
//   },
//   activeSelector: {
//     fontWeight: 'bold',
//   },
//   selectTitle: {
//     fontSize: 14,
//     fontWeight: '500',
//     padding: 10,
//     textAlign: 'center',
//   },

// });

// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// export const LIST_ITEM_HEIGHT = 54;
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "white",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderColor: "#f4f4f6",
//     height: LIST_ITEM_HEIGHT
//   },
//   name: {
//     fontSize: 16
//   },
//   pointsContainer: {
//     borderRadius: 8,
//     backgroundColor: "#44c282",
//     padding: 8
//   },
//   points: {
//     color: "white",
//     fontWeight: "bold"
//   }
// });

// export default ({ item, isLast }: ListItemProps) => {
//   const bottomRadius = isLast ? 8 : 0;
//   return (
//     <View
//       style={[
//         styles.container,
//         {
//           borderBottomLeftRadius: bottomRadius,
//           borderBottomRightRadius: bottomRadius
//         }
//       ]}
//     >
//       <Text style={styles.name}>{item.name}</Text>
//       <View style={styles.pointsContainer}>
//         <Text style={styles.points}>{item.points}</Text>
//       </View>
//     </View>
//   );
// };
