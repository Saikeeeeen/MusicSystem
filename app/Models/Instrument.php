<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Instrument extends Model
{
    protected $fillable = ['equipment_no', 'type', 'name', 'state', 'status'];
}
