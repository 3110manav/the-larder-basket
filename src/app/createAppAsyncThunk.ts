import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AppDispatch, RootState, ThunkExtra } from './store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  extra: ThunkExtra
  rejectValue: string
}>()
