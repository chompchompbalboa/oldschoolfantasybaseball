<?php

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

use App\Models\Batting;
use App\Models\Pitching;
use App\Models\Player;

Route::get('/', function () {
    return view('site');
});

Route::get('/draft/{type?}', function () {

    //Cache::forget('allPlayerSeasonsByPositionBatting');
    //Cache::forget('allPlayerSeasonsByPositionPitching');
    //Cache::forget('allPlayerSeasonsBatting');
    //Cache::forget('allPlayerSeasonsPitching');
    //Cache::forget('playerSeasonsByPositionBatting');
    //Cache::forget('playerSeasonsByPositionPitching');

    $allPlayerSeasonsByPositionBatting = Cache::rememberForever('allPlayerSeasonsByPositionBatting', function() {
        return [
            'CATCHER' => getBattersByPosition('c'),
            'FIRST_BASEMAN' => getBattersByPosition('1b'),
            'SECOND_BASEMAN' => getBattersByPosition('2b'),
            'SHORTSTOP' => getBattersByPosition('ss'),
            'THIRD_BASEMAN' => getBattersByPosition('3b'),
            'OUTFIELD' => getBattersByPosition('of'),
            'DESIGNATED_HITTER' => getBattersByPosition('dh')
        ];
    });

    $allPlayerSeasonsByPositionPitching = Cache::rememberForever('allPlayerSeasonsByPositionPitching', function() {
        return [
            'STARTING_PITCHER' => getPitchersByPosition('SP'),
            'RELIEF_PITCHER' => getPitchersByPosition('RP'),
        ];
    });

    $allPlayerSeasonsBatting = Cache::rememberForever('allPlayerSeasonsBatting', function() use($allPlayerSeasonsByPositionBatting) {
        $allPlayerSeasons = [];
        foreach($allPlayerSeasonsByPositionBatting as $positionPlayerSeasons) {
            foreach($positionPlayerSeasons as $playerSeason) {
                if(isset($playerSeason['playerSeasonId'])) {
                    $allPlayerSeasons[$playerSeason['playerSeasonId']] = $playerSeason;
                }
            }
        }
        return $allPlayerSeasons;
    });

    $allPlayerSeasonsPitching = Cache::rememberForever('allPlayerSeasonsPitching', function() use($allPlayerSeasonsByPositionPitching) {
        $allPlayerSeasons = [];
        foreach($allPlayerSeasonsByPositionPitching as $positionPlayerSeasons) {
            foreach($positionPlayerSeasons as $playerSeason) {
                if(isset($playerSeason['playerSeasonId'])) {
                    $allPlayerSeasons[$playerSeason['playerSeasonId']] = $playerSeason;
                }
            }
        }
        return $allPlayerSeasons;
    });

    $playerSeasonsByPositionBatting = Cache::rememberForever('playerSeasonsByPositionBatting', function() use($allPlayerSeasonsByPositionBatting) {
        $playerSeasonsByPosition = [];
        foreach($allPlayerSeasonsByPositionBatting as $position => $positionPlayerSeasons) {
            $playerSeasonsByPosition[$position] = [];
            foreach($positionPlayerSeasons as $playerSeason) {
                if(isset($playerSeason['playerSeasonId'])) {
                    array_push($playerSeasonsByPosition[$position], $playerSeason['playerSeasonId']);
                }
            }
        }
        return $playerSeasonsByPosition;
    });

    $playerSeasonsByPositionPitching = Cache::rememberForever('playerSeasonsByPositionPitching', function() use($allPlayerSeasonsByPositionPitching) {
        $playerSeasonsByPosition = [];
        foreach($allPlayerSeasonsByPositionPitching as $position => $positionPlayerSeasons) {
            $playerSeasonsByPosition[$position] = [];
            foreach($positionPlayerSeasons as $playerSeason) {
                if(isset($playerSeason['playerSeasonId'])) {
                    array_push($playerSeasonsByPosition[$position], $playerSeason['playerSeasonId']);
                }
            }
        }
        return $playerSeasonsByPosition;
    });
    
    return view('draft')->with([
        'allPlayerSeasonsBatting' => $allPlayerSeasonsBatting,
        'playerSeasonsByPositionBatting' => $playerSeasonsByPositionBatting,
        'allPlayerSeasonsPitching' => $allPlayerSeasonsPitching,
        'playerSeasonsByPositionPitching' => $playerSeasonsByPositionPitching
    ]);
});

function getBattersByPosition($position) {
    $playersByPosition = Batting::where([
                                    [ 'appearances.G_'.$position, '>', 10 ]
                                ])
                               ->join('appearances', function($join) { 
                                   $join->on('appearances.playerID', '=', 'batting.playerID');
                                   $join->on('appearances.yearId', '=', 'batting.yearID');
                                   
                               })
                               ->join('people', 'people.playerID', '=', 'batting.playerID')
                               ->groupBy('people.playerID', 'batting.yearID')
                               ->orderBy('batting.yearID', 'desc')
                               ->selectRaw('
                                    concat(people.playerID, "-", batting.yearID, "-batting") as playerSeasonId,
                                    concat(people.nameFirst, " ", people.nameLast) as name,
                                    batting.yearID as year,
                                    (sum(batting.AB) DIV 2) as AB,
                                    (sum(batting.H) DIV 2) as H,
                                    (sum(batting.R) DIV 2) as R,
                                    (sum(batting.HR) DIV 2) as HR,
                                    (sum(batting.RBI) DIV 2) as RBI,
                                    (sum(batting.SB) DIV 2) as SB,
                                    round(sum(batting.H) / sum(batting.AB), 3) as AVG
                               ')
                               ->get();
    return $playersByPosition->toArray();
}

function getPitchersByPosition($position) {
    if($position === 'SP') {
        $playersByPosition = Player::where([
                                        [ 'appearances.G_p', '>=', 10 ],
                                        [ 'appearances.GS', '>=', 10 ]
                                    ])
                                    ->join('appearances', 'appearances.playerID', '=', 'people.playerID')
                                    ->get();
    }
    if($position === 'RP') {
        $playersByPosition = Player::where([
                                        [ 'appearances.G_p', '>=', 10 ],
                                        [ 'appearances.GS', '<', 10 ]
                                    ])
                                    ->join('appearances', 'appearances.playerID', '=', 'people.playerID')
                                    ->get();
    }
    return $playersByPosition->toArray();
}

