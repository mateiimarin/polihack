import { arrayRemove, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore"

export const useCurrentPage = () => useState('currentPage');

export const getPage = async (pageId) => {
    const { $db } = useNuxtApp();
    const pageSnap = await getDoc(doc($db, "pages", pageId));

    if (pageSnap.exists()) {
        return pageSnap.data();
    }
}

export const savePage = async (pageId) => {
    const { $db } = useNuxtApp();
    const currentPage = useCurrentPage();
    await updateDoc(doc($db, "pages", pageId), {
        name: currentPage.value.name,
        content: currentPage.value.content,
    })

    const authUser = useAuthUser();
    const userPages = authUser.value.data.pages;
    var pageIndex = userPages.findIndex(page => page.id === pageId);

    if (pageIndex !== -1) {
        await updateDoc(doc($db, "users", authUser.value.uid), {
            pages: arrayRemove(userPages[pageIndex]),
        })    

        userPages[pageIndex] = {
            name: currentPage.value.name,
            id: pageId,
        }

        await updateDoc(doc($db, "users", authUser.value.uid), {
            pages: arrayUnion(userPages[pageIndex]),
        })    
    }
}

export const formatMath = (container) => {
    const mathElements = container.querySelectorAll('.math');
    mathElements.forEach((element) => {
        katex.render(element.textContent, element, {
            throwOnError: false,
        });
    })
}

export const cleanMath = (input) => {
    let result = input.replace(/<span class="katex">[\s\S]*?<annotation encoding="application\/x-tex">/g, '<span class="katex">');
    result = result.replace(/<\/annotation>[\s\S]*?<\/div><\/div>/g, '</div></div>');
    return result;
}