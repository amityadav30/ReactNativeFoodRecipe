import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  HeartIcon,
  Square3Stack3DIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import YoutubeIframe from "react-native-youtube-iframe";

const RecipeDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const [like, setlike] = useState(false);
  const [mealData, setMealData] = useState(null);
  const { item, index } = route.params;

  const getIngredientsIndexes = () => {
    // console.log("kkkkkkkkk");
    if (!mealData) return null;
    console.log("QWW ", mealData);
    let index = [];
    for (let i = 1; i < 21; i++) {
      if (mealData["strIngredient" + i]) {
        index.push(i);
      }
    }
    console.log("INDEXINDEXINDEXINDEX.. ", index);
    return index;
  };

  useEffect(() => {
    getmealData(item.idMeal);
    getIngredientsIndexes();
  }, []);

  const getmealData = async (id) => {
    const response = await axios.get(
      `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    try {
      if (response && response.data) {
        setMealData(response.data.meals[0]);
      }
    } catch (err) {
      console.log("Error, ", err.message);
    }
  };

  const getYoutubeVideoId = (url) => {
    // console.log("URL ", url); https://www.youtube.com/watch?v=_HgVLpmNxTY
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    // console.log("MM", match, match[1]); MM ["?v=_HgVLpmNxTY", "_HgVLpmNxTY"] _HgVLpmNxTY
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <ScrollView>
      <View className=" flex-1  justify-center">
        <Image
          source={{ uri: item.strMealThumb }}
          style={{ width: wp(100), height: hp(50) }}
          className="bg-black  rounded-b-3xl "
        />
      </View>

      <View className="absolute w-full flex-row justify-between  pt-14">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-5 bg-white"
        >
          <ChevronLeftIcon color="#fbbf24" strokeWidth={4.5} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setlike(!like)}
          className="p-2 rounded-full mr-5 bg-white"
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={like ? "#fbbf24" : "gray"}
            fill={like ? "#fbbf24" : "none"}
          />
        </TouchableOpacity>
      </View>

      <View className="px-4 flex justify-between space-y-4 pt-8">
        {/* meal description */}
        <View className="space-y-2">
          <Text
            className="font-bold flex-1 text-neutral-700"
            style={{ fontSize: hp(3) }}
          >
            {mealData?.strMeal}
          </Text>
          <Text
            className="font-medium flex-1 text-neutral-500"
            style={{ fontSize: hp(3) }}
          >
            {mealData?.strArea}
          </Text>
        </View>

        {/* misc */}
        <View className="flex-row justify-evenly pt-2">
          <View className="flex rounded-full bg-amber-300 p-2">
            <View
              style={{ height: hp(6.5), width: hp(6.5) }}
              className="bg-white rounded-full flex items-center justify-center"
            >
              <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
            </View>
            <View className="flex items-center py-2 space-y-1">
              <Text
                style={{ fontSize: hp(2) }}
                className="font-bold text-neutral-700"
              >
                35
              </Text>
              <Text
                style={{ fontSize: hp(1.3) }}
                className="font-bold text-neutral-700"
              >
                Mins
              </Text>
            </View>
          </View>
          <View className="flex rounded-full bg-amber-300 p-2">
            <View
              style={{ height: hp(6.5), width: hp(6.5) }}
              className="bg-white rounded-full flex items-center justify-center"
            >
              <UserIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
            </View>
            <View className="flex items-center py-2 space-y-1">
              <Text
                style={{ fontSize: hp(2) }}
                className="font-bold text-neutral-700"
              >
                03
              </Text>
              <Text
                style={{ fontSize: hp(1.3) }}
                className="font-bold text-neutral-700"
              >
                Servings
              </Text>
            </View>
          </View>
          <View className="flex rounded-full bg-amber-300 p-2">
            <View
              style={{ height: hp(6.5), width: hp(6.5) }}
              className="bg-white rounded-full flex items-center justify-center"
            >
              <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
            </View>
            <View className="flex items-center py-2 space-y-1">
              <Text
                style={{ fontSize: hp(2) }}
                className="font-bold text-neutral-700"
              >
                103
              </Text>
              <Text
                style={{ fontSize: hp(1.3) }}
                className="font-bold text-neutral-700"
              >
                Cal
              </Text>
            </View>
          </View>
          <View className="flex rounded-full bg-amber-300 p-2">
            <View
              style={{ height: hp(6.5), width: hp(6.5) }}
              className="bg-white rounded-full flex items-center justify-center"
            >
              <Square3Stack3DIcon
                size={hp(4)}
                strokeWidth={2.5}
                color="#525252"
              />
            </View>
            <View className="flex items-center py-2 space-y-1">
              <Text
                style={{ fontSize: hp(2) }}
                className="font-bold text-neutral-700"
              ></Text>
              <Text
                style={{ fontSize: hp(1.3) }}
                className="font-bold text-neutral-700"
              >
                Easy
              </Text>
            </View>
          </View>
        </View>

        {/* Ingredients Text */}
        <View>
          <Text
            className="font-bold flex-1 text-neutral-700"
            style={{ fontSize: hp(3) }}
          >
            Ingredients
          </Text>
        </View>

        {/* Ingredients Details */}
        <View>
          <View className="space-y-3 ">
            {getIngredientsIndexes()?.map((i) => (
              <View key={i} className="flex-row space-x-3  ">
                <View
                  style={{ height: hp(1.5), width: hp(1.5) }}
                  className="bg-amber-300 rounded-full "
                ></View>
                <Text
                  style={{ fontSize: hp(1.5) }}
                  className="font-bold  text-neutral-700"
                >
                  {mealData["strIngredient" + i]}
                </Text>

                <Text
                  style={{ fontSize: hp(1.5) }}
                  className="text-neutral-700"
                >
                  {mealData["strMeasure" + i]}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Instructions */}
        <View className="space-y-4">
          <Text
            className="font-bold flex-1 text-neutral-700"
            style={{ fontSize: hp(3) }}
          >
            Instructions
          </Text>
          <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
            {mealData?.strInstructions}
          </Text>
        </View>

        {/* Recipe Video */}
        {mealData?.strYoutube && (
          <View>
            <Text
              className="font-bold flex-1 text-neutral-700 mb-3"
              style={{ fontSize: hp(3) }}
            >
              Recipe Video
            </Text>
            <View>
              <YoutubeIframe
                videoId={getYoutubeVideoId(mealData?.strYoutube)}
                height={hp(30)}
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default RecipeDetailScreen;
