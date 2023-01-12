<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branches extends Model
{
    use HasFactory;
    protected $table = "branches";
    protected $fillable = ['name','status'];

    public function bids(){
        return $this->hasMany("App\Models\Student", "branch_id");
    }
}
