/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/recoil/atoms/toastAtoms.ts
*/

import { atom } from 'recoil'
import { initEmptyToast } from '../../model'

export const toastState = atom({
  key: 'ToastState',
  default: initEmptyToast(),
})
