import {
  View,
  Text,
  ScrollView,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { categoryData } from "../constants/index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Categories = ({ categories, handleIsActive, isActive }) => {
  // console.log("In Categories, ", categories);
  return (
    <View className="mx-4 ">
      <Text>Categories</Text>
      <ScrollView
        horizontal
        className="space-x-4"
        showsHorizontalScrollIndicator={false}
        //contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat, index) => {
          //console.log("Cat STR ", cat.strCategory);
          const selectedCat =
            isActive == cat.strCategory ? "bg-amber-400" : "bg-black/10";
          return (
            <TouchableOpacity
              key={index}
              className="space-y-2 items-center"
              onPress={() => handleIsActive(cat.strCategory)}
            >
              <View className={`rounded-full ${selectedCat}  p-3`}>
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={{ height: hp(6), width: hp(6) }}
                  className="rounded-full"
                />
              </View>

              <Text className="text-neutral-600 text-center">
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;
