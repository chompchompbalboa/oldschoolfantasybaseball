<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Batting;
use App\Models\Pitching;
use App\Models\Player;

class DraftPickController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Player::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $playerId = $request->input('playerId');
      $yearId = $request->input('yearId');
      $position = $request->input('position');
      $isBatter = in_array($request->input('position'), [
        'CATCHER',
        'FIRST_BASEMAN',
        'SECOND_BASEMAN',
        'SHORTSTOP',
        'THIRD_BASEMAN',
        'OUTFIELD',
        'UTIL',
      ]);
      $isPitcher = in_array($request->input('position'), [
        'PITCHER',
        'STARTING_PITCHER',
        'RELIEF_PITCHER',
      ]);
      if($isBatter) {
        $batter = Batting::where('playerId', $playerId)->where('yearId', $yearId)->first();
        if($batter) {
          return $batter;
        }
        else {
          return response(null, 404);
        }
      }
      elseif($isPitcher) {
        $pitcher = Pitching::where('playerId', $playerId)->where('yearId', $yearId)->first();
        if($pitcher) {
          return $pitcher;
        }
        else {
          return response(null, 404);
        }
      }
      else {
        return response(null, 404);
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
