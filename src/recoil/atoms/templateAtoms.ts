/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/recoil/atoms/templateAtoms.ts
*/

import { atom } from 'recoil'
import { initTemplateFilterObject } from '../../model'

export const templateState = atom({
  key: 'ContactState',
  default: initTemplateFilterObject(),
})
