import { createReducer } from "@ngrx/store";
import { USERTYPE } from "../shared/UserType";

const initialState :USERTYPE|null = null
export const loginReducer=createReducer(initialState)