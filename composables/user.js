import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const useAuthUser = () => useState('authUser');

export const initializeUser = async () => {
    const { $auth } = useNuxtApp();
    const authUser = useAuthUser();

    authUser.value = {
        uid: '',
        data: {},
    }

    onAuthStateChanged($auth, (user) => {
        authUser.value.uid = user.uid;
        getUserData();
    })
}

export const getUserData = async () => {
    const { $db } = useNuxtApp();
    const authUser = useAuthUser();

    const authUserData = await getDoc(doc($db, "users", authUser.value.uid));
    authUser.value.data = authUserData.data();
}
