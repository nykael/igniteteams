import AsyncStorage from "@react-native-async-storage/async-storage";
import { groupsGetAll } from "./groupGetAll";
import { GROUP_COLLECTION } from "./storageConfig";

export async function groupCreate(newGroup: string) {
    try {
        const storagedGroups = await groupsGetAll();

        const storage = JSON.stringify([...storagedGroups, newGroup])

        await AsyncStorage.setItem(GROUP_COLLECTION, storage)
    } catch (error) {
        throw error;
    }
}