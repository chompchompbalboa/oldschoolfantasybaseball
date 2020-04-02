<?php

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

use App\Models\Batting;
use App\Models\Pitching;
use App\Models\Player;

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
                               ->selectRaw('
                                    concat(people.nameFirst, " ", people.nameLast) as name,
                                    batting.yearID as year,
                                    (sum(batting.AB) DIV 2) as AB,
                                    (sum(batting.H) DIV 2) as H,
                                    (sum(batting.R) DIV 2) as R,
                                    (sum(batting.HR) DIV 2) as HR,
                                    (sum(batting.RBI) DIV 2) as RBI,
                                    (sum(batting.SB) DIV 2) as SB,
                                    round((sum(batting.H) / sum(batting.AB)), 3) as AVG
                               ')
                               ->get();
    return $playersByPosition->toArray();
}

function getPitchersByPosition($position) {
    if($position === 'P') {
        $playersByPosition = Player::where([
                                        [ 'appearances.G_p', '>=', 10 ],
                                   ])
                                   ->join('appearances', 'appearances.playerID', '=', 'people.playerID')
                                   ->get();
    }
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

Route::get('/draft/{type?}', function () {

    $players = Player::all();
    $allPlayerSeasonsByPosition = Cache::rememberForever('allPlayerSeasonsByPosition', function() {
        return [
        'CATCHER' => getBattersByPosition('c'),
        'FIRST_BASEMAN' => getBattersByPosition('1b'),
        'SECOND_BASEMAN' => getBattersByPosition('2b'),
        'SHORTSTOP' => getBattersByPosition('ss'),
        'THIRD_BASEMAN' => getBattersByPosition('3b'),
        'OUTFIELD' => getBattersByPosition('of'),
        'PITCHER' => getPitchersByPosition('P'),
        'STARTING_PITCHER' => getPitchersByPosition('SP'),
        'RELIEF_PITCHER' => getPitchersByPosition('RP'),
        ];
    });
    return view('draft')->with([
        'players' => $players,
        'allPlayerSeasonsByPosition' => $allPlayerSeasonsByPosition
    ]);
});

Route::get('/', function () {
    return view('site');
});

Route::group(['prefix' => 'api'], function () {
    Route::resources([
        'draft/pick' => 'DraftPickController',
        'players' => 'PlayerController',
    ]);
});

