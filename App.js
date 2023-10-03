import * as React from 'react';
import { View, Button, TouchableOpacity, Text, Dimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';

import { SharedTransition, withSpring } from 'react-native-reanimated';

const SPRING_CONFIG = {
  mass: 1,
  stiffness: 100,
  damping: 200,
};

export const sharedElementTransition = SharedTransition.custom((values) => {
  'worklet';
  return {
    height: withSpring(values.targetHeight, SPRING_CONFIG),
    width: withSpring(values.targetWidth, SPRING_CONFIG),
    originX: withSpring(values.targetGlobalOriginX, SPRING_CONFIG),
    originY: withSpring(values.targetGlobalOriginY, SPRING_CONFIG),
  };
});

const Stack = createNativeStackNavigator();

function Screen1({ navigation }) {
  const [show, setShow] = React.useState(false);
  const onToggle = () => {
    setShow((prev) => !prev);
  };
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Animated.Image
        style={{ width: 150, height: 150, borderRadius: 10 }}
        resizeMode="cover"
        source={{
          uri: 'https://www.thegrandwinetour.com/public/tour/princ-BarbarescoBaroloWineTourBarolo-WEB.jpg',
        }}
        sharedTransitionTag="sharedTag"
      />
      <Button title="Screen2" onPress={() => navigation.navigate('Screen2')} />
      <Animated.View
        layout={Layout}
        style={{ padding: 10, borderWidth: 1, borderRadius: 10 }}
      >
        <TouchableOpacity onPress={onToggle}>
          <Text>Show/Hide</Text>
        </TouchableOpacity>
        {show && (
          <Animated.Text entering={FadeIn.delay(200)}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. Testing test submodule
          </Animated.Text>
        )}
        <Text></Text>
      </Animated.View>
    </View>
  );
}

function Screen2({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Animated.Image
        style={{
          width: Dimensions.get('window').width,
          height: 250,
          resizeMode: 'cover',
        }}
        source={{
          uri: 'https://www.thegrandwinetour.com/public/tour/princ-BarbarescoBaroloWineTourBarolo-WEB.jpg',
        }}
        sharedTransitionTag="sharedTag"
      />
      <Button title="Screen1" onPress={() => navigation.navigate('Screen1')} />
    </View>
  );
}

export default function SharedElementExample() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true, animation: 'fade' }}>
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
