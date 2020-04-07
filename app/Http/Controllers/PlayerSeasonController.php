<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

use App\Models\Appearances;
use App\Models\Batting;
use App\Models\Pitching;
use App\Models\Player;

class PlayerSeasonController extends Controller
{

    public function version() 
    {
        return response('2020.04.06.1');
    }

    public function allPlayerSeasonsBatting()
    {
        Cache::forget('allPlayerSeasonsBatting');
        $allPlayerSeasonsBatting = Cache::rememberForever('allPlayerSeasonsBatting', function () {
            $playerSeasons = [];
            $rawPlayerSeasons = Batting::selectRaw('
                                    concat(people.playerID, "-", batting.yearID, "-batting") as playerSeasonId,
                                    concat(people.nameFirst, " ", people.nameLast) as name,
                                    people.nameFirst as nameFirst,
                                    people.nameLast as nameLast,
                                    batting.yearID as year,
                                    sum(batting.AB) as AB,
                                    sum(batting.H) as H,
                                    sum(batting.R) as R,
                                    sum(batting.HR) as HR,
                                    sum(batting.RBI) as RBI,
                                    sum(batting.SB) as SB,
                                    round(sum(batting.H) / sum(batting.AB), 3) as AVG
                                ')
                                ->join('people', 'people.playerID', '=', 'batting.playerID')
                                ->groupBy('batting.playerID', 'batting.yearId')
                                ->get();
            foreach($rawPlayerSeasons as $playerSeason) {
                if(
                    $playerSeason['AB'] > 300 &&
                    ($playerSeason['HR'] > 15 || $playerSeason['SB'] > 10) &&
                    $playerSeason['AVG'] > .250 &&
                    ($playerSeason['R'] > 65 || $playerSeason['RBI'] > 65)
                ) {
                    $playerSeasons[$playerSeason['playerSeasonId']] = [
                        'playerSeasonId' => $playerSeason['playerSeasonId'],
                        'name' => $playerSeason['name'],
                        'nameFirst' => $playerSeason['nameFirst'],
                        'nameLast' => $playerSeason['nameLast'],
                        'year' => $playerSeason['year'],
                        'stats' => [
                            'AB' => $playerSeason['AB'],
                            'AVG' => $playerSeason['AVG'],
                            'H' => $playerSeason['H'],
                            'HR' => $playerSeason['HR'],
                            'R' => $playerSeason['R'],
                            'RBI' => $playerSeason['RBI'],
                            'SB' => $playerSeason['SB'],
                        ]
                    ];
                }
            }
            return $playerSeasons;
        });
        //dd(count($allPlayerSeasonsBatting));
        return response()->json($allPlayerSeasonsBatting, 200);
    }

    public function allPlayerSeasonsPitching()
    {
        Cache::forget('allPlayerSeasonsPitching');
        $allPlayerSeasonsPitching = Cache::rememberForever('allPlayerSeasonsPitching', function () {
            $playerSeasons = [];
            $rawPlayerSeasons = Pitching::selectRaw('
                                    concat(people.playerID, "-", pitching.yearID, "-pitching") as playerSeasonId,
                                    concat(people.nameFirst, " ", people.nameLast) as name,
                                    people.nameFirst as nameFirst,
                                    people.nameLast as nameLast,
                                    pitching.yearID as year,
                                    sum(pitching.IPouts) as IPouts,
                                    sum(pitching.W) as W,
                                    sum(pitching.SV) as SV,
                                    round((sum(pitching.ER) / (sum(pitching.IPouts) / 3)) * 9, 2) as ERA,
                                    round((sum(pitching.H) + sum(pitching.BB) + sum(pitching.IBB)) / (sum(pitching.IPouts) / 3), 2) as WHIP,
                                    sum(pitching.SO) as SO,
                                    sum(pitching.BB) as BB,
                                    sum(pitching.ER) as ER,
                                    sum(pitching.H) as H,
                                    sum(pitching.IBB) as IBB
                                ')
                                ->join('people', 'people.playerID', '=', 'pitching.playerID')
                                ->groupBy('pitching.playerID', 'pitching.yearId')
                                ->get();
            foreach($rawPlayerSeasons as $playerSeason) {
                if(
                    $playerSeason['IPouts'] > 150 &&
                    ($playerSeason['SV'] > 15 || $playerSeason['W'] > 7) &&
                    ($playerSeason['SV'] > 15 || $playerSeason['SO'] > 100) &&
                    $playerSeason['ERA'] < 4.5
                ) {
                    $playerSeasons[$playerSeason['playerSeasonId']] = [
                        'playerSeasonId' => $playerSeason['playerSeasonId'],
                        'name' => $playerSeason['name'],
                        'nameFirst' => $playerSeason['nameFirst'],
                        'nameLast' => $playerSeason['nameLast'],
                        'year' => $playerSeason['year'],
                        'stats' => [
                            'IPouts' => $playerSeason['IPouts'],
                            'W' => $playerSeason['W'],
                            'SV' => $playerSeason['SV'],
                            'ERA' => $playerSeason['ERA'],
                            'WHIP' => $playerSeason['WHIP'],
                            'SO' => $playerSeason['SO'],
                            'BB' => $playerSeason['BB'],
                            'ER' => $playerSeason['ER'],
                            'H' => $playerSeason['H'],
                            'IBB' => $playerSeason['IBB'],
                        ]
                    ];
                }
            }
            return $playerSeasons;
        });
        //dd(count($allPlayerSeasonsPitching));
        return response()->json($allPlayerSeasonsPitching, 200);
    }

    public function playerSeasonsByPositionBatting()
    {
        Cache::forget('playerSeasonsByPositionBatting');
        $playerSeasonsByPositionBatting = Cache::rememberForever('playerSeasonsByPositionBatting', function() {
            return [
                'CATCHER' => $this->getPlayerSeasonsBattingByPosition('c'),
                'FIRST_BASEMAN' => $this->getPlayerSeasonsBattingByPosition('1b'),
                'SECOND_BASEMAN' => $this->getPlayerSeasonsBattingByPosition('2b'),
                'SHORTSTOP' => $this->getPlayerSeasonsBattingByPosition('ss'),
                'THIRD_BASEMAN' => $this->getPlayerSeasonsBattingByPosition('3b'),
                'OUTFIELD' => $this->getPlayerSeasonsBattingByPosition('of'),
                'DESIGNATED_HITTER' => $this->getPlayerSeasonsBattingByPosition('dh')
            ];
        });
        return response()->json($playerSeasonsByPositionBatting, 200);
    }

    public function playerSeasonsByPositionPitching()
    {
        Cache::forget('playerSeasonsByPositionPitching');
        $playerSeasonsByPositionPitching = Cache::rememberForever('playerSeasonsByPositionPitching', function() {
            return [
                'STARTING_PITCHER' => $this->getPlayerSeasonsPitchingByPosition('SP'),
                'RELIEF_PITCHER' => $this->getPlayerSeasonsPitchingByPosition('RP')
            ];
        });
        return response()->json($playerSeasonsByPositionPitching, 200);
    }

    private function getPlayerSeasonsBattingByPosition($position)
    {
        $playerSeasons = [];
        $rawPlayersByPosition = Appearances::where([
                                        [ 'appearances.G_'.$position, '>=', 10 ]
                                    ])
                                   ->join('people', 'people.playerID', '=', 'appearances.playerID')
                                   ->groupBy('appearances.playerID', 'appearances.yearID')
                                   ->orderBy('appearances.yearID', 'desc')
                                   ->selectRaw('
                                        concat(people.playerID, "-", appearances.yearID, "-batting") as playerSeasonId
                                   ')
                                   ->get();
        foreach($rawPlayersByPosition as $playerSeason) {
            array_push($playerSeasons, $playerSeason['playerSeasonId']);
        }
        return $playerSeasons;
    }
    
    private function getPlayerSeasonsPitchingByPosition($position)
    {
        $playerSeasons = [];
        if($position === 'SP') {
            $rawPlayersByPosition = Appearances::where([
                                        [ 'appearances.G_p', '>=', 10 ],
                                        [ 'appearances.GS', '>=', 10 ]
                                    ])
                                    ->orWhere('appearances.yearId', '<=', 1903)
                                    ->join('people', 'people.playerID', '=', 'appearances.playerID')
                                    ->groupBy('appearances.playerID', 'appearances.yearID')
                                    ->orderBy('appearances.yearID', 'desc')
                                    ->selectRaw('
                                        concat(people.playerID, "-", appearances.yearID, "-pitching") as playerSeasonId
                                    ')
                                    ->get();
        }
        if($position === 'RP') {
            $rawPlayersByPosition = Appearances::where([
                                        [ 'appearances.G_p', '>=', 10 ],
                                        [ 'appearances.GS', '<', 10 ]
                                    ])
                                    ->orWhere('appearances.yearId', '<=', 1903)
                                    ->join('people', 'people.playerID', '=', 'appearances.playerID')
                                    ->groupBy('appearances.playerID', 'appearances.yearID')
                                    ->orderBy('appearances.yearID', 'desc')
                                    ->selectRaw('
                                        concat(people.playerID, "-", appearances.yearID, "-pitching") as playerSeasonId
                                    ')
                                    ->get();
        }
        foreach($rawPlayersByPosition as $playerSeason) {
            array_push($playerSeasons, $playerSeason['playerSeasonId']);
        }
        return $playerSeasons;
    }
}
