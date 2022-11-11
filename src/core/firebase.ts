import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, getDoc, getDocs } from "firebase/firestore";
import { makeAutoObservable } from "mobx";
import { Recipe } from "../interfaces/Recipe";

/**
 * Firebase Firestore
 */
class FirebaseStore {
	private firebaseApp = initializeApp({ projectId: "maik-33" });
	private firestoreDb = getFirestore(this.firebaseApp);

	public constructor() {
		makeAutoObservable(this);
	}

	private getCollection = async (route: string) => {
		return await collection(this.firestoreDb, route);
	};

	public getItems = async (route?: string) => {
		if (!route) return;
		try {
			const snapshot = await this.getCollection(route);
			const items = await getDocs(snapshot);
			return items.docs.map(d => ({ id: d.id, title: d.data().title })) as Array<Recipe>;
		} catch (error) {
			console.error(error);
			return;
		}
	};

	public getItem = async <Item>(route?: string, id?: string) => {
		if (!route || !id) return;
		try {
			const snapshot = await this.getCollection(route);
			const ref = doc(snapshot, id);
			const item = await getDoc(ref);
			return item.exists() ? { id: item.id, ...item.data() } as unknown as Item : undefined;
		} catch (error) {
			console.error(error);
			return;
		}
	};
}

export const firebaseStore = new FirebaseStore();
