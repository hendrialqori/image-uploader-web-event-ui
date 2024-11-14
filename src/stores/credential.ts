import { create } from "zustand";

type State = {
    id: null | string
}

type Actions = {
    setId: (userId: string) => void;
}

const useCredentialStore = create<State & Actions>((set) => ({
    id: null,
    setId: (userId: string) => {
        set({ id: userId })
    }
}))

export default useCredentialStore