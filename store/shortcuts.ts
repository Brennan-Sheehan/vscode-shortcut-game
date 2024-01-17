import {defineStore} from 'pinia'
import type {Database}  from '~/types/supabase-generated'

export const useShortcutsStore = defineStore('Shortcuts', () => { 


  const supabase = useSupabaseClient<Database>();
  const shortcutData = ref<any>([]);
  const fetchShortcuts = async (type: string) => {
    try {
      const { data, error } = await supabase
        .from(type)
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      shortcutData.value = data;
    } catch (error: any) {
      console.error("Error fetching shortcuts: ", error.message);
    }
  }
  return {
    fetchShortcuts,
    shortcutData
  }
});