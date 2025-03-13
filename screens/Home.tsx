import React, { useEffect, useState } from "react";
import { 
  StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity 
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/utils/types";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearCart } from "@/utils/cartSlice";
import { RootState } from "@/utils/store";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const shoppingItems = [
  "Milk", "Eggs", "Bread", "Butter", "Cheese",
  "Tomatoes", "Potatoes", "Chicken", "Rice", "Apples",
];

const Home = ({ navigation }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(shoppingItems);
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the clearCart action when the component mounts
    dispatch(clearCart());
  }, [dispatch]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const newList = shoppingItems.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(newList);
  };

  const handleAddToCart = (item: string) => {
    dispatch(addItem(item));
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search items..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Shopping List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
            <TouchableOpacity
              style={[styles.button, cart.includes(item) && styles.buttonAdded]}
              onPress={() => handleAddToCart(item)}
              disabled={cart.includes(item)}
            >
              <Text style={styles.buttonText}>
                {cart.includes(item) ? "Added" : "Add to Cart"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* "Go to Cart" Button */}
      {cart.length > 0 && (
        <TouchableOpacity 
          style={styles.cartButton} 
          onPress={() => navigation.navigate("Cart")} 
        >
          <Text style={styles.cartButtonText}>Go to Cart ({cart.length} items)</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonAdded: {
    backgroundColor: "#28A745",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cartButton: {
    marginTop: 20,
    backgroundColor: "#FF5733",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
