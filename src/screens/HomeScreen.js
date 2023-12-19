import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Categories from "../components/Categories";
import axios from "axios";
import Recipie from "../components/Recipie";

const HomeScreen = () => {
  const [isActive, setIsActive] = useState("Starter");
  const [categories, setCategories] = useState([]);
  const [displayCat, setdisplayCat] = useState([]);
  const [recipie, setRecipie] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  console.log("In home");
  const handleIsActive = (cat) => {
    setIsActive(cat);
    getRecipie(cat);
    console.log("CATTT ", cat);
  };

  useEffect(() => {
    getCategories();
    getRecipie("Starter");
    console.log("IN USEEFFECT");
  }, []);

  const getRecipie = async (category) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response || response.data) {
        setRecipie(response.data.meals);
      }
    } catch (err) {
      console.log("Error ", err.message);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
        setdisplayCat(response.data.categories);
      }
    } catch (err) {
      console.log("Error ", err.message);
    }
  };

  const handleSearch = () => {
    const newCategories = categories.filter((category) =>
      category.strCategory.toLowerCase().includes(searchValue.toLowerCase())
    );
    setdisplayCat(newCategories);
    getRecipie(newCategories[0]?.strCategory);
    setIsActive(newCategories[0]?.strCategory);
    console.log("In Handle", newCategories[0]?.strCategory);
  };

  return (
    <View className="bg-white flex-1">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* Avatar Bell */}
        <View className="flex-row justify-between mx-4 mb-2 ">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ height: hp(5), width: hp(5) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* Greeting Message */}
        <View className="mx-4 mb-2 space-y-1 ">
          <Text style={{ fontSize: hp(2) }}>Hello Amit</Text>
          <Text style={{ fontSize: hp(4) }}>Make your own food</Text>
          <Text style={{ fontSize: hp(4) }} className="text-amber-400">
            stay at home
          </Text>
        </View>

        {/* Search */}
        <View className="mx-4 mb-4 px-4 flex-row bg-black/5 p-[6px] justify-between items-center rounded-full">
          <TextInput
            placeholder="Search any recipie"
            placeholderTextColor={"gray"}
            className=" h-9   flex-1 tracking-wider"
            style={{ fontSize: hp(1.7), paddingHorizontal: wp(1.5) }}
            onChangeText={(text) => setSearchValue(text)}
            onSubmitEditing={handleSearch}
          />

          <View className="bg-white rounded-full p-3 ">
            <TouchableOpacity onPress={handleSearch}>
              <MagnifyingGlassIcon
                color="gray"
                stroke-width={3}
                size={hp(2.5)}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View>
          {displayCat.length > 0 && ( //load only when we have data in categories
            <Categories
              categories={displayCat}
              handleIsActive={handleIsActive}
              isActive={isActive}
            />
          )}
        </View>

        {/* Recipie */}

        <View>
          <Recipie categories={displayCat} recipie={recipie} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
