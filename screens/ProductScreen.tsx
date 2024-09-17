import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust the import path as needed

// Define an interface for the product structure
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const ProductScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const snapshot = await getDocs(productsRef);
        const productData = snapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => ({
            id: doc.id,
            ...(doc.data() as Omit<Product, "id">),
          })
        );
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.productScreen}>
      <TextInput
        style={styles.productScreen__searchInput}
        placeholder="Buscar productos..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productScreen__productContainer}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.productScreen__productImage}
            />
            <Text style={styles.productScreen__productName}>{item.name}</Text>
            <Text style={styles.productScreen__productPrice}>
              ${item.price}
            </Text>
            <TouchableOpacity style={styles.productScreen__addToCartButton}>
              <Text style={styles.productScreen__addToCartButtonText}>
                Añadir al carrito
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  productScreen: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  productScreen__searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  productScreen__productContainer: {
    width: "50%",
    padding: 8,
    alignItems: "center",
  },
  productScreen__productImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
  },
  productScreen__productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  productScreen__productPrice: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  productScreen__addToCartButton: {
    backgroundColor: "#ff1493",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  productScreen__addToCartButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProductScreen;
