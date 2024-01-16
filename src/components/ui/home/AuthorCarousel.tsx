import { View, Text, ScrollView } from "react-native";
import React from "react";
import { AccountEntity } from "../../../api/models/entities/AccountEntity/AccountEntity";
import AuthorCard from "./AuthorCard";

const AuthorCarousel = ({ array }: { array: AccountEntity[] }) => {
  return (
    <>
      {array && array.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ height: 460 }}
        >
          <View style={{ flexDirection: "row", gap: 20 }}>
            {array.map((item, index) => (
              <AuthorCard key={index} author={item} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <Text>Chưa có tác giả nào :(</Text>
      )}
    </>
  );
};

export default AuthorCarousel;
