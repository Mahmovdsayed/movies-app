import { useState } from 'react';
import { useRouter, Link, Stack } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { Typography, useToast } from 'heroui-native';
import { authClient } from '@/lib/auth-client';
import {
  Host,
  VStack,
  HStack,
  Text as SwiftText,
  TextField,
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
  keyboardType,
  textInputAutocapitalization,
  textContentType,
  buttonStyle,
  controlSize,
} from '@expo/ui/swift-ui/modifiers';
import { forgotPasswordSchema } from '@/validations/auth/forgot-password.schema';

const ForgotPassword = () => {
  const router = useRouter();
  const { toast } = useToast();
  const email = useNativeState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (isLoading) return;

    const validation = forgotPasswordSchema.safeParse({
      email: email.value,
    });

    if (!validation.success) {
      toast.show({
        label: 'Invalid email',
        description: validation.error.issues[0].message,
        variant: 'danger',
        placement: 'top',
      });
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email: validation.data.email,
        type: 'forget-password',
      });

      if (error) {
        toast.show({
          label: 'Request failed',
          description: error.message || 'Could not send reset code.',
          variant: 'danger',
          placement: 'top',
        });
        return;
      }

      toast.show({
        label: 'Reset code sent',
        description: 'Please check your email for the verification code.',
        variant: 'success',
        placement: 'top',
      });

      router.push({
        pathname: '/(auth)/verify-otp',
        params: { email: validation.data.email, type: 'forget-password' },
      });
    } catch (err: unknown) {
      toast.show({
        label: 'Request error',
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
          title: 'Forgot Password',
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
            Enter the email address registered with your account and we&apos;ll send you a 6-digit code to reset your password.
          </Typography.Paragraph>

          <Host style={{ width: '100%', height: 180 }}>
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
                  Email address
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
                  <Image systemName="envelope" size={15} color="secondary" />

                  <TextField
                    placeholder="name@example.com"
                    text={email}
                    modifiers={[
                      textFieldStyle('plain'),
                      keyboardType('email-address'),
                      autocorrectionDisabled(),
                      textInputAutocapitalization('never'),
                      textContentType('emailAddress'),
                      frame({ maxWidth: Infinity }),
                    ]}
                  />
                </HStack>
              </VStack>

              <Button
                onPress={handleSendCode}
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
                    {isLoading ? 'Sending code...' : 'Send Reset Code'}
                  </SwiftText>
                  <Spacer />
                </HStack>
              </Button>
            </VStack>
          </Host>

          <Link href="/(auth)/sign-in" asChild>
            <Text className="text-[13px] text-center text-zinc-500 dark:text-zinc-400 font-medium">
              Remember your password?{' '}
              <Text className="text-blue-500 dark:text-blue-400 font-semibold">Sign in</Text>
            </Text>
          </Link>
        </View>
      </ScrollView>
    </>
  );
};

export default ForgotPassword;
