import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION, PLAYER_COLLECTION} from '@storage/storageConfig'

import { groupsGetAll } from "./groupGetAll";

export async function groupRemoveByname(groupDeleted: string) {
    try {
        const storagedGroups = await groupsGetAll();
        const groups = storagedGroups.filter(group => group !== groupDeleted)

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups))
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`)
    } catch (error) {
        
    }
}