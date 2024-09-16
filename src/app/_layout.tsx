import { ClerkProvider, useAuth } from "@clerk/clerk-expo"
import { router, Slot } from "expo-router"
import { useEffect } from "react"
import { ActivityIndicator } from "react-native"
import { tokenCache } from "./storage/tokenCache"


const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string

{/*TODO: Cambair a  Auth en la linea 20 */}
function InitialLayout() {
    const { isSignedIn, isLoaded } = useAuth()

    

    useEffect(() => {
        if(!isLoaded) return

        if(isSignedIn) {
            router.replace("/(category)")  
        } else {
            router.replace("/(public)")
        }
    }, [isSignedIn])


    return isLoaded ? (<Slot/>) : (
        <ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
    )
}

export default function Layout() {
    return (
        <ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
            <InitialLayout />
        </ClerkProvider>
    )
}