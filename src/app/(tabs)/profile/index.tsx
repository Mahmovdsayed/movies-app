import { Pressable, Text, View } from 'react-native';
import { useToast } from 'heroui-native';
import { authClient } from '@/lib/auth-client';

const ProfileScreen = () => {
  const { data: session } = authClient.useSession();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.show({
          label: 'Sign out failed',
          description: error.message || 'Could not sign out. Please try again.',
          variant: 'danger',
          placement: 'top',
        });
        return;
      }

      toast.show({
        label: 'Signed out',
        description: 'You have been signed out successfully',
        variant: 'success',
        placement: 'top',
      });
    } catch (err: unknown) {
      toast.show({
        label: 'Sign out error',
        description: err instanceof Error ? err.message : 'An unexpected error occurred',
        variant: 'danger',
        placement: 'top',
      });
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-background px-6 gap-4">
      <Text className="text-foreground text-xl font-bold">
        {session?.user?.name || session?.user?.email || 'Profile'}
      </Text>
      <Pressable
        onPress={handleSignOut}
        className="px-6 py-2.5 rounded-full bg-red-600 active:opacity-80"
      >
        <Text className="text-white font-semibold text-sm">Sign Out</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;
