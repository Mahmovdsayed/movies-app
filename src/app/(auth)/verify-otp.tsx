import { useState } from 'react';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { InputOTP, Typography, useToast } from 'heroui-native';
import { authClient } from '@/lib/auth-client';
import {
  Host,
  Button,
  HStack,
  Text as SwiftText,
  Image,
  Spacer,
} from '@expo/ui/swift-ui';
import {
  buttonStyle,
  controlSize,
  font,
  frame,
} from '@expo/ui/swift-ui/modifiers';

const VerifyOtp = () => {
  const router = useRouter();
  const { toast } = useToast();
  const params = useLocalSearchParams<{ email?: string; type?: string }>();
  const email = params.email || '';
  const otpType = params.type || 'email-verification';

  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleVerify = async (codeToVerify?: string) => {
    const code = codeToVerify || otp;
    if (code.length < 6 || isVerifying) return;

    if (!email) {
      toast.show({
        label: 'Email missing',
        description: 'Please go back and enter your email again.',
        variant: 'danger',
        placement: 'top',
      });
      return;
    }

    try {
      setIsVerifying(true);

      if (otpType === 'forget-password') {
        const { error } = await authClient.emailOtp.checkVerificationOtp({
          email,
          otp: code,
          type: 'forget-password',
        });

        if (error) {
          toast.show({
            label: 'Verification failed',
            description: error.message || 'Invalid or expired OTP code.',
            variant: 'danger',
            placement: 'top',
          });
          return;
        }

        toast.show({
          label: 'Code verified',
          description: 'Please set your new password.',
          variant: 'success',
          placement: 'top',
        });

        router.replace({
          pathname: '/(auth)/reset-password',
          params: { email, otp: code },
        });
        return;
      }

      const { error } = await authClient.emailOtp.verifyEmail({
        email,
        otp: code,
      });

      if (error) {
        toast.show({
          label: 'Verification failed',
          description: error.message || 'Invalid or expired OTP code.',
          variant: 'danger',
          placement: 'top',
        });
        return;
      }

      toast.show({
        label: 'Email verified',
        description: 'Your account is ready. Welcome to Movies!',
        variant: 'success',
        placement: 'top',
      });

      await authClient.getSession();
      router.replace('/(tabs)/home');
    } catch (err: unknown) {
      toast.show({
        label: 'Verification error',
        description:
          err instanceof Error
            ? err.message
            : 'An unexpected error occurred.',
        variant: 'danger',
        placement: 'top',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (isResending || !email) return;

    try {
      setIsResending(true);

      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type:
          otpType === 'forget-password'
            ? 'forget-password'
            : 'email-verification',
      });

      if (error) {
        toast.show({
          label: 'Resend failed',
          description: error.message || 'Could not resend verification code.',
          variant: 'danger',
          placement: 'top',
        });
        return;
      }

      toast.show({
        label: 'Code sent',
        description: 'A new verification code was sent to your email.',
        variant: 'success',
        placement: 'top',
      });
    } catch (err: unknown) {
      toast.show({
        label: 'Resend error',
        description:
          err instanceof Error
            ? err.message
            : 'Could not send verification code.',
        variant: 'danger',
        placement: 'top',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Verification',
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
            Enter the 6-digit verification code sent to{' '}
            <Text className="text-zinc-950 dark:text-white font-semibold">
              {email || 'your email'}
            </Text>
            .
          </Typography.Paragraph>

          <View className="items-center justify-center py-4">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              onComplete={handleVerify}
            >
              <InputOTP.Group>
                <InputOTP.Slot index={0} />
                <InputOTP.Slot index={1} />
                <InputOTP.Slot index={2} />
              </InputOTP.Group>
              <InputOTP.Separator />
              <InputOTP.Group>
                <InputOTP.Slot index={3} />
                <InputOTP.Slot index={4} />
                <InputOTP.Slot index={5} />
              </InputOTP.Group>
            </InputOTP>
          </View>

          <Host style={{ width: '100%', height: 48 }}>
            <Button
              onPress={() => handleVerify()}
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
                  {isVerifying ? 'Verifying...' : 'Verify Code'}
                </SwiftText>
                <Spacer />
              </HStack>
            </Button>
          </Host>

          <View className="flex-row items-center justify-center gap-1.5 pt-2">
            <Text className="text-[13px] text-zinc-500 dark:text-zinc-400">
              Didn&apos;t receive a code?
            </Text>
            <Pressable onPress={handleResend} disabled={isResending}>
              <Text className="text-[13px] text-blue-500 dark:text-blue-400 font-semibold">
                {isResending ? 'Sending...' : 'Resend Code'}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default VerifyOtp;
