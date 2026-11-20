import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function InfoScreen() {
  const { type, id } = useLocalSearchParams<{ type: string; id: string }>();

  return (
    <>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Info: {type} - {id}
        </Text>
      </View>
    </>
  );
}
