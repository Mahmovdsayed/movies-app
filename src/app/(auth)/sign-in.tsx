import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text className='dark:text-white'>sign-in</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
