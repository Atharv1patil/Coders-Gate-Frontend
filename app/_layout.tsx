import { Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { tokenCache } from '@/cache'
import { Header } from "react-native/Libraries/NewAppScreen";

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file')
  }
  return (

    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
    <ClerkLoaded>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="Componet/Home" options={{ headerShown: false }} />
      <Stack.Screen name="Componet/CourseDetails" options={{ title: 'Course Details'}} />
      <Stack.Screen name="Componet/CourseChapter"options={{ title: 'Course Chapter'}} />
      <Stack.Screen name="Componet/Compliler"options={{ title: 'CodeChef Complier'}} />
      <Stack.Screen name="Componet/Videoplayer"options={{ title: 'Video Player'}} />
    </Stack>
    
    
  </ClerkLoaded>
  </ClerkProvider>
  )
  
  
}
