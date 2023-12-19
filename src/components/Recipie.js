import { View, Text, Image, Pressable } from "react-native";
import { mealData } from "../constants";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import { useNavigation } from "@react-navigation/native";

const Recipie = ({ categories, recipie }) => {
  const navigation = useNavigation();

  return (
    <View className="mx-4">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipie
      </Text>
      {categories.length == 0 ? null : (
        <MasonryList
          data={recipie}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => (
            <RecipieCard item={item} index={i} navigation={navigation} />
          )}
          onEndReachedThreshold={0.1}
        />
      )}
    </View>
  );
};

const RecipieCard = ({ item, index, navigation }) => {
  const isEven = index % 2;

  return (
    <Pressable
      style={{
        width: "100%",
        paddingLeft: isEven ? 8 : 0,
        paddingRight: isEven ? 0 : 8,
      }}
      className=" mb-4 flex justify-center space-y-1 "
      onPress={() => navigation.navigate("RecipeDetailScreen", { item, index })}
    >
      <Image
        source={{ uri: item.strMealThumb }}
        style={{ width: "100%", height: index % 3 == 0 ? hp(25) : hp(35) }}
        className="bg-black rounded-3xl"
      />
      <Text
        style={{ fontSize: hp(1.5) }}
        className="ml-2 text-neutral-600 font-semibold"
      >
        {item.strMeal.length > 20
          ? item.strMeal.slice(0, 20) + "..."
          : item.strMeal}
      </Text>
    </Pressable>
  );
};

export default Recipie;
