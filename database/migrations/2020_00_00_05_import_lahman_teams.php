<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ImportLahmanTeams extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        ini_set('memory_limit', '-1');
        \DB::unprepared( file_get_contents(__DIR__."/../sources/2019_teams_create.sql" ) );
        \DB::unprepared( file_get_contents(__DIR__."/../sources/2019_teams_insert.sql" ) );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
