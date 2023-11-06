import { View, Text, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  let ring1Padding = useSharedValue(0);
  let ring2Padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    ring1Padding.value = 0;
    ring2Padding.value = 0;
    setTimeout(
      () => (ring1Padding.value = withSpring(ring1Padding.value + hp(5))),
      100
    );
    setTimeout(() =>
      withSpring(
        (ring2Padding.value = withSpring(ring2Padding.value + hp(5.5))),
        300
      )
    );

    setTimeout(() => navigation.navigate("Home"), 2500);
  });

  return (
    <View className=" flex-1 bg-amber-500 space-y-10 flex justify-center items-center">
      <Animated.View
        style={{ padding: ring1Padding }}
        className="bg-white/20 rounded-full  "
      >
        <Animated.View
          style={{ padding: ring2Padding }}
          className="bg-white/20 rounded-full "
        >
          <Image
            style={{
              width: hp(20),
              height: hp(20),
            }}
            source={require("../../assets/images/welcome.png")}
          />
        </Animated.View>
      </Animated.View>

      <View className="space-y-2">
        <Text
          style={{ fontSize: hp(5) }}
          className="text-center text-white text-5xl tracking-widest "
        >
          Spice Factory
        </Text>
        <Text
          style={{ fontSize: hp(2) }}
          className="text-center text-white text-lg tracking-widest"
        >
          Delicious south asian cusine
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
