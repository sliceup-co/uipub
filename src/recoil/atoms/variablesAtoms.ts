/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/recoil/atoms/variablesAtoms.ts
*/

import { atom } from 'recoil'
import { initVariablesFilterObject } from '../../model'

export const variableState = atom({
  key: 'VariableState',
  default: initVariablesFilterObject(),
})
