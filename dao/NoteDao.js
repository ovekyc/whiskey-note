import AsyncStorage from '@react-native-community/async-storage';

export async function setNote(note) {
  const jsonValue = JSON.stringify(note);
  return await AsyncStorage.setItem(note.id, jsonValue);
}

export async function getNote(id) {
  const jsonValue = await AsyncStorage.getItem(id)
  return jsonValue != null ? JSON.parse(jsonValue) : null;
}

export async function delNote(id) {
  await AsyncStorage.removeItem(id)
}

export async function getAllNotes(id) {
  await AsyncStorage.getAllKeys()
}