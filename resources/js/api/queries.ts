//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import axios from '@/api/axios'

//-----------------------------------------------------------------------------
// Queries
//-----------------------------------------------------------------------------
export const getAllPlayerSeasonsBatting = async () => {
	return axios.get('/api/players/seasons/batting/all')
}
export const getAllPlayerSeasonsPitching = async () => {
	return axios.get('/api/players/seasons/pitching/all')
}
export const getPlayerSeasonsByPositionBatting = async () => {
	return axios.get('/api/players/seasons/batting/positions')
}
export const getPlayerSeasonsByPositionPitching = async () => {
	return axios.get('/api/players/seasons/pitching/positions')
}
export const getPlayerSeasonsVersion = async () => {
	return axios.get('/api/players/seasons/version')
}
