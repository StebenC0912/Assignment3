import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const CategoryItem = ({ item, handleExpress }) => {
  return (
    <TouchableOpacity style={styles.container}
    onPress={() => handleExpress(item)}
    >
      <Ionicons name={item.icon} size={24} color={"#5B75FC"} />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 16,
    color: "black",
    marginTop: 20,
    flex: 1,
    alignItems: "center",
  },
});

export default CategoryItem;
