<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $table = 'people';
    protected $primaryKey = 'playerID';

    protected $visible = [ 'id', 'name' ];
    protected $appends = [ 'id', 'name' ];

    public function getIdAttribute() 
    {
        return $this->getAttributes()['playerID'];
    }

    public function getNameAttribute() 
    {
        return $this->nameFirst." ".$this->nameLast;
    }
}
