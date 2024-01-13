import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import COLORS from '../constants/colors';
import IMAGES from '../constants/images';

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1 }}>
        <View>
          <Image
            source={IMAGES.welcome}
            style={{
              height: 880,
              width: 400,
              position: 'absolute',
            }}
          />
        </View>

        <View
          style={{
            paddingHorizontal: 20,
            position: 'absolute',
            textAlignVertical: 'center',
            paddingTop: 530,
            width: '100%',
          }}
        >
          <Text
            style={{
              fontSize: 50,
              fontWeight: '500',
              color: COLORS.white,
            }}
          >
            DishDash
          </Text>

          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: '500',
                color: COLORS.white,
              }}
            >
              Cook with Confidence
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: 20,
            }}
          >
            <Button
              mode="contained"
              buttonColor="white"
              onPress={() => navigation.navigate('Signup')}
              style={{
                width: 170,
                height: 45,
              }}
            >
              <Image
                source={IMAGES.icon_google}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            </Button>

            <Button
              mode="contained"
              buttonColor="white"
              onPress={() => navigation.navigate('Signup')}
              style={{
                width: 170,
                height: 45,
              }}
            >
              <Image
                source={IMAGES.icon_facebook}
                style={{
                  height: 28,
                  width: 28,
                  position: 'absolute',
                }}
              />
            </Button>
          </View>

          <TouchableOpacity>
            <Button
              mode="contained"
              buttonColor="white"
              onPress={() => navigation.navigate('Signup')}
              textColor="black"
            >
              SIGN UP WITH EMAIL
            </Button>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 17,
                color: COLORS.grey,
              }}
            >
              Already have an account?{' '}
            </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  marginLeft: 4,
                  color: COLORS.grey,
                  textDecorationLine: 'underline',
                }}
              >
                Log In
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
