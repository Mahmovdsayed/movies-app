import { Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUniwind } from 'uniwind';
import { Typography } from 'heroui-native';
import Svg, { Defs, LinearGradient as SvgGradient, Rect, Stop } from 'react-native-svg';
import { BG_AUTH_IMAGE_URL } from '@/constants/config';
import JoinViaEmailButton from '@/components/ui/auth/JoinViaEmailButton';
import FacebookButton from '@/components/ui/auth/FacebookButton';
import GoogleButton from '@/components/ui/auth/GoogleButton';

export default function AuthWelcomeScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useUniwind();
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#000000' : '#FFFFFF';

  return (
    <>
      <View className="flex-1 bg-white dark:bg-black">
        <View className="absolute inset-0 h-[68%]">
          <Image
            source={{ uri: BG_AUTH_IMAGE_URL }}
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
          />
          <Svg height="100%" width="100%" className="absolute inset-0 w-full h-full">
            <Defs>
              <SvgGradient id="posterFade" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor={bgColor} stopOpacity="0" />
                <Stop offset="40%" stopColor={bgColor} stopOpacity="0.05" />
                <Stop offset="65%" stopColor={bgColor} stopOpacity="0.45" />
                <Stop offset="84%" stopColor={bgColor} stopOpacity="0.88" />
                <Stop offset="100%" stopColor={bgColor} stopOpacity="1" />
              </SvgGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#posterFade)" />
          </Svg>
        </View>

        <View className="flex-1 justify-end items-center px-6 gap-6" style={{ paddingBottom: insets.bottom + 28 }}>
          <View className="items-center w-full">
            <Typography.Heading type="h3" className="text-2xl font-bold text-center text-zinc-950 dark:text-white tracking-tight leading-snug mb-2">
              Find Your Next{'\n'}Favorite Movie Here
            </Typography.Heading>
            <Typography.Paragraph className="text-[13px] font-normal text-center text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Get access to an extensive library of movies, from timeless classics to the latest blockbusters.
            </Typography.Paragraph>
          </View>

          <View className="w-full">
            <JoinViaEmailButton />
            <View className="flex-row items-center my-3 w-full">
              <View className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
              <Text
                className="mx-3 text-xs text-zinc-400 dark:text-zinc-500 font-medium"
              >
                or continue with
              </Text>
              <View className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            </View>

            <View className="flex-row w-full gap-3">
              <View className="flex-1">
                <GoogleButton isDark={isDark} />
              </View>
              <View className="flex-1">
                <FacebookButton isDark={isDark} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
