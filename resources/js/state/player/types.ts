export interface IAllPlayers { [playerId: string]: IPlayer }

export interface IPlayer {
  id: string
  name: string
}