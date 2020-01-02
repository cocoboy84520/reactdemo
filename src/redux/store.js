import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducer from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import storageSession from 'redux-persist/lib/storage/session'
import {persistStore, persistReducer} from 'redux-persist';

const storageConfig = {
    key: 'root', // 必须有的
    storage:storageSession, // 缓存机制
    whitelist: ['user'] // reducer 里持久化的数据,除此外均为不持久化数据
}
const myPersistReducer = persistReducer(storageConfig, reducer)
const store = createStore(myPersistReducer,composeWithDevTools(applyMiddleware(thunk)))
export const persistor = persistStore(store)
export default store