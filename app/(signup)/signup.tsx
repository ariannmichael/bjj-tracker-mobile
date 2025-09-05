import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Modal, FlatList } from 'react-native';
import { useFonts } from 'expo-font';
import { ZenDots_400Regular } from "@expo-google-fonts/zen-dots";
import { Sunflower_300Light, Sunflower_500Medium, Sunflower_700Bold } from "@expo-google-fonts/sunflower";
import { router } from 'expo-router';

interface SignupData {
  country: string;
  rank: string;
  stripes: number;
  birthDate: { day: string; month: string; year: string };
  username: string;
}

export default function Signup() {
  const [fontsLoaded] = useFonts({
    ZenDots_400Regular,
    Sunflower_300Light,
    Sunflower_500Medium,
    Sunflower_700Bold,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState<SignupData>({
    country: 'Brazil',
    rank: 'Blue Belt',
    stripes: 2,
    birthDate: { day: '29', month: 'Jun', year: '1995' },
    username: 'ariann'
  });

  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState<'day' | 'month' | 'year'>('day');

  if (!fontsLoaded) {
    return null;
  }

  const totalSteps = 4;

  const countries = ['Brazil', 'United States', 'Canada', 'United Kingdom', 'Australia', 'Japan', 'Germany', 'France', 'Italy', 'Spain', 'Mexico', 'Argentina'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const ranks = ['White Belt', 'Blue Belt', 'Purple Belt', 'Brown Belt', 'Black Belt'];
  
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete signup
      router.replace('/(authenticated)/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateSignupData = (field: keyof SignupData, value: any) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
  };

  const updateBirthDate = (field: keyof SignupData['birthDate'], value: string) => {
    setSignupData(prev => ({
      ...prev,
      birthDate: { ...prev.birthDate, [field]: value }
    }));
  };

  const getBeltColor = (rank: string) => {
    switch (rank) {
      case 'White Belt': return '#FFFFFF';
      case 'Blue Belt': return '#0066CC';
      case 'Purple Belt': return '#800080';
      case 'Brown Belt': return '#8B4513';
      case 'Black Belt': return '#000000';
      default: return '#0066CC';
    }
  };

  const renderProgressDots = () => {
    return (
      <View style={styles.progressContainer}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index + 1 === currentStep ? styles.progressDotActive : styles.progressDotInactive
            ]}
          />
        ))}
      </View>
    );
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Where were you born?</Text>
      
      <TouchableOpacity 
        style={styles.countrySelector}
        onPress={() => setShowCountryModal(true)}
      >
        <Text style={styles.countryText}>{signupData.country}</Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
        <Text style={styles.submitButtonText}>I'M FROM {signupData.country.toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>What is your rank in BJJ?</Text>
      
      <View style={styles.beltContainer}>
        <View style={[styles.belt, { backgroundColor: getBeltColor(signupData.rank) }]}>
          {signupData.stripes > 0 && (
            <View style={styles.stripesContainer}>
              {Array.from({ length: signupData.stripes }, (_, index) => (
                <View key={index} style={styles.stripe} />
              ))}
            </View>
          )}
        </View>
      </View>

      <View style={styles.rankControls}>
        <TouchableOpacity 
          style={styles.rankButton}
          onPress={() => {
            const currentIndex = ranks.indexOf(signupData.rank);
            if (currentIndex > 0) {
              updateSignupData('rank', ranks[currentIndex - 1]);
            }
          }}
        >
          <Text style={styles.rankButtonText}>-</Text>
        </TouchableOpacity>
        
        <View style={styles.sliderContainer}>
          <View style={styles.slider}>
            <View style={[styles.sliderThumb, { left: (ranks.indexOf(signupData.rank) / (ranks.length - 1)) * 200 }]} />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.rankButton}
          onPress={() => {
            const currentIndex = ranks.indexOf(signupData.rank);
            if (currentIndex < ranks.length - 1) {
              updateSignupData('rank', ranks[currentIndex + 1]);
            }
          }}
        >
          <Text style={styles.rankButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
        <Text style={styles.submitButtonText}>I'M A {signupData.rank.toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>When were you born?</Text>
      
      <View style={styles.dateContainer}>
        <TouchableOpacity 
          style={styles.dateSelector}
          onPress={() => {
            setSelectedDateField('day');
            setShowDateModal(true);
          }}
        >
          <Text style={styles.dateText}>{signupData.birthDate.day}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.dateSelector}
          onPress={() => {
            setSelectedDateField('month');
            setShowDateModal(true);
          }}
        >
          <Text style={styles.dateText}>{signupData.birthDate.month}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.dateSelector}
          onPress={() => {
            setSelectedDateField('year');
            setShowDateModal(true);
          }}
        >
          <Text style={styles.dateText}>{signupData.birthDate.year}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
        <Text style={styles.submitButtonText}>I'M {new Date().getFullYear() - parseInt(signupData.birthDate.year)}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Choose an username for yourself.</Text>
      
      <View style={styles.usernameInputContainer}>
        <TextInput
          style={styles.usernameInput}
          value={signupData.username}
          onChangeText={(text) => updateSignupData('username', text)}
          placeholder="Enter username"
          placeholderTextColor="#666666"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
        <Text style={styles.submitButtonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  const renderCountryModal = () => (
    <Modal
      visible={showCountryModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowCountryModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Country</Text>
          <FlatList
            data={countries}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  updateSignupData('country', item);
                  setShowCountryModal(false);
                }}
              >
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setShowCountryModal(false)}
          >
            <Text style={styles.modalCloseText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderDateModal = () => {
    const getDateData = () => {
      switch (selectedDateField) {
        case 'day': return days;
        case 'month': return months;
        case 'year': return years;
        default: return days;
      }
    };

    return (
      <Modal
        visible={showDateModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select {selectedDateField.charAt(0).toUpperCase() + selectedDateField.slice(1)}</Text>
            <FlatList
              data={getDateData()}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    updateBirthDate(selectedDateField, item);
                    setShowDateModal(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowDateModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Jiu Tracker</Text>
        
        <View style={styles.navigationContainer}>
          {currentStep > 1 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          )}
          {renderProgressDots()}
        </View>

        {renderCurrentStep()}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>402 Software</Text>
      </View>

      {renderCountryModal()}
      {renderDateModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0E',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontFamily: 'ZenDots_400Regular',
    fontSize: 36,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 2,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    marginRight: 20,
  },
  backArrow: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Sunflower_500Medium',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: '#FFFFFF',
  },
  progressDotInactive: {
    backgroundColor: '#666666',
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepTitle: {
    fontFamily: 'Sunflower_500Medium',
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    width: '80%',
    marginBottom: 40,
  },
  countryText: {
    fontFamily: 'Sunflower_700Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#79787E',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '80%',
  },
  submitButtonText: {
    fontFamily: 'Sunflower_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
  },
  beltContainer: {
    marginBottom: 30,
  },
  belt: {
    width: 200,
    height: 20,
    borderRadius: 10,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#333333',
  },
  stripesContainer: {
    position: 'absolute',
    right: 10,
    top: 2,
    flexDirection: 'row',
    height: 16,
    alignItems: 'center',
  },
  stripe: {
    width: 2,
    height: 12,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 1,
  },
  rankControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  rankButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#79787E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankButtonText: {
    fontFamily: 'Sunflower_700Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  sliderContainer: {
    marginHorizontal: 20,
  },
  slider: {
    width: 200,
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
    position: 'relative',
  },
  sliderThumb: {
    position: 'absolute',
    top: -8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#79787E',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 40,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 60,
  },
  dateText: {
    fontFamily: 'Sunflower_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 5,
  },
  usernameText: {
    fontFamily: 'Sunflower_700Bold',
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
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
  usernameInputContainer: {
    width: '80%',
    marginBottom: 40,
  },
  usernameInput: {
    fontFamily: 'Sunflower_700Bold',
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    paddingVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontFamily: 'Sunflower_500Medium',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  modalItemText: {
    fontFamily: 'Sunflower_300Light',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: '#79787E',
    borderRadius: 8,
  },
  modalCloseText: {
    fontFamily: 'Sunflower_500Medium',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});