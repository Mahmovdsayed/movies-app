import { useState } from 'react';
import { useRouter, useLocalSearchParams, Link, Stack } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { Typography, useToast } from 'heroui-native';
import { authClient } from '@/lib/auth-client';
import {
  Host,
  VStack,
  HStack,
  Text as SwiftText,
  TextField,
  SecureField,
  Image,
  Button,
  Spacer,
  useNativeState,
} from '@expo/ui/swift-ui';
import {
  font,
  foregroundStyle,
  textFieldStyle,
  glassEffect,
  padding,
  frame,
  autocorrectionDisabled,
  textInputAutocapitalization,
  textContentType,
  buttonStyle,
  controlSize,
} from '@expo/ui/swift-ui/modifiers';
import { resetPasswordSchema } from '@/validations/auth/reset-password.schema';

const ResetPassword = () => {
  const router = useRouter();
  const { toast } = useToast();
  const params = useLocalSearchParams<{ email?: string; otp?: string }>();
  const email = params.email || '';
  const otp = params.otp || '';

  const password = useNativeState('');
  const confirmPassword = useNativeState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (isLoading) return;

    if (!email || !otp) {
      toast.show({
        label: 'Session expired',
        description: 'Please request a new reset code.',
        variant: 'danger',
        placement: 'top',
      });
      router.replace('/(auth)/forgot-password');
      return;
    }

    const validation = resetPasswordSchema.safeParse({
      password: password.value,
      confirmPassword: confirmPassword.value,
    });

    if (!validation.success) {
      toast.show({
        label: 'Invalid password',
        description: validation.error.issues[0].message,
        variant: 'danger',
        placement: 'top',
      });
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await authClient.emailOtp.resetPassword({
        email,
        otp,
        password: validation.data.password,
      });

      if (error) {
        toast.show({
          label: 'Reset failed',
          description: error.message || 'Could not reset password.',
          variant: 'danger',
          placement: 'top',
        });
        return;
      }

      toast.show({
        label: 'Password updated',
        description: 'Your password has been reset. Please sign in.',
        variant: 'success',
        placement: 'top',
      });

      router.replace('/(auth)/sign-in');
    } catch (err: unknown) {
      toast.show({
        label: 'Reset error',
        description:
          err instanceof Error
            ? err.message
            : 'An unexpected error occurred.',
        variant: 'danger',
        placement: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Reset Password',
          headerLargeTitleEnabled: true,
          headerBackTitle: 'Back',
          headerBackButtonMenuEnabled: true,
        }}
      />

      <ScrollView
        className="flex-1 bg-white dark:bg-black"
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="gap-6 pt-2">
          <Typography.Paragraph className="text-[13px] font-normal text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Choose a strong new password for your account.
          </Typography.Paragraph>

          <Host style={{ width: '100%', height: 280 }}>
            <VStack
              alignment="leading"
              spacing={16}
              modifiers={[
                frame({
                  maxWidth: Infinity,
                  maxHeight: Infinity,
                  alignment: 'center',
                }),
              ]}
            >
              <VStack alignment="leading" spacing={7}>
                <SwiftText
                  modifiers={[
                    font({ size: 14, weight: 'semibold' }),
                    foregroundStyle('primary'),
                  ]}
                >
                  New Password
                </SwiftText>

                <HStack
                  spacing={12}
                  modifiers={[
                    frame({ height: 48 }),
                    padding({ horizontal: 15 }),
                    glassEffect({
                      glass: { variant: 'clear', interactive: true },
                      shape: 'capsule',
                    }),
                  ]}
                >
                  <Image systemName="lock" size={15} color="secondary" />

                  {isPasswordVisible ? (
                    <TextField
                      placeholder="At least 8 characters"
                      text={password}
                      modifiers={[
                        textFieldStyle('plain'),
                        autocorrectionDisabled(),
                        textInputAutocapitalization('never'),
                        textContentType('newPassword'),
                        frame({ maxWidth: Infinity }),
                      ]}
                    />
                  ) : (
                    <SecureField
                      placeholder="At least 8 characters"
                      text={password}
                      modifiers={[
                        textFieldStyle('plain'),
                        autocorrectionDisabled(),
                        textInputAutocapitalization('never'),
                        textContentType('newPassword'),
                        frame({ maxWidth: Infinity }),
                      ]}
                    />
                  )}

                  <Button
                    onPress={() => setIsPasswordVisible((v) => !v)}
                    modifiers={[buttonStyle('plain')]}
                  >
                    <Image
                      systemName={isPasswordVisible ? 'eye.slash' : 'eye'}
                      size={15}
                      color="secondary"
                    />
                  </Button>
                </HStack>
              </VStack>

              <VStack alignment="leading" spacing={7}>
                <SwiftText
                  modifiers={[
                    font({ size: 14, weight: 'semibold' }),
                    foregroundStyle('primary'),
                  ]}
                >
                  Confirm New Password
                </SwiftText>

                <HStack
                  spacing={12}
                  modifiers={[
                    frame({ height: 48 }),
                    padding({ horizontal: 15 }),
                    glassEffect({
                      glass: { variant: 'clear', interactive: true },
                      shape: 'capsule',
                    }),
                  ]}
                >
                  <Image systemName="lock" size={15} color="secondary" />

                  {isConfirmPasswordVisible ? (
                    <TextField
                      placeholder="Repeat password"
                      text={confirmPassword}
                      modifiers={[
                        textFieldStyle('plain'),
                        autocorrectionDisabled(),
                        textInputAutocapitalization('never'),
                        textContentType('newPassword'),
                        frame({ maxWidth: Infinity }),
                      ]}
                    />
                  ) : (
                    <SecureField
                      placeholder="Repeat password"
                      text={confirmPassword}
                      modifiers={[
                        textFieldStyle('plain'),
                        autocorrectionDisabled(),
                        textInputAutocapitalization('never'),
                        textContentType('newPassword'),
                        frame({ maxWidth: Infinity }),
                      ]}
                    />
                  )}

                  <Button
                    onPress={() => setIsConfirmPasswordVisible((v) => !v)}
                    modifiers={[buttonStyle('plain')]}
                  >
                    <Image
                      systemName={isConfirmPasswordVisible ? 'eye.slash' : 'eye'}
                      size={15}
                      color="secondary"
                    />
                  </Button>
                </HStack>
              </VStack>

              <Button
                onPress={handleResetPassword}
                modifiers={[
                  buttonStyle('glassProminent'),
                  controlSize('large'),
                  frame({ maxWidth: Infinity }),
                  frame({ height: 48 }),
                ]}
              >
                <HStack spacing={8}>
                  <Spacer />
                  <SwiftText modifiers={[font({ size: 15, weight: 'semibold' })]}>
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                  </SwiftText>
                  <Spacer />
                </HStack>
              </Button>
            </VStack>
          </Host>

          <Link href="/(auth)/sign-in" asChild>
            <Text className="text-[13px] text-center text-zinc-500 dark:text-zinc-400 font-medium">
              Back to{' '}
              <Text className="text-blue-500 dark:text-blue-400 font-semibold">Sign in</Text>
            </Text>
          </Link>
        </View>
      </ScrollView>
    </>
  );
};

export default ResetPassword;
