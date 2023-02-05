import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './features/game/gameSlice';
import gameboardReducer from './features/gameboard/gameboardSlice';
import playerReducer from "./features/player/playerSlice";
import npcsReducer from "./features/npcs/npcsSlice";

export const store = configureStore({
    reducer: {
        game: gameReducer,
        gameboard: gameboardReducer,
        player: playerReducer,
        npcs: npcsReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
