//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { v4 as createUuid } from 'uuid'

import { IDraft } from '@/state/draft/types'

//-----------------------------------------------------------------------------
// Default Draft
//-----------------------------------------------------------------------------
export const defaultDraft: () => IDraft = () => ({
  id: createUuid(),
  statCategoriesBatting: [ 'AVG', 'OPS', 'HR', 'R', 'RBI', 'SB' ],
  statCategoriesPitching: [ 'ERA', 'IP', 'K', 'QS', 'SV', 'WHIP' ]
})