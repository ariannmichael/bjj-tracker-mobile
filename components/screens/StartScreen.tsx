import { Text, View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useFonts } from "expo-font";
import { ZenDots_400Regular } from "@expo-google-fonts/zen-dots";
import { Sunflower_300Light, Sunflower_500Medium, Sunflower_700Bold } from "@expo-google-fonts/sunflower";
import { useAuth } from "../../contexts/AuthContext";
import { router } from "expo-router";
import { useState } from "react";

export default function StartScreen() {
  const [fontsLoaded] = useFonts({
    ZenDots_400Regular,
    Sunflower_300Light,
    Sunflower_500Medium,
    Sunflower_700Bold,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = () => {
    if (!(email.length && password.length)) {
      setLogin(true);
      return;
    }

    router.replace('/(authenticated)/dashboard');
  };

  const handleSignUp = () => {
    if (!(email.length && password.length && confirmPassword.length)) {
      setSignup(true);
      return;
    }

    router.replace('/(authenticated)/dashboard');
  };

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Title */}
        <Text style={styles.title}>Jiu Tracker</Text>

        {(login || signup) &&
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#CCCCCC"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <View style={styles.inputLine} />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#CCCCCC"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
              <View style={styles.inputLine} />
            </View>

            {!login &&
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#CCCCCC"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <View style={styles.inputLine} />
              </View>
            }
          </View>
        }

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {!signup &&
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          }

          {!login &&
            <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
          }
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>402 Software</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'ZenDots_400Regular',
    fontSize: 36,
    color: '#FFFFFF',
    marginBottom: 60,
    letterSpacing: 2,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#79787E',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 60,
    marginBottom: 20,
    borderRadius: 0,
    width: 255,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signupButton: {
    backgroundColor: '#32313B',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 0,
    width: 255,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontFamily: 'Sunflower_300Light',
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  footerText: {
    fontFamily: 'ZenDots_400Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 40,
  },
  inputWrapper: {
    marginBottom: 30,
  },
  input: {
    fontSize: 16,
    color: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 0,
    fontFamily: 'Sunflower_300Light',
  },
  inputLine: {
    height: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 5,
  },
});
